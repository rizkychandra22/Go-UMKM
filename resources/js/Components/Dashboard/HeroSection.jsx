import { usePage } from "@inertiajs/react";
import { BellRing, ShoppingBasket, Sparkles, TrendingUp } from "lucide-react";

export default function CardHelloDashboard() {
    const { auth } = usePage().props ?? {};

    return(
        <>
            {auth?.user?.role === 'seller' ? (
                <div className="grid items-center gap-4 md:grid-cols-[1.4fr_0.6fr]">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                            <TrendingUp className="size-4" />
                            Mitra Usaha Digital
                        </p>
                        <h2 className="mt-3 flex items-center gap-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                            <Sparkles className="size-8 text-teal-600 sm:size-10 " />
                            Kelola Bisnis Anda Dengan Lebih Mudah dan Efisien
                        </h2>
                        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
                            Kelola produk dan stok Anda dengan mudah melalui platform digital kami.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-orange-50 p-5 dark:bg-gradient-to-br dark:from-teal-900/10 dark:to-orange-900/10">
                        <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Saldo Penjualan</p>
                        <p className="mt-1 text-3xl font-black text-teal-700 dark:text-slate-100">Rp 4.250.000</p>
                        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                            <BellRing className="size-4 text-orange-500 dark:text-orange-400" /> 5 Pesanan baru belum diproses
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid items-center gap-4 md:grid-cols-[1.4fr_0.6fr]">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                            <ShoppingBasket className="size-4" />
                            Halaman utama pelanggan
                        </p>
                        <h2 className="mt-3 flex items-center gap-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                            <Sparkles className="size-8 text-teal-600 sm:size-10" />
                            Selamat Datang di Pusat Belanja UMKM Favorit Kamu
                        </h2>
                        <p className="mt-3 text-base leading-7 text-slate-600">
                            Dukung ekonomi lokal dengan satu klik. Pantau status pesanan dan temukan kurasi produk terbaik minggu ini.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-orange-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Notifikasi</p>
                        <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <BellRing className="size-4 text-orange-500" />
                            7 Produk rekomendasi untuk kamu
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}