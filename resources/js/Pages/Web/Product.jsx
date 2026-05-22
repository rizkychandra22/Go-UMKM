import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import HeroSection from '../../Components/Home.HeroSection';
import { LogIn, Eye, Sparkles, Package, Star, ArrowLeft, ShoppingCart, Search } from 'lucide-react';
import { useState } from 'react';

export default function Product() {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);
    const [searchQuery, setSearchQuery] = useState('');
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

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <>
            <Head title="Go-UMKM | Produk Kami" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-sky-400">
                    <div className="space-y-6">
                        {/* Tombol Kembali & Header */}
                        <div className="flex items-center gap-4">
                            <Link href={route('home')} className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50">
                                <ArrowLeft className="size-5" />
                            </Link>
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                                    <Sparkles className="size-5 text-amber-500 animate-pulse" />
                                    Produk Tersedia
                                </h2>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Temukan produk lokal yang kamu cari di sini.</p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="sm:col-span-2 relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="size-4 text-slate-400" />
                                </div>
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk..."
                                    className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1"
                                />
                            </div>
                        </div>      

                        {/* Grid Card Produk */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts.map((product, index) => (
                            <article 
                            key={`${product.name}-${index}`} 
                            className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg"
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

                                    {isCustomer && (
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mt-auto pt-3 text-lg font-bold text-slate-900">
                                                {product.price}
                                            </p>
                                            <p className="ml-auto inline-flex items-center mt-auto pt-3 text-sm font-bold text-slate-600">
                                                Stok: {product.stock} PCS
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {isCustomer ? (
                                    <div className="mt-4">
                                        <button type="button" onClick={() => {}} aria-label="Tambah ke keranjang" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 border border-teal-500 hover:text-white transition-colors">
                                            <ShoppingCart className="size-4" />
                                            Tambah ke Keranjang
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <Link href={route('login')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 border border-teal-500 hover:text-white transition-colors">
                                            <Eye className="size-4" />
                                            Lihat Produk
                                        </Link>
                                    </div>
                                )}
                            </article>
                            ))}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    )
}