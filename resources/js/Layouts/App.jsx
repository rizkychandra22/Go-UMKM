import { useState, useRef, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    ClipboardList,
    House,
    LayoutDashboard,
    LogIn,
    LogOut,
    Menu,
    Moon,
    Package,
    PanelLeft,
    Settings,
    ShoppingCart,
    Sparkles,
    Store,
    Sun,
    UserCircle,
    User as UserIcon,
    Users,
    X,
} from 'lucide-react';
import { route } from 'ziggy-js';
import DashboardLayoutSkeleton from '@/Components/Layout/DashboardLayoutSkeleton';

export default function LayoutApp({ pageTitle, children, loading = false }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    
    // Inisialisasi tema berdasarkan localStorage atau preferensi sistem
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || 
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const profileRef = useRef(null);
    const { auth } = usePage().props ?? {};
    const { url } = usePage();

    const isDashboard = url.startsWith('/dashboard');
    const isSeller = auth?.user?.role === 'seller';

    // Efek untuk mendeteksi klik di luar profil dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Efek untuk menerapkan class dark mode pada elemen HTML root
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const dashboardHref = auth?.user
        ? isSeller
            ? route('dashboardSeller')
            : route('dashboardCustomer')
        : '#';

    const isActivePath = (href) => {
        if (!href || href === '#') return false;

        try {
            return url.startsWith(new URL(href, window.location.origin).pathname);
        } catch {
            return false;
        }
    };

    if (isDashboard) {
        const dashboardMenus = [
            { label: 'Dashboard', href: dashboardHref, icon: LayoutDashboard, active: true, section: 'OVERVIEW' },
            { label: 'Produk', href: '#', icon: Package, section: 'MANAGEMENT' },
            isSeller
                ? { label: 'Penjualan', href: '#', icon: ClipboardList, section: 'MANAGEMENT' }
                : { label: 'Keranjang', href: '#', icon: ShoppingCart, section: 'MANAGEMENT' },
            { label: 'Pesanan', href: '#', icon: ClipboardList, section: 'MANAGEMENT' },
            { label: 'Mitra UMKM', href: route('mitra'), icon: Users, section: 'MARKETPLACE' },
            { label: 'Katalog Produk', href: route('product'), icon: Store, section: 'MARKETPLACE' },
            { label: 'Profile User', href: route('profile'), icon: Settings, section: 'ACCOUNT' },
            ...(isSeller
                ? [{ label: 'Profile Business', href: route('profile.business'), icon: Store, section: 'ACCOUNT' }]
                : []),
        ];

        const sections = [...new Set(dashboardMenus.map((item) => item.section))];

        if (loading) {
            return <DashboardLayoutSkeleton>{children}</DashboardLayoutSkeleton>;
        }
        return (
            <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
                {/* Desktop Sidebar */}
                <aside className={`fixed left-0 top-0 z-40 hidden h-screen w-[260px] border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 lg:block ${
                    isSidebarCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'
                }`}>
                    <div className="flex h-20 items-center gap-3 border-b border-slate-100 dark:border-slate-800 px-7">
                        <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg transition-transform hover:rotate-6">
                            <Store className="size-5" />
                        </div>
                        <div>
                            <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-slate-400 dark:text-slate-500">Go-Umkm</p>
                            <h1 className="truncate text-base font-extrabold leading-none text-slate-900 dark:text-white">{pageTitle}</h1>
                        </div>
                    </div>

                    <nav className="h-[calc(100vh-160px)] overflow-y-auto px-5 py-6">
                        {sections.map((section) => (
                            <div key={section} className="mb-7 last:mb-0">
                                <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-300">{section}</p>
                                <div className="space-y-1">
                                    {dashboardMenus
                                        .filter((item) => item.section === section)
                                        .map((item) => {
                                            const Icon = item.icon;
                                            const active = item.active || isActivePath(item.href);
                                            const Tag = item.href === '#' ? 'a' : Link;

                                            return (
                                                <Tag
                                                    key={item.label}
                                                    href={item.href}
                                                    className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                                                        active
                                                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-slate-100'
                                                    }`}
                                                >
                                                    <Icon className="size-5" />
                                                    <span>{item.label}</span>
                                                </Tag>
                                            );
                                        })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 dark:border-slate-800 p-5 bg-white dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-content-center overflow-hidden rounded-full bg-emerald-50 dark:bg-emerald-950 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                                {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : auth?.user?.name?.charAt(0) ?? 'U'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{auth?.user?.name ?? 'User'}</p>
                                <p className="mt-0.5 inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
                                    {auth?.user?.role ?? 'member'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => router.post(route('logout'))}
                                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition hover:text-red-600 dark:hover:text-red-400"
                                aria-label="Keluar"
                            >
                                <LogOut className="size-4" />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Mobile Sidebar Backing & Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <button type="button" className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)} aria-label="Tutup menu" />
                        <aside className="relative flex h-full w-[290px] flex-col bg-white dark:bg-slate-900 shadow-2xl transition-colors duration-300">
                            <div className="flex h-20 items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg">
                                        <Store className="size-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-slate-400 dark:text-slate-500">Go-Umkm</p>
                                        <h1 className="truncate text-base font-extrabold leading-none text-slate-900 dark:text-white">{pageTitle}</h1>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setIsMenuOpen(false)} className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400" aria-label="Tutup menu">
                                    <X className="size-5" />
                                </button>
                            </div>
                            <div className="flex min-h-0 flex-1 flex-col">
                                <nav className="flex-1 overflow-y-auto px-5 py-5">
                                    {sections.map((section) => (
                                        <div key={section} className="mb-7 last:mb-0">
                                            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-300">{section}</p>
                                            <div className="space-y-1">
                                                {dashboardMenus
                                                    .filter((item) => item.section === section)
                                                    .map((item) => {
                                                        const Icon = item.icon;
                                                        const Tag = item.href === '#' ? 'a' : Link;
                                                        const active = item.active || isActivePath(item.href);

                                                        return (
                                                            <Tag
                                                                key={item.label}
                                                                href={item.href}
                                                                onClick={() => setIsMenuOpen(false)}
                                                                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                                                                    active
                                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                                                                        : 'text-slate-700 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400'
                                                                }`}
                                                            >
                                                                <Icon className="size-5" />
                                                                {item.label}
                                                            </Tag>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    ))}
                                </nav>

                                <div className="border-t border-slate-100 dark:border-slate-800 p-5 bg-white dark:bg-slate-900">
                                    <Link
                                        href={route('home')}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400"
                                    >
                                        <House className="size-5" />
                                        Beranda
                                    </Link>

                                    <div className="flex items-center gap-3">
                                        <div className="grid size-10 place-content-center overflow-hidden rounded-full bg-emerald-50 dark:bg-emerald-950 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                                            {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : auth?.user?.name?.charAt(0) ?? 'U'}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{auth?.user?.name ?? 'User'}</p>
                                            <p className="mt-0.5 inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
                                                {auth?.user?.role ?? 'member'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                router.post(route('logout'));
                                            }}
                                            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition hover:text-red-600 dark:hover:text-red-400"
                                            aria-label="Keluar"
                                        >
                                            <LogOut className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Dashboard Main Area */}
                <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-[260px]'}`}>
                    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-5 backdrop-blur-sm lg:px-8 dark:border-slate-800 dark:bg-slate-950/95 transition-colors duration-300">
                        <div className="flex items-center gap-4">
                            {/* Mobile Menu Trigger */}
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(true)}
                                className="rounded-xl p-2 text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
                                aria-label="Buka menu"
                            >
                                <Menu className="size-5" />
                            </button>
                            
                            {/* Desktop Sidebar Collapse Trigger */}
                            <button
                                type="button"
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="hidden rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:block transition-colors"
                                aria-label="Buka/Tutup Sidebar"
                            >
                                <PanelLeft className={`size-5 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
                            </button>

                            <div className="h-6 w-px bg-slate-100 dark:bg-slate-800" />
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{pageTitle}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href={route('home')} className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 sm:inline-flex">
                                <House className="size-4" />
                                Beranda
                            </Link>
                            <button type="button" className="rounded-xl p-2 text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifikasi">
                                <Bell className="size-5" />
                            </button>
                            
                            {/* Dashboard Theme Toggle Switch */}
                            <button 
                                type="button" 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="rounded-xl p-2 text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-800" 
                                aria-label="Ubah Tema"
                            >
                                {isDarkMode ? <Sun className="size-5 text-orange-400" /> : <Moon className="size-5 text-slate-700" />}
                            </button>
                        </div>
                    </header>

                    <section className="min-h-[calc(100vh-80px)] bg-white px-5 py-8 lg:px-10 dark:bg-slate-950 transition-colors duration-300">
                        {children}
                    </section>
                </main>
            </div>
        );
    }

    // --- NON-DASHBOARD VIEW (MARKETPLACE / LANDING PAGE) ---
    const navItems = [
        { label: 'Beranda', href: route('home'), type: 'link', variant: 'home', icon: House },
        ...(auth?.user
            ? [
                  {
                      label: 'Dashboard',
                      href: dashboardHref,
                      type: 'link',
                      icon: LayoutDashboard,
                  },
              ]
            : []),
        { label: 'Populer', href: route('populer'), type: 'link', icon: Sparkles },
        { label: 'Produk', href: route('product'), type: 'link', icon: Package },
        { label: 'Mitra', href: route('mitra'), type: 'link', icon: Users },
    ];

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(253,186,116,0.15),transparent_26%),radial-gradient(circle_at_90%_0%,rgba(45,212,191,0.12),transparent_28%),linear-gradient(160deg,#fff8ee_0%,#f4fff8_54%,#edf8ff_100%)] text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_10%_10%,rgba(20,184,166,0.12),transparent_28%),radial-gradient(circle_at_90%_0%,rgba(251,146,60,0.10),transparent_30%),linear-gradient(160deg,#0f172a_0%,#020617_62%,#07111f_100%)] dark:text-slate-50">
            <div className="pointer-events-none absolute -left-24 top-20 size-64 rounded-full bg-orange-200/30 dark:bg-orange-900/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-teal-200/30 dark:bg-teal-900/10 blur-3xl"></div>

            <div className="relative mx-auto w-[min(1160px,92vw)] py-6 sm:py-8">
                <header className="glass-panel sticky top-0 z-50 px-4 py-3 sm:top-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 backdrop-blur-md rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-20 items-center gap-3">
                            <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg transition-transform hover:rotate-6">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-slate-400 dark:text-slate-500">Go-Umkm</p>
                                <h1 className="truncate text-base font-extrabold leading-none text-slate-900 dark:text-white sm:text-lg">{pageTitle}</h1>
                            </div>
                        </div>

                        <div className="hidden items-center gap-2 md:flex">
                            <nav className="flex items-center gap-1">
                                {navItems.map((item, idx) => {
                                    const Icon = item.icon;
                                    const isActive = item.variant === 'home' ? url === '/' : isActivePath(item.href);
                                    const variantClass = isActive
                                        ? 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-200 dark:shadow-none -translate-y-0.5'
                                        : item.variant === 'home'
                                            ? 'bg-linear-to-br from-teal-500/10 to-orange-500/10 border border-teal-200/50 text-teal-700 dark:text-teal-400 hover:border-teal-300'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200';

                                    return (
                                        <Link key={idx} href={item.href} className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 ${variantClass}`}>
                                            {Icon && <Icon className={`size-4 shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}`} />}
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Marketplace Light/Dark Switch Toggle */}
                            <button 
                                type="button" 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="ml-2 rounded-xl p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label="Ubah Tema"
                            >
                                {isDarkMode ? <Sun className="size-5 text-orange-400" /> : <Moon className="size-5" />}
                            </button>

                            <div className="relative ml-2 border-l border-slate-200 dark:border-slate-700 pl-3" ref={profileRef}>
                                {auth?.user ? (
                                    <div className="relative">
                                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex size-10 items-center justify-center overflow-hidden rounded-2xl border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md transition-all hover:scale-105 active:scale-95">
                                            {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : <UserCircle className="size-7 text-slate-400" />}
                                        </button>
                                        {isProfileOpen && (
                                            <div className="fade-in-up absolute right-0 mt-3 w-52 origin-top-right rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl">
                                                <div className="mb-1 border-b border-slate-50 dark:border-slate-800 px-3 py-2">
                                                    <p className="text-[10px] font-black uppercase leading-none tracking-tighter text-slate-400">Halo, {auth?.user?.role}</p>
                                                    <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">{auth?.user?.name}</p>
                                                </div>
                                                <Link href={route('profile')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 transition-colors hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-400">
                                                    <Settings className="size-4" /> Profile User
                                                </Link>
                                                {isSeller && (
                                                    <Link href={route('profile.business')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 transition-colors hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-400">
                                                        <Store className="size-4" /> Profile Business
                                                    </Link>
                                                )}
                                                <button onClick={() => router.post(route('logout'))} className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-red-500">
                                                    <LogOut className="size-4" /> Keluar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button onClick={() => router.get(route('login'))} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-teal-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-slate-200 dark:shadow-none transition-all hover:bg-slate-800 dark:hover:bg-teal-500 active:scale-95">
                                        <LogIn className="size-4" /> Masuk
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Mobile Hamburger Toggle Header Button */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-xl p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden">
                            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>

                    {/* Mobile Dropdown Navigation Menu */}
                    {isMenuOpen && (
                        <nav className="fade-in-up mt-4 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 md:hidden">
                            {auth?.user && (
                                <div className="mb-2 flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800 px-4 py-3">
                                    <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                                        {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : <UserIcon className="size-6 text-slate-300" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">{auth?.user?.name}</p>
                                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">{auth?.user?.role}</p>
                                    </div>
                                </div>
                            )}

                            {navItems.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <Link key={idx} href={item.href} className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => setIsMenuOpen(false)}>
                                        {Icon && <Icon className="size-5" />} {item.label}
                                    </Link>
                                );
                            })}
                            
                            {/* Mobile Theme Switch Button */}
                            <button 
                                type="button" 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                            >
                                {isDarkMode ? <Sun className="size-5 text-orange-400" /> : <Moon className="size-5" />} 
                                {isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
                            </button>
                        </nav>
                    )}
                </header>

                <main className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">{children}</main>

                <footer className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-6 py-5 text-sm text-slate-600 dark:text-slate-400 backdrop-blur-sm sm:flex-row">
                    <p className="text-center font-medium tracking-tight sm:text-left">© 2026 Go-Umkm. Proudly supporting local sellers.</p>
                    <p className="inline-flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                        <Sparkles className="size-4 animate-bounce text-orange-500" /> Belanja bijak, dukung UMKM.
                    </p>
                </footer>
            </div>
        </div>
    );
}
