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
Run Xampp controller ( Apache, Mysql )
```

## 📦 Install dependency (jika ada)

```bash
composer install
npm install
ngrok installer
```

## ▶️ Jalankan Web

```Server ( Backend )
cd ci-barang
php spark serve --host 0.0.0.0 --port 8080
```
```Local Web
cd frontend-barang
npm run dev
```
## 🌐 Akses di browser

```bash
http://localhost:5173/
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
https://xxxx.ngrok-free.dev ( masukan di cd mobile-barang/src/config/api.ts )
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
## Run di mobile / emulator 
``Emulator``
``cd mobile-barang npx expo start –tunnel --> s--> a ``

``Mobile``
``cd mobile-barang npx expo start –tunnel --> s--> scan barcode yang muncul ( diwajibkan mempunyai aplikasi expo go )

# 💻 3. SETUP WEB (CodeIgniter)

## Fitur:

- Login
- List barang
- CRUD barang
- Generate QR Code


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
npx expo start –tunnel
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
