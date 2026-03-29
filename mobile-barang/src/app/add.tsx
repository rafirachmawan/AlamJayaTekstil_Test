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

export default function Add() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // 🔥 VALIDASI
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

        // reset form
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
      <Text style={styles.title}>Tambah Barang</Text>

      <TextInput
        placeholder="Nama Barang"
        style={styles.input}
        value={nama}
        onChangeText={setNama}
      />

      <TextInput
        placeholder="Kode Barang"
        style={styles.input}
        value={kode}
        onChangeText={setKode}
      />

      <TextInput
        placeholder="Jumlah"
        style={styles.input}
        value={jumlah}
        keyboardType="numeric"
        onChangeText={setJumlah}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>Simpan</Text>
        )}
      </TouchableOpacity>

      {/* 🔙 BACK */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  back: {
    marginTop: 15,
    textAlign: "center",
    color: "#2196F3",
    fontWeight: "bold",
  },
});
