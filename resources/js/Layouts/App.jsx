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
    const profileRef = useRef(null);

    const { auth } = usePage().props ?? {};
    const { url } = usePage();

    const isDashboard = url.startsWith('/dashboard');
    const isSeller = auth?.user?.role === 'seller';

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

<<<<<<< HEAD
        if (loading) {
            return <DashboardLayoutSkeleton>{children}</DashboardLayoutSkeleton>;
        }

=======
>>>>>>> 5ab1eb2b6ad31d262570cf0344927bc54a0eb715
        return (
            <div className="min-h-screen bg-white text-slate-950">
                <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] border-r border-slate-200 bg-white lg:block">
                    <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-7">
<<<<<<< HEAD
                        <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg transition-transform hover:rotate-6">
                            <Store className="size-5" />
                        </div>
                        <div>
                            <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-slate-400">Go-Umkm</p>
                            <h1 className="truncate text-base font-extrabold leading-none text-slate-900">{pageTitle}</h1>
=======
                        <div className="grid size-10 place-content-center rounded-2xl bg-emerald-900 text-white shadow-sm">
                            <Store className="size-5" />
                        </div>
                        <div>
                            <p className="text-base font-bold leading-none text-slate-950">Go-UMKM</p>
                            <p className="mt-1 text-sm text-slate-500">Mitra UMKM</p>
