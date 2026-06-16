import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import { ShoppingCart, ArrowLeft, Star, Store, ShieldCheck, Truck } from 'lucide-react';

// 1. IMPORT DATA PRODUK KAMU DI SINI
import { products } from '@/Constants/Data.Products'; 

export default function ProductDetail({ productId }) {
    const [quantity, setQuantity] = useState(1);

    // 2. CARI PRODUKNYA BERDASARKAN ID YANG DIKIRIM LARAVEL
    const product = products.find((p) => p.id === productId);

    // Jika ID ngawur / tidak ketemu di data konstanta
    if (!product) {
        return (
            <LayoutApp pageTitle="Produk Tidak Ditemukan">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-slate-700">Waduh, produknya nggak ada!</h2>
                    <Link href="/" className="mt-4 inline-block text-teal-600 font-semibold hover:underline">Kembali ke Home</Link>
                </div>
            </LayoutApp>
        );
    }

    const handleQuantityChange = (type) => {
        if (type === 'increment') setQuantity(prev => prev + 1);
        if (type === 'decrement' && quantity > 1) setQuantity(prev => prev - 1);
    };

    return (
        <>
            <Head title={`Go-UMKM | ${product.name}`} />

            <LayoutApp pageTitle="Detail Produk">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke Home
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* SISI KIRI: Gambar Produk */}
                    <section className="glass-panel p-4 flex flex-col justify-center items-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/70">
                        <div className="aspect-square w-full max-w-[450px] overflow-hidden rounded-xl bg-slate-50">
                            <img
                                src={product.image} 
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </section>

                    {/* SISI KANAN: Informasi & Transaksi */}
                    <section className="flex flex-col justify-between space-y-6">
                        <div className="glass-panel p-6 sm:p-8 border-t-4 border-t-teal-500 bg-white dark:bg-slate-950/70 rounded-2xl">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="size-4 fill-amber-500" />
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.8</span>
                                </div>
                            </div>

                            <h1 className="mt-3 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                                {product.name}
                            </h1>
                            <p className="mt-4 text-3xl font-black text-teal-600 dark:text-teal-400">
                                {product.price}
                            </p>

                            <hr className="my-6 border-slate-100 dark:border-slate-800" />

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">Deskripsi Produk</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                                <div className="grid size-10 place-content-center rounded-lg bg-teal-100 text-teal-700">
                                    <Store className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Penjual</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Mitra Go-UMKM</p>
                                </div>
                            </div>
                        </div>

                        {/* Kotak Pembelian */}
                        <div className="glass-panel p-6 bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-500">Jumlah:</span>
                                    <div className="flex items-center rounded-xl border border-slate-200 p-1 dark:border-slate-800">
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange('decrement')}
                                            className="px-3 py-1 font-bold text-slate-600 hover:text-red-500 transition"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">
                                            {quantity}
                                        </span>
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange('increment')}
                                            className="px-3 py-1 font-bold text-slate-600 hover:text-teal-500 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-xs text-slate-400 ml-2">Sisa stok: {product.stock}</span>
                                </div>

                                <button
                                    type="button"
                                    className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 hover:shadow-none"
                                >
                                    <ShoppingCart className="size-4" />
                                    Masukkan Keranjang
                                </button>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
                                <span className="flex items-center gap-1"><ShieldCheck className="size-3.5 text-teal-500" /> Produk Ori Lokal</span>
                                <span className="flex items-center gap-1"><Truck className="size-3.5 text-blue-500" /> Mitra Pilihan</span>
                            </div>
                        </div>
                    </section>
                </div>
            </LayoutApp>
        </>
    );
}