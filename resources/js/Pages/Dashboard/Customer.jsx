import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    ArrowRight, BadgePercent, BellRing, House,
    LogOut, ShoppingBasket, Sparkles, LayoutDashboard,
    Package, ClipboardList, ShoppingCart, Minus, Plus,
} from 'lucide-react';
import LayoutApp from '../../Layouts/App';

export default function Dashboard() {

    // Card Product Rekomendasi
    const products = [
        {
            id: 'P-001',
            name: 'Sambal Cumi Asin Premium',
            description: 'Dimasak perlahan dengan rempah pilihan, tanpa MSG tambahan.',
            badge: 'Terlaris',
            price: 'Rp 40.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s',
            popularity: 95,
            stock: 10,
            category: 'kuliner',
        },
        {
            id: 'P-002',
            name: 'Outer Batik Cap Abstrak',
            description: 'Bahan katun dingin dengan motif eksklusif buatan tangan.',
            badge: 'Populer',
            price: 'Rp 120.000',
            image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae',
            popularity: 88,
            stock: 3,
            category: 'fashion',
        },
        {
            id: 'P-003',
            name: 'Reed Diffuser Serai Wangi',
            description: 'Aroma menenangkan khas spa Bali untuk ruangan Anda.',
            badge: 'Populer',
            price: 'Rp 70.000',
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp',
            popularity: 72,
            stock: 15,
            category: 'home',
        },
        {
            id: 'P-004',
            name: 'Kopi Luwak Single Origin',
            description: 'Kopi premium dengan cita rasa kompleks dan aftertaste panjang.',
            badge: 'Terlaris',
            price: 'Rp 45.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s',
            popularity: 60,
            stock: 5,
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
            stock: 50,
            category: 'kuliner',
        },
        {
            id: 'P-006',
            name: 'Kerajinan Anyaman Bambu',
            description: 'Wadah serbaguna estetik hasil anyaman tangan pengrajin desa.',
            badge: 'Mewah',
            price: 'Rp 85.000',
            image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png',
            popularity: 75,
            stock: 8,
            category: 'fashion',
        },
        {
            id: 'P-007',
            name: 'Sabun Kopi Organik',
            description: 'Eksfoliasi alami dengan aroma kopi asli yang menyegarkan kulit.',
            badge: 'Spesial',
            price: 'Rp 35.000',
            image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp',
            popularity: 82,
            stock: 20,
            category: 'home',
        },
    ];

    const featured = [
        { category: 'Terlaris', item: products.find((p) => p.badge === 'Terlaris') },
        { category: 'Populer', item: products.sort((a, b) => b.popularity - a.popularity)[0] },
        { category: 'Mewah', item: products.find((p) => p.badge === 'Mewah') },
        { category: 'Spesial', item: products.find((p) => p.badge === 'Spesial') },
    ];

    // Card Data Keranjang
    const cartItems = [
        {
            id: 'CART-001',
            name: 'Sambal Cumi Asin Premium',
            detail: '250g - kemasan plastik',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s',
            price: 'Rp 40.000',
            qty: 2,
            stock: 10,
        },
        {
            id: 'CART-002',
            name: 'Outer Batik Cap Abstrak',
            detail: 'Size M - Katun dingin',
            image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae',
            price: 'Rp 120.000',
            qty: 1,
            stock: 3,
        },
        {
            id: 'CART-003',
            name: 'Reed Diffuser Serai Wangi',
            detail: '50ml - Botol Kaca',
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp',
            price: 'Rp 70.000',
            qty: 1,
            stock: 15,
        },
        {
            id: 'CART-004',
            name: 'Kopi Luwak Single Origin',
            detail: '100g - Biji Kopi',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s',
            price: 'Rp 45.000',
            qty: 1,
            stock: 5,
        },
        {
            id: 'CART-005',
            name: 'Kerupuk Ikan Khas Daerah',
            detail: '500g - Original',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s',
            price: 'Rp 15.000',
            qty: 3,
            stock: 50,
        },
        {
            id: 'CART-006',
            name: 'Kerajinan Anyaman Bambu',
            detail: 'Medium - Set of 2',
            image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png',
            price: 'Rp 85.000',
            qty: 1,
            stock: 8,
        },
        {
            id: 'CART-007',
            name: 'Sabun Kopi Organik',
            detail: '100g - Handcrafted',
            image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp',
            price: 'Rp 35.000',
            qty: 2,
            stock: 20,
        },
    ];

    // Card Data Pesanan
    const orders = [
        {
            id: 'INV-2026-001',
            date: '2026-04-28',
            product: 'Reed Diffuser Serai Wangi',
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp',
            price: 'Rp 70.000',
        },
        {
            id: 'INV-2026-002',
            date: '2026-04-29',
            product: 'Outer Batik Cap Abstrak',
            image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae',
            price: 'Rp 85.000',
        },
        {
            id: 'INV-2026-003',
            date: '2026-04-30',
            product: 'Sambal Cumi Asin Premium',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s',
            price: 'Rp 250.000',
        },
        {
            id: 'INV-2026-004',
            date: '2026-05-01',
            product: 'Kopi Luwak Single Origin',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s',
            price: 'Rp 450.000',
        },
        {
            id: 'INV-2026-005',
            date: '2026-05-02',
            product: 'Kerupuk Ikan Khas Daerah',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s',
            price: 'Rp 15.000',
        },
        {
            id: 'INV-2026-006',
            date: '2026-05-03',
            product: 'Kerajinan Anyaman Bambu',
            image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png',
            price: 'Rp 85.000',
        },
        {
            id: 'INV-2026-007',
            date: '2026-05-04',
            product: 'Sabun Kopi Organik',
            image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp',
            price: 'Rp 35.000',
        },
    ];

    return (
        <>
            <Head title="Go-UMKM | Dashboard" />

            <LayoutApp
                pageTitle="Dashboard Customer"
                // navItems={[
                //     { label: 'Home', href: route('home'), type: 'link', variant: 'home', icon: House },
                //     { label: 'Dashboard', href: route('dashboardCustomer'), type: 'link', icon: LayoutDashboard },
                //     { label: 'Produk', href: '', type: 'anchor', icon: Package },
                //     { label: 'Keranjang', href: '', type: 'anchor', icon: ShoppingCart },
                //     { label: 'Pesanan', href: '', type: 'anchor', icon: ClipboardList },
                //     { label: 'Keluar', href: route('logout'), type: 'logout', badge: true, icon: LogOut },
                // ]}
            >

                {/* Hero Section */}
                <section className="glass-panel fade-in-up overflow-hidden p-6 sm:p-8">
                    <div className="grid items-center gap-4 md:grid-cols-[1.4fr_0.6fr]">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                                <ShoppingBasket className="size-4" />
                                Halaman utama pelanggan
                            </p>
                            <h2 className="mt-3 flex items-center gap-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                                <Sparkles className="size-8 text-teal-600 sm:size-10" />
                                Selamat Datang di Pusat Belanja UMKM Favorit Kamu
                            </h2>
                            <p className="mt-3 text-base leading-7 text-slate-600">
                                Dukung ekonomi lokal dengan satu klik. Pantau status pesanan dan temukan kurasi produk terbaik minggu ini.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-orange-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Notifikasi</p>
                            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <BellRing className="size-4 text-orange-500" />
                                7 Produk rekomendasi untuk kamu
                            </p>
                        </div>
                    </div>
                </section>

                {/* Rekomendasi Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Rekomendasi Untuk Kamu</h3>
                    <p className="mt-2 text-slate-600">Produk unggulan berdasarkan kualitas dan tingkat penjualan teratas.</p>

                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${products.length * 8}s` }}
                        >
                            {[...products, ...products].map((product, index) => (
                                <article 
                                    key={`${product.id}-${index}`} 
                                    className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]"
                                    style={{ minHeight: '450px' }} 
                                >
                                    {/* Ukuran gambar disamakan menggunakan aspect-square (1:1) */}
                                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="h-full w-full object-cover" 
                                        />
                                        <div className="absolute left-3 top-3">
                                            <p className="inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm">
                                                <Sparkles className="size-3 text-orange-500" />
                                                {product.badge} | {product.category}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">
                                            {product.name}
                                        </h4>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mt-auto pt-3 text-lg font-bold text-slate-900">
                                                {product.price}
                                            </p>
                                            <p className="ml-auto inline-flex items-center mt-auto pt-3 text-sm font-bold text-slate-600">
                                                Stok: {product.stock} PCS
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <a href="#" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                                            <ShoppingCart className="size-4" />
                                            Tambah ke Keranjang
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Keranjang Customer */}
                <section className="glass-panel fade-in-up p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Keranjang</h3>
                    <p className="mt-2 text-slate-600">Ringkasan produk yang sudah kamu pilih sebelum checkout.</p>

                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${cartItems.length * 8}s` }}
                        >
                            {[...cartItems, ...cartItems].map((item, index) => (
                                <article
                                    key={`${item.id}-${index}`}
                                    className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]"
                                    style={{ minHeight: '400px' }}
                                >
                                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{item.name}</h4>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-1">{item.detail}</p>
                                        <p className="text-sm text-slate-500">Stok penjual: {item.stock}</p>
                                        <p className="mt-auto pt-3 text-lg font-bold text-slate-900">{item.price}</p>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-800">
                                            <ShoppingCart className="size-4" />
                                            Checkout
                                        </a>

                                        <div className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1">
                                            <button type="button" className="inline-flex items-center justify-center p-1 text-slate-600 hover:bg-slate-100 rounded" aria-label="Decrease">
                                                <Minus className="size-4" />
                                            </button>
                                            <div className="px-3 text-sm font-bold text-slate-900">{item.qty}</div>
                                            <button type="button" className="inline-flex items-center justify-center p-1 text-slate-600 hover:bg-slate-100 rounded" aria-label="Increase">
                                                <Plus className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Pesanan Customer */}
                <section className="glass-panel fade-in-up-delay p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Pesanan</h3>
                    <p className="mt-2 text-slate-600">Daftar produk yang kamu pesanan saat ini.</p>

                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${orders.length * 8}s` }}
                        >
                            {[...orders, ...orders].map((order, index) => (
                                <article
                                    key={`${order.id}-${index}`}
                                    className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]"
                                    style={{ minHeight: '400px' }}
                                >
                                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img src={order.image} alt={order.product} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h4 className="mt-3 text-lg font-extrabold text-slate-900 line-clamp-1">{order.product}</h4>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-1">Tanggal: {order.date}</p>
                                        <p className="mt-auto pt-3 text-lg font-bold text-slate-900">{order.price}</p>
                                    </div>
                                    <div className="mt-4">
                                        <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800">Lihat Detail<ArrowRight className="size-4" /></Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    )
}
