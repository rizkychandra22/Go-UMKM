import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../Layouts/App';
import {
    ArrowRight, HandPlatter, House, LogIn, Shirt,
    ShoppingBasket, Sparkles, Package, Star,
    Store, Eye,
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
            name: 'Sambal Cumi Asin Premium',
            description: 'Dimasak perlahan dengan rempah pilihan, tanpa MSG tambahan.',
            badge: 'Terlaris',
            price: 'Rp 40.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s',
            category: 'kuliner',
        },
        {
            name: 'Outer Batik Cap Abstrak',
            description: 'Bahan katun dingin dengan motif eksklusif buatan tangan.',
            badge: 'Populer',
            price: 'Rp 120.000',
            image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae',
            category: 'fashion',
        },
        {
            name: 'Reed Diffuser Serai Wangi',
            description: 'Aroma menenangkan khas spa Bali untuk ruangan Anda.',
            badge: 'Populer',
            price: 'Rp 80.000',
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp',
            category: 'home',
        },
        {
            name: 'Kopi Luwak Single Origin',
            description: 'Kopi premium dengan cita rasa kompleks dan aftertaste panjang.',
            badge: 'Terlaris',
            price: 'Rp 45.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s',
            category: 'kuliner',
        },
        {
            name: 'Kerupuk Ikan Khas Daerah',
            description: 'Camilan gurih dengan bahan lokal segar.',
            badge: 'Spesial',
            price: 'Rp 35.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s',
            category: 'kuliner',
        },
        {
            name: 'Kerajinan Anyaman Bambu',
            description: 'Wadah serbaguna estetik hasil anyaman tangan pengrajin desa.',
            badge: 'Mewah',
            price: 'Rp 85.000',
            image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png',
            category: 'fashion',
        },
        {
            name: 'Sabun Kopi Organik',
            description: 'Eksfoliasi alami dengan aroma kopi asli yang menyegarkan kulit.',
            badge: 'Spesial',
            price: 'Rp 70.000',
            image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp',
            category: 'home',
        },
    ];

    // Filter products list: show Populer first then Terlaris
    const populerItems = products.filter((p) => p.badge === 'Populer');
    const terlarisItems = products.filter((p) => p.badge === 'Terlaris');
    const heroList = [...populerItems, ...terlarisItems].filter((v, i, a) => a.findIndex(x => x.name === v.name) === i);

    return (
        <>
            <Head title="Go-UMKM | Home" />

            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Hero Section */}
                <section className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr]">
                    <article className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-teal-400">
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

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {[
                                { value: '2.500+', label: 'Mitra Usaha' },
                                { value: '18k', label: 'Produk Mitra' },
                                { value: '4.8/5', label: 'Rating Penjualan' },
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

                    <article className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-amber-400">
                        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Produk Populer & Terlaris Saat Ini</p>
                        <ul className="mt-4 space-y-3">
                            {heroList.map((item) => (
                                <li
                                    key={item.name}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                                >
                                    <span className="text-sm font-semibold text-slate-600">{item.name}</span>
                                    <span className={`ml-2 mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${item.badge === 'Populer' ? 'bg-amber-100 text-amber-700' : item.badge === 'Terlaris' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-700'}`}>{item.badge}</span>
                                    <strong className="ml-auto text-sm font-extrabold text-slate-900">{item.price}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-800">
                            <Star className="size-4" />
                            Dapatkan produk unggulan anda sekarang juga
                        </p>
                    </article>
                </section>

                {/* Kategori Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-rose-400">
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
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-sky-400">
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
                                                <Sparkles className="size-3 text-orange-500" />
                                                {product.badge} | {product.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{product.name}</h4>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{product.description}</p>
                                    </div>
                                    <div className="mt-4">
                                        <Link href={route('dashboardSeller')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                                            <Eye className="size-4" />
                                            Lihat Produk
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Review Seller */}
                <section className="glass-panel fade-in-up-delay p-6 text-center sm:p-8 border-t-4 border-t-slate-500">
                    <p className="mx-auto max-w-3xl text-xl font-extrabold leading-relaxed text-slate-900 sm:text-2xl">
                        "Sejak gabung Go-Umkm, toko saya dapat pelanggan dari luar kota dan repeat order naik 3x dalam 2 bulan."
                    </p>
                    <p className="mt-3 font-medium text-slate-600">Rani - Pemilik Rani Snackbox, Bandung</p>
                </section>

            </LayoutApp>
        </>
    );
}
