import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    ArrowRight, BadgePercent, BellRing, House,
    LogOut, ShoppingBasket, Sparkles, LayoutDashboard,
    Package, ClipboardList, ShoppingCart, Minus, Plus,
} from 'lucide-react';
import CardHelloDashboard from '../../Components/Dashboard.HeroSection';
import LayoutApp from '../../Layouts/App';
import RecomendMarquee from '../../Components/Products/RecomendMarquee';

export default function Dashboard() {
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
            <Head title="Go-UMKM | Dashboard"/>

            <LayoutApp pageTitle="Dashboard Customer">

                {/* Hero Section */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
                    <CardHelloDashboard/>
                </section>

                {/* Rekomendasi Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
                    <RecomendMarquee/>
                </section>

                {/* Keranjang Customer */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
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
                                        <button type="button" onClick={() => {}} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-800">
                                            <ShoppingCart className="size-4" />
                                            Checkout
                                        </button>

                                        <div className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1">
                                            <button type="button" onClick={() => {}} className="inline-flex items-center justify-center p-1 text-slate-600 hover:bg-slate-100 rounded" aria-label="Decrease">
                                                <Minus className="size-4" />
                                            </button>
                                            <div className="px-3 text-sm font-bold text-slate-900">{item.qty}</div>
                                            <button type="button" onClick={() => {}} className="inline-flex items-center justify-center p-1 text-slate-600 hover:bg-slate-100 rounded" aria-label="Increase">
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
                <section className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-indigo-400">
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
