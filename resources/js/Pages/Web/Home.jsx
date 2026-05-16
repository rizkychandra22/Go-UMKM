import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import HeroSection from '../../Components/Home.HeroSection';
import CategoryProduct from '../../Components/Home.HeroCategory';
import RecomendMarquee from '../../Components/Products/RecomendMarquee';
import { LogIn, Eye, Sparkles, Package, Star } from 'lucide-react';

export default function Home({categories}) {
    // Rekomendasi Produk
    const products = [
        {
            name: 'Sambal Cumi Asin Premium',
            description: 'Dimasak perlahan dengan rempah pilihan, tanpa MSG tambahan.',
            badge: 'Terlaris',
            price: 'Rp 40.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kD_MWQFknLUAogk_0JQBxr3mozVNRcaTJg&s',
            category: 'kuliner',
            stock: 10
        },
        {
            name: 'Outer Batik Cap Abstrak',
            description: 'Bahan katun dingin dengan motif eksklusif buatan tangan.',
            badge: 'Populer',
            price: 'Rp 120.000',
            image: 'https://pix.toco.id/resize/w:700,h:700,fit:cover,f:webp,q:85/toco/img/image-1748237122592.png?s=e0f16280ba4f65826fb82a6dfcf11c49cc1622514b8f27f5c840d301091542ae',
            category: 'fashion',
            stock: 5
        },
        {
            name: 'Reed Diffuser Serai Wangi',
            description: 'Aroma menenangkan khas spa Bali untuk ruangan Anda.',
            badge: 'Populer',
            price: 'Rp 80.000',
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/MTA-182114961/aroma_be_young_aroma_be_young_reed_diffuser_aromatherapy_50ml_-_pengharum_ruangan_aromaterapi_pewangi_kamar_premium_gift_murah_dekorasi_rumah_hadiah_full11_e5v8bzb2.webp',
            category: 'home',
            stock: 8
        },
        {
            name: 'Kopi Luwak Single Origin',
            description: 'Kopi premium dengan cita rasa kompleks dan aftertaste panjang.',
            badge: 'Terlaris',
            price: 'Rp 45.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvg8Vbm9R6ZJV0x71NpFl5TrTG38KNtslJg&s',
            category: 'kuliner',
            stock: 15
        },
        {
            name: 'Kerupuk Ikan Khas Daerah',
            description: 'Camilan gurih dengan bahan lokal segar.',
            badge: 'Spesial',
            price: 'Rp 35.000',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcdy2rAVwJT6yh5hGcIRimTulEeDUZYweyw&s',
            category: 'kuliner',
            stock: 20
        },
        {
            name: 'Kerajinan Anyaman Bambu',
            description: 'Wadah serbaguna estetik hasil anyaman tangan pengrajin desa.',
            badge: 'Mewah',
            price: 'Rp 85.000',
            image: 'https://smesta.umkm.go.id/storage/company/25fa2d39a0143f1f30c36eece145a526/product/images/syciHtmeORX8G3WA91L9rTKWKfRD5gjrbNKtkTae.png',
            category: 'fashion',
            stock: 12
        },
        {
            name: 'Sabun Kopi Organik',
            description: 'Eksfoliasi alami dengan aroma kopi asli yang menyegarkan kulit.',
            badge: 'Spesial',
            price: 'Rp 70.000',
            image: 'https://image.made-in-china.com/202f0j00bAWiCvzUfkgj/OEM-Handmade-Exfoliating-Natural-Organic-Coffee-Scrub-Soap-Bar.webp',
            category: 'home',
            stock: 15
        },
    ];

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
