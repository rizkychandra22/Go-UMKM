import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import { getProductDetailSlug } from '@/lib/product';

export default function ProductCard({ product, isCustomer, className = '', minHeight = 'auto', onAdd }) {
    const handleAdd = (e) => {
        e.preventDefault(); // Prevent navigating to product detail
        if (typeof onAdd === 'function') return onAdd(product);
        alert(`Ditambahkan ke keranjang: ${product.name}`);
    };

    const productSlug = getProductDetailSlug(product);
    
    // Simulate some e-commerce data if not present
    const rating = product.rating || "4.9";
    const soldCount = product.soldCount || "100+ terjual";
    const storeLocation = product.storeLocation || "Kota Bandung";

    return (
        <article
            className={`group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 ${className}`}
            style={{ minHeight }}
        >
            {/* Product Image */}
            <Link href={route('product.show', { slug: productSlug })} className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img 
                    src={product.image ?? 'https://placehold.co/400'} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                
                {/* Badges */}
                {product.badge && (
                    <div className="absolute top-2 left-2">
                        <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm ${product.badge === 'Populer' ? 'bg-orange-500' : product.badge === 'Terlaris' ? 'bg-teal-600' : 'bg-rose-500'}`}>
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Category Badge */}
                {product.category && (
                    <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center rounded-sm bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur-md dark:bg-slate-900/90 dark:text-slate-200">
                            {product.category}
                        </span>
                    </div>
                )}
            </Link>

            {/* Product Details */}
            <div className="flex flex-1 flex-col p-3">
                <Link href={route('product.show', { slug: productSlug })} className="mb-1">
                    <h4 className="text-sm text-slate-800 line-clamp-2 leading-tight dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {product.name}
                    </h4>
                </Link>
                
                <div className="mt-1">
                    <p className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                        {product.price}
                    </p>
                </div>
                
                <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <MapPin className="size-3 shrink-0" />
                    <span className="truncate">{storeLocation}</span>
                </div>
                
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center text-orange-500">
                        <Star className="size-3 fill-current" />
                        <span className="ml-1 font-semibold">{rating}</span>
                    </div>
                    <span className="h-2 w-px bg-slate-300 dark:bg-slate-700" />
                    <span>{soldCount}</span>
                </div>
            </div>

            {/* Actions */}
            {isCustomer && (
                <div className="px-3 pb-3 pt-1">
                    <button 
                        type="button" 
                        onClick={handleAdd} 
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-teal-500 bg-white py-1.5 text-xs font-bold text-teal-600 transition-colors hover:bg-teal-50 focus-visible:outline-teal-600 dark:border-teal-500/50 dark:bg-slate-900 dark:text-teal-400 dark:hover:bg-teal-950/40"
                    >
                        <ShoppingCart className="size-3.5" />
                        + Keranjang
                    </button>
                </div>
            )}
        </article>
    );
}
