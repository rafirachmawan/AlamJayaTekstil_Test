import { View, Text, StyleSheet } from "react-native";

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Aplikasi Stok Barang</Text>

      <Text style={styles.text}>
        Aplikasi ini digunakan untuk mengelola data barang:
      </Text>

      <Text style={styles.list}>• Login User</Text>
      <Text style={styles.list}>• Lihat Data Barang</Text>
      <Text style={styles.list}>• Tambah Barang</Text>
      <Text style={styles.list}>• Scan QR Code</Text>

      <Text style={styles.footer}>Dibuat oleh Rafi Rachmawan 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
