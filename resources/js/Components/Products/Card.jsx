import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import { getProductDetailSlug } from '@/lib/product';
import { Card, CardContent, CardFooter } from '@/Components/UI/card';
import { Badge } from '@/Components/UI/badge';
import { Button } from '@/Components/UI/button';

export default function ProductCard({
  product,
  isCustomer,
  className = '',
  minHeight = 'auto',
  onAdd,
}) {
  const handleAdd = (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    if (typeof onAdd === 'function') return onAdd(product);
    alert(`Ditambahkan ke keranjang: ${product.name}`);
  };

  const productSlug = getProductDetailSlug(product);

  // Simulate some e-commerce data if not present
  const rating = product.rating || '4.9';
  const soldCount = product.soldCount || '100+ terjual';
  const storeLocation = product.storeLocation || 'Kota Bandung';

  return (
    <Card
      className={`pt-0 group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 ${className}`}
      style={{ minHeight }}
    >
      {/* Product Image */}
      <Link
        href={route('product.show', { slug: productSlug })}
        className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-950"
      >
        <img
          src={product.image ?? 'https://placehold.co/400'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex flex-wrap justify-between gap-1 pointer-events-none">
          {product.badge && (
            <Badge
              variant="custom"
              className={`shadow-sm font-bold border-transparent ${
                product.badge === 'Terlaris'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : product.badge === 'Populer'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : product.badge === 'Mewah'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : product.badge === 'Spesial'
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-primary text-primary-foreground'
              }`}
            >
              {product.badge}
            </Badge>
          )}

          {/* Category Badge */}
          {product.category && (
            <Badge
              variant="outline"
              className="bg-white/90 shadow-sm backdrop-blur-md dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-none"
            >
              {product.category}
            </Badge>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <CardContent className="flex flex-1 flex-col p-3">
        <Link
          href={route('product.show', { slug: productSlug })}
          className="mb-1"
        >
          <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {product.name}
          </h4>
        </Link>

        <div className="mt-1">
          <p className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
            {product.price}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{storeLocation}</span>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center text-orange-500">
            <Star className="size-3 fill-current" />
            <span className="ml-1 font-semibold">{rating}</span>
          </div>
          <span className="h-2 w-px bg-slate-300 dark:bg-slate-700" />
          <span>{soldCount}</span>
        </div>
      </CardContent>

      {/* Actions */}
      {isCustomer && (
        <CardFooter className="px-3 pb-3 pt-0">
          <Button
            variant="outline"
            onClick={handleAdd}
            className="w-full gap-1.5 border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-500/50 dark:text-teal-400 dark:hover:bg-teal-950/40"
          >
            <ShoppingCart className="size-3.5" />+ Keranjang
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
