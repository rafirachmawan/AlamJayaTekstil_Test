import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRBarang from "./pages/QRBarang";
import ListBarang from "./pages/ListBarang";
import TambahBarang from "./pages/TambahBarang";
import EditBarang from "./pages/EditBarang";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListBarang />} />
        <Route path="/qr/:id" element={<QRBarang />} />
        <Route path="/tambah" element={<TambahBarang />} />
        <Route path="/edit/:id" element={<EditBarang />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
