import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRBarang from "./pages/QRBarang";
import ListBarang from "./pages/ListBarang";
import TambahBarang from "./pages/TambahBarang";
import EditBarang from "./pages/EditBarang";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ListBarang />} />
        <Route path="/qr/:id" element={<QRBarang />} />
        <Route path="/tambah" element={<TambahBarang />} />
        <Route path="/edit/:id" element={<EditBarang />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
