import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import {
    ArrowRight, BellRing, House, LogOut,
    Sparkles, PlusCircle, Package, ClipboardList,
    LayoutDashboard, Edit, TrendingUp, RotateCcw, FilterX,
    CreditCard, Banknote, Wallet, CheckCircle2, ReceiptText, Clock
} from 'lucide-react';
import CardHelloDashboard from '../../Components/Dashboard.HeroSection';
import LayoutApp from '../../Layouts/App';
import { products as myProducts } from '../../Constants/Data.Products';
import { orders as incomingOrders } from '../../Constants/Data.Orders';
import { FilterBadge, FilterCategory, SearchBar, FilterStatusOrder, FilterPaymentOrder } from '@/Components/FilterData';

export default function DashboardSeller({ categories = [] }) {
    // STATE FILTER KHUSUS DATA PRODUK SAYA
    const [searchProdQuery, setSearchProdQuery] = useState('');
    const [selectedProdCategory, setSelectedProdCategory] = useState('');
    const [selectedProdBadge, setSelectedProdBadge] = useState('');

    // STATE FILTER KHUSUS DATA PESANAN MASUK
    const [searchOrderQuery, setSearchOrderQuery] = useState('');
    const [selectedOrderStatus, setSelectedOrderStatus] = useState('');
    const [selectedOrderPayment, setSelectedOrderPayment] = useState('');

    // STATE FILTER KHUSUS DATA PEMBAYARAN
    const [searchPayQuery, setSearchPayQuery] = useState('');
    const [selectedPayStatus, setSelectedPayStatus] = useState('');

    // MOCK DATA PEMBAYARAN (Contoh data transaksi keuangan)
    const paymentHistory = [
        { id: 'PAY-9901', date: '2023-11-01', amount: 'Rp 450.000', method: 'Transfer', status: 'completed', customer: 'Rian Perdana' },
        { id: 'PAY-9902', date: '2023-11-02', amount: 'Rp 85.000', method: 'Cash', status: 'completed', customer: 'Siti Sarah' },
        { id: 'PAY-9903', date: '2023-11-02', amount: 'Rp 120.000', method: 'Transfer', status: 'pending', customer: 'Budi Utomo' },
        { id: 'PAY-9904', date: '2023-11-03', amount: 'Rp 210.000', method: 'Transfer', status: 'cancelled', customer: 'Andi Wijaya' },
    ];

    // LOGIKA MULTI-FILTER REALTIME: PRODUK SAYA
    const filteredProducts = myProducts.filter(product => {
        const searchLower = searchProdQuery.toLowerCase();
        const matchesSearch = 
            product.name.toLowerCase().includes(searchLower) ||
            (product.badge && product.badge.toLowerCase().includes(searchLower)) ||
            (product.description && product.description.toLowerCase().includes(searchLower));
        
        const productCategoryStr = typeof product.category === 'object' ? product.category?.slug : product.category;
        const matchesCategory = selectedProdCategory ? productCategoryStr === selectedProdCategory : true;
        const matchesBadge = selectedProdBadge ? product.badge === selectedProdBadge : true;
        
        return matchesSearch && matchesCategory && matchesBadge;
    });

    // LOGIKA MULTI-FILTER REALTIME: PESANAN MASUK
    const filteredOrders = incomingOrders.filter(order => {
        const matchesSearch = 
            order.id.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
            order.product.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchOrderQuery.toLowerCase());

        const matchesStatus = selectedOrderStatus ? order.status?.toLowerCase() === selectedOrderStatus.toLowerCase() : true;
        const matchesPayment = selectedOrderPayment ? order.payment?.toLowerCase() === selectedOrderPayment.toLowerCase() : true;

        return matchesSearch && matchesStatus && matchesPayment;
    });

    // LOGIKA FILTER RIWAYAT PEMBAYARAN
    const filteredPayments = paymentHistory.filter(pay => {
        const matchesSearch = 
            pay.id.toLowerCase().includes(searchPayQuery.toLowerCase()) ||
            pay.customer.toLowerCase().includes(searchPayQuery.toLowerCase());
        
        const matchesStatus = selectedPayStatus ? pay.status?.toLowerCase() === selectedPayStatus.toLowerCase() : true;
        
        return matchesSearch && matchesStatus;
    });

    const resetProductFilters = () => {
        setSearchProdQuery('');
        setSelectedProdCategory('');
        setSelectedProdBadge('');
    };

    const resetOrderFilters = () => {
        setSearchOrderQuery('');
        setSelectedOrderStatus('');
        setSelectedOrderPayment('');
    };

    const resetPaymentFilters = () => {
        setSearchPayQuery('');
        setSelectedPayStatus('');
    };

    // Helper fungsional styling badge status
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': case 'selesai': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'processing': case 'diproses': return 'bg-sky-50 text-sky-700 border-sky-200';
            case 'cancelled': case 'dibatalkan': return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    // Helper fungsional styling badge cara pembayaran
    const getPaymentMethodStyles = (method) => {
        switch (method?.toLowerCase()) {
            case 'transfer': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
            case 'cash': case 'tunai': return 'bg-slate-100 text-slate-800 border-slate-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    return (
        <>
            <Head title="Go-UMKM | Dashboard" />
            <LayoutApp pageTitle="Dashboard Seller">
                {/* Hero Section */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    <CardHelloDashboard />

                    {/* Statistik Cepat */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        <div className="bg-white/50 p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-teal-50 rounded-xl text-teal-600"><Package className="size-5" /></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Produk</p>
                            </div>
                            <p className="mt-2 text-2xl font-black text-slate-900">{myProducts.length}</p>
                        </div>
                        <div className="bg-white/50 p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-sky-50 rounded-xl text-sky-600"><ClipboardList className="size-5" /></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pesanan Baru</p>
                            </div>
                            <p className="mt-2 text-2xl font-black text-slate-900">{incomingOrders.filter(o => o.status === 'pending').length}</p>
                        </div>
                        <div className="bg-white/50 p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 rounded-xl text-orange-600"><TrendingUp className="size-5" /></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Penjualan Hari Ini</p>
                            </div>
                            <p className="mt-2 text-2xl font-black text-slate-900">12</p>
                        </div>
                        <div className="bg-white/50 p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Wallet className="size-5" /></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dana Tersedia</p>
                            </div>
                            <p className="mt-2 text-2xl font-black text-slate-900">Rp 2.8M</p>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
                    SEKSI 1: PRODUK SAYA
                   ========================================================================= */}
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400 mt-6 flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900">Produk Saya</h3>
                            <p className="mt-1 text-sm text-slate-600">Pantau ketersediaan stok produk Anda.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={resetProductFilters} className="shrink-0 inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm" title="Reset Filter">
                                <RotateCcw className="size-5" />
                            </button>
                            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-bold text-white shadow-md hover:bg-teal-500 transition-colors shrink-0">
                                <PlusCircle className="size-5" />
                                <span>Produk</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        <div className="col-span-2 relative">
                            <SearchBar searchQuery={searchProdQuery} setSearchQuery={setSearchProdQuery} />
                        </div>
                        <div className="col-span-1">
                            <FilterCategory categories={categories} selectedCategory={selectedProdCategory} setSelectedCategory={setSelectedProdCategory} />
                        </div>
                        <div className="col-span-1">
                            <FilterBadge selectedBadge={selectedProdBadge} setSelectedBadge={setSelectedProdBadge} />
                        </div>
                    </div> 
                    
                    <div className="mt-6 pr-2 max-h-[380px] overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(13,148,136,0.3)_transparent]">
                        <div className="grid gap-4 lg:grid-cols-2">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <div key={`product-${product.id}-${index}`} className="flex items-center gap-4 rounded-2xl border border-slate-300 bg-white p-4 transition-all hover:border-teal-300 hover:shadow-md">
                                        <div className="size-20 flex-none overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                                            <img src={product.image} className="h-full w-full object-cover" alt={product.name} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                    product.badge === 'Populer' 
                                                        ? 'bg-amber-100 text-amber-700' 
                                                        : product.badge === 'Terlaris' 
                                                            ? 'bg-teal-100 text-teal-700' 
                                                            : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {product.badge || 'PROD-UMKM'}
                                                </span>
                                                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${product.stock <= 5 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'}`}>
                                                    Stok: {product.stock}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{product.name}</h4>
                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <p className="text-sm font-black text-slate-900">{product.price}</p>
                                                <Link href="#" className="inline-flex items-center gap-1.5 rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-600 border border-teal-200 hover:text-white hover:border-teal-600 transition-all">
                                                    <Edit className="size-3.5" /> Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <Package className="size-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-slate-500">Produk jualan Anda tidak ditemukan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* PESANAN MASUK */}
                <section className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-emerald-400 mt-6 flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900">Pesanan Masuk</h3>
                            <p className="mt-1 text-sm text-slate-600">Daftar pesanan yang perlu diproses.</p>
                        </div>
                        <button onClick={resetOrderFilters} className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm" title="Reset Filter">
                            <RotateCcw className="size-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        <div className="col-span-2 relative">
                            <SearchBar searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} />
                        </div>
                        <div className="col-span-1">
                            <FilterStatusOrder selectedStatus={selectedOrderStatus} setSelectedStatus={setSelectedOrderStatus} />
                        </div>
                        <div className="col-span-1">
                            <FilterPaymentOrder selectedPayment={selectedOrderPayment} setSelectedPayment={setSelectedOrderPayment} />
                        </div>
                    </div> 

                    {/* AREA SCROLLBOX PESANAN MASUK */}
                    <div className="mt-6 pr-2 max-h-[380px] overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(13,148,136,0.3)_transparent]">
                        <div className="grid gap-4 lg:grid-cols-2">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <div key={`order-${order.id}-${index}`} className="flex items-center gap-4 rounded-2xl border border-slate-300 bg-white p-4 transition-all hover:border-teal-300 hover:shadow-md">
                                        <div className="size-20 flex-none overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                                            <img src={order.image} className="h-full w-full object-cover" alt={order.product} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                {/* SISI KIRI: Status Order & Invoice */}
                                                <div className="flex items-center shrink-0 gap-1.5">
                                                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter border ${getStatusStyles(order.status)}`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{order.id}</span>
                                                </div>
                                                
                                                {/* SISI KANAN: Tanggal & Badge Metode Bayar */}
                                                <div className="flex items-center shrink-0 gap-1.5">
                                                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] gap-1 font-bold border shadow-sm ${getPaymentMethodStyles(order.payment)}`}>
                                                        {order.payment?.toLowerCase() === 'transfer' ? <CreditCard className="size-2.5" /> : <Banknote className="size-2.5" />}
                                                        <span className="capitalize">{order.payment || 'Cash'}</span>
                                                    </span>
                                                    <span className="text-[10px] text-slate-500">{order.date}</span>
                                                </div>
                                            </div>
                                            
                                            <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{order.product}</h4>
                                            <p className="text-xs text-slate-500">Pembeli: <span className="text-slate-800 font-medium">{order.customer}</span></p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm font-black text-slate-900">
                                                    {order.price}
                                                    <span className="ml-2 text-xs font-medium text-slate-500">· {order.qty} pcs</span>
                                                </p>
                                                <Link className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:gap-2 transition-all">
                                                    Proses <ArrowRight className="size-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <ClipboardList className="size-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-slate-500">Data pesanan tidak ditemukan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* RIWAYAT PEMBAYARAN */}
                <section className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-emerald-400 mt-6 flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900">Riwayat Pembayaran</h3>
                            <p className="mt-1 text-sm text-slate-600">Pantau arus kas dan status pembayaran pesanan.</p>
                        </div>
                        <button onClick={resetPaymentFilters} className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm" title="Reset Filter">
                            <RotateCcw className="size-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        <div className="col-span-2 relative">
                            <SearchBar searchQuery={searchPayQuery} setSearchQuery={setSearchPayQuery} />
                        </div>
                        <div className="col-span-2 md:col-span-1 lg:col-span-1">
                            <FilterStatusOrder selectedStatus={selectedPayStatus} setSelectedStatus={setSelectedPayStatus} />
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-4 py-2">ID Transaksi</th>
                                    <th className="px-4 py-2">Tanggal</th>
                                    <th className="px-4 py-2">Pelanggan</th>
                                    <th className="px-4 py-2">Metode</th>
                                    <th className="px-4 py-2">Nominal</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.length > 0 ? (
                                    filteredPayments.map((pay) => (
                                        <tr key={pay.id} className="group bg-white border border-slate-200 hover:border-teal-300 transition-all">
                                            <td className="px-4 py-4 rounded-l-2xl border-y border-l border-slate-200 group-hover:border-teal-300">
                                                <span className="text-xs font-bold text-teal-600">{pay.id}</span>
                                            </td>
                                            <td className="px-4 py-4 border-y border-slate-200 group-hover:border-teal-300 text-xs text-slate-500">{pay.date}</td>
                                            <td className="px-4 py-4 border-y border-slate-200 group-hover:border-teal-300 text-xs font-bold text-slate-900">{pay.customer}</td>
                                            <td className="px-4 py-4 border-y border-slate-200 group-hover:border-teal-300">
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                                    {pay.method === 'Transfer' ? <CreditCard className="size-3" /> : <Banknote className="size-3" />}
                                                    {pay.method}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 border-y border-slate-200 group-hover:border-teal-300 text-sm font-black text-slate-900">{pay.amount}</td>
                                            <td className="px-4 py-4 rounded-r-2xl border-y border-r border-slate-200 group-hover:border-teal-300">
                                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black border ${getStatusStyles(pay.status)} uppercase`}>
                                                    {pay.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                            <ReceiptText className="size-8 text-slate-300 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-slate-500">Tidak ada riwayat pembayaran</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}