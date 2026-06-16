import { Link, usePage } from '@inertiajs/react';
import { HandPlatter, House, Shirt, ShoppingBasket, LayoutDashboard } from 'lucide-react';
import { route } from 'ziggy-js';
import BackRightLink from '@/Components/Shared/BackRight';
import { Badge } from '@/Components/UI/badge';

export default function CategoryProduct({ categories }) {
    // Kategori Product
    const getStyle = (slug) => {
        const styles = {
            'kuliner-lokal': { icon: HandPlatter, tone: 'from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-slate-900' },
            'trending-fashion': { icon: Shirt, tone: 'from-pink-50 to-rose-100 dark:from-rose-950/40 dark:to-slate-900' },
            'rumah-dekor': { icon: House, tone: 'from-sky-50 to-sky-100 dark:from-sky-950/40 dark:to-slate-900' },
            'kebutuhan-harian': { icon: ShoppingBasket, tone: 'from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-slate-900' },
        };
        // Pengaman: Jika slug tidak terdaftar di hardcode ini, beri style default
        return styles[slug] ?? { icon: LayoutDashboard, tone: 'from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900' };
    };

    const { url } = usePage();
    const isHome = url === '/';
    // Diubah agar mendeteksi halaman /category maupun /mitra kamu
    const isCategory = url.startsWith('/category') || url.startsWith('/mitra');

    return (
        <>
            <div className="flex items-end justify-between gap-3">
                {isHome && (
                    <div>
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Kategori Produk</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">Pilih sesuai kebutuhan: kuliner harian sampai hampers premium.</p>
                    </div>
                )}

                {/* Tombol Kembali & Header */}
                {isCategory && (
                    <BackRightLink
                        title="Kategori Produk"
                        subtitle="Pilih sesuai kebutuhan: kuliner harian sampai hampers premium."
                        icon={LayoutDashboard}
                    />
                )}
            </div>

            <div className="mt-4 flex flex-nowrap gap-3 overflow-x-auto pb-2 pt-2 [scrollbar-width:none][&::-webkit-scrollbar]:hidden">
                {categories.map((item) => {
                    const style = getStyle(item.slug);
                    const Icon = style.icon;
                    const tone = style.tone;
                    
                    // Di sini diarahkan ke route category kamu bawaan backend
                    const href = route('category', { slug: item.slug });

                    return (
                        <Link
                            href={href}
                            key={item.id}
                            className={`shrink-0 w-[140px] sm:w-[240px] lg:w-auto lg:flex-1 rounded-3xl border border-slate-200 bg-gradient-to-br ${tone} p-4 transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg dark:border-slate-800 dark:hover:border-teal-500 dark:hover:shadow-slate-950/40`}
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="grid size-11 place-content-center rounded-2xl bg-slate-900 text-white dark:bg-teal-600">
                                        <Icon className="size-4" />
                                    </div>
                                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 leading-tight">{item.name}</h4>
                                </div>
                                <p className="text-[11px] sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2 sm:line-clamp-none">{item.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
