import { Link } from '@inertiajs/react';
import { ArrowRight, Star, Store } from 'lucide-react';

export default function HeroSection({ type = 'home' }) {
    const stats = [
        { value: '2.500+', label: 'Mitra Usaha' },
        { value: '18k', label: 'Produk Mitra' },
        { value: '4.8/5', label: 'Rating' },
    ];

    return (
        <article className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-teal-400 flex flex-col justify-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 w-fit">
                <Store className="size-4" />
                Marketplace produk lokal
            </p>

            {/* --- KONTEN DINAMIS BERDASARKAN TYPE --- */}
            {type === 'home' || type === 'login' ? (
                // Tampilan Home & Login
                <>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                        Belanja UMKM dengan rasa pasar tradisional, pengalaman digital modern
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        Temukan makanan, fashion, kerajinan, dan produk unik langsung dari pelaku UMKM Indonesia.
                        Satu keranjang, banyak cerita lokal.
                    </p>

                    {type === 'home' && (
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={route('dashboardCustomer')}
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                Mulai Belanja
                                <ArrowRight className="size-4" />
                            </Link>
                            <a
                                href={route('dashboardCustomer')}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700"
                            >
                                Best Seller
                                <Star className="size-4" />
                            </a>
                        </div>
                    )}
                </>
            ) : (
                // Tampilan untuk Registrasi
                <>
                    <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                        Saatnya Produk Lokal Kamu Go Digital
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                        Buka toko online gratis, kelola pesanan dengan mudah, jangkau lebih banyak pelanggan di seluruh Indonesia, dan nikmati berbagai keuntungan.
                    </p>

                    <div className="mt-6 space-y-4">
                        {[
                            { title: 'Pendaftaran Gratis', desc: 'Tanpa biaya admin bulanan.' },
                            { title: 'Kelola Stok Mudah', desc: 'Pantau produk hanya dari satu dashboard.' },
                            { title: 'Dukungan UMKM', desc: 'Promosi khusus untuk produk-produk unggulan.' },
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 group">
                                <div className="mt-1 grid size-5 place-content-center rounded-full bg-teal-600 text-white group-hover:scale-110 transition-transform">
                                    <ArrowRight className="size-3" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">{feature.title}</h4>
                                    <p className="text-xs text-slate-500">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* --- STATISTIK (SAMA DI KEDUA TIPE) --- */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-teal-100 bg-teal-50/60 p-3 hover:bg-teal-50 transition-colors">
                        <p className="text-lg font-black text-slate-900">{stat.value}</p>
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">{stat.label}</p>
                    </div>
                ))}
            </div>
        </article>
    );
}