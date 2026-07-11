import { Head, useForm, usePage } from '@inertiajs/react';
import LayoutApp from '../../Layouts/App';
import { 
    User, Mail, Phone, MapPin, Camera, Save, CheckCircle, Lock 
} from 'lucide-react';

export default function Profile() {
    const { auth, status } = usePage().props ?? {};

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        phone: auth?.user?.phone || '',
        address: auth?.user?.address || '',
        password: '',
        password_confirmation: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <LayoutApp pageTitle="Pengaturan Profil">
            <Head title="Edit Profil | Tokoku" />

            <div className="w-full">
                <section className={`glass-panel fade-in-up p-6 sm:p-8 border-t-4 ${auth.user.role === 'seller' ? 'border-t-emerald-400' : 'border-t-indigo-400'}`}>
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Informasi Pribadi & Keamanan</h2>
                        <p className="text-sm text-slate-500 font-medium mt-1 dark:text-slate-400  ">Kelola data diri, alamat, dan kata sandi Anda dalam satu tempat.</p>
                    </div>

                    {status === 'profile-updated' && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-teal-100 p-4 text-teal-700 border border-teal-150 animate-in fade-in zoom-in duration-300">
                            <CheckCircle className="size-5" />
                            <p className="text-sm font-bold dark:text-teal-700">Profil dan pengaturan berhasil diperbarui!</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        {/* Avatar Upload Section */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start bg-slate-50/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 dark:bg-slate-950/50">
                            <div className="relative group">
                                <div className="size-28 overflow-hidden rounded-3xl border-4 border-white shadow-xl bg-white flex items-center justify-center dark:border-slate-800 dark:bg-slate-900">
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} className="h-full w-full object-cover" />
                                    ) : auth?.user?.image ? (
                                        <img src={auth.user.image} className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="size-12 text-slate-300 dark:text-slate-600" />
                                    )}
                                </div>
                                <label className="absolute -bottom-2 -right-2 grid size-10 place-content-center rounded-2xl bg-slate-900 text-white shadow-lg cursor-pointer hover:bg-teal-600 transition-transform active:scale-90">
                                    <Camera className="size-5" />
                                    <input type="file" className="hidden" onChange={(e) => setData('image', e.target.files[0])} />
                                </label>
                            </div>
                            <div className="text-center sm:text-left">
                                <h4 className="text-base font-black text-slate-900 dark:text-slate-100">Foto Profil</h4>
                                <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
                                    {auth?.user?.role === 'seller' 
                                        ? 'Unggah foto terbaik untuk membangun kepercayaan pembeli dan identitas toko Anda.' 
                                        : 'Unggah foto profil agar penjual dan kurir lebih mudah mengenali Anda.'}
                                </p>
                                {errors.image && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase dark:text-red-400 ">{errors.image}</p>}
                            </div>
                        </div>

                        {/* Grid Form */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Kiri: Data Diri */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-200">Data Identitas</h3>
                                
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">Nama Lengkap</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
                                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">Nomor HP / WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
                                        <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">Alamat Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
                                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Kanan: Keamanan & Alamat */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-200">Keamanan & Alamat</h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">Password Baru</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
                                            <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Kosongkan jika tetap" className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">Konfirmasi</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
                                            <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" />
                                        </div>
                                    </div>
                                </div>
                                {errors.password && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password}</p>}

                                <div className="space-y-1.5">
                                    <label className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">Alamat Lengkap</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
                                        <textarea rows="4" value={data.address} onChange={(e) => setData('address', e.target.value)} className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder="Jl. Raya Siliwangi No. 10..."></textarea>
                                    </div>
                                    {errors.address && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.address}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                            <p className="hidden sm:block text-xs text-slate-400 font-medium italic dark:text-slate-300">
                                * Pastikan data yang Anda masukkan sudah benar sebelum menyimpan.
                            </p>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-slate-900 px-10 py-4 text-sm font-black text-white hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200 dark:bg-teal-600 dark:shadow-none dark:hover:bg-teal-500"
                            >
                                <Save className="size-4" />
                                {processing ? 'Memproses...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </LayoutApp>
    );
}
