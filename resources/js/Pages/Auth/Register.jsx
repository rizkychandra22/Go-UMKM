import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import HeroSection from '../../Components/Landing/AuthHeroSection';
import { 
    Store, LogIn, User, Mail, Phone, Lock, UserCircle,
} from 'lucide-react';

export default function Register() {
    return (
        <>
            <Head title="Daftar Akun | Tokoku" />

            <LayoutApp pageTitle="Daftar Akun">
                <section className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
                    
                    {/* Sisi Kiri: Hero Content */}
                    <HeroSection type="register" />

                    {/* Sisi Kanan: Form Register */}
                    <article className="glass-panel fade-in-up-delay p-6 sm:p-8 border-t-4 border-t-amber-400">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-slate-900 leading-none">Buat Akun</h3>
                            <p className="mt-2 text-sm text-slate-500 font-medium tracking-tight">Lengkapi data untuk memulai perjalanan Anda.</p>
                        </div>

                        <RegisterForm />
                    </article>

                </section>
            </LayoutApp>
        </>
    );
}

function RegisterForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('register.store'));
    }

    return (
        <form className="space-y-4" onSubmit={submit}>
            
            {/* Pilihan Role */}
            <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white-600 mb-2 ml-1">Daftar Sebagai:</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setData('role', 'customer')}
                        className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 transition-all ${
                            data.role === 'customer' 
                            ? 'border-teal-500 bg-teal-50 text-teal-700 ring-4 ring-teal-500/10 shadow-sm' 
                            : errors.role 
                                ? 'border-red-300 bg-red-50 text-red-500' 
                                : 'border-slate-200 bg-white/50 text-white-300 hover:border-teal-300'
                        }`}
                    >
                        <UserCircle className={`size-4 ${data.role === 'customer' ? 'animate-pulse' : ''}`} />
                        <span className="text-sm font-bold text-white-300">Pembeli</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setData('role', 'seller')}
                        className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 transition-all ${
                            data.role === 'seller' 
                            ? 'border-orange-500 bg-orange-50 text-orange-700 ring-4 ring-orange-500/10 shadow-sm' 
                            : errors.role 
                                ? 'border-red-300 bg-red-50 text-red-500' 
                                : 'border-slate-200 bg-white/50 text-white-300 hover:border-orange-300'
                        }`}
                    >
                        <Store className={`size-4 ${data.role === 'seller' ? 'animate-pulse' : ''}`} />
                        <span className="text-sm font-bold text-white-300">Mitra</span>
                    </button>
                </div>
                {errors.role && <p className="text-red-600 text-[11px] mt-2 ml-1 font-bold animate-shake italic">* Pilih salah satu role</p>}
            </div>

            <div className="space-y-3.5">
                {/* Nama */}
                <div className="group">
                    <label className="block text-xs font-bold text-white-600 mb-1 ml-1 group-focus-within:text-teal-600 transition-colors">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 size-4 text-white-400 group-focus-within:text-teal-500 transition-colors" />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`w-full rounded-2xl border p-3 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.name ? 'border-red-300 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="Contoh: Budi Darmawan"
                        />
                    </div>
                    {errors.name && <p className="text-red-600 text-[10px] mt-1 ml-1 font-bold">{errors.name}</p>}
                </div>

                {/* Email Row*/}
                <div className="group">
                    <label className="block text-xs font-bold text-white-600 mb-1 ml-1 group-focus-within:text-teal-600 transition-colors">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 size-4 text-white-400 group-focus-within:text-teal-500 transition-colors" />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full rounded-2xl border p-3 pl-10 text-sm transition-all ${
                                errors.email ? 'border-red-300 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 bg-white/50'
                            }`}
                            placeholder="email@gmail.com"
                        />
                    </div>
                </div>

                {/* Telepon Row */}
                <div className="group">
                    <label className="block text-xs font-bold text-white-600 mb-1 ml-1 group-focus-within:text-teal-600 transition-colors">Telepon</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3.5 size-4 text-white-400 group-focus-within:text-teal-500 transition-colors" />
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className={`w-full rounded-2xl border p-3 pl-10 text-sm transition-all ${
                                errors.phone ? 'border-red-300 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 bg-white/50'
                            }`}
                            placeholder="0812..."
                        />
                    </div>
                </div>

                {/* Password Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="group">
                        <label className="block text-xs font-bold text-white-600 mb-1 ml-1 group-focus-within:text-teal-600 transition-colors">Sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 size-4 text-white-400 group-focus-within:text-teal-500 transition-colors" />
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full rounded-2xl border p-3 pl-10 text-sm transition-all ${
                                    errors.password ? 'border-red-300 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 bg-white/50'
                                }`}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold text-white-600 mb-1 ml-1 group-focus-within:text-teal-600 transition-colors">Konfirmasi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 size-4 text-white-400 group-focus-within:text-teal-500 transition-colors" />
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 bg-white/50 p-3 pl-10 text-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>
                {errors.password && <p className="text-red-600 text-[10px] font-bold ml-1">{errors.password}</p>}
            </div>

            <button 
                disabled={processing} 
                className="group w-full rounded-2xl bg-teal-600 py-3 text-sm font-black text-white hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {processing ? 'Menghubungkan...' : 'Daftar Akun'}
                <LogIn className="size-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-6 text-center border-t border-slate-100 pt-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sudah punya akun?</p>
                <Link href={route('login')} className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-teal-700 transition hover:bg-teal-50 hover:border-teal-300">
                    Masuk Akun
                </Link>
            </div>
        </form>
    );
}
