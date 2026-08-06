import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { ArrowRight, Star, Store } from 'lucide-react';
import { Button } from '@/Components/UI/button';

export default function HeroSection({ type = 'home' }) {
  const stats = [
    { value: '2.500+', label: 'Mitra Usaha' },
    { value: '18k', label: 'Produk Mitra' },
    { value: '4.8/5', label: 'Rating' },
  ];

  return (
    // PERBAIKAN: Padding di HP dikurangi dari p-6 menjadi p-4
    <article className="glass-panel fade-in-up p-4 sm:p-8 border-t-4 border-t-teal-400 flex flex-col justify-center">
      <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-800 w-fit dark:bg-teal-950/60 dark:text-teal-300">
        <Store className="size-3.5 sm:size-4" />
        Marketplace produk lokal
      </p>

      {/* --- KONTEN DINAMIS BERDASARKAN TYPE --- */}
      {type === 'home' || type === 'login' ? (
        <>
          {/* PERBAIKAN: Font judul di HP dikecilkan ke text-xl, margin disesuaikan */}
          <h2 className="mt-2 text-xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Belanja UMKM dengan rasa pasar tradisional, pengalaman digital
            modern
          </h2>
          {/* PERBAIKAN: Deskripsi di HP dikecilkan ke text-xs agar hemat baris */}
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base lg:text-lg">
            Temukan makanan, fashion, kerajinan, dan produk unik langsung dari
            pelaku UMKM Indonesia. Satu keranjang, banyak cerita lokal.
          </p>

          {type === 'home' && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                asChild
                variant="default"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href={route('product')}>
                  Mulai Belanja
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href={route('populer')}>
                  Best Seller
                  <Star className="size-4" />
                </Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Tampilan untuk Registrasi */}
          <h2 className="mt-2 text-xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Saatnya Produk Lokal Kamu Go Digital
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base lg:text-lg">
            Buka toko online gratis, kelola pesanan dengan mudah, jangkau lebih
            banyak pelanggan di seluruh Indonesia.
          </p>

          {/* PERBAIKAN: List fitur dibuat lebih rapat marginnya di HP */}
          <div className="mt-4 grid gap-2 sm:gap-4">
            {[
              {
                title: 'Pendaftaran Gratis',
                desc: 'Tanpa biaya admin bulanan.',
              },
              {
                title: 'Kelola Stok Mudah',
                desc: 'Pantau produk hanya dari satu dashboard.',
              },
              {
                title: 'Dukungan UMKM',
                desc: 'Promosi khusus untuk produk-produk unggulan.',
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 group">
                <div className="mt-0.5 grid size-4 shrink-0 place-content-center rounded-full bg-teal-600 text-white group-hover:scale-110 transition-transform">
                  <ArrowRight className="size-2.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 sm:text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- STATISTIK (SEKARANG BERJEJER RAPI KE SAMPING DI HP) --- */}
      {/* PERBAIKAN UTAMA: Tambahkan 'grid-cols-3' di awal agar tidak menumpuk ke bawah */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-teal-100 bg-teal-50/60 p-2 sm:p-3 text-center sm:text-left hover:bg-teal-50 transition-colors dark:border-teal-900/70 dark:bg-teal-950/30 dark:hover:bg-teal-950/50"
          >
            {/* Ukuran teks angka disesuaikan agar pas di grid HP */}
            <p className="text-sm sm:text-lg font-black text-slate-900 dark:text-white">
              {stat.value}
            </p>
            {/* Ukuran teks label dikecilkan sedikit di HP */}
            <p className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-tighter leading-none mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
