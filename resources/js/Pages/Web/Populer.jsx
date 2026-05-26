import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { LogIn, Eye, Sparkles, Package, Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Populer() {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);
    
    const [activeTab, setActiveTab] = useState('Populer');

    const products = [
        {
            name: 'Sambal Cumi Asin Premium',
            description: 'Dimasak perlahan dengan rempah pilihan, tanpa MSG tambahan.',
            badge: 'Terlaris',
            price: 'Rp 40.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s',
            category: 'kuliner',
            stock: 10
        },
        {
            name: 'Outer Batik Cap Abstrak',
            description: 'Bahan katun dingin dengan motif eksklusif buatan tangan.',
            badge: 'Populer',
            price: 'Rp 120.000',
            image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae',
            category: 'fashion',
            stock: 5
        },
        {
            name: 'Reed Diffuser Serai Wangi',
            description: 'Aroma menenangkan khas spa Bali untuk ruangan Anda.',
            badge: 'Populer',
            price: 'Rp 80.000',
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp',
            category: 'home',
            stock: 8
        },
        {
            name: 'Kopi Luwak Single Origin',
            description: 'Kopi premium dengan cita rasa kompleks dan aftertaste panjang.',
            badge: 'Terlaris',
            price: 'Rp 45.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s',
            category: 'kuliner',
            stock: 15
        },
        {
            name: 'Kerupuk Ikan Khas Daerah',
            description: 'Camilan gurih dengan bahan lokal segar.',
            badge: 'Spesial',
            price: 'Rp 35.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s',
            category: 'kuliner',
            stock: 20
        },
        {
            name: 'Kerajinan Anyaman Bambu',
            description: 'Wadah serbaguna estetik hasil anyaman tangan pengrajin desa.',
            badge: 'Mewah',
            price: 'Rp 85.000',
            image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png',
            category: 'fashion',
            stock: 12
        },
        {
            name: 'Sabun Kopi Organik',
            description: 'Eksfoliasi alami dengan aroma kopi asli yang menyegarkan kulit.',
            badge: 'Spesial',
            price: 'Rp 70.000',
            image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp',
            category: 'home',
            stock: 15
        },
    ];

    const displayedProducts = products.filter(product => product.badge === activeTab);

    return (
        <>
            <Head title="Go-UMKM | Produk Kami" />
            
            <LayoutApp pageTitle="Marketplace Lokal">
                <section className="glass-panel fade-in-up border-t-4 border-t-indigo-400 p-6 sm:p-8">
                    <div className="space-y-6">
                        
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <Link href={route('home')} className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50">
                                    <ArrowLeft className="size-5" />
                                </Link>
                                <div>
                                    <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
                                        <Sparkles className="size-5 animate-pulse text-amber-500" />
                                        Produk Terlaris & Populer
                                    </h2>
                                    <p className="mt-0.5 text-xs font-medium text-slate-500">Produk unggulan yang paling banyak diminati.</p>
                                </div>
                            </div>

                            {/* --- Switch Button Tanpa Icon & Warna Amber --- */}
                            <div className="inline-flex w-full items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-inner sm:w-auto">
                                <button
                                    onClick={() => setActiveTab('Terlaris')}
                                    className={`flex-1 sm:flex-none flex items-center justify-center rounded-lg px-5 py-1.5 text-sm font-bold transition-all duration-200 ${
                                        activeTab === 'Terlaris'
                                        ? 'bg-teal-600 text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                                >
                                    Terlaris
                                </button>
                                <button
                                    onClick={() => setActiveTab('Populer')}
                                    className={`flex-1 sm:flex-none flex items-center justify-center rounded-lg px-5 py-1.5 text-sm font-bold transition-all duration-200 ${
                                        activeTab === 'Populer'
                                        ? 'bg-teal-600 text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                                >
                                    Populer
                                </button>
                            </div>
                        </div>

                        {/* --- Grid Produk --- */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {displayedProducts.length > 0 ? (
                                displayedProducts.map((product, index) => (
                                    <article 
                                        key={`${product.name}-${index}`} 
                                        className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg"
                                        style={{ minHeight: '440px' }}
                                    >
                                        {/* Image wrapper */}
                                        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                            <div className="absolute left-3 top-3">
                                                <p className="inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm">
                                                    <Sparkles className="size-3 text-orange-500" />
                                                    {product.badge} | {product.category}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Content wrapper */}
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{product.name}</h4>
                                                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{product.description}</p>
                                            </div>

                                            {/* Bagian harga dan stok didorong otomatis ke bawah menggunakan mt-auto */}
                                            {isCustomer && (
                                                <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50">
                                                    <p className="text-lg font-extrabold text-slate-900">
                                                        {product.price}
                                                    </p>
                                                    <p className="text-xs font-semibold text-slate-500">
                                                        Stok: <span className="text-slate-700 font-bold">{product.stock} PCS</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Button Action */}
                                        <div className="mt-4">
                                            {isCustomer ? (
                                                <button 
                                                    type="button" 
                                                    onClick={() => alert(`Ditambahkan ke keranjang: ${product.name}`)} 
                                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 border border-teal-500 py-2.5 text-sm font-bold text-teal-700 transition-colors hover:bg-teal-600 hover:text-white"
                                                >
                                                    <ShoppingCart className="size-4" />
                                                    Tambah ke Keranjang
                                                </button>
                                            ) : (
                                                <Link 
                                                    href={route('login')} 
                                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 border border-teal-500 py-2.5 text-sm font-bold text-teal-700 transition-colors hover:bg-teal-600 hover:text-white"
                                                >
                                                    <Eye className="size-4" />
                                                    Lihat Produk
                                                </Link>
                                            )}
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="col-span-full py-16 text-center">
                                    <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-3">
                                        <Package className="size-6" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">Belum ada produk di kategori tab "{activeTab}".</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}