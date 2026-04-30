import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import StorefrontLayout from '../Layouts/StorefrontLayout';
import {
    ArrowRight,
    Gift,
    HandPlatter,
    House,
    LogIn,
    Shirt,
    ShoppingBasket,
    Sparkles,
    Star,
    Store,
    Truck,
} from 'lucide-react';

export default function Home() {
    const categories = [
        {
            title: 'Kuliner Lokal',
            description: 'Camilan, frozen food, dan minuman artisan.',
            icon: HandPlatter,
            tone: 'from-orange-100 to-white',
        },
        {
            title: 'Fashion UMKM',
            description: 'Batik kontemporer, tas handmade, aksesori.',
            icon: Shirt,
            tone: 'from-teal-100 to-white',
        },
        {
            title: 'Rumah & Dekor',
            description: 'Kerajinan kayu, rotan, dan dekor estetik.',
            icon: House,
            tone: 'from-sky-100 to-white',
        },
        {
            title: 'Hadiah & Hampers',
            description: 'Paket custom untuk momen spesial dan korporat.',
            icon: Gift,
            tone: 'from-rose-100 to-white',
        },
    ];

    const stores = [
        { name: 'Dapur Lestari', description: 'Olahan sambal tradisional tanpa pengawet.' },
        { name: 'Rupa Tenun Nusantara', description: 'Produk tenun modern untuk daily wear.' },
        { name: 'Kayu Karya Studio', description: 'Peralatan dapur kayu handmade tahan lama.' },
    ];

    return (
        <>
            <Head title="UMKM-Go | Home" />

            <StorefrontLayout
                pageTitle="Marketplace Lokal"
                navItems={[
                    { label: 'Home', href: route('home'), type: 'link', variant: 'home', icon: House },
                    { label: 'Kategori', href: '#kategori', type: 'anchor' },
                    { label: 'Produk', href: '#produk', type: 'anchor' },
                    { label: 'Mitra', href: '#mitra', type: 'anchor' },
                    { label: 'Masuk', href: route('dashboard'), type: 'link', badge: true, icon: LogIn },
                ]}
            >
                <section className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
                    <article className="glass-panel fade-in-up p-6 sm:p-8">
                        <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                            <Sparkles className="size-4" />
                            Marketplace produk lokal
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                            Belanja UMKM dengan rasa pasar tradisional, pengalaman digital modern
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Temukan makanan, fashion, kerajinan, dan produk unik langsung dari pelaku UMKM Indonesia.
                            Satu keranjang, banyak cerita lokal.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                Mulai Belanja
                                <ArrowRight className="size-4" />
                            </Link>
                            <a
                                href="#produk"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-200 hover:text-teal-800"
                            >
                                Lihat Unggulan
                                <Star className="size-4" />
                            </a>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {[
                                { value: '1.250+', label: 'UMKM aktif' },
                                { value: '14k', label: 'produk tersedia' },
                                { value: '98%', label: 'ulasan positif' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-teal-100 bg-teal-50/60 p-3"
                                >
                                    <p className="text-lg font-extrabold text-slate-900">{stat.value}</p>
                                    <p className="text-sm text-slate-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="glass-panel fade-in-up-delay p-6 sm:p-8">
                        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Produk Hari Ini</p>
                        <ul className="mt-4 space-y-3">
                            {[
                                { name: 'Kopi Gayo Premium', price: 'Rp62.000' },
                                { name: 'Keripik Pisang Balado', price: 'Rp25.000' },
                                { name: 'Tas Rotan Handmade', price: 'Rp189.000' },
                            ].map((item) => (
                                <li
                                    key={item.name}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                                >
                                    <span className="text-sm font-semibold text-slate-600">{item.name}</span>
                                    <strong className="text-sm font-extrabold text-slate-900">{item.price}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-800">
                            <Truck className="size-4" />
                            Gratis ongkir transaksi pertama di atas Rp150.000
                        </p>
                    </article>
                </section>

                <section id="kategori" className="glass-panel fade-in-up p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900">Kategori Favorit</h3>
                            <p className="mt-2 text-slate-600">Pilih sesuai kebutuhan: kuliner harian sampai hampers premium.</p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article
                                    key={item.title}
                                    className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${item.tone} p-4 transition hover:-translate-y-1`}
                                >
                                    <div className="inline-flex rounded-xl bg-slate-900 p-2 text-white">
                                        <Icon className="size-4" />
                                    </div>
                                    <h4 className="mt-3 text-base font-extrabold text-slate-900">{item.title}</h4>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section id="produk" className="glass-panel fade-in-up p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">UMKM Unggulan Minggu Ini</h3>
                    <p className="mt-2 text-slate-600">Kurasi produk dengan kualitas konsisten dan pengiriman cepat.</p>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                        {stores.map((store) => (
                            <article key={store.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                                    <Store className="size-3.5" />
                                    Top Seller
                                </p>
                                <h4 className="mt-3 text-lg font-extrabold text-slate-900">{store.name}</h4>
                                <p className="mt-1 text-sm leading-6 text-slate-600">{store.description}</p>
                                <Link
                                    href={route('dashboard')}
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800"
                                >
                                    Tambah ke Keranjang
                                    <ShoppingBasket className="size-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="mitra" className="glass-panel fade-in-up-delay p-6 text-center sm:p-8">
                    <p className="mx-auto max-w-3xl text-xl font-extrabold leading-relaxed text-slate-900 sm:text-2xl">
                        "Sejak gabung UMKM-Go, toko saya dapat pelanggan dari luar kota dan repeat order naik 3x dalam 2 bulan."
                    </p>
                    <p className="mt-3 font-medium text-slate-600">Rani - Pemilik Rani Snackbox, Bandung</p>
                </section>
            </StorefrontLayout>
        </>
    );
}
