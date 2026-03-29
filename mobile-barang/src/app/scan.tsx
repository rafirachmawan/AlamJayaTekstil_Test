import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { useRouter } from "expo-router";
import { API } from "@/config/api";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");
  const [barang, setBarang] = useState<any>(null);

  const router = useRouter();

  // 🔥 HANDLE SCAN
  const handleScan = async ({ data }: any) => {
    setScanned(true);
    setResult(data);

    try {
      // 🔥 HIT API (cari barang berdasarkan kode)
      const res = await fetch(`${API.barang}`);
      const json = await res.json();

      // 🔥 cari barang berdasarkan kode
      const found = json.data.find((item: any) => item.kode_barang == data);

      if (found) {
        setBarang(found);
      } else {
        alert("Barang tidak ditemukan");
      }
    } catch (err) {
      console.log(err);
      alert("Gagal ambil data");
    }
  };

  // 🔥 PERMISSION
  if (!permission) {
    return <Text>Meminta izin kamera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Tidak ada akses kamera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: "blue", marginTop: 10 }}>Izinkan Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "code128"],
        }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/* 🔥 HASIL SCAN */}
      {scanned && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Kode: {result}</Text>

          {barang && (
            <>
              <Text style={styles.resultText}>Nama: {barang.nama_barang}</Text>
              <Text style={styles.resultText}>Jumlah: {barang.jumlah}</Text>
            </>
          )}

          <TouchableOpacity
            onPress={() => {
              setScanned(false);
              setBarang(null);
            }}
          >
            <Text style={styles.scanAgain}>Scan Lagi</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>Kembali</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  scanAgain: {
    color: "#4CAF50",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  back: {
    color: "#FF9800",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
