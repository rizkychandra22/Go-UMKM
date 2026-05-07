import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { 
    House, Sparkles, Package, Store, LogIn, 
    ShieldAlert, XCircle, Mail, Lock, ArrowRight, Star 
} from 'lucide-react';

export default function Login() {
    return (
        <>
            <Head title="Masuk Akun | Go-UMKM" />

            <LayoutApp pageTitle="Login Akun">
                {/* Main Hero Login */}
                <section className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr]">
                    {/* Sisi Kiri: Hero Content */}
                    <article className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-teal-400">
                        <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                            <Store className="size-4" />
                            Marketplace produk lokal
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                            Belanja UMKM dengan rasa pasar tradisional, pengalaman digital modern
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Temukan makanan, fashion, kerajinan, dan produk unik langsung dari pelaku UMKM Indonesia.
                            Satu keranjang, banyak cerita lokal.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={route('dashboardCustomer')}
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                Mulai Belanja
                                <ArrowRight className="size-4" />
                            </Link>
                            <a
                                href=""
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700"
                            >
                                Lihat Unggulan
                                <Star className="size-4" />
                            </a>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {[
                                { value: '2.500+', label: 'Mitra Usaha' },
                                { value: '18k', label: 'Produk Mitra' },
                                { value: '4.8/5', label: 'Rating Penjualan' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-teal-100 bg-teal-50/60 p-3"
                                >
                                    <p className="text-lg font-extrabold text-slate-900">{stat.value}</p>
                                    <p className="text-sm text-slate-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* Sisi Kanan: Form Login */}
                    <article className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-amber-400">
                        <div className="mb-6">
                            <h2 className="text-2xl font-extrabold text-slate-900">Login Akun</h2>
                            <p className="mt-2 text-sm text-slate-600">Masuk untuk melanjutkan belanja dan kelola produk.</p>
                        </div>

                        <LoginForm />
                    </article>
                </section>
            </LayoutApp>
        </>
    );
}

function LoginForm() {
    const { props } = usePage();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post(route('login.store'), {
            onFinish: () => reset('password'),
        });
    }

    return (
        <form className="space-y-5" onSubmit={submit}>
            
            {/* ALERT BOXES */}
            {props.errors.loginAkses && (
                <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-xs text-red-800 border border-red-100 animate-pulse">
                    <ShieldAlert className="size-5 shrink-0 text-red-600" />
                    <p className="font-bold">{props.errors.loginAkses}</p>
                </div>
            )}

            {errors.authGagal && (
                <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-4 text-xs text-orange-800 border border-orange-100 animate-pulse">
                    <XCircle className="size-5 shrink-0 text-orange-600" />
                    <p className="font-bold">{errors.authGagal}</p>
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 size-4 text-slate-400" />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full rounded-2xl border p-3 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.email || errors.authGagal 
                                ? 'border-red-300 focus:ring-red-100 bg-red-50/30' 
                                : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="nama@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 size-4 text-slate-400" />
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full rounded-2xl border p-3 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.password || errors.authGagal 
                                ? 'border-red-300 focus:ring-red-100 bg-red-50/30' 
                                : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between px-1">
                <label className="flex items-center text-xs font-bold text-slate-600 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={data.remember} 
                        onChange={(e) => setData('remember', e.target.checked)} 
                        className="mr-2 size-4 rounded-lg border-slate-300 text-teal-600 focus:ring-teal-500" 
                    /> 
                    Ingat saya
                </label>
                <a href="#" className="text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors">Lupa sandi?</a>
            </div>

            <button 
                disabled={processing} 
                className="group w-full rounded-2xl bg-teal-600 py-3 text-sm font-black text-white hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {processing ? 'Menghubungkan...' : 'Masuk Akun'}
                <LogIn className="size-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-6 text-center border-t border-slate-100 pt-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Belum punya akun?</p>
                <Link href={route('register')} className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-teal-700 transition hover:bg-teal-50 hover:border-teal-300">
                    Daftar Akun
                </Link>
            </div>
        </form>
    );
}