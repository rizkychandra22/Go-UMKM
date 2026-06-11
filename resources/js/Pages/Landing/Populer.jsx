import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { Sparkles, Package } from 'lucide-react';
import ProductCard from '@/Components/Products/Card';
import { useState } from 'react';
import { products } from '@/Constants/Data.Products';
import BackRightLink from '@/Components/Shared/BackRight';

export default function Populer() {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);
    const [activeTab, setActiveTab] = useState('Populer');
    const displayedProducts = products.filter(product => product.badge === activeTab);

    return (
        <>
            <Head title="Go-UMKM | Produk Kami" />
            
            <LayoutApp pageTitle="Marketplace Lokal">
                <section className="glass-panel fade-in-up border-t-4 border-t-indigo-400 p-6 sm:p-8">
                    <div className="space-y-6">
                        
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <BackRightLink 
                                    title="Produk Terlaris & Populer"
                                    subtitle="Produk unggulan yang paling banyak diminati."
                                    icon={Sparkles}
                                />
                            </div>

                            {/* --- Switch Button Tanpa Icon & Warna Amber --- */}
                            <div className="inline-flex w-full items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-inner sm:w-auto">
                                <button
                                    onClick={() => setActiveTab('Terlaris')}
                                    className={`flex-1 sm:flex-none flex items-center justify-center rounded-lg px-5 py-1.5 text-sm font-bold transition-all duration-200 ${
                                        activeTab === 'Terlaris'
                                        ? 'bg-teal-600 text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                                >
                                    Terlaris
                                </button>
                                <button
                                    onClick={() => setActiveTab('Populer')}
                                    className={`flex-1 sm:flex-none flex items-center justify-center rounded-lg px-5 py-1.5 text-sm font-bold transition-all duration-200 ${
                                        activeTab === 'Populer'
                                        ? 'bg-teal-600 text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                                >
                                    Populer
                                </button>
                            </div>
                        </div>

                        {/* --- Grid Produk --- */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {displayedProducts.length > 0 ? (
                                displayedProducts.map((p, i) => (
                                    <ProductCard key={`${p.name}-${i}`} product={p} isCustomer={isCustomer} />
                                ))
                            ) : (
                                <div className="col-span-full py-16 text-center">
                                    <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-3">
                                        <Package className="size-6" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">Belum ada produk di kategori tab "{activeTab}".</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}