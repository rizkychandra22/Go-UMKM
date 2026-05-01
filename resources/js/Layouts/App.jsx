import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, ShoppingBag, Sparkles, Store, X } from 'lucide-react';

export default function LayoutApp({ pageTitle, navItems = [], cta, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(253,186,116,0.3),transparent_26%),radial-gradient(circle_at_90%_0%,rgba(45,212,191,0.24),transparent_28%),linear-gradient(160deg,#fff8ee_0%,#f4fff8_54%,#edf8ff_100%)]">
            <div className="pointer-events-none absolute -left-24 top-20 size-64 rounded-full bg-orange-200/50 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-teal-200/50 blur-3xl"></div>

            <div className="relative mx-auto w-[min(1160px,92vw)] py-6 sm:py-8">
                <header className="glass-panel sticky top-4 z-50 px-4 py-3 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-content-center rounded-2xl bg-gradient-to-br from-teal-600 to-orange-500 text-white shadow-lg shadow-teal-500/25">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Go-Umkm</p>
                                <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">{pageTitle}</h1>
                            </div>
                        </div>

                        {/* DESKTOP NAVIGATION */}
                        <nav className="hidden items-center gap-1 sm:flex">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const baseClass = "inline-flex items-center gap-2 px-3 py-2 text-sm font-bold transition hover:-translate-y-0.5 rounded-xl";
                                const variantClass = item.badge
                                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                                    : item.variant === 'home'
                                        ? 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'; 
                                const finalClass = `${baseClass} ${variantClass}`;

                                return item.type === 'anchor' ? (
                                    <a key={item.label} href={item.href} className={finalClass}>
                                        {Icon ? <Icon className="size-4 shrink-0" /> : null}
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link key={item.label} href={item.href} className={finalClass}>
                                        {Icon ? <Icon className="size-4 shrink-0" /> : null}
                                        {item.label}
                                    </Link>
                                );
                            })}
                            {cta ? (
                                <Link
                                    href={cta.href}
                                    className="ml-1 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    <ShoppingBag className="size-4" />
                                    {cta.label}
                                </Link>
                            ) : null}
                        </nav>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>

                    {/* MOBILE NAVIGATION */}
                    {isMenuOpen && (
                        <nav className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:hidden">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const baseClass = "flex items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-xl transition";
                                
                                const variantClass = item.badge
                                    ? 'bg-slate-900 text-white'
                                    : item.variant === 'home'
                                        ? 'bg-teal-100 text-teal-800'
                                        : 'text-slate-600 hover:bg-slate-50';

                                return item.type === 'anchor' ? (
                                    <a key={item.label} href={item.href} className={`${baseClass} ${variantClass}`} onClick={() => setIsMenuOpen(false)}>
                                        {Icon ? <Icon className="size-5" /> : null}
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link key={item.label} href={item.href} className={`${baseClass} ${variantClass}`} onClick={() => setIsMenuOpen(false)}>
                                        {Icon ? <Icon className="size-5" /> : null}
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}
                </header>

                <main className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">{children}</main>

                <footer className="mt-10 flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm text-slate-600">
                    <p>Made for local sellers and local pride.</p>
                    <p className="inline-flex items-center gap-2 font-medium text-slate-700">
                        <Sparkles className="size-4 text-orange-500" />
                        Belanja bijak, dukung UMKM.
                    </p>
                </footer>
            </div>
        </div>
    );
}