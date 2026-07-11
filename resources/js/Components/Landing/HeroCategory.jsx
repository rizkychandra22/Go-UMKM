import { Link, usePage } from '@inertiajs/react';
import { HandPlatter, House, Shirt, ShoppingBasket, LayoutDashboard } from 'lucide-react';
import { route } from 'ziggy-js';
import BackRightLink from '@/Components/Shared/BackRight';
import { Badge } from '@/Components/UI/badge';

export default function CategoryProduct({ categories }) {
    // Kategori Product
    const getStyle = (slug) => {
        const styles = {
            'kuliner-lokal': { icon: HandPlatter, tone: 'from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-950/60' },
            'trending-fashion': { icon: Shirt, tone: 'from-pink-50 to-rose-100 dark:from-rose-900/40 dark:to-rose-950/60' },
            'rumah-dekor': { icon: House, tone: 'from-sky-50 to-sky-100 dark:from-sky-900/40 dark:to-sky-950/60' },
            'kebutuhan-harian': { icon: ShoppingBasket, tone: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-950/60' },
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
                        <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Kategori Pilihan</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Pilih sesuai kebutuhan: kuliner harian sampai hampers premium.</p>
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

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                            className={`rounded-2xl border border-border bg-gradient-to-br ${tone} p-3 sm:p-4 transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-md dark:hover:border-teal-500`}
                        >
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <div className="grid size-10 sm:size-11 place-content-center rounded-xl bg-slate-900 text-white dark:bg-teal-600 shrink-0">
                                        <Icon className="size-4 sm:size-5" />
                                    </div>
                                    <h4 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">{item.name}</h4>
                                </div>
                                <p className="text-[11px] sm:text-xs leading-relaxed text-muted-foreground line-clamp-2">{item.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
