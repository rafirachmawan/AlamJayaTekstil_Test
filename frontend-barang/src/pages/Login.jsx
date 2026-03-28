import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/login", {
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

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        alert("Login berhasil");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Gagal koneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      {/* BACKGROUND DECOR */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* CARD */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl w-[360px] text-white">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Alam Jaya Tekstil 👋
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Inventory Management System
        </p>
      </div>
    </div>
  );
}
