import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListBarang() {
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/barang")
      .then((res) => res.json())
      .then((res) => {
        setBarang(res.data);
      });
  }, []);

  // 🔥 DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus data ini?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/barang/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Data berhasil dihapus");
        setBarang(barang.filter((item) => item.id !== id)); // langsung update UI
      })
      .catch(() => alert("Gagal hapus data"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Barang</h1>

      <button
        onClick={() => (window.location.href = "/tambah")}
        style={{ marginBottom: "10px" }}
      >
        + Tambah Barang
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kode</th>
            <th>Jumlah</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {barang.map((item) => (
            <tr key={item.id}>
              <td>{item.nama_barang}</td>
              <td>{item.kode_barang}</td>
              <td>{item.jumlah}</td>
              <td>
                {/* QR */}
                <Link to={`/qr/${item.id}`}>
                  <button>Lihat QR</button>
                </Link>

                {/* EDIT */}
                <Link to={`/edit/${item.id}`}>
                  <button style={{ marginLeft: "5px" }}>Edit</button>
                </Link>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginLeft: "5px", color: "red" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
