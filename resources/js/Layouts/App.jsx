import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { 
    Menu, X, House, LayoutDashboard, Package, 
    ClipboardList, LogOut, LogIn, ShoppingCart, 
    Sparkles, Store, Users 
} from 'lucide-react';

export default function LayoutApp({ pageTitle, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const { auth } = usePage().props;
    const { url } = usePage();

    const isDashboard = url.startsWith('/dashboard');

    /**
     * LOGIKA NAVIGASI DINAMIS
     */
    let navItems = [];
    if (isDashboard) {
        navItems = [
            { label: 'Beranda', href: route('home'), type: 'link', variant: 'home', icon: House },
            { label: 'Dashboard', href: auth.user.role === 'seller' ? route('dashboardSeller') : route('dashboardCustomer'), type: 'link', icon: LayoutDashboard },
            { label: 'Produk', href: '#', type: 'anchor', icon: Package },
        ];
        if (auth.user.role === 'seller') {
            navItems.push({ label: 'Penjualan', href: '#', type: 'anchor', icon: ClipboardList });
        } else {
            navItems.push(
                { label: 'Keranjang', href: '#', type: 'anchor', icon: ShoppingCart },
                { label: 'Pesanan', href: '#', type: 'anchor', icon: ClipboardList }
            );
        }
        navItems.push({ label: 'Keluar', href: route('logout'), type: 'action', method: 'post', badge: true, icon: LogOut });
    } else {
        navItems = [
            { label: 'Beranda', href: route('home'), type: 'link', variant: 'home', icon: House },
        ];
        if (auth.user) {
            navItems.push({ 
                label: 'Dashboard', 
                href: auth.user.role === 'seller' ? route('dashboardSeller') : route('dashboardCustomer'), 
                type: 'link', 
                icon: LayoutDashboard 
            });
        }
        navItems.push(
            { label: 'Populer', href: '#', type: 'anchor', icon: Sparkles },
            { label: 'Produk', href: '#', type: 'anchor', icon: Package },
            { label: 'Mitra', href: '#', type: 'anchor', icon: Users }
        );
        if (auth.user) {
            navItems.push({ label: 'Keluar', href: route('logout'), type: 'action', method: 'post', badge: true, icon: LogOut });
        } else {
            navItems.push({ label: 'Masuk', href: route('login'), type: 'action', method: 'get', badge: true, icon: LogIn });
        }
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(253,186,116,0.3),transparent_26%),radial-gradient(circle_at_90%_0%,rgba(45,212,191,0.24),transparent_28%),linear-gradient(160deg,#fff8ee_0%,#f4fff8_54%,#edf8ff_100%)]">
            {/* Dekorasi Background */}
            <div className="pointer-events-none absolute -left-24 top-20 size-64 rounded-full bg-orange-200/50 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-teal-200/50 blur-3xl"></div>

            <div className="relative mx-auto w-[min(1160px,92vw)] py-6 sm:py-8">
                <header className="glass-panel sticky top-4 z-50 px-4 py-3 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                        {/* Logo & Page Title */}
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg shadow-teal-500/25 transition-transform hover:rotate-6">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Go-Umkm</p>
                                <h1 className="text-base font-extrabold text-slate-900 sm:text-lg leading-none">{pageTitle}</h1>
                            </div>
                        </div>

                        {/* DESKTOP NAVIGATION */}
                        <nav className="hidden items-center gap-1 sm:flex">
                            {navItems.map((item, idx) => {
                                const Icon = item.icon;
                                const isActive = (item.type === 'link' || (item.type === 'action' && item.method === 'get')) && (
                                    item.variant === 'home' ? url === '/' : url.startsWith(new URL(item.href, window.location.origin).pathname)
                                );

                                const baseClass = "group relative inline-flex items-center mr-1 gap-2 px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl overflow-hidden";
                                const homeStyle = "bg-linear-to-br from-teal-500/10 to-orange-500/10 border border-teal-200/50 text-teal-700 hover:from-teal-500/20 hover:to-orange-500/20 hover:border-teal-300";                    
                                
                                const variantClass = item.badge
                                    ? 'bg-slate-900 text-white hover:bg-slate-800 ml-1 shadow-lg shadow-slate-200'
                                    : isActive 
                                        ? 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-200 -translate-y-0.5'
                                        : item.variant === 'home'
                                            ? homeStyle
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900';

                                if (item.type === 'action') {
                                    return (
                                        <button 
                                            key={idx} 
                                            onClick={() => item.method === 'post' ? router.post(item.href) : router.get(item.href)} 
                                            className={`${baseClass} ${variantClass}`}
                                        >
                                            {Icon && <Icon className="size-4 shrink-0" />} 
                                            {item.label}
                                        </button>
                                    );
                                }

                                const Tag = item.type === 'anchor' ? 'a' : Link;
                                return (
                                    <Tag key={idx} href={item.href} className={`${baseClass} ${variantClass}`}>
                                        {Icon && <Icon className={`size-4 shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />} 
                                        {item.label}
                                        {isActive && !item.badge && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>}
                                    </Tag>
                                );
                            })}
                        </nav>

                        {/* Mobile Toggle */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 sm:hidden transition-colors">
                            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>

                    {/* MOBILE NAVIGATION */}
                    {isMenuOpen && (
                        <nav className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:hidden fade-in-up">
                            {navItems.map((item, idx) => {
                                const Icon = item.icon;
                                const isActive = (item.type === 'link' || (item.type === 'action' && item.method === 'get')) && (
                                    item.variant === 'home' ? url === '/' : url.startsWith(new URL(item.href, window.location.origin).pathname)
                                );
                                
                                const baseClass = "flex items-center gap-4 px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-300";
                                const variantClass = item.badge
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : isActive 
                                        ? 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-200'
                                        : item.variant === 'home'
                                            ? 'bg-teal-50 text-teal-700 border border-teal-100'
                                            : 'text-slate-600 hover:bg-slate-50';

                                if (item.type === 'action') {
                                    return (
                                        <button 
                                            key={idx} 
                                            onClick={() => { 
                                                setIsMenuOpen(false); 
                                                item.method === 'post' ? router.post(item.href) : router.get(item.href); 
                                            }} 
                                            className={`${baseClass} ${variantClass}`}
                                        >
                                            {Icon && <Icon className="size-5" />} 
                                            {item.label}
                                        </button>
                                    );
                                }

                                const Tag = item.type === 'anchor' ? 'a' : Link;
                                return (
                                    <Tag key={idx} href={item.href} className={`${baseClass} ${variantClass}`} onClick={() => setIsMenuOpen(false)}>
                                        {Icon && <Icon className={`size-5 ${isActive ? 'animate-pulse' : ''}`} />} 
                                        {item.label}
                                        {isActive && <div className="ml-auto size-1.5 rounded-full bg-white animate-ping"></div>}
                                    </Tag>
                                );
                            })}
                        </nav>
                    )}
                </header>

                {/* Konten Utama */}
                <main className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-10 flex flex-col sm:flex-row items-center justify-between rounded-3xl border border-slate-200/70 bg-white/70 px-6 py-5 text-sm text-slate-600 backdrop-blur-sm gap-4 shadow-sm">
                    <p className="font-medium text-center sm:text-left tracking-tight">© 2026 Go-Umkm. Proudly supporting local sellers.</p>
                    <p className="inline-flex items-center gap-2 font-bold text-slate-700">
                        <Sparkles className="size-4 text-orange-500 animate-bounce" />
                        Belanja bijak, dukung UMKM.
                    </p>
                </footer>
            </div>
        </div>
    );
}