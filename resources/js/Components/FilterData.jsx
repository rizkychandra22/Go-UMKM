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
                <option value="">Semua Kategori Produk</option>
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
                <option value="">Semua Label Produk</option>
                <option value="Populer">Produk Populer</option>
                <option value="Terlaris">Produk Terlaris</option>
                <option value="Spesial">Produk Spesial</option>
                <option value="Mewah">Produk Mewah</option>
            </select>
        </>
    )
}