import { Search } from 'lucide-react';
import { Input } from '@/Components/UI/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/Components/UI/select';

// Component for the search bar
export function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder = 'Cari berdasarkan nama, kategori, atau label...',
}) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="size-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-9 bg-white dark:bg-slate-950 rounded-xl w-full"
      />
    </div>
  );
}

// Component for the category filter
export function FilterCategory({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <Select
      value={selectedCategory || 'all'}
      onValueChange={(val) => setSelectedCategory(val === 'all' ? '' : val)}
    >
      <SelectTrigger className="w-full bg-white dark:bg-slate-950 rounded-xl">
        <SelectValue placeholder="Semua Kategori" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          <SelectItem value="all">Semua Kategori</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.slug}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Component for the badge filter
export function FilterBadge({ selectedBadge, setSelectedBadge }) {
  return (
    <Select
      value={selectedBadge || 'all'}
      onValueChange={(val) => setSelectedBadge(val === 'all' ? '' : val)}
    >
      <SelectTrigger className="w-full bg-white dark:bg-slate-950 rounded-xl">
        <SelectValue placeholder="Semua Label" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          <SelectItem value="all">Semua Label</SelectItem>
          <SelectItem value="Populer">Produk Populer</SelectItem>
          <SelectItem value="Terlaris">Produk Terlaris</SelectItem>
          <SelectItem value="Spesial">Produk Spesial</SelectItem>
          <SelectItem value="Mewah">Produk Mewah</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Component for the filter status order
export function FilterStatusOrder({ selectedStatus, setSelectedStatus }) {
  return (
    <Select
      value={selectedStatus || 'all'}
      onValueChange={(val) => setSelectedStatus(val === 'all' ? '' : val)}
    >
      <SelectTrigger className="w-full bg-white dark:bg-slate-950 rounded-xl">
        <SelectValue placeholder="Semua Status" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Selesai</SelectItem>
          <SelectItem value="cancelled">Dibatalkan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Component for the filter payment order
export function FilterPaymentOrder({ selectedPayment, setSelectedPayment }) {
  return (
    <Select
      value={selectedPayment || 'all'}
      onValueChange={(val) => setSelectedPayment(val === 'all' ? '' : val)}
    >
      <SelectTrigger className="w-full bg-white dark:bg-slate-950 rounded-xl">
        <SelectValue placeholder="Semua Metode" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          <SelectItem value="all">Semua Metode</SelectItem>
          <SelectItem value="cash">Cash (Tunai)</SelectItem>
          <SelectItem value="transfer">Transfer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
