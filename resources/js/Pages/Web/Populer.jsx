import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { LogIn, Eye, Sparkles, Package, Star } from 'lucide-react';

export default function Populer() {
    return(
        <>
            <Head title="Go-UMKM | Produk Populer" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Populer Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
                    {/* <CategoryProduct categories={categories}/> */}
                    <p>Desain card untuk menampilkan produk populer.</p>
                </section>
            </LayoutApp>
        </>
    )
}