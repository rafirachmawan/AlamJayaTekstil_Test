"# AlamJayaTekstil_Test"

# 📦 Sistem Manajemen Data Barang

Project ini terdiri dari:

- 🌐 Web App (PHP CodeIgniter)
- 📱 Mobile App (React Native - Expo)

Digunakan untuk mengelola data barang seperti:

- Login user
- CRUD data barang
- Scan QR / Barcode

---

# 🚀 1. SETUP BACKEND (CodeIgniter)

## 📁 Masuk ke folder backend

```bash
cd backend
```

## 📦 Install dependency (jika ada)

```bash
composer install
```

## ▶️ Jalankan server

```bash
php spark serve --host 0.0.0.0 --port 8080
```

## 🌐 Akses di browser

```bash
http://localhost:8080
```

---

# 🌍 2. AKSES DARI MOBILE (NGROK)

Agar mobile bisa akses backend, gunakan ngrok:

## ▶️ Jalankan ngrok

```bash
ngrok http 8080
```

## 🔗 Copy URL

Contoh:

```bash
https://xxxx.ngrok-free.dev
```

## ⚙️ Set di mobile

Edit file:

```bash
src/config/api.ts
```

```ts
export const BASE_URL = "https://xxxx.ngrok-free.dev";
```

---

# 💻 3. SETUP WEB (CodeIgniter)

## Fitur:

- Login
- List barang
- CRUD barang
- Generate QR Code

## Cara akses:

```bash
http://localhost:8080
```

---

# 📱 4. SETUP MOBILE (React Native - Expo)

## 📁 Masuk ke folder mobile

```bash
cd mobile-barang
```

## 📦 Install dependency

```bash
npm install
```

## ▶️ Jalankan project

```bash
npx expo start
```

## 📲 Jalankan di HP

- Install Expo Go
- Scan QR dari terminal

---

# ⚠️ CATATAN PENTING

- Backend HARUS tetap berjalan saat mobile digunakan
- Ngrok HARUS aktif saat testing mobile
- Gunakan HP asli untuk fitur scan (kamera tidak support di web)

---

# 📷 FITUR SCAN

- Scan QR / Barcode menggunakan kamera
- Mengambil kode barang
- Menampilkan data barang dari backend

---

# 📦 FITUR UTAMA

## Web:

- Login
- CRUD Barang
- Generate QR Code

## Mobile:

- Login
- List Barang
- Tambah Barang
- Scan QR / Barcode

---

# 👨‍💻 AUTHOR

Dibuat oleh:
**Rafi Rachmawan**

---

# 🎯 CATATAN

Project ini dibuat sebagai test programmer dan dapat dikembangkan lebih lanjut seperti:

- Edit & Delete di mobile
- Autentikasi token
- Deploy ke server production

---
