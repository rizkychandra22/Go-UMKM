import { Search } from "lucide-react";

// Component for the search bar
export function SearchBar({ searchQuery, setSearchQuery, placeholder = 'Cari berdasarkan nama, kategori, atau label...' }) {
    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="size-4 text-slate-400 dark:text-black-500" />
            </div>
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:border-teal-400 focus:ring-teal-400 focus:outline-none focus:ring-1 transition-colors dark:bg-slate-300 dark:border-slate-700 dark:text-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-400"
            />
        </div>
    )
}

// Component for the category filter
export function FilterCategory({ categories = [], selectedCategory, setSelectedCategory }) {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-teal-400 focus:ring-teal-400 focus:outline-none focus:ring-1 text-slate-700 transition-colors dark:bg-slate-300 dark:border-slate-700 dark:text-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-400"
        >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                    {cat.name}
                </option>
            ))}
        </select>
    )
}

// Component for the badge filter
export function FilterBadge({ selectedBadge, setSelectedBadge }) {
    return (
        <select
            value={selectedBadge}
            onChange={(e) => setSelectedBadge(e.target.value)}
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-teal-400 focus:ring-teal-400 focus:outline-none focus:ring-1 text-slate-700 transition-colors dark:bg-slate-300 dark:border-slate-700 dark:text-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-400 dark:focus:ring-teal-400"
        >
            <option value="">Semua Label</option>
            <option value="Populer">Produk Populer</option>
            <option value="Terlaris">Produk Terlaris</option>
            <option value="Spesial">Produk Spesial</option>
            <option value="Mewah">Produk Mewah</option>
        </select>
    )
}

// Component for the filter status order
export function FilterStatusOrder({ selectedStatus, setSelectedStatus }) {
    return (
        <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-teal-400 focus:ring-teal-400 focus:outline-none focus:ring-1 text-slate-700 transition-colors dark:bg-slate-300 dark:border-slate-700 dark:text-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-400"
        >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
        </select>
    )
}

// Component for the filter payment order
export function FilterPaymentOrder({ selectedPayment, setSelectedPayment }) {
    return (
        <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-teal-400 focus:ring-teal-400 focus:outline-none focus:ring-1 text-slate-700 transition-colors dark:bg-slate-300 dark:border-slate-700 dark:text-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-400"
        >
            <option value="">Semua Metode</option>
            <option value="cash">Cash (Tunai)</option>
            <option value="transfer">Transfer</option>
        </select>
    )
}