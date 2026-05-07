import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { 
    House, 
    Sparkles, 
    Package, 
    Store, 
    LogIn, 
    User, 
    Mail, 
    Phone, 
    Lock, 
    UserCircle, 
    Store as StoreIcon 
} from 'lucide-react';

export default function Register() {
    return (
        <>
            <Head title="Daftar | Go-UMKM" />

            <LayoutApp
                pageTitle="Daftar Akun"
                navItems={[
                    { label: 'Home', href: route('home'), type: 'link', variant: 'home', icon: House },
                    { label: 'Populer', href: '', type: 'anchor', icon: Sparkles },
                    { label: 'Produk', href: '', type: 'anchor', icon: Package },
                    { label: 'Mitra', href: '', type: 'anchor', icon: Store },
                    { label: 'Masuk', href: route('login'), type: 'link', badge: true, icon: LogIn },
                ]}
            >
                <div className="mx-auto max-w-[500px] fade-in-up">
                    <section className="glass-panel p-6 sm:p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Daftar Akun</h2>
                            <p className="mt-2 text-sm text-slate-600">Bergabunglah untuk mulai menjual produk Anda atau berbelanja produk lokal terbaik.</p>
                        </div>

                        <RegisterForm />
                    </section>
                </div>
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
        <form className="space-y-5" onSubmit={submit}>
            
            {/* Pilihan Role Daftar Akun */}
            <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setData('role', 'customer')}
                        className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                            data.role === 'customer' 
                            ? 'border-teal-500 bg-teal-50 text-teal-700 ring-2 ring-teal-500/20' 
                            : errors.role 
                                ? 'border-red-300 bg-red-50/30 text-red-500' // Style Error
                                : 'border-slate-200 bg-white/50 text-slate-500 hover:border-slate-300'
                                    }`}
                    >
                        <UserCircle className="size-4" />
                        <span className="text-sm font-bold">Pembeli</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setData('role', 'seller')}
                        className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                            data.role === 'seller' 
                            ? 'border-teal-500 bg-teal-50 text-teal-700 ring-2 ring-teal-500/20' 
                            : errors.role 
                                ? 'border-red-300 bg-red-50/30 text-red-500' // Style Error
                                : 'border-slate-200 bg-white/50 text-slate-500 hover:border-slate-300'
                                    }`}
                    >
                        <StoreIcon className="size-4" />
                        <span className="text-sm font-bold">Mitra UMKM</span>
                    </button>
                </div>

                {/* Pesan Error Khusus Role */}
                {errors.role && (
                    <p className="text-red-600 text-xs mt-2 ml-1 font-medium animate-pulse">
                        * Silakan pilih tipe akun (Pembeli atau Mitra)
                    </p>
                )}
            </div>

            <div className="space-y-4">
                {/* Input Nama */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 size-4 text-slate-400" />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`w-full rounded-xl border p-2.5 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.name ? 'border-red-300 focus:ring-red-100 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="Contoh: Budi Darmawan"
                        />
                    </div>
                    {errors.name && <p className="text-red-600 text-xs mt-1.5 ml-1 font-medium">{errors.name}</p>}
                </div>

                {/* Input Email */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full rounded-xl border p-2.5 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.email ? 'border-red-300 focus:ring-red-100 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="alamat@email.com"
                        />
                    </div>
                    {errors.email && <p className="text-red-600 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
                </div>

                {/* Input Telepon */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Nomor Telepon</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 size-4 text-slate-400" />
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className={`w-full rounded-xl border p-2.5 pl-10 text-sm transition-all focus:ring-4 ${
                                errors.phone ? 'border-red-300 focus:ring-red-100 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                            }`}
                            placeholder="081234567XXX"
                        />
                    </div>
                    {errors.phone && <p className="text-red-600 text-xs mt-1.5 ml-1 font-medium">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Input Password */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 size-4 text-slate-400" />
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full rounded-xl border p-2.5 pl-10 text-sm transition-all focus:ring-4 ${
                                    errors.password ? 'border-red-300 focus:ring-red-100 bg-red-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10 bg-white/50'
                                }`}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Konfirmasi Password */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Konfirmasi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 size-4 text-slate-400" />
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white/50 p-2.5 pl-10 text-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>
                {errors.password && <p className="text-red-600 text-xs mt-1 font-medium ml-1">{errors.password}</p>}
            </div>

            <button 
                disabled={processing} 
                className="mt-4 w-full rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-teal-200 hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
                {processing ? 'Prosess...' : 'Daftar Akun'}
            </button>

            <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                    Sudah punya akun? <Link href={route('login')} className="font-extrabold text-teal-700 hover:underline">Masuk di sini</Link>
                </p>
            </div>
        </form>
    );
}