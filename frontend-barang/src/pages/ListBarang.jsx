import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListBarang() {
  const [barang, setBarang] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:8080/api/barang")
      .then((res) => res.json())
      .then((res) => {
        setBarang(res.data);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus data ini?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/barang/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Data berhasil dihapus");
        setBarang(barang.filter((item) => item.id !== id));
      })
      .catch(() => alert("Gagal hapus data"));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin mau logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const filteredBarang = barang.filter((item) =>
    item.nama_barang.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔥 NAVBAR (SELARAS LOGIN) */}
      <div className="bg-[#0f172a] text-white px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">📦 Alam Jaya Tekstil</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          Logout
        </button>
      </div>

      {/* 🔥 HEADER */}
      <div className="bg-white px-8 py-6 border-b">
        <div className="flex justify-between items-center flex-wrap gap-4">
          {/* 🔥 BUTTON SESUAI LOGIN */}
          <button
            onClick={() => (window.location.href = "/tambah")}
            className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            + Tambah Barang
          </button>

          <input
            type="text"
            placeholder="Cari barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-6">
          {filteredBarang.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.nama_barang}
              </h2>

              <p className="text-sm text-gray-500">Kode: {item.kode_barang}</p>

              <p className="text-sm text-gray-500 mb-4">
                Jumlah: {item.jumlah}
              </p>

              <div className="flex gap-2 flex-wrap">
                <Link to={`/qr/${item.id}`}>
                  <button className="bg-indigo-500 text-white px-3 py-1 rounded text-sm">
                    QR
                  </button>
                </Link>

                <Link to={`/edit/${item.id}`}>
                  <button className="bg-yellow-400 px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBarang.length === 0 && (
          <p className="text-center mt-10 text-gray-400">
            Data tidak ditemukan
          </p>
        )}
      </div>
    </div>
  );
}
