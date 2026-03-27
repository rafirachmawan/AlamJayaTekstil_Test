import { useState } from "react";

export default function TambahBarang() {
  const [form, setForm] = useState({
    nama_barang: "",
    kode_barang: "",
    jumlah: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/barang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert("Data berhasil ditambahkan!");
        window.location.href = "/";
      })
      .catch(() => alert("Error"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tambah Barang</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nama_barang"
          placeholder="Nama Barang"
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="kode_barang"
          placeholder="Kode Barang"
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah"
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
