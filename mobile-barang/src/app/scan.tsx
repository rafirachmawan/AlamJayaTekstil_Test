import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { useRouter } from "expo-router";
import { API } from "@/config/api";
import { LinearGradient } from "expo-linear-gradient";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");
  const [barang, setBarang] = useState<any>(null);

  const router = useRouter();

  const handleScan = async ({ data }: any) => {
    setScanned(true);
    setResult(data);

    try {
      const res = await fetch(`${API.barang}`);
      const json = await res.json();

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
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Meminta izin kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.center, { backgroundColor: "#0f172a" }]}>
        <Text style={{ color: "#fff" }}>Tidak ada akses kamera</Text>

        <TouchableOpacity onPress={requestPermission}>
          <LinearGradient
            colors={["#a855f7", "#ec4899"]}
            style={styles.permissionBtn}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Izinkan Kamera
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* CAMERA */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "code128"],
        }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/* 🔥 OVERLAY DARK */}
      <View style={styles.overlay} />

      {/* 🔥 FRAME SCAN */}
      <View style={styles.scanFrame} />

      {/* 🔥 HASIL */}
      {scanned && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Hasil Scan</Text>

          <Text style={styles.resultText}>Kode: {result}</Text>

          {barang && (
            <>
              <Text style={styles.resultText}>Nama: {barang.nama_barang}</Text>
              <Text style={styles.resultText}>Jumlah: {barang.jumlah}</Text>
            </>
          )}

          {/* BUTTON SCAN LAGI */}
          <TouchableOpacity
            onPress={() => {
              setScanned(false);
              setBarang(null);
            }}
            style={{ marginTop: 10 }}
          >
            <LinearGradient
              colors={["#a855f7", "#ec4899"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Scan Lagi</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* BACK */}
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>← Kembali</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.4)",
  },

  scanFrame: {
    position: "absolute",
    top: "30%",
    left: "15%",
    width: "70%",
    height: 200,
    borderWidth: 2,
    borderColor: "#a855f7",
    borderRadius: 20,
  },

  resultBox: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  resultTitle: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },

  resultText: {
    color: "#cbd5f5",
    textAlign: "center",
    marginBottom: 4,
  },

  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  back: {
    marginTop: 10,
    textAlign: "center",
    color: "#94a3b8",
  },

  permissionBtn: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
