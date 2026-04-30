import { Link } from '@inertiajs/react';
import { ShoppingBag, Sparkles, Store } from 'lucide-react';

export default function StorefrontLayout({ pageTitle, navItems = [], cta, children }) {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(253,186,116,0.3),transparent_26%),radial-gradient(circle_at_90%_0%,rgba(45,212,191,0.24),transparent_28%),linear-gradient(160deg,#fff8ee_0%,#f4fff8_54%,#edf8ff_100%)]">
            <div className="pointer-events-none absolute -left-24 top-20 size-64 rounded-full bg-orange-200/50 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-teal-200/50 blur-3xl"></div>

            <div className="relative mx-auto w-[min(1160px,92vw)] py-6 sm:py-8">
                <header className="glass-panel sticky top-4 z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                        <div className="grid size-10 place-content-center rounded-2xl bg-gradient-to-br from-teal-600 to-orange-500 text-white shadow-lg shadow-teal-500/25">
                            <Store className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">UMKM-Go</p>
                            <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">{pageTitle}</h1>
                        </div>
                    </div>

                    <nav className="flex flex-wrap items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const itemClassName = item.badge
                                ? 'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800'
                                : item.variant === 'home'
                                    ? 'inline-flex items-center gap-2 rounded-xl bg-teal-100 px-3 py-2 text-sm font-semibold text-teal-800 transition hover:-translate-y-0.5 hover:bg-teal-200'
                                    : 'nav-link';

                            return item.type === 'anchor' ? (
                                <a key={item.label} href={item.href} className={itemClassName}>
                                    {Icon ? <Icon className="size-4" /> : null}
                                    {item.label}
                                </a>
                            ) : (
                                <Link key={item.label} href={item.href} className={itemClassName}>
                                    {Icon ? <Icon className="size-4" /> : null}
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
