import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import CategoryProduct from '@/Components/Landing/HeroCategory';
import { Sparkles, Package } from 'lucide-react';
import { products } from '@/Constants/products';
import ProductCard from '@/Components/Products/Card';
import { useState } from 'react';
import { FilterBadge, SearchBar } from '@/Components/Shared/FilterData';
import ResetButton from '@/Components/Shared/ResetFilter';
import { Card, CardContent } from '@/Components/UI/card';

export default function Mitra({ categories, slug, product }) {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);

    // State untuk memanipulasi filter data
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBadge, setSelectedBadge] = useState('');

    // Mencari objek kategori aktif dari barisan menu atas
    const selected = slug ? categories.find((c) => c.slug === slug) : null;
    
    // Filter produk berdasarkan slug aktif, pencarian, dan badge
    const filteredProducts = products.filter((product) => {
        if (!slug) return false;
        
        let matchesSlug = false;
        // Match by slug
        if (product.slug === slug) matchesSlug = true;
        // Fallback match by category name
        else if (product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === slug) matchesSlug = true;

        if (!matchesSlug) return false;

        const matchesSearch = 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.badge && product.badge.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesBadge = selectedBadge ? product.badge === selectedBadge : true;
        
        return matchesSearch && matchesBadge;
    });

    const resetFilter = () => {
        setSearchQuery('');
        setSelectedBadge('');
    };

    return (
        <>
            <Head title={`Tokoku | ${selected ? selected.name : 'Mitra UMKM'}`} />

            <LayoutApp pageTitle="Marketplace Lokal">
                <div className="space-y-6">
                    
                    <Card className="pt-0 rounded-3xl border-slate-200 shadow-sm dark:border-slate-800">
                        <CardContent className="p-6 md:p-8">
                            <CategoryProduct categories={categories} />
                        </CardContent>
                    </Card>

                    {/* --- SEKSI 2: Produk Berdasarkan Kategori --- */}
                    <Card className="pt-0 rounded-3xl border-slate-200 shadow-sm dark:border-slate-800">
                        <CardContent className="p-6 md:p-8 space-y-6">
                            {selected ? (
                                <div className="space-y-6">
                                    {/* Header Info Kategori Terpilih */}
                                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                                        <div>
                                            <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900 dark:text-white">
                                                <Sparkles className="size-5 text-amber-500" />
                                                {selected.name}
                                            </h2>
                                            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                                                Menampilkan {filteredProducts.length} produk lokal.
                                            </p>
                                        </div>
                                        <ResetButton resetFn={resetFilter} />
                                    </div>

                                    {/* Search and Filter */}
                                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                                        {/* Search Bar */}
                                        <div className="flex-2 min-w-0">
                                            <SearchBar 
                                                searchQuery={searchQuery}
                                                setSearchQuery={setSearchQuery}
                                            />
                                        </div>

                                        <div className="flex gap-4 flex-1">
                                            {/* Select Filter Badge */}
                                            <div className="flex-1">
                                                <FilterBadge 
                                                    selectedBadge={selectedBadge}
                                                    setSelectedBadge={setSelectedBadge}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grid Produk */}
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                                            {filteredProducts.map((p, i) => (
                                                <ProductCard key={`${p.name}-${i}`} product={p} isCustomer={isCustomer} />
                                            ))}
                                        </div>
                                    ) : (
                                        /* State: Kategori dipilih, tapi produk kosong */
                                        <div className="py-16 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 dark:bg-slate-900/30">
                                            <div className="size-16 rounded-full bg-slate-200/50 flex items-center justify-center mb-4 dark:bg-slate-800/50">
                                                <Package className="size-8 text-slate-400 dark:text-slate-500" />
                                            </div>
                                            <p className="text-base font-bold text-slate-700 dark:text-slate-300">Produk Belum Tersedia</p>
                                            <p className="text-sm text-slate-500 mt-1 max-w-sm dark:text-slate-400">Mitra UMKM kami sedang mempersiapkan produk terbaik untuk kategori ini.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* State awal: Saat belum klik kategori apapun */
                                <div className="py-16 flex flex-col items-center justify-center text-center">
                                    <div className="inline-flex size-16 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-4 animate-bounce dark:bg-amber-900/30">
                                        <Sparkles className="size-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Silakan Pilih Kategori</h3>
                                    <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2 dark:text-slate-400">
                                        Klik salah satu kategori di atas untuk melihat jajaran produk UMKM pilihan terpercaya.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </LayoutApp>
        </>
    );
}
