import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import CategoryProduct from '../../Components/Home.HeroCategory';
import { LogIn, Eye, Sparkles, Package, Star } from 'lucide-react';

export default function Mitra({categories, slug}) {
    const selected = slug ? categories.find((c) => c.slug === slug) : null;

    return(
        <>
            <Head title="Go-UMKM | Mitra UMKM" />

            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Kategori Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-teal-400">
                    {selected && (
                        <p className="mb-4 text-lg font-semibold text-slate-700">Menampilkan produk berdasarkan kategori: {selected.name}</p>
                    )}
                    <CategoryProduct categories={categories}/>
                </section>

                {/* Produk berdasarkan kategori */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-amber-400">
                    {/* <CategoryProduct categories={categories}/> */}
                    <p>Desain card untuk menampilkan data produk berdasarkan kategori yang dipilih.</p>
                </section>
            </LayoutApp>
        </>
    )
}