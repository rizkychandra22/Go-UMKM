import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import { Package } from 'lucide-react';
import ProductCard from '@/Components/Products/Card';
import { useState } from 'react';
import BackRightLink from '@/Components/Shared/BackRight';
import { FilterBadge, FilterCategory, SearchBar } from '@/Components/Shared/FilterData';
import { products } from '@/Constants/Data.Products';
import ResetButton from '@/Components/Shared/ResetFilter';

export default function Product({ categories = [] }) { 
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);

    // State untuk memanipulasi filter data
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBadge, setSelectedBadge] = useState('');

    // Logika Multi-Filter (Nama, Kategori, dan Kebutuhan/Badge)
    const filteredProducts = products.filter(product => {
        const matchesSearch = 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.slug && product.slug.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.badge && product.badge.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory ? product.slug === selectedCategory : true;
        const matchesBadge = selectedBadge ? product.badge === selectedBadge : true;
        
        return matchesSearch && matchesCategory && matchesBadge;
    });

    const resetFilter = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedBadge('');
    };

    return(
        <>
            <Head title="Tokoku | All Produk" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                <section className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">

                            {/* Tombol Kembali & Header */}
                            <BackRightLink 
                                title="Semua Produk"
                                subtitle="Temukan produk lokal pilihan dari berbagai UMKM"
                                icon={Package}
                            />

                            {/* Tombol Reset Filter */}
                            <ResetButton resetFn={resetFilter} />
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row gap-4 mt-2">
                            
                            {/* Search Bar */}
                            <div className="flex-1 min-w-0">
                                <SearchBar 
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                            </div>

                            <div className="flex gap-4 flex-1">
                                {/* Select Filter Category */}
                                <div className="flex-1">
                                    <FilterCategory 
                                        categories={categories}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                </div>

                                {/* Select Filter Badge */}
                                <div className="flex-1">
                                    <FilterBadge 
                                        selectedBadge={selectedBadge}
                                        setSelectedBadge={setSelectedBadge}
                                    />
                                </div>
                            </div>
                        </div>      

                        {/* Grid Card Produk */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((p, i) => (
                                    <ProductCard key={`${p.name}-${i}`} product={p} isCustomer={isCustomer} />
                                ))
                            ) : (
                                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 dark:bg-slate-900/30">
                                    <div className="size-16 rounded-full bg-slate-200/50 flex items-center justify-center mb-4 dark:bg-slate-800/50">
                                        <Package className="size-8 text-slate-400 dark:text-slate-500" />
                                    </div>
                                    <p className="text-base font-bold text-slate-700 dark:text-slate-300">Produk tidak ditemukan</p>
                                    <p className="text-sm text-slate-500 mt-1 max-w-sm dark:text-slate-400">Coba gunakan kata kunci pencarian lain atau sesuaikan filter untuk menemukan apa yang kamu cari.</p>
                                    <button onClick={resetFilter} className="mt-6 font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400">
                                        Hapus Semua Filter
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}
