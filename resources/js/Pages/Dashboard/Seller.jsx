import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    ArrowRight,
    BellRing,
    House,
    LogOut,
    Sparkles,
    PlusCircle,
    Package,
    ClipboardList,
    LayoutDashboard,
    Edit,
    TrendingUp
} from 'lucide-react';
import LayoutApp from '../../Layouts/App';

export default function DashboardSeller() {

    // Data Produk Saya (7 Data - Mengikuti jumlah produk customer)
    const myProducts = [
        { id: 'P-001', name: 'Sambal Cumi Asin Premium', stock: 45, price: 'Rp 40.000', badge: 'Terlaris', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s' },
        { id: 'P-002', name: 'Outer Batik Cap Abstrak', stock: 12, price: 'Rp 120.000', badge: 'Populer', image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae' },
        { id: 'P-003', name: 'Reed Diffuser Serai Wangi', stock: 25, price: 'Rp 70.000', badge: 'Stok Aman', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp' },
        { id: 'P-004', name: 'Kopi Luwak Single Origin', stock: 8, price: 'Rp 45.000', badge: 'Limit', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s' },
        { id: 'P-005', name: 'Kerupuk Ikan Khas Daerah', stock: 100, price: 'Rp 15.000', badge: 'Grosir', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s' },
        { id: 'P-006', name: 'Kerajinan Anyaman Bambu', stock: 5, price: 'Rp 85.000', badge: 'Handmade', image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png' },
        { id: 'P-007', name: 'Sabun Kopi Organik', stock: 30, price: 'Rp 35.000', badge: 'Baru', image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp' },
    ];

    // Data Pesanan Masuk (7 Data - Mengikuti jumlah pesanan customer)
    const incomingOrders = [
        { id: 'INV-001', customer: 'Andi Hermawan', date: '2026-05-01', product: 'Sambal Cumi Asin', price: 'Rp 40.000', qty: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s' },
        { id: 'INV-002', customer: 'Siti Aminah', date: '2026-05-01', product: 'Outer Batik Cap', price: 'Rp 120.000', qty: 1, image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae' },
        { id: 'INV-003', customer: 'Budi Doremi', date: '2026-05-02', product: 'Reed Diffuser', price: 'Rp 70.000', qty: 3, image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp' },
        { id: 'INV-004', customer: 'Dewi Sartika', date: '2026-05-02', product: 'Kopi Luwak', price: 'Rp 45.000', qty: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s' },
        { id: 'INV-005', customer: 'Rizky Chandra', date: '2026-05-03', product: 'Kerupuk Ikan', price: 'Rp 15.000', qty: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s' },
        { id: 'INV-006', customer: 'Kayla Putri', date: '2026-05-03', product: 'Anyaman Bambu', price: 'Rp 85.000', qty: 2, image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png' },
        { id: 'INV-007', customer: 'Gilang Ramadhan', date: '2026-05-04', product: 'Sabun Kopi', price: 'Rp 35.000', qty: 4, image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp' },
    ];

    return (
        <>
            <Head title="Go-UMKM | Dashboard" />
            <LayoutApp
                pageTitle="Dashboard Seller"
                navItems={[
                    { label: 'Home', href: route('home'), type: 'link', variant: 'home', icon: House },
                    { label: 'Dashboard', href: '', type: 'link', icon: LayoutDashboard },
                    { label: 'Produk', href: '', type: 'anchor', icon: Package },
                    { label: 'Penjualan', href: '', type: 'anchor', icon: ClipboardList },
                    { label: 'Keluar', href: route('home'), type: 'link', badge: true, icon: LogOut },
                ]}
            >
                {/* Hero Section */}
                <section className="glass-panel fade-in-up p-6 sm:p-8">
                    <div className="grid items-center gap-4 md:grid-cols-[1.4fr_0.6fr]">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                                <TrendingUp className="size-4" />
                                Mitra Usaha Digital
                            </p>
                            <h2 className="mt-3 flex items-center gap-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                                <Sparkles className="size-8 text-teal-600 sm:size-10" />
                                Kelola Bisnis Anda Dengan Lebih Mudah dan Efisien
                            </h2>
                            <p className="mt-3 text-base leading-7 text-slate-600">
                                Kelola produk dan stok Anda dengan mudah melalui platform digital kami.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-orange-50 p-5">
                            <p className="text-xs font-bold uppercase text-slate-500">Saldo Penjualan</p>
                            <p className="mt-1 text-3xl font-black text-teal-700">Rp 4.250.000</p>
                            <p className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
                                <BellRing className="size-4 text-orange-500" /> 5 Pesanan baru belum diproses
                            </p>
                        </div>
                    </div>
                </section>

                {/* Produk Saya */}
                <section className="glass-panel fade-in-up p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Produk Saya</h3>
                    <p className="mt-1 text-slate-600">Pantau ketersediaan stok produk Anda.</p>
                    
                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${myProducts.length * 8}s` }}
                        >
                            {[...myProducts, ...myProducts].map((product, index) => (
                                <article key={`${product.id}-${index}`} className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]">
                                    <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img src={product.image} className="h-full w-full object-cover" />
                                        <div className="absolute left-3 top-3">
                                            <p className="inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-teal-700 shadow-sm">
                                                {product.badge} | Stok: {product.stock}
                                            </p>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{product.name}</h4>
                                    <p className="mt-auto pt-3 text-lg font-bold text-slate-900">{product.price}</p>
                                    <div className="mt-4 flex gap-2">
                                        <a href="#" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                                            <Edit className="size-4" />
                                            Edit Produk
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pesanan Masuk */}
                <section className="glass-panel fade-in-up-delay p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Pesanan Masuk</h3>
                    <p className="mt-2 text-slate-600">Daftar pesanan yang perlu diproses.</p>

                    {/* Grid 2 Kolom Pesanan */}
                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {incomingOrders.map((order) => (
                            <div key={order.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:border-teal-200 hover:shadow-md">
                                <div className="size-20 flex-none overflow-hidden rounded-xl bg-slate-50">
                                    <img src={order.image} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{order.id}</span>
                                        <span className="text-[10px] text-slate-400">{order.date}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{order.product}</h4>
                                    <p className="text-xs text-slate-500">Pembeli: <span className="text-slate-800 font-medium">{order.customer}</span></p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-sm font-black text-slate-900">
                                            {order.price}
                                            <span className="ml-2 text-xs font-medium text-slate-500">· {order.qty} pcs</span>
                                        </p>
                                        <button className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:gap-2 transition-all">
                                            Proses Pesanan <ArrowRight className="size-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}