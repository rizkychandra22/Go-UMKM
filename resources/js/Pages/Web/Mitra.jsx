import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import { Users } from 'lucide-react';
import BackRightLink from '@/Components/BackRight';

export default function Mitra() {
    return(
        <>
            <Head title="Go-UMKM | Mitra UMKM" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Populer Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    <BackRightLink
                        title="Jelajahi Mitra Kami"
                        subtitle="Mengenal lebih dekat para penggerak ekonomi kreatif di sekitar kita."
                        icon={Users}
                    />
                </section>
            </LayoutApp>
        </>
    )
}