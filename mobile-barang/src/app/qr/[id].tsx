import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API } from "@/config/api";
import { LinearGradient } from "expo-linear-gradient";

export default function QRBarang() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API.barang}/qr/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setQr(res.qr);
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal ambil QR");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#a855f7" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* BACKGROUND */}
      <View style={styles.bgPurple} />
      <View style={styles.bgPink} />

      {/* CARD */}
      <View style={styles.card}>
        {/* BACK */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Kembali</Text>
        </TouchableOpacity>

        <Text style={styles.title}>QR Code Barang</Text>

        {/* QR */}
        <View style={styles.qrWrapper}>
          <Image source={{ uri: qr }} style={styles.qr} />
        </View>

        {/* DETAIL */}
        <View style={styles.detail}>
          <Text style={styles.text}>Nama: {data?.nama_barang}</Text>
          <Text style={styles.text}>Kode: {data?.kode_barang}</Text>
          <Text style={styles.text}>Jumlah: {data?.jumlah}</Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity onPress={() => router.replace("/list")}>
          <LinearGradient colors={["#a855f7", "#ec4899"]} style={styles.button}>
            <Text style={styles.buttonText}>Kembali ke List</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },

  bgPurple: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#a855f7",
    opacity: 0.2,
    borderRadius: 999,
    top: 50,
    left: 20,
  },
  bgPink: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#ec4899",
    opacity: 0.2,
    borderRadius: 999,
    bottom: 50,
    right: 20,
  },

  card: {
    width: "85%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },

  back: {
    alignSelf: "flex-start",
    color: "#94a3b8",
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  qrWrapper: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
  },

  qr: {
    width: 200,
    height: 200,
  },

  detail: {
    width: "100%",
    marginBottom: 15,
  },

  text: {
    color: "#cbd5f5",
    marginBottom: 4,
  },

  button: {
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
});
