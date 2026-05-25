import { Link, usePage } from '@inertiajs/react';
import { HandPlatter, House, Shirt, ShoppingBasket, LayoutDashboard } from 'lucide-react';
import { route } from 'ziggy-js';
import BackRightLink from './BackRight';

export default function CategoryProduct({categories}) {
    // Kategori Product
    const getStyle = (slug) =>{
        const styles = {
            'kuliner-lokal': { icon: HandPlatter, tone: 'from-amber to-amber-100' },
            'trending-fashion': { icon: Shirt, tone: 'from-pink to-rose-100' },
            'rumah-dekor': { icon: House, tone: 'from-sky to-sky-100' },
            'kebutuhan-harian': { icon: ShoppingBasket, tone: 'from-emerald to-emerald-100' },
        };
        return styles[slug];
    };

    const { url } = usePage();
    const isHome = url === '/';
    const isCategory = url.startsWith('/category');

    return(
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

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((item) => {
                    const style = getStyle(item.slug);
                    const Icon = style.icon;
                    const tone = style.tone;
                    const href = route('category', { slug: item.slug });

                    return (
                        <Link
                            href={href}
                            key={item.id}
                            className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${tone} p-4 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg`}
                        >
                            <div className="inline-flex rounded-xl bg-slate-900 p-2 text-white">
                                <Icon className="size-4" />
                            </div>
                            <h4 className="mt-3 text-base font-extrabold text-slate-900">{item.name}</h4>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
