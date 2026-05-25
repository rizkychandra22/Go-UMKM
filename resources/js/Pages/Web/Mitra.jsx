import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import { Users, Store, ArrowRight, User } from 'lucide-react'; // Ditambahkan ikon User untuk fallback profil
import BackRightLink from '@/Components/BackRight';

export default function Mitra({ userMitra = [] }) {
    return(
        <>
            <Head title="Go-UMKM | Mitra UMKM" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Seksi Mitra */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    <div className="space-y-6">
                        <BackRightLink
                            title="Jelajahi Mitra Kami"
                            subtitle="Mengenal lebih dekat para penggerak ekonomi kreatif di sekitar kita."
                            icon={Users}
                        />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {userMitra.length > 0 ? (
                                userMitra.map((mitra) => (
                                    <article 
                                        key={mitra.id} 
                                        className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-300 hover:shadow-lg"
                                        style={{ minHeight: '440px' }}
                                    >
                                        {/* Image Container (Foto Sampul Toko / Bisnis) */}
                                        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner flex items-center justify-center">
                                            {mitra.mitra?.image ? (
                                                <img 
                                                    src={mitra.mitra?.image}
                                                    alt={mitra.mitra?.business} 
                                                    className="h-full w-full object-cover" 
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center text-slate-300 gap-2">
                                                    <Store className="size-16 stroke-[1.5]" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Belum Ada Foto</span>
                                                </div>
                                            )}
                                            
                                            <div className="absolute left-3 top-3">
                                                <p className="inline-flex items-center gap-1 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm">
                                                    <Store className="size-3 text-emerald-600" />
                                                    {mitra.mitra?.business || 'Nama Toko'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="flex flex-1 flex-col">
                                            {/* Baris Nama User & Foto Profil Kanan */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1">
                                                    {/* Nama Pemilik Bisnis */}
                                                    <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">
                                                        {mitra.name}
                                                    </h4>
                                                    {/* Sub-label penanda status pemilik */}
                                                    <p className="text-[11px] font-medium inline-flex rounded-full px-2 py-1 text-xs bg-amber-100 text-amber-700">Owner / Seller</p>
                                                </div>

                                                {/* Lingkaran Foto Profil (Sebelah Kanan Nama) */}
                                                <div className="size-13 flex-none overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 flex items-center justify-center shadow-sm">
                                                    {mitra.image ? (
                                                        <img 
                                                            src={mitra.image} 
                                                            alt={mitra.name} 
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="size-5 text-slate-400 stroke-[1.5]" />
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Deskripsi Bisnis */}
                                            <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                                                {mitra.mitra?.description || 'Pelaku UMKM kreatif lokal yang berkomitmen menyajikan produk berkualitas tinggi.'}
                                            </p>

                                            {/* Alamat fiks mengunci di batas bawah konten */}
                                            <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lokasi</p>
                                                <p className="text-sm font-bold text-slate-700 line-clamp-1 max-w-[180px] text-right">
                                                    {mitra.address ?? 'Indonesia'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-4">
                                            <Link 
                                                href="#" 
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-600 border border-emerald-500 hover:text-white transition-colors"
                                            >
                                                Kunjungi Toko
                                                <ArrowRight className="size-4" />
                                            </Link>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <Users className="size-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-sm font-bold text-slate-500">Belum ada mitra terdaftar</p>
                                    <p className="text-xs text-slate-400 mt-1">Kembali lagi nanti untuk melihat pembaruan data pelaku usaha kami.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    )
}