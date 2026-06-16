import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Eye, Sparkles, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, isCustomer, className = '', minHeight = '420px', onAdd }) {
    const handleAdd = () => {
        if (typeof onAdd === 'function') return onAdd(product);
        alert(`Ditambahkan ke keranjang: ${product.name}`);
    };

    return (
        <article
            className={`flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500 dark:hover:shadow-slate-950/40 ${className}`}
            style={{ minHeight }}
        >
            {/* Foto Produk dengan Link ke Detail */}
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner dark:bg-slate-950">
                <Link href={route('product.show', { id: product.id })} className="block h-full w-full">
                    <img 
                        src={product.image ?? 'https://placehold.co/400'} 
                        alt={product.name} 
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                </Link>
                <div className="absolute left-3 top-3">
                    <p className="inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm dark:bg-slate-950/85 dark:text-slate-200">
                        <Sparkles className="size-3 text-orange-500" />
                        {product.badge} | {product.category}
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col">
                {/* Judul Produk Sekarang Bisa Diklik Menuju Detail */}
                <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1 dark:text-slate-100">
                    <Link 
                        href={route('product.show', { id: product.id })} 
                        className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                    >
                        {product.name}
                    </Link>
                </h4>
                
                <p className="mt-2 mb-3 text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                    {product.description}
                </p>

                {isCustomer && (
                    <div className="flex items-center mt-auto pt-3 border-t border-t-slate-300 dark:border-t-slate-800">
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{product.price}</p>
                        <p className="ml-auto text-sm font-bold text-slate-600 dark:text-slate-400">Stok: {product.stock ?? 0} PCS</p>
                    </div>
                )}
            </div>

            {isCustomer ? (
                /* Jika Sudah Login (Customer) -> Tombol Tambah Keranjang */
                <div className="mt-4">
                    <button 
                        type="button" 
                        onClick={handleAdd} 
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 border border-teal-500 hover:text-white transition-colors dark:bg-teal-950/40 dark:text-teal-300 dark:hover:bg-teal-600 dark:hover:text-white"
                    >
                        <ShoppingCart className="size-4" />
                        Tambah ke Keranjang
                    </button>
                </div>
            ) : (
                /* Jika Belum Login -> Tombol Mengarah ke Detail Produk (Bukan ke Page Login Lagi) */
                <div className="mt-4">
                    <Link 
                        href={route('product.show', { id: product.id })} 
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 border border-teal-500 hover:text-white transition-colors dark:bg-teal-950/40 dark:text-teal-300 dark:hover:bg-teal-600 dark:hover:text-white"
                    >
                        <Eye className="size-4" />
                        Lihat Produk
                    </Link>
                </div>
            )}
        </article>
    );
}