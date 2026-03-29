import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { API } from "@/config/api";

export default function List() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getData = async () => {
    try {
      const res = await fetch(API.barang);
      const json = await res.json();

      setData(json.data);
    } catch (error) {
      console.log(error);
      alert("Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  //
  useEffect(() => {
    getData();
  }, []);

  //
  useFocusEffect(() => {
    getData();
  });

  const handleLogout = () => {
    router.replace("/login");
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nama_barang}</Text>
      <Text>Kode: {item.kode_barang}</Text>
      <Text>Jumlah: {item.jumlah}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Data Barang</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* BUTTON TAMBAH */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addText}>+ Tambah Barang</Text>
      </TouchableOpacity>

      {/* BUTTON SCAN */}
      <TouchableOpacity
        style={styles.scanBtn}
        onPress={() => router.push("/scan")}
      >
        <Text style={styles.scanText}>📷 Scan Barang</Text>
      </TouchableOpacity>

      {/* LIST */}
      {data.length === 0 ? (
        <View style={styles.center}>
          <Text>Data kosong</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#4CAF50",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },

  addBtn: {
    backgroundColor: "#2196F3",
    padding: 12,
    margin: 10,
    borderRadius: 10,
  },
  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  scanBtn: {
    backgroundColor: "#FF9800",
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  scanText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    padding: 15,
    margin: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
