import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QRBarang() {
  const { id } = useParams();
  const navigate = useNavigate(); // 🔥 tambah ini
  const [data, setData] = useState(null);
  const [qr, setQr] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/barang/qr/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setQr(res.qr);
      });
  }, [id]);

  // 🔥 function kembali
  const handleBack = () => {
    navigate("/"); // balik ke dashboard
  };

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-[350px] text-center">
        {/* 🔥 BUTTON KEMBALI */}
        <button
          onClick={handleBack}
          className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Kembali
        </button>

        <h1 className="text-xl font-bold mb-4">QR Barang</h1>

        <img src={qr} alt="QR Code" className="mx-auto mb-4" />

        <div className="text-left space-y-2">
          <p>
            <b>Nama:</b> {data.nama_barang}
          </p>
          <p>
            <b>Kode:</b> {data.kode_barang}
          </p>
          <p>
            <b>Jumlah:</b> {data.jumlah}
          </p>
        </div>
      </div>
    </div>
  );
}
