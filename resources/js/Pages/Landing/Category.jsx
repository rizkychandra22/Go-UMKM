import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import CategoryProduct from '@/Components/Landing/HeroCategory';
import { Eye, Sparkles, Package, ShoppingCart, Store } from 'lucide-react';
import { products } from '@/Constants/Data.Products';
import ProductCard from '@/Components/Products/Card';

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
                                <div>
                                    <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
                                        <Sparkles className="size-5 animate-pulse text-amber-500" />
                                        {selected.name}
                                    </h2>
                                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                                        Menampilkan {filteredProducts.length} produk lokal.
                                    </p>
                                </div>

                                {/* Grid Produk */}
                                {filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {filteredProducts.map((p, i) => (
                                            <ProductCard key={`${p.name}-${i}`} product={p} isCustomer={isCustomer} />
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