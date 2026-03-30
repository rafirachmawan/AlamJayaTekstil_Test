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

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log("RES:", data);

      if (data.status === "success") {
        alert("Login berhasil");
        router.replace("/list");
      } else {
        alert(data.message || "Login gagal");
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
        <Text style={styles.title}>Alam Jaya Tekstil 👋</Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#cbd5f5"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#cbd5f5"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{ width: "100%" }}
        >
          <LinearGradient
            colors={["#a855f7", "#ec4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footer}>Inventory Management System</Text>
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

  // 🔥 CARD GLASS
  card: {
    width: "85%",
    padding: 24,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  title: {
    fontSize: 22,
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

  footer: {
    textAlign: "center",
    color: "#cbd5f5",
    marginTop: 16,
    fontSize: 12,
  },
});
