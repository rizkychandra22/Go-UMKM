import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import HeroSection from '@/Components/UI/Landing/Auth.HeroSection';
import CategoryProduct from '@/Components/UI/Landing/HeroCategory';
import RecomendMarquee from '@/Components/Products/RecomendMarquee';
import { LogIn, Eye, Sparkles, Package, Star } from 'lucide-react';
import { products } from '@/Constants/Data.Products';

export default function Home({categories}) {
    const populerItems = products.filter((p) => p.badge === 'Populer');
    const terlarisItems = products.filter((p) => p.badge === 'Terlaris');
    const heroList = [...populerItems, ...terlarisItems].filter((v, i, a) => a.findIndex(x => x.name === v.name) === i);

    return (
        <>
            <Head title="Go-UMKM | Home" />

            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Hero Section */}
                <section className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr]">

                    <HeroSection type="home" />

                    <article className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-amber-400">
                        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Produk Populer & Terlaris Saat Ini</p>
                        <ul className="mt-4 space-y-3">
                            {heroList.map((item) => (
                                <li
                                    key={item.name}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                                >
                                    <span className="text-sm font-semibold text-slate-600">{item.name}</span>
                                    <span className={`ml-2 mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${item.badge === 'Populer' ? 'bg-amber-100 text-amber-700' : item.badge === 'Terlaris' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-700'}`}>{item.badge}</span>
                                    <strong className="ml-auto text-sm font-extrabold text-slate-900">{item.price}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-800">
                            <Star className="size-4" />
                            Dapatkan produk unggulan anda sekarang juga
                        </p>
                    </article>
                </section>

                {/* Kategori Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-rose-400">
                    <CategoryProduct categories={categories}/>
                </section>

                {/* Rekomendasi Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-sky-400">
                    <RecomendMarquee/>
                </section>

                {/* Review Seller */}
                <section className="glass-panel fade-in-up-delay p-6 text-center sm:p-8 border-t-4 border-t-slate-500">
                    <p className="mx-auto max-w-3xl text-xl font-extrabold leading-relaxed text-slate-900 sm:text-2xl">
                        "Sejak gabung Go-Umkm, toko saya dapat pelanggan dari luar kota dan repeat order naik 3x dalam 2 bulan."
                    </p>
                    <p className="mt-3 font-medium text-slate-600">Rani - Pemilik Rani Snackbox, Bandung</p>
                </section>

            </LayoutApp>
        </>
    );
}
