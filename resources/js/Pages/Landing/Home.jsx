import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import HeroCarousel from '@/Components/Landing/HeroCarousel';
import CategoryProduct from '@/Components/Landing/HeroCategory';
import RecomendMarquee from '@/Components/Products/RecomendMarquee';
import { Star, TrendingUp, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { products } from '@/Constants/Data.Products';
import { getProductDetailSlug } from '@/lib/product';

export default function Home({categories}) {
    const populerItems = products.filter((p) => p.badge === 'Populer');
    const terlarisItems = products.filter((p) => p.badge === 'Terlaris');
    const heroList = [...populerItems, ...terlarisItems].filter((v, i, a) => a.findIndex(x => x.name === v.name) === i).slice(0, 5); // Limit to top 5

    return (
        <>
            <Head title="Tokoku | Marketplace Lokal Terbaik" />

            <LayoutApp pageTitle="Marketplace Lokal">
                
                {/* Hero & Flash Sale Section */}
                <section className="grid gap-6 lg:grid-cols-[2fr_1fr] mb-10">
                    
                    {/* Main Banner Carousel */}
                    <div className="w-full h-full flex min-w-0">
                        <HeroCarousel />
                    </div>

                    {/* Sidebar / Flash Sale / Top Products */}
                    <article className="flex flex-col rounded-2xl border border-border bg-card text-card-foreground p-5 shadow-sm min-w-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-bold">
                                <TrendingUp className="size-5 text-orange-500" />
                                Sedang Tren
                            </h3>
                            <Link href={route('populer')} className="text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400">Lihat Semua</Link>
                        </div>
                        
                        <ul className="flex-1 space-y-3 overflow-hidden">
                            {heroList.map((item, index) => {
                                const detailSlug = getProductDetailSlug(item);
                                if (!detailSlug) return null;

                                return (
                                    <li key={detailSlug} className="group">
                                        <Link
                                            href={route('product.show', { slug: detailSlug })}
                                            className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >
                                            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                                {/* <div className="absolute top-0 left-0 bg-teal-600/90 text-white rounded-br-lg px-1.5 py-0.5 text-[10px] font-bold">{index + 1}</div> */}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="truncate text-sm font-semibold group-hover:text-teal-600 dark:group-hover:text-teal-400">{item.name}</h4>
                                                <p className="mt-1 text-sm font-extrabold text-orange-500">{item.price}</p>
                                            </div>
                                            <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.badge === 'Populer' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'}`}>
                                                {item.badge}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </article>
                </section>

                {/* E-commerce Features */}
                <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { icon: ShieldCheck, title: "100% Aman", desc: "Transaksi terjamin aman" },
                        { icon: Star, title: "Produk Original", desc: "Kualitas UMKM terbaik" },
                        { icon: Clock, title: "Pengiriman Cepat", desc: "Didukung logistik handal" },
                        { icon: Sparkles, title: "Banyak Promo", desc: "Diskon & Cashback tiap hari" }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 rounded-2xl border border-border bg-card text-card-foreground p-4 shadow-sm">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                                <feature.icon className="size-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-bold truncate">{feature.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Kategori Produk */}
                <section className="mb-12">
                    <div className="rounded-2xl border border-border bg-card text-card-foreground p-4 md:p-6 shadow-sm">
                        <CategoryProduct categories={categories}/>
                    </div>
                </section>

                {/* Rekomendasi Produk */}
                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl font-extrabold">Rekomendasi Untukmu</h2>
                        <Link href={route('product')} className="text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400">Lihat semua</Link>
                    </div>
                    <div className="rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm">
                        <RecomendMarquee/>
                    </div>
                </section>

                {/* Review Seller (Optional / Banner) */}
                <section className="mt-16 rounded-3xl bg-linear-to-r from-teal-600 to-emerald-500 p-8 text-center text-white shadow-lg md:p-12">
                    <p className="mx-auto max-w-3xl text-xl font-extrabold leading-relaxed md:text-3xl">
                        "Sejak gabung Tokoku, toko saya dapat pelanggan dari luar kota dan repeat order naik 3x dalam 2 bulan."
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className="size-10 rounded-full bg-white/20"></div>
                        <div className="text-left">
                            <p className="font-bold">Rani</p>
                            <p className="text-sm font-medium text-teal-100">Pemilik Rani Snackbox, Bandung</p>
                        </div>
                    </div>
                </section>

            </LayoutApp>
        </>
    );
}
