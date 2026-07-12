import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import LayoutApp from '@/Layouts/App';
import { ShoppingCart, Package, Star, Store, ShieldCheck, Truck } from 'lucide-react';

import { products } from '@/Constants/products'; 
import PageHeader from '@/Components/Shared/PageHeader';
import { findProductBySlug } from '@/lib/product';

export default function ProductDetail({ productSlug }) {
    const [quantity, setQuantity] = useState(1);

    const product = findProductBySlug(products, productSlug);

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
            <Head title={`Tokoku | ${product.name}`} />

            <LayoutApp pageTitle="Detail Produk">

                <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
                    {/* SISI KIRI: Gambar Produk */}
                    <section className="flex flex-col justify-center items-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                        <div className="mb-6 w-full self-start">
                            <PageHeaderLink
                                title="Kembali ke Produk"
                                subtitle="Lihat katalog produk UMKM lainnya."
                                icon={Package}
                                backRoute="product"
                            />
                        </div>
                        <div className="aspect-square w-full max-w-[450px] overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 dark:border-slate-800 dark:bg-slate-950/50">
                            <img
                                src={product.image} 
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </section>

                    {/* SISI KANAN: Informasi & Transaksi */}
                    <section className="flex flex-col justify-between space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 flex-1">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-sm bg-teal-100 px-2.5 py-1 text-xs font-bold text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-orange-500">
                                    <Star className="size-4 fill-orange-500" />
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.8</span>
                                </div>
                            </div>

                            <h1 className="mt-4 text-2xl font-black leading-tight text-slate-900 dark:text-white sm:text-3xl">
                                {product.name}
                            </h1>
                            <p className="mt-4 text-3xl font-black text-orange-500">
                                {product.price}
                            </p>

                            <hr className="my-6 border-slate-100 dark:border-slate-800" />

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Deskripsi Produk</h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                                <div className="grid size-12 place-content-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                                    <Store className="size-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Penjual</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Mitra Tokoku</p>
                                </div>
                                <Link href="#" className="px-4 py-2 text-xs font-bold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/30">
                                    Kunjungi Toko
                                </Link>
                            </div>
                        </div>

                        {/* Kotak Pembelian */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Atur Jumlah:</span>
                                    <div className="flex items-center rounded-xl border border-slate-200 p-1 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50">
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange('decrement')}
                                            className="size-8 flex items-center justify-center font-bold text-slate-500 hover:text-orange-500 hover:bg-white rounded-lg transition dark:hover:bg-slate-800"
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center text-sm font-bold text-slate-900 dark:text-white">
                                            {quantity}
                                        </span>
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange('increment')}
                                            className="size-8 flex items-center justify-center font-bold text-slate-500 hover:text-teal-500 hover:bg-white rounded-lg transition dark:hover:bg-slate-800"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 ml-1">Stok: <span className="font-bold">{product.stock}</span></span>
                                </div>

                                <button
                                    type="button"
                                    className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-700 hover:shadow-none focus-visible:outline-teal-600"
                                >
                                    <ShoppingCart className="size-4" />
                                    + Keranjang
                                </button>
                            </div>

                            <div className="mt-5 flex items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-teal-500" /> 100% Produk Original</span>
                                <span className="flex items-center gap-1.5"><Truck className="size-4 text-orange-500" /> Pengiriman Cepat</span>
                            </div>
                        </div>
                    </section>
                </div>
            </LayoutApp>
        </>
    );
}
