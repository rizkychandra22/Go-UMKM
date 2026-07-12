import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import { Users, Store, ArrowRight, User } from 'lucide-react';
import PageHeader from '@/Components/Shared/PageHeader';

export default function Mitra({ userMitra = [] }) {
    return(
        <>
            <Head title="Tokoku | Mitra UMKM" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                {/* Seksi Mitra */}
                <section className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="space-y-6">
                        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                            <PageHeaderLink
                                title="Jelajahi Mitra Kami"
                                subtitle="Mengenal lebih dekat para penggerak ekonomi kreatif di sekitar kita."
                                icon={Users}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                            {userMitra.length > 0 ? (
                                userMitra.map((mitra) => (
                                    <article 
                                        key={mitra.id} 
                                        className="group flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-teal-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500"
                                    >
                                        {/* Image Container (Foto Sampul Toko / Bisnis) */}
                                        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm flex items-center justify-center dark:bg-slate-950">
                                            {mitra.mitra?.image ? (
                                                <img 
                                                    src={mitra.mitra?.image}
                                                    alt={mitra.mitra?.business} 
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center text-slate-300 gap-2 dark:text-slate-700">
                                                    <Store className="size-16 stroke-[1.5]" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">Belum Ada Foto</span>
                                                </div>
                                            )}
                                            
                                            <div className="absolute left-2 top-2">
                                                <p className="inline-flex items-center gap-1 rounded-sm bg-white/95 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-slate-700 shadow-sm dark:bg-slate-900/95 dark:text-slate-200">
                                                    <Store className="size-3 text-teal-600 dark:text-teal-400" />
                                                    <span className="truncate max-w-[100px]">{mitra.mitra?.business || 'Nama Toko'}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="flex flex-1 flex-col">
                                            {/* Baris Nama User & Foto Profil Kanan */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    {/* Nama Pemilik Bisnis */}
                                                    <h4 className="text-sm font-extrabold text-slate-900 line-clamp-1 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                                        {mitra.name}
                                                    </h4>
                                                    {/* Sub-label penanda status pemilik */}
                                                    <p className="mt-1 text-[10px] font-bold uppercase inline-flex rounded-sm px-1.5 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">Owner</p>
                                                </div>

                                                {/* Lingkaran Foto Profil (Sebelah Kanan Nama) */}
                                                <div className="size-10 flex-none overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 flex items-center justify-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
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
                                            <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2 dark:text-slate-400">
                                                {mitra.mitra?.description || 'Pelaku UMKM kreatif lokal yang berkomitmen menyajikan produk berkualitas tinggi.'}
                                            </p>

                                            {/* Alamat fiks mengunci di batas bawah konten */}
                                            <div className="mt-auto pt-3 flex items-center justify-between">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lokasi</p>
                                                <p className="text-xs font-bold text-slate-700 line-clamp-1 max-w-[120px] text-right dark:text-slate-300">
                                                    {mitra.address ?? 'Indonesia'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                                            <Link 
                                                href="#" 
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-50 py-2 text-xs font-bold text-teal-700 hover:bg-teal-600 border border-teal-200 hover:border-teal-600 hover:text-white transition-colors dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800 dark:hover:bg-teal-600 dark:hover:text-white"
                                            >
                                                Kunjungi Toko
                                                <ArrowRight className="size-3" />
                                            </Link>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 dark:bg-slate-900/30">
                                    <div className="size-16 rounded-full bg-slate-200/50 flex items-center justify-center mb-4 dark:bg-slate-800/50">
                                        <Users className="size-8 text-slate-400 dark:text-slate-500" />
                                    </div>
                                    <p className="text-base font-bold text-slate-700 dark:text-slate-300">Belum ada mitra terdaftar</p>
                                    <p className="text-sm text-slate-500 mt-1 max-w-sm dark:text-slate-400">Kembali lagi nanti untuk melihat pembaruan data pelaku usaha kami.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    )
}
