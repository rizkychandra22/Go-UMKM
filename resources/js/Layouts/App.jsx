import { useState, useRef, useEffect, useLayoutEffect } from 'react';
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
    Search,
    Settings,
    ShoppingCart,
    Sparkles,
    Store,
    Sun,
    UserCircle,
    UserIcon,
    Users,
    X,
    MapPin,
} from 'lucide-react';
import { route } from 'ziggy-js';
import DashboardLayoutSkeleton from '@/Components/Layout/DashboardLayoutSkeleton';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';

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

    useLayoutEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const dashboardHref = auth?.user
        ? isSeller
            ? route('dashboardSeller')
            : route('dashboardCustomer')
        : '#';

    const dashboardMenus = [
        { label: 'Dashboard', href: dashboardHref, icon: LayoutDashboard, section: 'OVERVIEW' },
        { label: 'Produk', href: isSeller ? route('dashboardSeller', { tab: 'produk' }) : route('dashboardCustomer', { tab: 'produk' }), icon: Package, section: 'MANAGEMENT' },
        isSeller
            ? { label: 'Penjualan', href: route('dashboardSeller', { tab: 'penjualan' }), icon: ClipboardList, section: 'MANAGEMENT' }
            : { label: 'Keranjang', href: route('dashboardCustomer', { tab: 'keranjang' }), icon: ShoppingCart, section: 'MANAGEMENT' },
        { label: 'Pesanan', href: isSeller ? route('dashboardSeller', { tab: 'pesanan' }) : route('dashboardCustomer', { tab: 'pesanan' }), icon: ClipboardList, section: 'MANAGEMENT' },
        { label: 'Mitra UMKM', href: route('mitra'), icon: Users, section: 'MARKETPLACE' },
        { label: 'Katalog Produk', href: route('product'), icon: Store, section: 'MARKETPLACE' },
        { label: 'Profile User', href: route('profile'), icon: Settings, section: 'ACCOUNT' },
        ...(isSeller
            ? [{ label: 'Profile Business', href: route('ProfileBusiness'), icon: Store, section: 'ACCOUNT' }]
            : []),
    ];

    const isActivePath = (href) => {
        if (!href || href === '#') return false;

        try {
            const current = new URL(url, window.location.origin);
            const target = new URL(href, window.location.origin);

            if (current.pathname !== target.pathname) return false;

            const currentTab = current.searchParams.get('tab');
            const targetTab = target.searchParams.get('tab');

            if (!targetTab) return !currentTab;
            return currentTab === targetTab;
        } catch {
            return false;
        }
    };

    if (isDashboard) {
        const sections = [...new Set(dashboardMenus.map((item) => item.section))];

        if (loading) {
            return <DashboardLayoutSkeleton>{children}</DashboardLayoutSkeleton>;
        }
        return (
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                {/* Desktop Sidebar */}
                <aside className={`fixed left-0 top-0 z-40 hidden h-screen w-[260px] border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 lg:block ${
                    isSidebarCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'
                }`}>
                    <div className="flex h-20 items-center gap-3 border-b border-border px-7">
                        <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg transition-transform hover:rotate-6">
                            <Store className="size-5" />
                        </div>
                        <div>
                            <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-muted-foreground">Tokoku</p>
                            <h1 className="truncate text-base font-extrabold leading-none text-sidebar-foreground">{pageTitle}</h1>
                        </div>
                    </div>

                    <nav className="h-[calc(100vh-160px)] overflow-y-auto px-5 py-6">
                        {sections.map((section) => (
                            <div key={section} className="mb-7 last:mb-0">
                                <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{section}</p>
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
                                                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                                            : 'text-muted-foreground hover:bg-accent hover:text-sidebar-foreground'
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

                    <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-sidebar p-5">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-content-center overflow-hidden rounded-full bg-emerald-50 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : auth?.user?.name?.charAt(0) ?? 'U'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-sidebar-foreground">{auth?.user?.name ?? 'User'}</p>
                                <p className="mt-0.5 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                                    {auth?.user?.role ?? 'member'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => router.post(route('logout'))}
                                className="rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-red-600 dark:hover:text-red-400"
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
                        <aside className="relative flex h-full w-[290px] flex-col bg-sidebar text-sidebar-foreground shadow-2xl transition-colors duration-300">
                            <div className="flex h-20 items-center justify-between border-b border-border px-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg">
                                        <Store className="size-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-muted-foreground">Tokoku</p>
                                        <h1 className="truncate text-base font-extrabold leading-none text-sidebar-foreground">{pageTitle}</h1>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setIsMenuOpen(false)} className="rounded-xl p-2 text-muted-foreground hover:bg-accent" aria-label="Tutup menu">
                                    <X className="size-5" />
                                </button>
                            </div>
                            <div className="flex min-h-0 flex-1 flex-col">
                                <nav className="flex-1 overflow-y-auto px-5 py-5">
                                    {sections.map((section) => (
                                        <div key={section} className="mb-7 last:mb-0">
                                            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{section}</p>
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
                                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                                                        : 'text-muted-foreground hover:bg-accent hover:text-sidebar-foreground'
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

                                <div className="border-t border-border bg-sidebar p-5">
                                    <Link
                                        href={route('home')}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="mb-4 flex items-center gap-3 rounded-2xl border border-border px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-accent hover:text-emerald-700 dark:hover:text-emerald-300"
                                    >
                                        <House className="size-5" />
                                        Beranda
                                    </Link>

                                    <div className="flex items-center gap-3">
                                        <div className="grid size-10 place-content-center overflow-hidden rounded-full bg-emerald-50 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                            {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : auth?.user?.name?.charAt(0) ?? 'U'}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-sidebar-foreground">{auth?.user?.name ?? 'User'}</p>
                                            <p className="mt-0.5 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                                                {auth?.user?.role ?? 'member'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                router.post(route('logout'));
                                            }}
                                            className="rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-red-600 dark:hover:text-red-400"
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
                    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur-sm lg:px-8 transition-colors duration-300">
                        <div className="flex items-center gap-4">
                            {/* Mobile Menu Trigger */}
                            <Button type="button" variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)} className="lg:hidden" aria-label="Buka menu">
                                <Menu className="size-5" />
                            </Button>
                            
                            {/* Desktop Sidebar Collapse Trigger */}
                            <Button
                                type="button"
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                variant="ghost"
                                size="icon"
                                className="hidden lg:inline-flex"
                                aria-label="Buka/Tutup Sidebar"
                            >
                                <PanelLeft className={`size-5 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
                            </Button>

                            <div className="h-6 w-px bg-border" />
                            <p className="text-sm font-semibold text-foreground">{pageTitle}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href={route('home')} className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-accent hover:text-foreground sm:inline-flex">
                                <House className="size-4" />
                                Beranda
                            </Link>
                            <Button type="button" variant="ghost" size="icon" aria-label="Notifikasi">
                                <Bell className="size-5" />
                            </Button>
                            
                            {/* Dashboard Theme Toggle Switch */}
                            <Button 
                                type="button" 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                variant="ghost"
                                size="icon"
                                aria-label="Ubah Tema"
                            >
                                {isDarkMode ? <Sun className="size-5 text-orange-400" /> : <Moon className="size-5" />}
                            </Button>
                        </div>
                    </header>

                    <section className="min-h-[calc(100vh-80px)] bg-background px-5 py-8 lg:px-10 transition-colors duration-300">
                        {children}
                    </section>
                </main>
            </div>
        );
    }

    // --- NON-DASHBOARD VIEW (MARKETPLACE / LANDING PAGE) ---
    const navItems = [
        { label: 'Beranda', href: route('home'), type: 'link', variant: 'home', icon: House },
        { label: 'Populer', href: route('populer'), type: 'link', icon: Sparkles },
        { label: 'Produk', href: route('product'), type: 'link', icon: Package },
        { label: 'Mitra', href: route('mitra'), type: 'link', icon: Users },
    ];

    return (
        <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">


            {/* Main Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm transition-colors">
                <div className="mx-auto flex w-full max-w-[1280px] items-center gap-3 sm:gap-6 px-4 py-3">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-2 shrink-0">
                        <div className="grid size-10 place-content-center rounded-xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-md">
                            <Store className="size-5" />
                        </div>
                        <div className="block">
                            <h1 className="text-xl font-extrabold tracking-tight text-teal-600 dark:text-teal-400">Tokoku</h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex flex-1 items-center gap-6 px-6 text-sm font-medium">
                        {navItems.map((item, idx) => {
                            const active = isActivePath(item.href);
                            return (
                                <Link key={idx} href={item.href} className={`transition-colors ${active ? 'text-teal-600 font-bold dark:text-teal-400' : 'text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400'}`}>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Header Actions */}
                    <div className="flex shrink-0 items-center gap-2 sm:gap-4 ml-auto" ref={profileRef}>
                        
                        {/* Cart */}
                        <Link href={auth?.user ? (isSeller ? route('dashboardSeller', { tab: 'pesanan' }) : route('dashboardCustomer', { tab: 'keranjang' })) : route('login')} className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition">
                            <ShoppingCart className="size-6" />
                            <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white border-2 border-white dark:border-slate-950">3</span>
                        </Link>
                        
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

                        {/* Theme Toggle */}
                        <button 
                            type="button" 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                            aria-label="Ubah Tema"
                        >
                            {isDarkMode ? <Sun className="size-5 text-orange-400" /> : <Moon className="size-5" />}
                        </button>

                        {/* User Profile / Login */}
                        {auth?.user ? (
                            <div className="relative">
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 rounded-xl p-1 pr-3 border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                    <div className="size-8 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 shrink-0">
                                        {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : <UserCircle className="size-8 text-slate-400" />}
                                    </div>
                                    <span className="hidden md:block text-sm font-semibold truncate max-w-[100px] text-slate-700 dark:text-slate-200">{auth?.user?.name}</span>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900 fade-in-up">
                                        <div className="mb-2 border-b border-slate-100 dark:border-slate-800 px-3 py-2">
                                            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{auth?.user?.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{auth?.user?.role}</p>
                                        </div>
                                        <Link href={dashboardHref} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                                            <LayoutDashboard className="size-4 text-slate-500" /> Dashboard
                                        </Link>
                                        <Link href={route('profile')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                                            <Settings className="size-4 text-slate-500" /> Pengaturan
                                        </Link>
                                        <button onClick={() => router.post(route('logout'))} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30">
                                            <LogOut className="size-4" /> Keluar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link href={route('login')} className="inline-flex items-center justify-center rounded-xl border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50 dark:border-teal-500 dark:text-teal-400 dark:hover:bg-teal-950/30">
                                    Masuk
                                </Link>
                                <Link href={route('register')} className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline-teal-600">
                                    Daftar
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Navigation Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 fade-in-up">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item, idx) => {
                                const active = isActivePath(item.href);
                                return (
                                    <Link key={idx} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${active ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}`} onClick={() => setIsMenuOpen(false)}>
                                        {item.icon && <item.icon className={`size-5 ${active ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />} {item.label}
                                    </Link>
                                );
                            })}
                            <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />


                            {/* Mobile Login / Register */}
                            {!auth?.user && (
                                <div className="mt-2 flex gap-3 px-1">
                                    <Link href={route('login')} className="flex-1 inline-flex items-center justify-center rounded-xl border border-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-50 dark:border-teal-500 dark:text-teal-400 dark:hover:bg-teal-950/30">
                                        Masuk
                                    </Link>
                                    <Link href={route('register')} className="flex-1 inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline-teal-600">
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                )}
            </header>

            {/* Page Content */}
            <main className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 min-h-[calc(100vh-300px)]">
                {children}
            </main>

            {/* Comprehensive Footer */}
            <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-1">
                            <Link href={route('home')} className="flex items-center gap-2 shrink-0 mb-4">
                                <div className="grid size-10 place-content-center rounded-xl bg-linear-to-br from-teal-600 to-orange-500 text-white">
                                    <Store className="size-5" />
                                </div>
                                <h2 className="text-xl font-extrabold tracking-tight text-teal-600 dark:text-teal-400">Tokoku</h2>
                            </Link>
                            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                                Marketplace lokal yang mendukung UMKM di seluruh Indonesia. Belanja bijak, dukung usaha mikro, kecil, dan menengah untuk ekonomi yang lebih baik.
                            </p>
                        </div>
                        
                        <div className="lg:col-span-2 grid grid-cols-2 gap-8 sm:grid-cols-4">
                            {/* Kiri Atas: Tokoku */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Tokoku</h3>
                                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Tentang Kami</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Karir</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Blog</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Mitra UMKM</a></li>
                                </ul>
                            </div>
                            
                            {/* Kanan Atas: Bantuan */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Bantuan</h3>
                                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Syarat & Ketentuan</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Kebijakan Privasi</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Pusat Bantuan</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Hubungi Kami</a></li>
                                </ul>
                            </div>

                            {/* Kiri Bawah: Jual */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Jual</h3>
                                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Pusat Edukasi</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Cara Bergabung</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Cara Berjualan</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Keuntungan Jualan</a></li>
                                </ul>
                            </div>

                            {/* Kanan Bawah: Beli */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Beli</h3>
                                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Cara Belanja</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Pembayaran</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Jaminan Aman</a></li>
                                    <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Lacak Pesanan</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-8">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Â© 2026 Tokoku. Seluruh hak cipta dilindungi.</p>
                        <div className="mt-4 md:mt-0 flex items-center gap-4 text-slate-400">
                            {/* Dummy social icons */}
                            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Instagram</a>
                            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Facebook</a>
                            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
