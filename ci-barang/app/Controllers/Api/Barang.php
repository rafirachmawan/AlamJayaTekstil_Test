<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\BarangModel;
use Endroid\QrCode\Builder\Builder;

class Barang extends BaseController
{
    protected $barang;

    public function __construct()
    {
        $this->barang = new BarangModel();
    }

    // GET semua data
    public function index()
    {
        return $this->response->setJSON([
            'status' => 'success',
            'data' => $this->barang->findAll()
        ]);
    }

    // POST tambah data
    public function create()
    {
        $data = $this->request->getJSON(true);

        $this->barang->insert($data);

        return $this->response->setJSON([
            'status' => 'created'
        ]);
    }

    // PUT update
    public function update($id)
    {
        $data = $this->request->getJSON(true);

        $this->barang->update($id, $data);

        return $this->response->setJSON([
            'status' => 'updated'
        ]);
    }

    // DELETE
    public function delete($id)
    {
        $this->barang->delete($id);

        return $this->response->setJSON([
            'status' => 'deleted'
        ]);
    }

public function qr($id)
{
    $barang = $this->barang->find($id);

    if (!$barang) {
        return $this->response->setJSON([
            'status' => 'not found'
        ]);
    }

    $data =
        "Nama: " . $barang['nama_barang'] . "\n" .
        "Kode: " . $barang['kode_barang'] . "\n" .
        "Jumlah: " . $barang['jumlah'];

    $url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($data);

    return $this->response->setJSON([
        'status' => 'success',
        'qr' => $url,
        'data' => $barang
    ]);
}
}