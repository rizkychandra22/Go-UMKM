import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import HeroSection from '../../Components/Home.HeroSection';
import { LogIn, Eye, Sparkles, Package, Star } from 'lucide-react';

export default function Product() {
    return(
        <>
            <Head title="Go-UMKM | Produk Kami" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Populer Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-sky-400">
                    {/* <CategoryProduct categories={categories}/> */}
                    <p>Desain card untuk menampilkan semua produk yang tersedia.</p>
                </section>
            </LayoutApp>
        </>
    )
}