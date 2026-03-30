import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { API } from "@/config/api";
import { LinearGradient } from "expo-linear-gradient";

export default function List() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState<any>(null);
  const [editData, setEditData] = useState({
    nama: "",
    kode: "",
    jumlah: "",
  });

  const router = useRouter();

  const getData = async () => {
    try {
      const res = await fetch(API.barang);
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      alert("Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(() => {
    getData();
  });

  const handleLogout = () => {
    router.replace("/login");
  };

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.nama_barang?.toLowerCase().includes(keyword) ||
      item.kode_barang?.toLowerCase().includes(keyword)
    );
  });

  const startEdit = (item: any) => {
    setEditId(item.id);
    setEditData({
      nama: item.nama_barang,
      kode: item.kode_barang,
      jumlah: String(item.jumlah),
    });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`${API.barang}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_barang: editData.nama,
          kode_barang: editData.kode,
          jumlah: Number(editData.jumlah),
        }),
      });

      const json = await res.json();

      if (json.status === "success") {
        alert("Berhasil update");
        setEditId(null);
        getData();
      } else {
        alert("Gagal update");
      }
    } catch {
      alert("Error update");
    }
  };

  // 🔥 DELETE
  const handleDelete = (id: any) => {
    Alert.alert("Hapus Barang", "Yakin mau hapus barang ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(`${API.barang}/${id}`, {
              method: "DELETE",
            });

            const json = await res.json();

            if (json.status === "success") {
              alert("Berhasil hapus");
              getData();
            } else {
              alert("Gagal hapus");
            }
          } catch {
            alert("Error hapus");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => {
    const isEditing = editId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => !isEditing && startEdit(item)}
      >
        <View style={styles.card}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={editData.nama}
                onChangeText={(v) => setEditData({ ...editData, nama: v })}
              />
              <TextInput
                style={styles.input}
                value={editData.kode}
                onChangeText={(v) => setEditData({ ...editData, kode: v })}
              />
              <TextInput
                style={styles.input}
                value={editData.jumlah}
                keyboardType="numeric"
                onChangeText={(v) => setEditData({ ...editData, jumlah: v })}
              />

              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={saveEdit}>
                  <LinearGradient
                    colors={["#22c55e", "#16a34a"]}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Simpan</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => setEditId(null)}
                >
                  <LinearGradient
                    colors={["#ef4444", "#dc2626"]}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Batal</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>{item.nama_barang}</Text>
              <Text style={styles.text}>Kode: {item.kode_barang}</Text>
              <Text style={styles.text}>Jumlah: {item.jumlah}</Text>

              {/* 🔥 DELETE BUTTON */}
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: "#f87171", textAlign: "right" }}>
                  Hapus
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#a855f7" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.bgPurple} />
      <View style={styles.bgPink} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Data Barang</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="🔍 Cari barang..."
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* TAMBAH */}
      <TouchableOpacity
        style={{ marginHorizontal: 16, marginTop: 10 }}
        onPress={() => router.push("/add")}
      >
        <LinearGradient colors={["#a855f7", "#ec4899"]} style={styles.button}>
          <Text style={styles.buttonText}>+ Tambah Barang</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* 🔥 SCAN BALIK */}
      <TouchableOpacity
        style={{ marginHorizontal: 16, marginTop: 10 }}
        onPress={() => router.push("/scan")}
      >
        <LinearGradient colors={["#6366f1", "#3b82f6"]} style={styles.button}>
          <Text style={styles.buttonText}>📷 Scan Barang</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },

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

  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "600" },
  logoutText: { color: "#f87171" },

  searchWrapper: { margin: 16 },
  searchInput: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
  },

  card: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  title: { color: "#fff", fontWeight: "600" },
  text: { color: "#cbd5f5" },

  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
