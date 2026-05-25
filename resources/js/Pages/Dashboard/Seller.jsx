import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    ArrowRight, BellRing, House, LogOut,
    Sparkles, PlusCircle, Package, ClipboardList,
    LayoutDashboard, Edit, TrendingUp
} from 'lucide-react';
import CardHelloDashboard from '../../Components/Dashboard.HeroSection';
import LayoutApp from '../../Layouts/App';
import { products as myProducts } from '../../Constants/Data.Products';
import { orders as incomingOrders } from '../../Constants/Data.Orders';

export default function DashboardSeller() {
    return (
        <>
            <Head title="Go-UMKM | Dashboard" />
            <LayoutApp pageTitle="Dashboard Seller">
                {/* Hero Section */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    <CardHelloDashboard />
                </section>

                {/* Produk Saya */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    <h3 className="text-2xl font-extrabold text-slate-900">Produk Saya</h3>
                    <p className="mt-1 text-slate-600">Pantau ketersediaan stok produk Anda.</p>
                    
                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${myProducts.length * 8}s` }}
                        >
                            {[...myProducts, ...myProducts].map((product, index) => (
                                <article key={`${product.id}-${index}`} className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]">
                                    <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img src={product.image} className="h-full w-full object-cover" />
                                        <div className="absolute left-3 top-3">
                                            <p className="inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase text-teal-700 shadow-sm">
                                                {product.badge} | Stok: {product.stock}
                                            </p>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{product.name}</h4>
                                    <p className="mt-auto pt-3 text-lg font-bold text-slate-900">{product.price}</p>
                                    <div className="mt-4 flex gap-2">
                                        <Link href="#" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-600 border border-teal-500 hover:text-white transition-colors">
                                            <Edit className="size-4" />
                                            Edit Produk
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pesanan Masuk */}
                <section className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    <h3 className="text-2xl font-extrabold text-slate-900">Pesanan Masuk</h3>
                    <p className="mt-2 text-slate-600">Daftar pesanan yang perlu diproses.</p>

                    {/* Grid 2 Kolom Pesanan */}
                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {incomingOrders.map((order) => (
                            <div key={order.id} className="flex items-center gap-4 rounded-2xl border border-slate-300 bg-white p-4 transition-all hover:border-teal-300 hover:shadow-md">
                                <div className="size-20 flex-none overflow-hidden rounded-xl bg-slate-50">
                                    <img src={order.image} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{order.id}</span>
                                        <span className="text-[10px] text-slate-400">{order.date}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{order.product}</h4>
                                    <p className="text-xs text-slate-500">Pembeli: <span className="text-slate-800 font-medium">{order.customer}</span></p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-sm font-black text-slate-900">
                                            {order.price}
                                            <span className="ml-2 text-xs font-medium text-slate-500">· {order.qty} pcs</span>
                                        </p>
                                        <Link className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:gap-2 transition-all">
                                            Proses Pesanan <ArrowRight className="size-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}