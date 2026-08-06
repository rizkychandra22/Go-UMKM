# 🛒 Tokoku

**Tokoku** adalah platform _marketplace_ inovatif yang dirancang khusus untuk memajukan Usaha Mikro Kecil Menengah (UMKM) lokal. Dibangun dengan antarmuka yang modern, responsif, dan elegan, aplikasi ini memudahkan pelanggan untuk menemukan produk-produk UMKM berkualitas, mulai dari kuliner lokal hingga kerajinan dan fesyen.

---

## ✨ Fitur Utama

- **Antarmuka Modern & Minimalis:** Desain UI/UX kelas atas yang dibangun menggunakan komponen **shadcn/ui** dan **Tailwind CSS**.
- **Katalog & Filter Dinamis:** Pencarian produk yang cepat beserta penyaringan (_filtering_) berdasarkan kategori dan label (Terlaris, Populer, Mewah, Spesial).
- **Desain Responsif:** Tampilan yang optimal di perangkat seluler (_mobile-friendly_) maupun _desktop_.
- **Integrasi Cloudinary:** Penyimpanan dan optimasi gambar yang efisien di _cloud_.
- **Performa Tinggi:** Aplikasi _Single Page Application_ (SPA) dengan bantuan Inertia.js untuk perpindahan halaman seketika tanpa _reload_.

---

## 💻 Teknologi & Library

Proyek ini memanfaatkan perpaduan teknologi mutakhir (_modern stack_) pada sisi _frontend_ dan _backend_:

### 🌐 Frontend

- **[React](https://react.dev/) (v19):** Library JavaScript utama untuk membangun antarmuka pengguna yang interaktif.
- **[Inertia.js](https://inertiajs.com/):** Penghubung antara backend Laravel dan frontend React yang memungkinkan kita membangun _Single Page Application_ murni menggunakan metode perutean server-side tradisional.
- **[Tailwind CSS](https://tailwindcss.com/) (v4):** _Utility-first_ CSS framework untuk desain dan _styling_ yang cepat, konsisten, dan sangat dapat disesuaikan.
- **[shadcn/ui](https://ui.shadcn.com/):** Koleksi komponen UI yang indah, _accessible_, dan siap pakai (dibangun di atas Radix UI).
- **Library Pendukung Ekosistem React:**
  - `lucide-react`: Untuk koleksi ikon bervektor yang konsisten dan menarik.
  - `embla-carousel-react`: Untuk fitur _slider_ (seperti pada _Hero Banner_ halaman utama).
  - `sonner`: Untuk notifikasi (_toast_) interaktif.
  - `@tanstack/react-table` & `@tanstack/react-query`: Pengelolaan data dan tabel tingkat lanjut yang sangat efisien.
  - `recharts`: Visualisasi grafik dan data (_charts_).
  - `ziggy-js`: Menjembatani fungsi `route()` Laravel secara mulus di komponen JavaScript/React.

### ⚙️ Backend

- **[Laravel](https://laravel.com/) (v11):** Framework PHP (versi >= 8.2) yang tangguh dan elegan sebagai mesin utama (kerangka) _backend_, memproses _logic_, autentikasi, dan rute (_routing_).
- **Cloudinary (`cloudinary-laravel`):** Terintegrasi untuk sistem manajemen dan distribusi aset media (gambar) agar proses muat aplikasi tetap cepat.

---

## 🚀 Panduan Instalasi (Development)

Ikuti panduan ringkas berikut untuk menyiapkan dan menjalankan proyek ini di mesin lokal Anda.

### Persyaratan Sistem

- PHP >= 8.2
- Composer
- Node.js & npm (atau yarn/pnpm)

### Langkah-langkah Menjalankan Proyek

1. **Clone Repositori (Jika menggunakan Git)**

   ```bash
   git clone <url-repo-anda>
   cd Tokoku
   ```

2. **Instalasi Dependensi Backend (PHP)**

   ```bash
   composer install
   ```

3. **Konfigurasi Environment**
   Salin file `.env.example` menjadi `.env`, lalu buat _application key_ yang baru:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   _Penting: Pastikan untuk menyesuaikan pengaturan database (seperti DB_DATABASE, DB_USERNAME, dll) serta mengisi kredensial Cloudinary (jika ada) di file `.env`._

4. **Siapkan Database (Migrasi & Seeding)**
   Jalankan perintah ini untuk membuat struktur tabel di _database_:

   ```bash
   php artisan migrate
   ```

5. **Instalasi Dependensi Frontend (Node)**

   ```bash
   npm install
   ```

6. **Jalankan Aplikasi**
   Jalankan server pengembangan Laravel secara paralel bersama server Vite (untuk _hot-module-replacement_ Frontend):
   ```bash
   npm run dev
   ```
   _Aplikasi kini dapat Anda akses dan kembangkan melalui browser di alamat `http://localhost:8000` atau URL yang diberikan di terminal Anda._

---

## 🎨 Menyesuaikan Desain & Tema

Karena proyek ini mengadopsi standar Tailwind CSS (v4) beserta _CSS Variables_ dari shadcn/ui, Anda dapat dengan leluasa menyesuaikan nuansa warna primer, ukuran radius komponen, hingga pengaturan mode gelap (_dark mode_) pada direktori CSS utamanya (di dalam `resources/js/index.css` atau `resources/css/app.css`).

---

## 📄 Lisensi

Sistem dasar kerangka (Laravel) bersifat terbuka (_open-source_) di bawah [MIT license](https://opensource.org/licenses/MIT).
