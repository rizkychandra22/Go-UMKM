import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { LogIn, Eye, Sparkles, Package, Star } from 'lucide-react';

export default function Mitra() {
    return(
        <>
            <Head title="Go-UMKM | Mitra UMKM" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Populer Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    {/* <CategoryProduct categories={categories}/> */}
                    <p>Desain card untuk menampilkan mitra UMKM.</p>
                </section>
            </LayoutApp>
        </>
    )
}