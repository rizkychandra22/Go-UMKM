import { HandPlatter, House, Shirt, ShoppingBasket } from 'lucide-react';

export default function CategoryProduct() {
    // Kategori Product
    const categories = [
        {
            title: 'Kuliner Lokal',
            description: 'Camilan, frozen food, dan minuman artisan.',
            icon: HandPlatter,
            tone: 'from-amber to-amber-100',     // hangat, appetizing
        },
        {
            title: 'Trending Fashion',
            description: 'Batik kontemporer, tas handmade, aksesori.',
            icon: Shirt,
            tone: 'from-pink to-rose-100',       // lively, fashion-forward
        },
        {
            title: 'Rumah & Dekor',
            description: 'Kerajinan kayu, rotan, dan dekor estetik.',
            icon: House,
            tone: 'from-sky to-sky-100',     // clean, utilitarian
        },
        {
            title: 'Kebutuhan Harian',
            description: 'Produk sehari-hari berkualitas tinggi.',
            icon: ShoppingBasket,
            tone: 'from-emerald to-emerald-100',     // calm, natural
        }
    ];

    return(
        <>
            <div className="flex items-end justify-between gap-3">
                <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">Kategori Produk</h3>
                    <p className="mt-2 text-slate-600">Pilih sesuai kebutuhan: kuliner harian sampai hampers premium.</p>
                </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((item) => {
                    const Icon = item.icon;
                    return (
                        <article
                            key={item.title}
                            className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${item.tone} p-4 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg`}
                        >
                            <div className="inline-flex rounded-xl bg-slate-900 p-2 text-white">
                                <Icon className="size-4" />
                            </div>
                            <h4 className="mt-3 text-base font-extrabold text-slate-900">{item.title}</h4>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                        </article>
                    );
                })}
            </div>
        </>
    );
}