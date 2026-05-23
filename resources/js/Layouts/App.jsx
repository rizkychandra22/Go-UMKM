import { useState, useRef, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { 
    Menu, X, House, LayoutDashboard, Package, 
    ClipboardList, LogOut, LogIn, ShoppingCart, 
    Sparkles, Store, Users, UserCircle, Settings, User as UserIcon
} from 'lucide-react';
import { route } from 'ziggy-js';

export default function LayoutApp({ pageTitle, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    
    const { auth } = usePage().props ?? {};
    const { url } = usePage();

    const isDashboard = url.startsWith('/dashboard');
    const isSeller = auth?.user?.role === 'seller'

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    let navItems = [
        { label: 'Beranda', href: route('home'), type: 'link', variant: 'home', icon: House },
    ];

    if (auth?.user) {
        navItems.push({ 
            label: 'Dashboard', 
            href: auth?.user?.role === 'seller' ? route('dashboardSeller') : route('dashboardCustomer'), 
            type: 'link', 
            icon: LayoutDashboard 
        });
    }

    if (isDashboard) {
        navItems.push({ label: 'Produk', href: '#', type: 'anchor', icon: Package });
        if (auth?.user?.role === 'seller') {
            navItems.push({ label: 'Penjualan', href: '#', type: 'anchor', icon: ClipboardList });
        } else {
            navItems.push(
                { label: 'Keranjang', href: '#', type: 'anchor', icon: ShoppingCart },
                { label: 'Pesanan', href: '#', type: 'anchor', icon: ClipboardList }
            );
        }
    } else {
        navItems.push(
            { label: 'Populer', href: route('populer'), type: 'link', icon: Sparkles },
            { label: 'Produk', href: route('product'), type: 'link', icon: Package },
            { label: 'Mitra', href: route('mitra'), type: 'link', icon: Users }
        );
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(253,186,116,0.3),transparent_26%),radial-gradient(circle_at_90%_0%,rgba(45,212,191,0.24),transparent_28%),linear-gradient(160deg,#fff8ee_0%,#f4fff8_54%,#edf8ff_100%)]">
            <div className="pointer-events-none absolute -left-24 top-20 size-64 rounded-full bg-orange-200/50 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-teal-200/50 blur-3xl"></div>

            <div className="relative mx-auto w-[min(1160px,92vw)] py-6 sm:py-8">
                <header className="glass-panel sticky top-0 sm:top-4 z-50 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-20">
                            <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg transition-transform hover:rotate-6">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Go-Umkm</p>
                                <h1 className="text-base font-extrabold text-slate-900 sm:text-lg leading-none truncate">{pageTitle}</h1>
                            </div>
                        </div>

                        {/* DESKTOP NAVIGATION */}
                        <div className="hidden items-center gap-2 md:flex">
                            {/* NAVIGATION ITEMS */}
                            <nav className="flex items-center gap-1">
                                {navItems.map((item, idx) => {
                                    const Icon = item.icon;
                                    const isActive = item.type === 'link' && (
                                        item.variant === 'home' ? url === '/' : url.startsWith(new URL(item.href, window.location.origin).pathname)
                                    );

                                    const marginClass = item.variant === 'home' ? 'mr-1' : '';
                                    const baseClass = `group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl overflow-hidden ${marginClass}`;
                                    
                                    const variantClass = isActive 
                                        ? 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-200 -translate-y-0.5'
                                        : item.variant === 'home'
                                            ? 'bg-linear-to-br from-teal-500/10 to-orange-500/10 border border-teal-200/50 text-teal-700 hover:border-teal-300'
                                            : 'text-slate-600 hover:bg-slate-100';

                                    const Tag = item.type === 'anchor' ? 'a' : Link;
                                    return (
                                        <Tag key={idx} href={item.href} className={`${baseClass} ${variantClass}`}>
                                            {Icon && <Icon className={`size-4 shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}`} />} 
                                            {item.label}
                                            {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>}
                                        </Tag>
                                    );
                                })}
                            </nav>

                            {/* PROFILE DROPDOWN */}
                            <div className="relative ml-2 border-l border-slate-200 pl-3" ref={profileRef}>
                                {auth?.user ? (
                                    <div className="relative">
                                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex size-10 items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md transition-all hover:scale-105 active:scale-95">
                                            {auth?.user?.image ? <img src={`/storage/${auth.user.image}`} className="h-full w-full object-cover" /> : <UserCircle className="size-7 text-slate-400" />}
                                        </button>
                                        {isProfileOpen && (
                                            <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl fade-in-up origin-top-right">
                                                <div className="px-3 py-2 border-b border-slate-50 mb-1">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Halo, {auth?.user?.role}</p>
                                                    <p className="text-sm font-bold text-slate-900 truncate mt-1">{auth?.user?.name}</p>
                                                </div>

                                                {/* Link Profile All User */}
                                                <Link href={route('profile')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                                                    <Settings className="size-4" /> Profile User
                                                </Link>

                                                {/* Link Business Role Seller */}
                                                {isSeller && (
                                                    <Link href={route('profile.business')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                                                        <Store className="size-4" /> Profile Business
                                                    </Link>
                                                )}

                                                <button onClick={() => router.post(route('logout'))} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 transition-colors">
                                                    <LogOut className="size-4" /> Keluar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button onClick={() => router.get(route('login'))} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
                                        <LogIn className="size-4" /> Masuk
                                    </button>
                                )}
                            </div>
                        </div>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden">
                            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>

                    {/* MOBILE NAVIGATION */}
                    {isMenuOpen && (
                        <nav className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 md:hidden fade-in-up">
                            {auth.user && (
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl mb-2">
                                    <div className="size-10 overflow-hidden rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                        {auth?.user?.image ? <img src={`/storage/${auth.user.image}`} className="h-full w-full object-cover" /> : <UserIcon className="size-6 text-slate-300" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 leading-none">{auth?.user?.name}</p>
                                        <p className="text-[10px] font-bold text-teal-600 uppercase mt-1 tracking-wider">{auth?.user?.role}</p>
                                    </div>
                                </div>
                            )}

                            {/* NAVIGATION ITEMS */}
                            {navItems.map((item, idx) => {
                                const Icon = item.icon;
                                const isActive = item.type === 'link' && (
                                    item.variant === 'home' ? url === '/' : url.startsWith(new URL(item.href, window.location.origin).pathname)
                                );
                                
                                const MobileTag = item.type === 'anchor' ? 'a' : Link;

                                const variantClass = isActive 
                                    ? 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-lg'
                                    : item.variant === 'home'
                                        ? 'bg-linear-to-br from-teal-500/10 to-orange-500/10 border border-teal-200/50 text-teal-700'
                                        : 'text-slate-600 hover:bg-slate-50';

                                return (
                                    <MobileTag 
                                        key={idx} 
                                        href={item.href} 
                                        className={`flex items-center gap-4 px-4 py-3.5 text-sm font-bold rounded-xl transition-all ${variantClass}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {Icon && <Icon className="size-5" />} {item.label}
                                        {isActive && <div className="ml-auto size-1.5 rounded-full bg-white animate-ping"></div>}
                                    </MobileTag>
                                );
                            })}
                            
                            {/* PROFILE DROPDOWN */}
                            <div className="mt-2 border-t border-slate-100 pt-3">
                                {auth?.user ? (
                                    <div className="space-y-1">
                                        {/* Link Profile All User */}
                                        <Link onClick={() => { setIsMenuOpen(false); }} href={route('profile')} className="flex w-full items-center gap-4 px-4 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl">
                                            <Settings className="size-5" /> Profile User
                                        </Link>

                                        {/* Link Business Role Seller */}
                                        {isSeller && (
                                            <Link onClick={() => { setIsMenuOpen(false); }} href={route('profile.business')} className="flex w-full items-center gap-4 px-4 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl">
                                                <Store className="size-5" /> Profile Business
                                            </Link>
                                        )}
                                        
                                        <button onClick={() => { setIsMenuOpen(false); router.post(route('logout')); }} className="flex w-full items-center gap-4 px-4 py-3.5 text-sm font-bold text-white bg-red-500 rounded-xl">
                                            <LogOut className="size-5" /> Keluar
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => { setIsMenuOpen(false); router.get(route('login')); }} className="flex w-full items-center gap-4 px-4 py-3.5 text-sm font-bold text-white bg-slate-900 rounded-xl shadow-lg active:scale-95">
                                        <LogIn className="size-5" /> Masuk
                                    </button>
                                )}
                            </div>
                        </nav>
                    )}
                </header>

                <main className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">{children}</main>

                <footer className="mt-10 flex flex-col sm:flex-row items-center justify-between rounded-3xl border border-slate-200/70 bg-white/70 px-6 py-5 text-sm text-slate-600 backdrop-blur-sm gap-4">
                    <p className="font-medium text-center sm:text-left tracking-tight">© 2026 Go-Umkm. Proudly supporting local sellers.</p>
                    <p className="inline-flex items-center gap-2 font-bold text-slate-700">
                        <Sparkles className="size-4 text-orange-500 animate-bounce" /> Belanja bijak, dukung UMKM.
                    </p>
                </footer>
            </div>
        </div>
    );
}