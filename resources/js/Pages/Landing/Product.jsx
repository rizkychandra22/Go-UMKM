import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '@/Layouts/App';
import { LogIn, Eye, Package, Star, ArrowLeft, ShoppingCart, Search, Sparkles } from 'lucide-react';
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
            <Head title="Go-UMKM | All Produk" />
            
            <LayoutApp pageTitle="Marketplace Lokal">

                <section className="glass-panel fade-in-up p-6 sm:p-8 border-t-4 border-t-sky-400 flex flex-col">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between gap-3">

                            {/* Tombol Kembali & Header */}
                            <BackRightLink 
                                title="Produk Tersedia"
                                subtitle="Temukan produk lokal yang kamu cari di sini."
                                icon={Package}
                            />

                            {/* Tombol Reset Filter */}
                            <ResetButton resetFn={resetFilter} />
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-5">
                            
                            {/* Search Bar */}
                            <div className="flex-1 min-w-0">
                                <SearchBar 
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                            </div>

                            <div className="flex gap-3 flex-1">
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
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((p, i) => (
                                    <ProductCard key={`${p.name}-${i}`} product={p} isCustomer={isCustomer} />
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <Package className="size-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-sm font-bold text-slate-500">Produk yang kamu cari tidak ditemukan</p>
                                    <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci atau filter pencarianmu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutApp>
        </>
    );
}