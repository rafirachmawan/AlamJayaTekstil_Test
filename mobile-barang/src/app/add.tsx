import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { API } from "@/config/api";
import { LinearGradient } from "expo-linear-gradient";

export default function Add() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nama || !kode || !jumlah) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API.barang, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_barang: nama,
          kode_barang: kode,
          jumlah: Number(jumlah),
        }),
      });

      const json = await res.json();

      if (json.status === "success") {
        alert("Berhasil tambah barang");

        setNama("");
        setKode("");
        setJumlah("");

        router.replace("/list");
      } else {
        alert(json.message || "Gagal tambah barang");
      }
    } catch (error) {
      console.log(error);
      alert("Gagal koneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* BACKGROUND GLOW */}
      <View style={styles.bgPurple} />
      <View style={styles.bgPink} />

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Tambah Barang</Text>

        {/* INPUT */}
        <TextInput
          placeholder="Nama Barang"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={nama}
          onChangeText={setNama}
        />

        <TextInput
          placeholder="Kode Barang"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={kode}
          onChangeText={setKode}
        />

        <TextInput
          placeholder="Jumlah"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={jumlah}
          keyboardType="numeric"
          onChangeText={setJumlah}
        />

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={{ width: "100%", marginTop: 10 }}
        >
          <LinearGradient colors={["#a855f7", "#ec4899"]} style={styles.button}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Simpan</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* BACK */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Kembali</Text>
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

  // 🔥 BACKGROUND GLOW
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

  // 🔥 CARD
  card: {
    width: "85%",
    padding: 24,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    marginBottom: 12,
  },

  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  back: {
    marginTop: 15,
    textAlign: "center",
    color: "#cbd5f5",
    fontWeight: "500",
  },
});
