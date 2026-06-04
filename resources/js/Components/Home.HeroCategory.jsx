import { Link, usePage } from '@inertiajs/react';
import { HandPlatter, House, Shirt, ShoppingBasket, LayoutDashboard } from 'lucide-react';
import { route } from 'ziggy-js';
import BackRightLink from './BackRight';

export default function CategoryProduct({ categories }) {
    // Kategori Product
    const getStyle = (slug) => {
        const styles = {
            'kuliner-lokal': { icon: HandPlatter, tone: 'from-amber-50 to-amber-100' },
            'trending-fashion': { icon: Shirt, tone: 'from-pink-50 to-rose-100' },
            'rumah-dekor': { icon: House, tone: 'from-sky-50 to-sky-100' },
            'kebutuhan-harian': { icon: ShoppingBasket, tone: 'from-emerald-50 to-emerald-100' },
        };
        // Pengaman: Jika slug tidak terdaftar di hardcode ini, beri style default
        return styles[slug] ?? { icon: LayoutDashboard, tone: 'from-slate-50 to-slate-200' };
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
                        <h3 className="text-2xl font-extrabold text-slate-900">Kategori Produk</h3>
                        <p className="mt-2 text-slate-600">Pilih sesuai kebutuhan: kuliner harian sampai hampers premium.</p>
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

            <div className="mt-5 flex flex-nowrap gap-3 overflow-x-auto pb-2 [scrollbar-width:none][&::-webkit-scrollbar]:hidden">
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
                            className={`shrink-0 w-[140px] sm:w-[240px] lg:w-auto lg:flex-1 rounded-2xl border border-slate-200 bg-gradient-to-br ${tone} p-3 sm:p-4 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg`}
                        >
                            <div className="flex-col sm:flex-row flex items-start sm:items-center gap-2 sm:gap-4">
                                <div className="inline-flex rounded-xl bg-slate-900 p-1.5 sm: p-2 text-white">
                                    <Icon className="size-4" />
                                </div>
                                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">{item.name}</h4>
                            </div>
                            <p className="mt-2 sm:mt-3 text-[10px] sm:text-sm leading-relaxed sm:leading-6 text-slate-600 line-clamp-2 sm:line-clamp-none">{item.description}</p>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}