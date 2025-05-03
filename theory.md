# Soal Teori: Konsep Laravel Lumen, Vue.js, dan MySQL

## 1. Laravel Lumen 🚀

### Perbedaan utama antara Laravel dan Laravel Lumen

- **Laravel** 🖥️: Framework PHP full-stack dengan fitur lengkap seperti blade templating, session, queue, dan built-in authentication. Cocok untuk aplikasi web besar yang membutuhkan banyak fitur kompleks.
- **Laravel Lumen** 💡: Versi ringan dari Laravel, dirancang untuk microservice atau API dengan performa tinggi. Lumen hanya memuat komponen yang dibutuhkan, membuatnya lebih cepat dan efisien untuk aplikasi yang lebih ringan.

### Konsep Middleware di Laravel Lumen dan Contohnya

- **Middleware** 🛡️ berfungsi sebagai perantara sebelum request diproses oleh controller.
  - **Contoh**: Pada layanan API, setiap permintaan ke endpoint privat harus menyertakan token autentikasi di header. Middleware digunakan untuk memeriksa token tersebut. Jika valid, permintaan diteruskan ke controller, jika tidak, middleware akan menghentikan dan mengembalikan respons "unauthorized".

### Apa itu Dependency Injection, dan bagaimana Laravel Lumen memanfaatkannya?

- **Dependency Injection (DI)** 💉 adalah teknik untuk menyisipkan objek ke dalam class dari luar, bukan membuat objek tersebut secara langsung.
- **Lumen** memanfaatkan DI untuk menyederhanakan pemanggilan service atau class lain, membuat kode lebih fleksibel dan mudah diuji.

## 2. Vue.js 🌐

### Jelaskan apa itu Reactive Data Binding dan bagaimana ini membantu dalam pengembangan front-end?

- **Reactive Data Binding** 🔄 adalah fitur di Vue.js yang memungkinkan tampilan (UI) secara otomatis diperbarui ketika data berubah.
- Hal ini memudahkan developer dalam membangun antarmuka dinamis tanpa mengelola DOM secara manual, sehingga pengembangan menjadi lebih cepat dan efisien.

### Sebutkan dan jelaskan perbedaan utama antara Computed Properties dan Methods di Vue.js

- **Computed Properties** 🧮: Fungsi yang bergantung pada data dan hasilnya akan di-cache. Fungsi ini hanya dihitung ulang jika data yang digunakan berubah.
- **Methods** 🔧: Selalu dijalankan ulang setiap kali dipanggil, meskipun data yang digunakan tidak berubah.
- **Perbedaan utama**: Computed lebih efisien untuk data turunan yang sering digunakan di template, sedangkan methods digunakan untuk logika yang perlu dijalankan setiap kali dipanggil.

### Apa keuntungan menggunakan Vuex dalam aplikasi Vue.js?

- **Vuex** 🗃️ menyediakan tempat penyimpanan data secara global yang dapat diakses oleh banyak komponen.
- Keuntungannya meliputi:
  - Memudahkan pengelolaan state di aplikasi berskala besar.
  - Membuat data lebih konsisten.
  - Mempermudah komunikasi antar komponen.

## 3. MySQL 🛠️

### Jelaskan apa itu Indexing di MySQL, dan bagaimana ini mempengaruhi performa query?

- **Indexing** 🔍 adalah teknik untuk mempercepat pencarian data dalam tabel dengan membuat struktur khusus yang memungkinkan pencarian data tanpa memindai seluruh tabel.
- Dengan index, query menjadi lebih cepat, terutama pada kolom yang sering digunakan dalam kondisi pencarian (WHERE). Namun, index juga menambah beban saat insert atau update karena struktur index perlu diperbarui.

### Apa perbedaan antara INNER JOIN dan LEFT JOIN? Berikan contoh kasus penggunaan keduanya.

- **INNER JOIN** 🔗: Mengambil data yang memiliki kecocokan di kedua tabel.
  - **Contoh**: Jika ada tabel produk dan order_items, INNER JOIN hanya akan menampilkan produk yang pernah dipesan.
- **LEFT JOIN** ⬅️: Mengambil semua data dari tabel kiri, lalu mencocokkannya dengan data di tabel kanan.
  - Jika tidak ada kecocokan, data dari tabel kanan akan diisi dengan NULL. Ini berguna untuk menampilkan semua produk, termasuk yang belum dipesan.

### Apa tujuan dari normalisasi database? Sebutkan salah satu kelemahannya.

- **Tujuan normalisasi** 📊 adalah untuk mengurangi duplikasi data, meningkatkan konsistensi, dan mempermudah pemeliharaan struktur database dengan memecah data ke dalam tabel yang saling berelasi.
- Salah satu kelemahannya adalah query menjadi lebih kompleks karena membutuhkan banyak join antar tabel, yang dapat mempengaruhi performa jika tidak ditangani dengan baik.
