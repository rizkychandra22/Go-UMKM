import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useEffect, useState } from 'react';
import {
    ArrowRight, BellRing, House, LogOut,
    Sparkles, PlusCircle, Package, ClipboardList,
    LayoutDashboard, Edit, TrendingUp, RotateCcw, FilterX,
    CreditCard, Banknote, Wallet, CheckCircle2, ReceiptText, Clock,
    ShoppingCart, ClipboardCheck, Minus, Plus
} from 'lucide-react';
import CardHelloDashboard from '../../Components/Dashboard/HeroSection';
import LayoutApp from '../../Layouts/App';
import { products } from '../../Constants/Data.Products';
import { paymentHistory } from '../../Constants/Data.Orders';
import { 
    FilterBadge, FilterCategory, SearchBar, 
    FilterStatusOrder, FilterPaymentOrder 
} from '@/Components/Shared/FilterData';
import RecomendMarquee from '../../Components/Products/RecomendMarquee';
import ResetButton from '../../Components/Shared/ResetFilter';
import CustomerDashboardSkeleton from '@/Components/Dashboard/CustomerDashboardSkeleton';

export default function DashboardCustomer({ categories = [] }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setIsLoading(false), 700);
        return () => window.clearTimeout(timer);
    }, []);

    // STATE FILTER KHUSUS DATA REKOMENDASI PRODUK 
    const [searchProdQuery, setSearchProdQuery] = useState('');
    const [selectedProdCategory, setSelectedProdCategory] = useState('');
    const [selectedProdBadge, setSelectedProdBadge] = useState('');

    // STATE FILTER KHUSUS DATA PESANAN MASUK / PESANAN AKTIF
    const [searchOrderQuery, setSearchOrderQuery] = useState('');
    const [selectedOrderStatus, setSelectedOrderStatus] = useState('');
    const [selectedOrderPayment, setSelectedOrderPayment] = useState('');

    // STATE FILTER KHUSUS DATA PEMBAYARAN
    const [searchPayQuery, setSearchPayQuery] = useState('');
    const [selectedPayStatus, setSelectedPayStatus] = useState('');
    const [selectedPayMethod, setSelectedPayMethod] = useState('');

    // LOGIKA MULTI-FILTER REALTIME: PRODUK / KERANJANG
    const filteredProducts = products.filter(product => {
        const searchLower = searchProdQuery.toLowerCase();
        
        const productName = product.name || product.product_name || '';
        const productDesc = product.description || '';
        const productBadge = product.badge || '';
        const productCategory = product.category || '';

        const matchesSearch = 
            productName.toLowerCase().includes(searchLower) ||
            productDesc.toLowerCase().includes(searchLower) ||
            productBadge.toLowerCase().includes(searchLower) ||
            productCategory.toLowerCase().includes(searchLower);
        
        const productSlug = typeof product.slug === 'object' ? product.slug?.slug : product.slug;
        const matchesCategory = selectedProdCategory 
            ? (productSlug === selectedProdCategory || productCategory.toLowerCase() === selectedProdCategory.toLowerCase())
            : true;
            
        const matchesBadge = selectedProdBadge 
            ? productBadge.toLowerCase() === selectedProdBadge.toLowerCase() 
            : true;
        
        return matchesSearch && matchesCategory && matchesBadge;
    });

    // LOGIKA MULTI-FILTER REALTIME: PESANAN AKTIF (Mengikuti paymentHistory sebagai data Pesanan Customer)
    const filteredOrders = paymentHistory.filter(order => {
        const searchLower = searchOrderQuery.toLowerCase();
        const orderId = order.id || '';
        const orderProduct = order.product || '';
        const orderCustomer = order.customer || '';

        const matchesSearch = 
            orderId.toLowerCase().includes(searchLower) ||
            orderProduct.toLowerCase().includes(searchLower) ||
            orderCustomer.toLowerCase().includes(searchLower);

        const orderStatus = order.status?.toLowerCase() || '';
        const filterStatus = selectedOrderStatus?.toLowerCase() || '';
        const matchesStatus = filterStatus ? orderStatus === filterStatus : true;

        const orderMethod = order.method?.toLowerCase() || '';
        const filterMethod = selectedOrderPayment?.toLowerCase() || '';
        const matchesPayment = filterMethod ? orderMethod === filterMethod : true;

        return matchesSearch && matchesStatus && matchesPayment;
    });

    // LOGIKA FILTER RIWAYAT PEMBAYARAN (Menggunakan paymentHistory)
    const filteredPayments = paymentHistory.filter(pay => {
        const searchLower = searchPayQuery.toLowerCase();
        const payId = pay.id || '';
        const payCustomer = pay.customer || '';
        const payProduct = pay.product || '';

        const matchesSearch = 
            payId.toLowerCase().includes(searchLower) ||
            payProduct.toLowerCase().includes(searchLower) ||
            payCustomer.toLowerCase().includes(searchLower);
        
        const payStatus = pay.status?.toLowerCase() || '';
        const filterStatus = selectedPayStatus?.toLowerCase() || '';
        const matchesStatus = filterStatus ? payStatus === filterStatus : true;
        
        const payMethod = pay.method?.toLowerCase() || '';
        const filterMethod = selectedPayMethod?.toLowerCase() || '';
        const matchesMethod = filterMethod ? payMethod === filterMethod : true;

        return matchesSearch && matchesStatus && matchesMethod;
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
        setSelectedPayMethod('');
    };

    // Helper fungsional styling badge status
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': case 'success': case 'selesai': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
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

    // State Object kuantitas produk
    const [quantities, setQuantities] = useState({});
    const handleQuantityChange = (productId, action, maxStock) => {
        setQuantities(prev => {
            const currentQty = prev[productId] || 1; 
            let newQty = currentQty;

            if (action === 'plus') {
                newQty = currentQty < maxStock ? currentQty + 1 : currentQty;
            } else if (action === 'minus') {
                newQty = currentQty > 1 ? currentQty - 1 : 1;
            }

            return {
                ...prev,
                [productId]: newQty
            };
        });
    };

    if (isLoading) {
        return (
            <>
                <Head title="Go-UMKM | Dashboard" />
                <LayoutApp pageTitle="Dashboard" loading={true}>
                    <CustomerDashboardSkeleton />
                </LayoutApp>
            </>
        );
    }

    return (
        <>
            <Head title="Go-UMKM | Dashboard" />
            <LayoutApp pageTitle="Dashboard">
                {/* Hero Section */}
                <section className="glass-panel fade-in-up p-5 sm:p-8 border-t-4 border-t-emerald-400">
                    <CardHelloDashboard />

                    {/* Statistik Cepat */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <div className="bg-white/50 p-3 sm:p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="bg-teal-50 rounded-xl text-teal-600"><ShoppingCart className="size-4 sm:size-5" /></div>
                                <p className="text-[9px] sm:text-[10px] font-black text-slate-600 uppercase tracking-widest">Keranjang</p>
                            </div>
                            <p className="mt-2 p-0.5 text-xl sm:text-2xl font-black text-slate-900">{products.length}</p>
                        </div>
                        <div className="bg-white/50 p-3 sm:p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="bg-orange-50 rounded-xl text-orange-600"><Package className="size-4 sm:size-5" /></div>
                                <p className="text-[9px] sm:text-[10px] font-black text-slate-600 uppercase tracking-widest">Pesanan</p>
                            </div>
                            <p className="mt-2 p-0.5 text-xl sm:text-2xl font-black text-slate-900">{paymentHistory.length}</p>
                        </div>
                        <div className="bg-white/50 p-3 sm:p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="bg-sky-50 rounded-xl text-sky-600"><ClipboardCheck className="size-4 sm:size-5" /></div>
                                <p className="text-[9px] sm:text-[10px] font-black text-slate-600 uppercase tracking-widest">Riwayat</p>
                            </div>
                            <p className="mt-2 p-0.5 text-xl sm:text-2xl font-black text-slate-900">{paymentHistory.length}</p>
                        </div>
                    </div>
                </section>

                {/* REKOMENDASI PRODUK */}
                <section className="glass-panel fade-in-up p-5 sm:p-8 border-t-4 border-t-emerald-400 mt-6 flex flex-col">
                    <RecomendMarquee />
                </section>

                {/* KERANJANG */}
                <section className="glass-panel fade-in-up p-5 sm:p-8 border-t-4 border-t-emerald-400 mt-6 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900">Keranjang</h3>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600">Daftar produk yang ada dikeranjang Anda.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <ResetButton resetFn={resetProductFilters} />
                        </div>
                    </div>

                    {/* Filter Area - Responsive Flex */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                        <div className="flex-1 min-w-0">
                            <SearchBar searchQuery={searchProdQuery} setSearchQuery={setSearchProdQuery} placeholder="Cari produk berdasarkan nama atau deskripsi..." />
                        </div>
                        <div className="flex gap-3 flex-1">
                            <div className="flex-1">
                                <FilterCategory categories={categories} selectedCategory={selectedProdCategory} setSelectedCategory={setSelectedProdCategory} />
                            </div>
                            <div className="flex-1">
                                <FilterBadge selectedBadge={selectedProdBadge} setSelectedBadge={setSelectedProdBadge} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-5 pr-1 max-h-[420px] overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(13,148,136,0.3)_transparent]">
                        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => {
                                    // Jika product.id kosong/ganda, paksa pakai index agar tetap unik per baris item
                                    const itemKey = product.id || `idx-${index}`;
                                    const currentQty = quantities[itemKey] || 1;

                                    return (
                                        <div key={`product-${itemKey}`} className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 transition-all hover:border-teal-300 hover:shadow-md">
                                            <div className="size-16 sm:size-20 flex-none overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                                                <img src={product.image} className="h-full w-full object-cover" alt={product.name} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 flex-wrap">
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
                                                
                                                <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">
                                                            {(() => {
                                                                const cleanPrice = typeof product.price === 'string' 
                                                                    ? parseInt(product.price.replace(/[^0-9]/g, ''), 10) 
                                                                    : product.price;
                                                                const totalPrice = (cleanPrice || 0) * currentQty;

                                                                return new Intl.NumberFormat('id-ID', { 
                                                                    style: 'currency', 
                                                                    currency: 'IDR', 
                                                                    maximumFractionDigits: 0 
                                                                }).format(totalPrice);
                                                            })()}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                                                            <button 
                                                                type="button"
                                                                onClick={() => handleQuantityChange(itemKey, 'minus', product.stock)}
                                                                disabled={currentQty <= 1}
                                                                className="p-1 rounded-lg text-slate-500 hover:bg-white hover:text-rose-600 disabled:opacity-30 transition-all"
                                                            >
                                                                <Minus className="size-3.5" />
                                                            </button>
                                                            <span className="w-7 text-center text-xs font-bold text-slate-800 select-none">
                                                                {currentQty}
                                                            </span>
                                                            <button 
                                                                type="button"
                                                                onClick={() => handleQuantityChange(itemKey, 'plus', product.stock)}
                                                                disabled={currentQty >= product.stock}
                                                                className="p-1 rounded-lg text-slate-500 hover:bg-white hover:text-teal-600 disabled:opacity-30 transition-all"
                                                            >
                                                                <Plus className="size-3.5" />
                                                            </button>
                                                        </div>
                                                        <Link href="#" className="inline-flex items-center gap-1.5 rounded-xl bg-teal-50 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-600 border border-teal-200 hover:text-white hover:border-teal-600 transition-all">
                                                             <ShoppingCart className="size-3" /> <span className="hidden sm:inline">Checkout</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <Package className="size-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-slate-500">Produk jualan Anda tidak ditemukan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* PESANAN AKTIF */}
                <section className="glass-panel fade-in-up p-5 sm:p-8 border-t-4 border-t-emerald-400 mt-6 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900">Pesanan Aktif</h3>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600">Daftar pesanan yang sedang diproses.</p>
                        </div>
                        <ResetButton resetFn={resetOrderFilters} />
                    </div>

                    {/* Filter Area - Responsive Flex */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                        <div className="flex-1 min-w-0">
                            <SearchBar searchQuery={searchOrderQuery} setSearchQuery={setSearchOrderQuery} placeholder="Cari pesanan berdasarkan ID, produk, atau pelanggan..." />
                        </div>
                        <div className="flex gap-3 flex-1">
                            <div className="flex-1">
                                <FilterStatusOrder selectedStatus={selectedOrderStatus} setSelectedStatus={setSelectedOrderStatus} />
                            </div>
                            <div className="flex-1">
                                <FilterPaymentOrder selectedPayment={selectedOrderPayment} setSelectedPayment={setSelectedOrderPayment} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pr-1 max-h-[420px] overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(13,148,136,0.3)_transparent]">
                        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <div key={`order-${order.id}-${index}`} className="flex items-start gap-3 sm:gap-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 transition-all hover:border-teal-300 hover:shadow-md">
                                        <div className="size-16 sm:size-20 flex-none overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                                            <img src={order.image} className="h-full w-full object-cover" alt={order.product} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 flex-wrap">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter border ${getStatusStyles(order.status)}`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{order.id}</span>
                                                </div>
                                                
                                                <span className="text-[10px] text-slate-400 shrink-0">{order.date}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{order.product}</h4>
                                            <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
                                                <div className="flex items-start justify-between gap-2 flex-wrap">
                                                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] gap-1 font-bold border shadow-sm ${getPaymentMethodStyles(order.method)}`}>
                                                        {order.method?.toLowerCase() === 'transfer' ? <CreditCard className="size-2.5" /> : <Banknote className="size-2.5" />}
                                                        <span className="capitalize">{order.method || 'Cash'}</span>
                                                    </span>
                                                    <p className="text-xs sm:text-sm font-black text-slate-900">
                                                        {order.amount}
                                                        <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-slate-500">· {order.qty} pcs</span>
                                                    </p>
                                                </div>
                                                <Link href="#" className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:gap-2 transition-all">
                                                    Lihat <ArrowRight className="size-3" />
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
                <section className="glass-panel fade-in-up p-5 sm:p-8 border-t-4 border-t-emerald-400 mt-6 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900">Riwayat Pembayaran</h3>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600">Riwayat pembayaran pesanan Anda</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <ResetButton resetFn={resetPaymentFilters} />
                        </div>
                    </div>

                    {/* Filter Area - Responsive Flex */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                        <div className="flex-1 min-w-0">
                            <SearchBar searchQuery={searchPayQuery} setSearchQuery={setSearchPayQuery} placeholder="Cari pesanan berdasarkan ID, produk, atau pelanggan..." />
                        </div>
                        <div className="flex gap-3 flex-1">
                            <div className="flex-1">
                                <FilterStatusOrder selectedStatus={selectedPayStatus} setSelectedStatus={setSelectedPayStatus} />
                            </div>
                            <div className="flex-1">
                                <FilterPaymentOrder selectedPayment={selectedPayMethod} setSelectedPayment={setSelectedPayMethod} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pr-1 max-h-[420px] overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(13,148,136,0.3)_transparent]">
                        {/* Desktop Table */}
                        <div className="overflow-x-auto hidden sm:block">
                            <table className="w-full text-left border-separate border-spacing-y-2 min-w-[600px]">
                                <thead>
                                    <tr className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                                        <th className="px-4 py-2">ID Transaksi</th>
                                        <th className="px-4 py-2">Tanggal</th>
                                        <th className="px-4 py-2">Produk</th>
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
                                                <td className="px-4 py-4 border-y border-slate-200 group-hover:border-teal-300 text-xs font-bold text-slate-900">{pay.product}</td>
                                                <td className="px-4 py-4 border-y border-slate-200 group-hover:border-teal-300">
                                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${getPaymentMethodStyles(pay.method)}`}>
                                                        {pay.method === 'transfer' ? <CreditCard className="size-3" /> : <Banknote className="size-3" />}
                                                        <span className="capitalize">{pay.method}</span>
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

                        {/* Mobile Card View */}
                        <div className="space-y-3 sm:hidden">
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((pay) => (
                                    <div key={`mobile-${pay.id}`} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 hover:border-teal-300 transition-all">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-teal-600">{pay.id}</span>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${getStatusStyles(pay.status)} uppercase`}>
                                                {pay.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">{pay.date}</span>
                                            <span className="font-bold text-slate-900">{pay.product}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${getPaymentMethodStyles(pay.method)}`}>
                                                {pay.method === 'transfer' ? <CreditCard className="size-3" /> : <Banknote className="size-3" />}
                                                <span className="capitalize">{pay.method}</span>
                                            </span>
                                            <span className="text-sm font-black text-slate-900">{pay.amount}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <ReceiptText className="size-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-slate-500">Tidak ada riwayat pembayaran</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}
