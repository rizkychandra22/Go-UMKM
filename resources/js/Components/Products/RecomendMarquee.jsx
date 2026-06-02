import { Link, usePage } from "@inertiajs/react";
import { Eye, ShoppingCart, Sparkles } from "lucide-react";
import { products } from '../../Constants/Data.Products';
import ProductCard from '@/Components/Products/Card';

export default function RecomendMarquee() {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);

    return (
        <>
            <h3 className="text-2xl font-extrabold text-slate-900">
                Rekomendasi Produk Terbaik.
            </h3>
            <p className="mt-2 text-slate-600">Produk unggulan berdasarkan kualitas dan tingkat penjualan teratas.</p>

            <div className="mt-5 overflow-hidden">
                <div 
                    className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                    style={{ animationDuration: `${products.length * 8}s` }}
                >
                    {[...products, ...products].map((p, index) => (
                        <ProductCard
                            key={`${p.name}-${index}`}
                            product={p}
                            isCustomer={isCustomer}
                            className="w-[280px] flex-none sm:w-[320px]"
                            minHeight="420px"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}