import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { House, Sparkles, Package, Store, LogIn, ShieldAlert, XCircle, Mail, Lock } from 'lucide-react';

export default function Login() {
    return (
        <>
            <Head title="Login | Go-UMKM" />

            <LayoutApp
                pageTitle="Login Akun"
                navItems={[
                    { label: 'Home', href: route('home'), type: 'link', variant: 'home', icon: House },
                    { label: 'Populer', href: '', type: 'anchor', icon: Sparkles },
                    { label: 'Produk', href: '', type: 'anchor', icon: Package },
                    { label: 'Mitra', href: '', type: 'anchor', icon: Store },
                    { label: 'Masuk', href: route('login'), type: 'link', badge: true, icon: LogIn },
                ]}
            >
                <div className="mx-auto max-w-[400px] fade-in-up">
                    <section className="glass-panel p-6 sm:p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Login Akun</h2>
                            <p className="mt-2 text-sm text-slate-600"> Masuk untuk melanjutkan belanja dan kelola Toko</p>
                        </div>

                        <LoginForm />
                    </section>
                </div>
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
            
            {/* Alert: Akses Terlarang (dari Middleware) */}
            {props.errors.loginAkses && (
                <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-800 border border-red-100 animate-pulse">
                    <ShieldAlert className="size-5 shrink-0 text-red-600" />
                    <p className="font-bold">{props.errors.loginAkses}</p>
                </div>
            )}

            {/* Alert: Kredensial Salah (dari AuthService) */}
            {errors.authGagal && (
                <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-4 text-sm text-orange-800 border border-orange-100 animate-pulse">
                    <XCircle className="size-5 shrink-0 text-orange-600" />
                    <p className="font-bold">{errors.authGagal}</p>
                </div>
            )}

            <div className="space-y-4">
                {/* Field Email */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full rounded-xl border p-2.5 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.email || errors.authGagal 
                                ? 'border-red-300 focus:ring-red-100 bg-red-50/30' 
                                : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="example@gmail.com"
                        />
                    </div>
                    {errors.email && <p className="text-red-600 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
                </div>

                {/* Field Password */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 size-4 text-slate-400" />
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full rounded-xl border p-2.5 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.password || errors.authGagal 
                                ? 'border-red-300 focus:ring-red-100 bg-red-50/30' 
                                : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.password && <p className="text-red-600 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
                </div>
            </div>

            <div className="flex items-center justify-between px-1">
                <label className="flex items-center text-sm font-medium text-slate-600 cursor-pointer select-none">
                    <input 
                        type="checkbox" 
                        checked={data.remember} 
                        onChange={(e) => setData('remember', e.target.checked)} 
                        className="mr-2 size-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" 
                    /> 
                    Ingat saya
                </label>
                <a href="#" className="text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors">Lupa password?</a>
            </div>

            <button 
                disabled={processing} 
                className="w-full rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-teal-200 hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
                {processing ? 'Prosess...' : 'Login'}
            </button>

            <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                    Belum punya akun? <Link href={route('register')} className="font-extrabold text-teal-700 hover:underline">Daftar Akun</Link>
                </p>
            </div>
        </form>
    );
}