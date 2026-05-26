import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import CategoryProduct from '@/Components/Home.HeroCategory';
import { Eye, Sparkles, Package, ShoppingCart, Store } from 'lucide-react';
import { products } from '@/Constants/Data.Products';

export default function Mitra({ categories, slug, product }) {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);

    // Mencari objek kategori aktif dari barisan menu atas
    const selected = slug ? categories.find((c) => c.slug === slug) : null;
    
    // Filter produk berdasarkan slug aktif
    const filteredProducts = products.filter((product) => {
        if (!slug) return false;

        // mapping slug ke category (fall back ke direct match)
        if (slug === 'kuliner-lokal' && product.category === 'kuliner') return true;
        if (slug === 'trending-fashion' && product.category === 'fashion') return true;
        if (slug === 'rumah-dekor' && product.category === 'home') return true;
        if (slug === 'kebutuhan-harian' && product.category === 'kebutuhan') return true;

        // jika slug sama dengan category key
        if (product.category === slug) return true;

        return false;
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
                                                key={`${product.name}-${index}`} 
                                                className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg"
                                                style={{ minHeight: '440px' }}
                                            >
                                                <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                                    <img src={product.image ?? 'https://placehold.co/400'} alt={product.name} className="h-full w-full object-cover" />
                                                    <div className="absolute left-3 top-3">
                                                        <p className="inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm">
                                                            <Sparkles className="size-3 text-orange-500" />
                                                            {product.badge} | {product.category}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 flex-col">
                                                    <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{product.name}</h4>
                                                    <p className="mt-2 mb-3 text-sm leading-relaxed text-slate-600 line-clamp-2">{product.description}</p>

                                                    {isCustomer && (
                                                        <div className="flex items-center mt-auto pt-3 border-t border-t-slate-300">
                                                            <p className="text-lg font-bold text-slate-900">
                                                                {product.price}
                                                            </p>
                                                            <p className="ml-auto text-sm font-bold text-slate-600">
                                                                Stok: {product.stock ?? 0} PCS
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {isCustomer ? (
                                                    <div className="mt-4">
                                                        <button type="button" onClick={() => alert(`Ditambahkan ke keranjang: ${product.name}`)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 border border-teal-500 hover:text-white transition-colors">
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