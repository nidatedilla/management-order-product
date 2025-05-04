# 📦 Aplikasi Manajemen Produk & Order

Ini adalah aplikasi sederhana untuk mengelola **produk dan order**, terdiri dari:

- Backend: Laravel Lumen (API)
- Frontend: Vue.js (antarmuka pengguna)
- Database: MySQL

---

## 🛠️ Langkah-Langkah Menjalankan Proyek

### Clone Repository dari GitHub

Buka terminal / Git Bash dan ketik:

**git clone https://github.com/nidatedilla/management-order-product.git**

**cd management-order-product**

### ⚙️ Menjalankan Backend (Laravel Lumen)

1. Masuk ke folder backend

   **cd backend**

2. Install Composer

   _Jika kamu belum punya Composer, download dulu dari https://getcomposer.org/download/._

   Lalu install dependensi project:

   **composer install**

3. Salin dan edit file .env

   **cp .env.example .env**

   Lalu buka file .env dan sesuaikan database MySQL kamu, contoh:

  <pre>  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=order_management
  DB_USERNAME=root
  DB_PASSWORD= </pre>

   _Pastikan isi DB_DATABASE sesuai dengan nama database yang sudah dibuat._

4. Jalankan migrasi (buat tabel)

   **php artisan migrate**

5. Jalankan server backend

   **php -S localhost:8000 -t public**

### 💻 Menjalankan Frontend (Vue.js)

1. Buka folder frontend

   **cd frontend**

2. Install Node.js & NPM

   _Jika belum, download dan install dari https://nodejs.org/._

   Lalu jalankan:

   **npm install**

3. Jalankan server frontend

   **npm run dev**

### 🔎 Cek Aplikasi

Buka browser ke http://localhost:5173.

Coba tambah produk, buat order, dan lihat daftar data.

### 📌 Catatan Tambahan

Kamu bisa pakai tools seperti XAMPP, Laragon, atau MAMP untuk menjalankan MySQL.

Jika terjadi error saat php artisan migrate, pastikan MySQL berjalan dan nama database sudah dibuat.
