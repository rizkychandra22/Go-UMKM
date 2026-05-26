import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import CategoryProduct from '@/Components/Home.HeroCategory';
import { Eye, Sparkles, Package, ShoppingCart, Store } from 'lucide-react';

export default function Mitra({ categories, slug }) {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);

    const Products = [
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

    // Mencari objek kategori aktif dari barisan menu atas
    const selected = slug ? categories.find((c) => c.slug === slug) : null;
    
    // Filter produk berdasarkan slug aktif
    const filteredProducts = Products.filter((product) => {
        if (!slug) return false;
        
        if (slug === 'kuliner-lokal' && product.category === 'kuliner') return true;
        if (slug === 'trending-fashion' && product.category === 'fashion') return true;
        if (slug === 'rumah-dekor' && product.category === 'home') return true;
        if (slug === 'kebutuhan-harian' && product.category === 'kebutuhan') return true;

    });

    return (
        <>
            <Head title={`Go-UMKM | ${selected ? selected.name : 'Mitra UMKM'}`} />

            <LayoutApp pageTitle="Marketplace Lokal">
                <div className="space-y-6">
                    
                    <section className="glass-panel fade-in-up border-t-4 border-t-teal-400 p-6 sm:p-8">
                        <CategoryProduct categories={categories} />
                    </section>

                    {/* --- SEKSI 2: Produk Berdasarkan Kategori --- */}
                    <section className="glass-panel fade-in-up border-t-4 border-t-amber-400 p-6 sm:p-8">
                        {selected ? (
                            <div className="space-y-6">
                                {/* Header Info Kategori Terpilih */}
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
                                    <div>
                                        <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
                                            <Sparkles className="size-5 animate-pulse text-amber-500" />
                                            {selected.name}
                                        </h2>
                                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                                            Menampilkan {filteredProducts.length} produk lokal.
                                        </p>
                                    </div>
                                </div>

                                {/* Grid Produk */}
                                {filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {filteredProducts.map((product, index) => (
                                            <article 
                                                key={index} 
                                                // className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg"
                                                style={{ minHeight: '440px' }}
                                            >
                                                {/* Foto Produk */}
                                                <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                                    <img 
                                                        src={product.image ?? 'https://placehold.co/400'} 
                                                        alt={product.name} 
                                                        className="h-full w-full object-cover" 
                                                    />
                                                    {product.badge && (
                                                        <div className="absolute left-3 top-3">
                                                            <p className="inline-flex items-center gap-1 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm">
                                                                <Sparkles className="size-3 text-orange-500" />
                                                                {product.badge}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Konten & Informasi Teks */}
                                                <div className="flex flex-1 flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{product.name}</h4>
                                                        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{product.description}</p>
                                                    </div>

                                                    {/* Harga & Stok (Hanya muncul jika sudah login) */}
                                                    {isCustomer && (
                                                        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50">
                                                            <p className="text-lg font-extrabold text-slate-900">
                                                                {product.price}
                                                            </p>
                                                            <p className="text-xs font-semibold text-slate-500">
                                                                Stok: <span className="text-slate-700 font-bold">{product.stock ?? 0} PCS</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tombol Aksi */}
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
                                        ))}
                                    </div>
                                ) : (
                                    /* State: Kategori dipilih, tapi produk kosong */
                                    <div className="py-16 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                                        <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                                            <Package className="size-6" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">Produk Belum Tersedia</p>
                                        <p className="text-xs text-slate-400 mt-1">Mitra UMKM kami sedang mempersiapkan produk terbaik untuk kategori ini.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* State awal: Saat belum klik kategori apapun */
                            <div className="py-16 text-center">
                                <div className="inline-flex size-14 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-4 animate-bounce">
                                    <Sparkles className="size-7" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">Silakan Pilih Kategori</h3>
                                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                                    Klik salah satu ikon kategori di atas untuk melihat jajaran produk UMKM pilihan terpercaya.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </LayoutApp>
        </>
    );
}