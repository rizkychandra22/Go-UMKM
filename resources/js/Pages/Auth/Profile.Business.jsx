import { Head, useForm, usePage } from '@inertiajs/react';
import LayoutApp from '../../Layouts/App';
import { Store, FileText, Camera, Save, CheckCircle } from 'lucide-react';

export default function Profile() {
    const { auth, status } = usePage().props ?? {};

    const { data, setData, post, processing, errors, reset } = useForm({
        business: auth?.user?.mitra?.business || '',
        description: auth?.user?.mitra?.description || '',
        image: null, 
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.business.update'), {
            forceFormData: true, 
            onSuccess: () => reset('image'),
        });
    };

    return (
        <LayoutApp pageTitle="Pengaturan Bisnis">
            <Head title="Pengaturan Profil Bisnis | Go-UMKM" />

            <div className="w-full">
                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-emerald-400">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900">Informasi Profil Bisnis</h2>
                        <p className="text-sm text-slate-500 font-medium mt-1">Kelola nama usaha, deskripsi etalase, dan foto komersial toko Anda.</p>
                    </div>

                    {status === 'profile-business-updated' && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-teal-100 p-4 text-teal-700 border border-teal-150 animate-in fade-in zoom-in duration-300">
                            <CheckCircle className="size-5" />
                            <p className="text-sm font-bold">Profil bisnis berhasil diperbarui!</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        {/* Business Banner / Image Upload Section */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
                            <div className="relative group">
                                <div className="size-28 overflow-hidden rounded-3xl border-4 border-white shadow-xl bg-white flex items-center justify-center">
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} className="h-full w-full object-cover" />
                                    ) : auth?.user?.mitra?.image ? (
                                        <img src={`/storage/${auth.user.mitra.image}`} className="h-full w-full object-cover" />
                                    ) : (
                                        <Store className="size-12 text-slate-300" />
                                    )}
                                </div>
                                <label className="absolute -bottom-2 -right-2 grid size-10 place-content-center rounded-2xl bg-slate-900 text-white shadow-lg cursor-pointer hover:bg-emerald-600 transition-transform active:scale-90">
                                    <Camera className="size-5" />
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files[0])} 
                                    />
                                </label>
                            </div>
                            <div className="text-center sm:text-left">
                                <h4 className="text-base font-black text-slate-900">Foto / Logo Bisnis</h4>
                                <p className="text-xs text-slate-500 mt-1">
                                    Unggah foto toko terbaik untuk membangun kepercayaan pembeli dan identitas brand lokal Anda.
                                </p>
                                {errors.image && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.image}</p>}
                            </div>
                        </div>

                        {/* Grid Form Input */}
                        <div className="grid gap-6 grid-cols-1">
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Detail Toko</h3>
                                
                                {/* Input Nama Bisnis */}
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-xs font-bold text-slate-600">Nama Bisnis / Toko UMKM</label>
                                    <div className="relative">
                                        <Store className="absolute left-3 top-3 size-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            value={data.business} 
                                            onChange={(e) => setData('business', e.target.value)} 
                                            placeholder="Masukkan nama resmi tokomu..."
                                            className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" 
                                        />
                                    </div>
                                    {errors.business && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.business}</p>}
                                    <p className="text-[11px] text-slate-400 ml-1">Nama ini akan dipajang pada halaman kartu mitra publik.</p>
                                </div>

                                {/* Input Deskripsi Bisnis */}
                                <div className="space-y-1.5">
                                    <label className="ml-1 text-xs font-bold text-slate-600">Deskripsi Singkat Usaha</label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 size-4 text-slate-400" />
                                        <textarea 
                                            rows="4" 
                                            value={data.description} 
                                            onChange={(e) => setData('description', e.target.value)} 
                                            placeholder="Ceritakan produk khas atau keunggulan komersial tokomu di sini..."
                                            className="w-full rounded-2xl border-slate-200 bg-white p-2.5 pl-10 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        ></textarea>
                                    </div>
                                    {errors.description && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.description}</p>}
                                    <p className="text-[11px] text-slate-400 ml-1">Maksimal 3 baris teks akan ditampilkan ideal di halaman depan card.</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Form & Tombol Submit */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                            <p className="hidden sm:block text-xs text-slate-400 font-medium italic">
                                * Periksa kembali ejaan informasi toko Anda sebelum menekan tombol simpan.
                            </p>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-slate-900 px-10 py-4 text-sm font-black text-white hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200"
                            >
                                <Save className="size-4" />
                                {processing ? 'Memproses...' : 'Simpan Profil Bisnis'}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </LayoutApp>
    );
}