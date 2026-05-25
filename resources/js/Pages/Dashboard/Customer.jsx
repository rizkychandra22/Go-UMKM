import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    ArrowRight, BadgePercent, BellRing, House,
    LogOut, ShoppingBasket, Sparkles, LayoutDashboard,
    Package, ClipboardList, ShoppingCart, Minus, Plus,
} from 'lucide-react';
import CardHelloDashboard from '../../Components/Dashboard.HeroSection';
import LayoutApp from '../../Layouts/App';
import RecomendMarquee from '../../Components/Products/RecomendMarquee';
import { shoppingCart as cartItems } from '../../Constants/Data.ShoppingCarts';
import { orderUsers as orders } from '../../Constants/Data.Order.Users';

export default function Dashboard() {
    return (
        <>
            <Head title="Go-UMKM | Dashboard"/>

            <LayoutApp pageTitle="Dashboard Customer">

                {/* Hero Section */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
                    <CardHelloDashboard/>
                </section>

                {/* Rekomendasi Produk */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
                    <RecomendMarquee/>
                </section>

                {/* Keranjang Customer */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-indigo-400">
                    <h3 className="text-2xl font-extrabold text-slate-900">Keranjang</h3>
                    <p className="mt-2 text-slate-600">Ringkasan produk yang sudah kamu pilih sebelum checkout.</p>

                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${cartItems.length * 8}s` }}
                        >
                            {[...cartItems, ...cartItems].map((item, index) => (
                                <article
                                    key={`${item.id}-${index}`}
                                    className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]"
                                    style={{ minHeight: '400px' }}
                                >
                                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{item.name}</h4>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-1">{item.detail}</p>
                                        <p className="text-sm text-slate-500">Stok penjual: {item.stock}</p>
                                        <p className="mt-auto pt-3 text-lg font-bold text-slate-900">{item.price}</p>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <button type="button" onClick={() => {}} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-800">
                                            <ShoppingCart className="size-4" />
                                            Checkout
                                        </button>

                                        <div className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1">
                                            <button type="button" onClick={() => {}} className="inline-flex items-center justify-center p-1 text-slate-600 hover:bg-slate-100 rounded" aria-label="Decrease">
                                                <Minus className="size-4" />
                                            </button>
                                            <div className="px-3 text-sm font-bold text-slate-900">{item.qty}</div>
                                            <button type="button" onClick={() => {}} className="inline-flex items-center justify-center p-1 text-slate-600 hover:bg-slate-100 rounded" aria-label="Increase">
                                                <Plus className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Pesanan Customer */}
                <section className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-indigo-400">
                    <h3 className="text-2xl font-extrabold text-slate-900">Pesanan</h3>
                    <p className="mt-2 text-slate-600">Daftar produk yang kamu pesanan saat ini.</p>

                    <div className="mt-5 overflow-hidden">
                        <div 
                            className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] pb-4"
                            style={{ animationDuration: `${orders.length * 8}s` }}
                        >
                            {[...orders, ...orders].map((order, index) => (
                                <article
                                    key={`${order.id}-${index}`}
                                    className="flex w-[280px] flex-none flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg sm:w-[320px]"
                                    style={{ minHeight: '400px' }}
                                >
                                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                                        <img src={order.image} alt={order.product} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h4 className="mt-3 text-lg font-extrabold text-slate-900 line-clamp-1">{order.product}</h4>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-1">Tanggal: {order.date}</p>
                                        <p className="mt-auto pt-3 text-lg font-bold text-slate-900">{order.price}</p>
                                    </div>
                                    <div className="mt-4">
                                        <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800">Lihat Detail<ArrowRight className="size-4" /></Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    )
}
