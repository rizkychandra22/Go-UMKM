import { Search } from "lucide-react";

// Component for the search bar
export function SearchBar({ searchQuery, setSearchQuery, value }) {
    return (
        <>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="size-4 text-slate-400" />
            </div>
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk berdasarkan nama, kategori, atau badge..."
                className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1"
            />
        </>
    )
}

// Component for the category filter
export function FilterCategory({ categories, selectedCategory, setSelectedCategory, value }) {
    return (
        <>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1 text-slate-700"
            >
                <option value="">Kategori Produk</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                        Produk {cat.name}
                    </option>
                ))}
            </select>
        </>
    )
}

// Component for the badge filter
export function FilterBadge({ selectedBadge, setSelectedBadge, value }) {
    return (
        <>
            <select
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1 text-slate-700"
            >
                <option value="">Label Produk</option>
                <option value="Populer">Produk Populer</option>
                <option value="Terlaris">Produk Terlaris</option>
                <option value="Spesial">Produk Spesial</option>
                <option value="Mewah">Produk Mewah</option>
            </select>
        </>
    )
}

// Component for the filter status order
export function FilterStatusOrder({ selectedStatus, setSelectedStatus, value }) {
    return (
        <>
            <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1 text-slate-700"
            >
                <option value="">Status Pesanan</option>
                <option value="pending">Pending</option>
                <option value="processing">Diproses</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
            </select>
        </>
    )
}

// Component for the filter payment order
export function FilterPaymentOrder({ selectedPayment, setSelectedPayment, value }) {
    return (
        <>
            <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1 text-slate-700"
            >
                <option value="">Metode Bayar</option>
                <option value="cash">Cash (Tunai)</option>
                <option value="transfer">Transfer</option>
            </select>
        </>
    )
}