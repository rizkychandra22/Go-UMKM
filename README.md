# 🛒 Tokoku

**Tokoku** adalah platform *marketplace* inovatif yang dirancang khusus untuk memajukan Usaha Mikro Kecil Menengah (UMKM) lokal. Dibangun dengan antarmuka yang modern, responsif, dan elegan, aplikasi ini memudahkan pelanggan untuk menemukan produk-produk UMKM berkualitas, mulai dari kuliner lokal hingga kerajinan dan fesyen.

---

## ✨ Fitur Utama

- **Antarmuka Modern & Minimalis:** Desain UI/UX kelas atas yang dibangun menggunakan komponen **shadcn/ui** dan **Tailwind CSS**.
- **Katalog & Filter Dinamis:** Pencarian produk yang cepat beserta penyaringan (*filtering*) berdasarkan kategori dan label (Terlaris, Populer, Mewah, Spesial).
- **Desain Responsif:** Tampilan yang optimal di perangkat seluler (*mobile-friendly*) maupun *desktop*.
- **Integrasi Cloudinary:** Penyimpanan dan optimasi gambar yang efisien di *cloud*.
- **Performa Tinggi:** Aplikasi *Single Page Application* (SPA) dengan bantuan Inertia.js untuk perpindahan halaman seketika tanpa *reload*.

---

## 💻 Teknologi & Library

Proyek ini memanfaatkan perpaduan teknologi mutakhir (*modern stack*) pada sisi *frontend* dan *backend*:

### 🌐 Frontend
- **[React](https://react.dev/) (v19):** Library JavaScript utama untuk membangun antarmuka pengguna yang interaktif.
- **[Inertia.js](https://inertiajs.com/):** Penghubung antara backend Laravel dan frontend React yang memungkinkan kita membangun *Single Page Application* murni menggunakan metode perutean server-side tradisional.
- **[Tailwind CSS](https://tailwindcss.com/) (v4):** *Utility-first* CSS framework untuk desain dan *styling* yang cepat, konsisten, dan sangat dapat disesuaikan.
- **[shadcn/ui](https://ui.shadcn.com/):** Koleksi komponen UI yang indah, *accessible*, dan siap pakai (dibangun di atas Radix UI).
- **Library Pendukung Ekosistem React:**
  - `lucide-react`: Untuk koleksi ikon bervektor yang konsisten dan menarik.
  - `embla-carousel-react`: Untuk fitur *slider* (seperti pada *Hero Banner* halaman utama).
  - `sonner`: Untuk notifikasi (*toast*) interaktif.
  - `@tanstack/react-table` & `@tanstack/react-query`: Pengelolaan data dan tabel tingkat lanjut yang sangat efisien.
  - `recharts`: Visualisasi grafik dan data (*charts*).
  - `ziggy-js`: Menjembatani fungsi `route()` Laravel secara mulus di komponen JavaScript/React.

### ⚙️ Backend
- **[Laravel](https://laravel.com/) (v11):** Framework PHP (versi >= 8.2) yang tangguh dan elegan sebagai mesin utama (kerangka) *backend*, memproses *logic*, autentikasi, dan rute (*routing*).
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
   Salin file `.env.example` menjadi `.env`, lalu buat *application key* yang baru:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Penting: Pastikan untuk menyesuaikan pengaturan database (seperti DB_DATABASE, DB_USERNAME, dll) serta mengisi kredensial Cloudinary (jika ada) di file `.env`.*

4. **Siapkan Database (Migrasi & Seeding)**
   Jalankan perintah ini untuk membuat struktur tabel di *database*:
   ```bash
   php artisan migrate
   ```

5. **Instalasi Dependensi Frontend (Node)**
   ```bash
   npm install
   ```

6. **Jalankan Aplikasi**
   Jalankan server pengembangan Laravel secara paralel bersama server Vite (untuk *hot-module-replacement* Frontend):
   ```bash
   npm run dev
   ```
   *Aplikasi kini dapat Anda akses dan kembangkan melalui browser di alamat `http://localhost:8000` atau URL yang diberikan di terminal Anda.*

---

## 🎨 Menyesuaikan Desain & Tema
Karena proyek ini mengadopsi standar Tailwind CSS (v4) beserta *CSS Variables* dari shadcn/ui, Anda dapat dengan leluasa menyesuaikan nuansa warna primer, ukuran radius komponen, hingga pengaturan mode gelap (*dark mode*) pada direktori CSS utamanya (di dalam `resources/js/index.css` atau `resources/css/app.css`).

---

## 📄 Lisensi
Sistem dasar kerangka (Laravel) bersifat terbuka (*open-source*) di bawah [MIT license](https://opensource.org/licenses/MIT).
