import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { 
    House, Sparkles, Package, Store, LogIn, 
    User, Mail, Phone, Lock, UserCircle, 
    ArrowRight, Star, Store as StoreIcon 
} from 'lucide-react';

export default function Register() {
    return (
        <>
            <Head title="Daftar Akun | Go-UMKM" />

            <LayoutApp pageTitle="Daftar Akun">
                <section className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
                    
                    {/* SISI KIRI: HERO CONTENT (Identik dengan Home/Login) */}
                    <article className="glass-panel fade-in-up p-6 sm:p-8 flex flex-col justify-center border-t-4 border-t-teal-400">
                        <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 w-fit">
                            <Store className="size-4" />
                            Marketplace produk lokal
                        </p>
                        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                            Saatnya Produk Lokal Kamu Go Digital
                        </h2>
                        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                            Buka toko online gratis, kelola pesanan dengan mudah, jangkau lebih banyak pelanggan di seluruh Indonesia, dan nikmati berbagai keuntungan.
                        </p>

                        <div className="mt-6 space-y-4">
                            {[
                                { title: 'Pendaftaran Gratis', desc: 'Tanpa biaya admin bulanan.' },
                                { title: 'Kelola Stok Mudah', desc: 'Pantau produk hanya dari satu dashboard.' },
                                { title: 'Dukungan UMKM', desc: 'Promosi khusus untuk produk-produk unggulan.' },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 group">
                                    <div className="mt-1 grid size-5 place-content-center rounded-full bg-teal-600 text-white group-hover:scale-110 transition-transform">
                                        <ArrowRight className="size-3" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{feature.title}</h4>
                                        <p className="text-xs text-slate-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 grid gap-3 sm:grid-cols-3">
                            {[
                                { value: '2.500+', label: 'Mitra Usaha' },
                                { value: '18k', label: 'Produk Mitra' },
                                { value: '4.8/5', label: 'Rating' },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-xl border border-teal-100 bg-teal-50/60 p-3 hover:bg-teal-50 transition-colors">
                                    <p className="text-lg font-black text-slate-900">{stat.value}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* SISI KANAN: FORM REGISTER */}
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
                <label className="block text-xs font-black uppercase tracking-widest text-slate-700 mb-2 ml-1">Daftar Sebagai:</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setData('role', 'customer')}
                        className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 transition-all ${
                            data.role === 'customer' 
                            ? 'border-teal-500 bg-teal-50 text-teal-700 ring-4 ring-teal-500/10 shadow-sm' 
                            : errors.role 
                                ? 'border-red-300 bg-red-50 text-red-500' 
                                : 'border-slate-200 bg-white/50 text-slate-500 hover:border-teal-200'
                        }`}
                    >
                        <UserCircle className={`size-4 ${data.role === 'customer' ? 'animate-pulse' : ''}`} />
                        <span className="text-sm font-bold">Pembeli</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setData('role', 'seller')}
                        className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 transition-all ${
                            data.role === 'seller' 
                            ? 'border-orange-500 bg-orange-50 text-orange-700 ring-4 ring-orange-500/10 shadow-sm' 
                            : errors.role 
                                ? 'border-red-300 bg-red-50 text-red-500' 
                                : 'border-slate-200 bg-white/50 text-slate-500 hover:border-orange-200'
                        }`}
                    >
                        <StoreIcon className={`size-4 ${data.role === 'seller' ? 'animate-pulse' : ''}`} />
                        <span className="text-sm font-bold">Mitra</span>
                    </button>
                </div>
                {errors.role && <p className="text-red-600 text-[11px] mt-2 ml-1 font-bold animate-shake italic">* Pilih salah satu role</p>}
            </div>

            <div className="space-y-3.5">
                {/* Nama */}
                <div className="group">
                    <label className="block text-xs font-bold text-slate-600 mb-1 ml-1 group-focus-within:text-teal-600 transition-colors">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 size-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
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
                <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 size-4 text-slate-400" />
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
                <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Telepon</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3.5 size-4 text-slate-400" />
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
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 size-4 text-slate-400" />
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
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Konfirmasi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 size-4 text-slate-400" />
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
                className="group mt-2 w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-black text-white hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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