>>>>>>> 5ab1eb2b6ad31d262570cf0344927bc54a0eb715
                        </div>
                    </div>

                    <nav className="h-[calc(100vh-160px)] overflow-y-auto px-5 py-6">
                        {sections.map((section) => (
                            <div key={section} className="mb-7 last:mb-0">
                                <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">{section}</p>
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
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
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

                    <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-content-center overflow-hidden rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                                {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : auth?.user?.name?.charAt(0) ?? 'U'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-950">{auth?.user?.name ?? 'User'}</p>
                                <p className="mt-0.5 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                                    {auth?.user?.role ?? 'member'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => router.post(route('logout'))}
                                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                                aria-label="Keluar"
                            >
                                <LogOut className="size-4" />
                            </button>
                        </div>
                    </div>
                </aside>

<<<<<<< HEAD
                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <button type="button" className="absolute inset-0 bg-slate-950/40" onClick={() => setIsMenuOpen(false)} aria-label="Tutup menu" />
                        <aside className="relative flex h-full w-[290px] flex-col bg-white shadow-2xl">
                            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg">
                                        <Store className="size-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-slate-400">Go-Umkm</p>
                                        <h1 className="truncate text-base font-extrabold leading-none text-slate-900">{pageTitle}</h1>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setIsMenuOpen(false)} className="rounded-xl p-2 hover:bg-slate-100" aria-label="Tutup menu">
                                    <X className="size-5" />
                                </button>
                            </div>
                            <div className="flex min-h-0 flex-1 flex-col">
                                <nav className="flex-1 overflow-y-auto px-5 py-5">
                                    {sections.map((section) => (
                                        <div key={section} className="mb-7 last:mb-0">
                                            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">{section}</p>
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
                                                                        ? 'bg-emerald-50 text-emerald-700'
                                                                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
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

                                <div className="border-t border-slate-100 p-5">
                                    <Link
                                        href={route('home')}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-emerald-700"
                                    >
                                        <House className="size-5" />
                                        Beranda
                                    </Link>

                                    <div className="flex items-center gap-3">
                                        <div className="grid size-10 place-content-center overflow-hidden rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                                            {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : auth?.user?.name?.charAt(0) ?? 'U'}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-slate-950">{auth?.user?.name ?? 'User'}</p>
                                            <p className="mt-0.5 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                                                {auth?.user?.role ?? 'member'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                router.post(route('logout'));
                                            }}
                                            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
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

=======
>>>>>>> 5ab1eb2b6ad31d262570cf0344927bc54a0eb715
                <main className="lg:pl-[260px]">
                    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-5 backdrop-blur lg:px-8">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(true)}
                                className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                                aria-label="Buka menu"
                            >
                                <Menu className="size-5" />
                            </button>
                            <PanelLeft className="hidden size-5 text-slate-500 lg:block" />
                            <div className="h-6 w-px bg-slate-100" />
                            <p className="text-sm font-semibold text-slate-800">{pageTitle}</p>
                        </div>

                        <div className="flex items-center gap-2">
<<<<<<< HEAD
                            <Link href={route('home')} className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 sm:inline-flex">
                                <House className="size-4" />
=======
                            <Link href={route('home')} className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 sm:inline-flex">
>>>>>>> 5ab1eb2b6ad31d262570cf0344927bc54a0eb715
                                Beranda
                            </Link>
                            <button type="button" className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100" aria-label="Notifikasi">
                                <Bell className="size-5" />
                            </button>
                            <button type="button" className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100" aria-label="Tema">
                                <Moon className="size-5" />
                            </button>
                        </div>
                    </header>

<<<<<<< HEAD
=======
                    {isMenuOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <button type="button" className="absolute inset-0 bg-slate-950/40" onClick={() => setIsMenuOpen(false)} aria-label="Tutup menu" />
                            <aside className="relative h-full w-[290px] bg-white shadow-2xl">
                                <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
                                    <div className="flex items-center gap-3">
                                        <div className="grid size-10 place-content-center rounded-2xl bg-emerald-900 text-white">
                                            <Store className="size-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-950">Go-UMKM</p>
                                            <p className="text-sm text-slate-500">Dashboard</p>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => setIsMenuOpen(false)} className="rounded-xl p-2 hover:bg-slate-100" aria-label="Tutup menu">
                                        <X className="size-5" />
                                    </button>
                                </div>
                                <nav className="space-y-1 px-5 py-5">
                                    {dashboardMenus.map((item) => {
                                        const Icon = item.icon;
                                        const Tag = item.href === '#' ? 'a' : Link;
                                        return (
                                            <Tag
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                <Icon className="size-5" />
                                                {item.label}
                                            </Tag>
                                        );
                                    })}
                                </nav>
                            </aside>
                        </div>
                    )}

>>>>>>> 5ab1eb2b6ad31d262570cf0344927bc54a0eb715
                    <section className="min-h-[calc(100vh-80px)] bg-white px-5 py-8 lg:px-10">
                        {children}
                    </section>
                </main>
            </div>
        );
    }

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
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(253,186,116,0.3),transparent_26%),radial-gradient(circle_at_90%_0%,rgba(45,212,191,0.24),transparent_28%),linear-gradient(160deg,#fff8ee_0%,#f4fff8_54%,#edf8ff_100%)]">
            <div className="pointer-events-none absolute -left-24 top-20 size-64 rounded-full bg-orange-200/50 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-teal-200/50 blur-3xl"></div>

            <div className="relative mx-auto w-[min(1160px,92vw)] py-6 sm:py-8">
                <header className="glass-panel sticky top-0 z-50 px-4 py-3 sm:top-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-20 items-center gap-3">
                            <div className="grid size-10 shrink-0 place-content-center rounded-2xl bg-linear-to-br from-teal-600 to-orange-500 text-white shadow-lg transition-transform hover:rotate-6">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-slate-400">Go-Umkm</p>
                                <h1 className="truncate text-base font-extrabold leading-none text-slate-900 sm:text-lg">{pageTitle}</h1>
                            </div>
                        </div>

                        <div className="hidden items-center gap-2 md:flex">
                            <nav className="flex items-center gap-1">
                                {navItems.map((item, idx) => {
                                    const Icon = item.icon;
                                    const isActive = item.variant === 'home' ? url === '/' : isActivePath(item.href);
                                    const variantClass = isActive
                                        ? 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-200 -translate-y-0.5'
                                        : item.variant === 'home'
                                            ? 'bg-linear-to-br from-teal-500/10 to-orange-500/10 border border-teal-200/50 text-teal-700 hover:border-teal-300'
                                            : 'text-slate-600 hover:bg-slate-100';

                                    return (
                                        <Link key={idx} href={item.href} className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 ${variantClass}`}>
                                            {Icon && <Icon className={`size-4 shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}`} />}
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="relative ml-2 border-l border-slate-200 pl-3" ref={profileRef}>
                                {auth?.user ? (
                                    <div className="relative">
                                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex size-10 items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md transition-all hover:scale-105 active:scale-95">
                                            {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : <UserCircle className="size-7 text-slate-400" />}
                                        </button>
                                        {isProfileOpen && (
                                            <div className="fade-in-up absolute right-0 mt-3 w-52 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                                                <div className="mb-1 border-b border-slate-50 px-3 py-2">
                                                    <p className="text-[10px] font-black uppercase leading-none tracking-tighter text-slate-400">Halo, {auth?.user?.role}</p>
                                                    <p className="mt-1 truncate text-sm font-bold text-slate-900">{auth?.user?.name}</p>
                                                </div>
                                                <Link href={route('profile')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-700">
                                                    <Settings className="size-4" /> Profile User
                                                </Link>
                                                {isSeller && (
                                                    <Link href={route('profile.business')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-700">
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
                                    <button onClick={() => router.get(route('login'))} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95">
                                        <LogIn className="size-4" /> Masuk
                                    </button>
                                )}
                            </div>
                        </div>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden">
                            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <nav className="fade-in-up mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 md:hidden">
                            {auth?.user && (
                                <div className="mb-2 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                                    <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                                        {auth?.user?.image ? <img src={auth.user.image} className="h-full w-full object-cover" /> : <UserIcon className="size-6 text-slate-300" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-none text-slate-900">{auth?.user?.name}</p>
                                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-teal-600">{auth?.user?.role}</p>
                                    </div>
                                </div>
                            )}

                            {navItems.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <Link key={idx} href={item.href} className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50" onClick={() => setIsMenuOpen(false)}>
                                        {Icon && <Icon className="size-5" />} {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}
                </header>

                <main className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">{children}</main>

                <footer className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200/70 bg-white/70 px-6 py-5 text-sm text-slate-600 backdrop-blur-sm sm:flex-row">
                    <p className="text-center font-medium tracking-tight sm:text-left">© 2026 Go-Umkm. Proudly supporting local sellers.</p>
                    <p className="inline-flex items-center gap-2 font-bold text-slate-700">
                        <Sparkles className="size-4 animate-bounce text-orange-500" /> Belanja bijak, dukung UMKM.
                    </p>
                </footer>
            </div>
        </div>
    );
}
