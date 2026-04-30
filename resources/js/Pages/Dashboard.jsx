import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    ArrowRight,
    BadgePercent,
    BellRing,
    House,
    LogOut,
    ShoppingBasket,
    Sparkles,
} from 'lucide-react';
import StorefrontLayout from '../Layouts/StorefrontLayout';

export default function Dashboard() {
    const products = [
        {
            name: 'Kue Kering Premium',
            description: 'Tekstur renyah, cocok untuk hampers dan sajian tamu.',
            badge: 'Terlaris',
        },
        {
            name: 'Parfum Lokal Artisan',
            description: 'Aroma unik dengan ketahanan tinggi.',
            badge: 'Baru',
        },
        {
            name: 'Keranjang Rotan Mini',
            description: 'Multifungsi untuk dekor dan penyimpanan.',
            badge: 'Rekomendasi',
        },
    ];

    return (
        <>
            <Head title="UMKM-Go | Dashboard" />

            <StorefrontLayout
                pageTitle="Home Dashboard"
                navItems={[
                    { label: 'Home', href: route('home'), type: 'link', variant: 'home', icon: House },
                    { label: 'Dashboard', href: route('dashboard'), type: 'link' },
                    { label: 'Produk', href: '#produk', type: 'anchor' },
                    { label: 'Keranjang', href: '#keranjang', type: 'anchor' },
                    { label: 'Promo', href: '#promo', type: 'anchor' },
                    { label: 'Keluar', href: route('home'), type: 'link', badge: true, icon: LogOut },
                ]}
            >
                <section className="glass-panel fade-in-up overflow-hidden p-6 sm:p-8">
                    <div className="grid items-center gap-4 md:grid-cols-[1.4fr_0.6fr]">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                                <Sparkles className="size-4" />
                                Halaman utama pelanggan
                            </p>
                            <h2 className="mt-3 flex items-center gap-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                                <Sparkles className="size-8 text-teal-600 sm:size-10" />
                                Selamat datang di pusat belanja UMKM favorit kamu
                            </h2>
                            <p className="mt-3 text-base leading-7 text-slate-600">
                                Kelola belanja, pantau promo, dan jelajahi produk UMKM dari satu halaman yang cepat dan rapi.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-orange-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Notifikasi</p>
                            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <BellRing className="size-4 text-orange-500" />
                                3 promo baru untukmu hari ini
                            </p>
                        </div>
                    </div>
                </section>

                <section id="produk" className="glass-panel fade-in-up p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Rekomendasi Untuk Kamu</h3>
                    <p className="mt-2 text-slate-600">Disusun berdasarkan produk terlaris dan tren lokal.</p>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                        {products.map((product) => (
                            <article key={product.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                                    <Sparkles className="size-3.5 text-orange-500" />
                                    {product.badge}
                                </p>
                                <h4 className="mt-3 text-lg font-extrabold text-slate-900">{product.name}</h4>
                                <p className="mt-1 text-sm leading-6 text-slate-600">{product.description}</p>
                                <a
                                    href="#"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800"
                                >
                                    <ShoppingBasket className="size-4" />
                                    Tambah ke Keranjang
                                </a>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="keranjang" className="glass-panel fade-in-up p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Keranjang</h3>
                    <p className="mt-2 text-slate-600">Ringkasan item yang sudah kamu pilih sebelum checkout.</p>
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-medium text-slate-600">Keranjang kamu masih kosong. Tambahkan produk dari bagian Produk.</p>
                    </div>
                </section>

                <section id="promo" className="glass-panel fade-in-up-delay p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                        <div>
                            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-700">
                                <BadgePercent className="size-4" />
                                Promo Jumat Lokal
                            </p>
                            <p className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                                Diskon hingga 30% untuk kategori kuliner dan fashion.
                            </p>
                            <p className="text-sm text-slate-600">Berlaku sampai pukul 23.59 WIB.</p>
                        </div>

                        <Link
                            href="#"
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                        >
                            Klaim Promo
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </section>
            </StorefrontLayout>
        </>
    );
}
