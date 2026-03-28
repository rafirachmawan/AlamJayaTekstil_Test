import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QRBarang() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate("/");
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

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
      <div className="flex items-center justify-center p-10">
        <div className="bg-white rounded-2xl shadow-md p-8 w-[400px] text-center">
          {/* BACK BUTTON */}
          <button
            onClick={handleBack}
            className="mb-6 text-sm text-gray-500 hover:text-black"
          >
            ← Kembali
          </button>

          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            QR Code Barang
          </h1>

          {/* QR */}
          <div className="flex justify-center mb-6">
            <img
              src={qr}
              alt="QR Code"
              className="w-[220px] border p-2 rounded-lg"
            />
          </div>

          {/* DETAIL */}
          <div className="text-left space-y-3 border-t pt-4">
            <p className="text-gray-700">
              <span className="font-medium">Nama:</span> {data.nama_barang}
            </p>

            <p className="text-gray-700">
              <span className="font-medium">Kode:</span> {data.kode_barang}
            </p>

            <p className="text-gray-700">
              <span className="font-medium">Jumlah:</span> {data.jumlah}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
