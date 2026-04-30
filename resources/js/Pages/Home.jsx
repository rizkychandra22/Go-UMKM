import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../Layouts/LayoutApp';
import {
    ArrowRight,
    Gift,
    Flower2,
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

    // Kategori Produk
    const categories = [
        {
            title: 'Kuliner Lokal',
            description: 'Camilan, frozen food, dan minuman artisan.',
            icon: HandPlatter,
            tone: 'from-amber to-amber-100',     // hangat, appetizing
        },
        {
            title: 'Trending Fashion',
            description: 'Batik kontemporer, tas handmade, aksesori.',
            icon: Shirt,
            tone: 'from-pink to-rose-100',       // lively, fashion-forward
        },
        {
            title: 'Rumah & Dekor',
            description: 'Kerajinan kayu, rotan, dan dekor estetik.',
            icon: House,
            tone: 'from-sky to-sky-100',     // clean, utilitarian
        },
        {
            title: 'Kebutuhan Harian',
            description: 'Produk sehari-hari berkualitas tinggi.',
            icon: ShoppingBasket,
            tone: 'from-emerald to-emerald-100',     // calm, natural
        }
    ];

    // Rekomendasi Produk
    const products = [
        {
            id: 'P-001',
            name: 'Sambal Cumi Asin Premium',
            description: 'Dimasak perlahan dengan rempah pilihan, tanpa MSG tambahan.',
            badge: 'Terlaris',
            favorite: true,
            price: 'Rp 40.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s',
            popularity: 95,
            category: 'kuliner',
        },
        {
            id: 'P-002',
            name: 'Outer Batik Cap Abstrak',
            description: 'Bahan katun dingin dengan motif eksklusif buatan tangan.',
            badge: 'Baru',
            price: 'Rp 120.000',
            image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae',
            popularity: 88,
            category: 'fashion',
        },
        {
            id: 'P-003',
            name: 'Reed Diffuser Serai Wangi',
            description: 'Aroma menenangkan khas spa Bali untuk ruangan Anda.',
            badge: 'Populer',
            price: 'Rp 120.000',
            favorite: true,
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp',
            popularity: 72,
            category: 'home',
        },
        {
            id: 'P-004',
            name: 'Kopi Luwak Single Origin',
            description: 'Kopi premium dengan cita rasa kompleks dan aftertaste panjang.',
            badge: 'Mewah',
            price: 'Rp 450.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s',
            popularity: 60,
            category: 'kuliner',
        },
        {
            id: 'P-005',
            name: 'Kerupuk Ikan Khas Daerah',
            description: 'Camilan gurih dengan bahan lokal segar.',
            badge: 'Spesial',
            price: 'Rp 15.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s',
            popularity: 70,
            category: 'kuliner',
        },
    ];

    // Favorit: gunakan flag favorite jika ada, jika tidak gunakan top popularity
    const favorites = products.filter((p) => p.favorite);
    const favoriteList = favorites.length ? favorites : products.sort((a, b) => b.popularity - a.popularity).slice(0, 5);

    return (
        <>
            <Head title="Go&mdash;UMKM | Home" />

            <LayoutApp
                pageTitle="Marketplace Lokal"
                navItems={[
                    { label: 'Home', href: route('home'), type: 'link', variant: 'home', icon: House },
                    { label: 'Populer', href: '', type: 'anchor' },
                    { label: 'Produk', href: '', type: 'anchor' },
                    { label: 'Mitra', href: '', type: 'anchor' },
                    { label: 'Masuk', href: route('dashboard'), type: 'link', badge: true, icon: LogIn },
                ]}
            >

                {/* Hero Section */}
                <section className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
                    <article className="glass-panel fade-in-up p-6 sm:p-8">
                        <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                            <Store className="size-4" />
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
                                href=""
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700"
                            >
                                Lihat Unggulan
                                <Star className="size-4" />
                            </a>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {[
                                { value: '2.500+', label: 'Mitra UMKM' },
                                { value: '18k', label: 'Produk Mitra' },
                                { value: '4.8/5', label: 'Rating Kepuasan' },
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
                                { name: 'Kopi Arabika Gayo Honey', price: 'Rp75.000' },
                                { name: 'Cokelat Majapahit 70%', price: 'Rp35.000' },
                                { name: 'Tas Anyaman Pandan', price: 'Rp215.000' },
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

                {/* Kategori Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900">Kategori Produk</h3>
                            <p className="mt-2 text-slate-600">Pilih sesuai kebutuhan: kuliner harian sampai hampers premium.</p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article
                                    key={item.title}
                                    className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${item.tone} p-4 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg`}
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

                {/* Rekomendasi Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Rekomendasi Produk Terbaik.</h3>
                    <p className="mt-2 text-slate-600">Produk unggulan berdasarkan kualitas dan tingkat penjualan teratas.</p>

                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${products.length * 8}s` }}
                        >
                            {[...products, ...products].map((product, index) => (
                                <article 
                                    key={`${product.name}-${index}`} 
                                    className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]"
                                    style={{ minHeight: '420px' }}
                                >
                                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                        <div className="absolute left-3 top-3">
                                            <p className="inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm">
                                                <Store className="size-3 text-teal-600" />
                                                {product.badge} | {product.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{product.name}</h4>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{product.description}</p>
                                    </div>
                                    <div className="mt-4">
                                        <Link href={route('dashboard')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                                            <ShoppingBasket className="size-4" />
                                            Lihat Produk
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Review Seller */}
                <section className="glass-panel fade-in-up-delay p-6 text-center sm:p-8">
                    <p className="mx-auto max-w-3xl text-xl font-extrabold leading-relaxed text-slate-900 sm:text-2xl">
                        "Sejak gabung Go-Umkm, toko saya dapat pelanggan dari luar kota dan repeat order naik 3x dalam 2 bulan."
                    </p>
                    <p className="mt-3 font-medium text-slate-600">Rani - Pemilik Rani Snackbox, Bandung</p>
                </section>

            </LayoutApp>
        </>
    );
}
