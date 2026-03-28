import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBarang() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_barang: "",
    kode_barang: "",
    jumlah: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/barang")
      .then((res) => res.json())
      .then((data) => {
        const barang = data.data.find((b) => b.id == id);
        if (barang) setForm(barang);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/barang/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert("Data berhasil diupdate!");
        window.location.href = "/";
      })
      .catch(() => alert("Error update"));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔥 NAVBAR */}
      <div className="bg-[#0f172a] text-white px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">📦 Alam Jaya Tekstil</h1>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-1.5 rounded-md text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          Dashboard
        </button>
      </div>

      {/* 🔥 CONTENT */}
      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
          {/* BACK */}
          <button
            onClick={handleBack}
            className="text-sm text-gray-500 mb-4 hover:text-black"
          >
            ← Kembali
          </button>

          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Edit Barang
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAMA */}
            <input
              type="text"
              name="nama_barang"
              value={form.nama_barang}
              onChange={handleChange}
              placeholder="Nama Barang"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* KODE */}
            <input
              type="text"
              name="kode_barang"
              value={form.kode_barang}
              onChange={handleChange}
              placeholder="Kode Barang"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* JUMLAH */}
            <input
              type="number"
              name="jumlah"
              value={form.jumlah}
              onChange={handleChange}
              placeholder="Jumlah"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              Update Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
