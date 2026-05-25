import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import { LogIn, Eye, Sparkles, Package, Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import BackRightLink from '@/Components/BackRight';
import { products } from '@/Constants/Data.Products';

export default function Populer() {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);

    const popularProducts = products.filter(product => product.badge === 'Populer' || product.badge === 'Terlaris');

    return(
            <>
                <Head title="Go-UMKM | Best Produk" />
                
                <LayoutApp pageTitle="Marketplace Lokal">
    
                    {/* Populer Produk */}
                    <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
                        <div className="space-y-6">
                            {/* Tombol Kembali & Header */}
                            <BackRightLink 
                                title="Produk Terlaris & Populer"
                                subtitle="Produk unggulan yang paling banyak diminati saat ini."
                                icon={Sparkles}
                            />

                            {/* Grid Card Produk */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {popularProducts.map((product, index) => (
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
                                        <p className="mt-2 mb-3 text-sm leading-relaxed text-slate-600 line-clamp-2">{product.description}</p>

                                        {isCustomer && (
                                            <div className="flex items-center mt-auto pt-3 border-t border-t-slate-300">
                                                <p className="text-lg font-bold text-slate-900">
                                                    {product.price}
                                                </p>
                                                <p className="ml-auto text-sm font-bold text-slate-600">
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