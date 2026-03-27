import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditBarang() {
  const { id } = useParams();

  const [form, setForm] = useState({
    nama_barang: "",
    kode_barang: "",
    jumlah: "",
  });

  // ambil data lama
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Barang</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nama_barang"
          value={form.nama_barang}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="kode_barang"
          value={form.kode_barang}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="number"
          name="jumlah"
          value={form.jumlah}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
