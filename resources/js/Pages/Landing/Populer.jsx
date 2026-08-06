import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutApp from '../../Layouts/App';
import { Sparkles, Package } from 'lucide-react';
import ProductCard from '@/Components/Products/Card';
import { useState } from 'react';
import { products } from '@/Constants/products';
import PageHeaderLink from '@/Components/Shared/PageHeader';
import { Card, CardContent } from '@/Components/UI/card';
import { Button } from '@/Components/UI/button';

export default function Populer() {
  const { auth } = usePage().props ?? {};
  const isCustomer = Boolean(auth?.user);
  const [activeTab, setActiveTab] = useState('Populer');
  const displayedProducts = products.filter(
    (product) => product.badge === activeTab
  );

  return (
    <>
      <Head title="Tokoku | Produk Kami" />

      <LayoutApp pageTitle="Marketplace Lokal">
        <Card className="pt-0 rounded-3xl border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <PageHeaderLink
                  title="Produk Terlaris & Populer"
                  subtitle="Produk unggulan yang paling banyak diminati."
                  icon={Sparkles}
                />
              </div>

              {/* --- Switch Button Tanpa Icon & Warna Amber --- */}
              <div className="inline-flex w-full items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-inner sm:w-auto dark:bg-slate-800 dark:border-slate-700">
                <Button
                  type="button"
                  variant={activeTab === 'Terlaris' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('Terlaris')}
                  className={`flex-1 sm:flex-none rounded-lg px-5 text-sm font-bold transition-all duration-200 ${
                    activeTab === 'Terlaris'
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700'
                  }`}
                >
                  Terlaris
                </Button>
                <Button
                  type="button"
                  variant={activeTab === 'Populer' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('Populer')}
                  className={`flex-1 sm:flex-none rounded-lg px-5 text-sm font-bold transition-all duration-200 ${
                    activeTab === 'Populer'
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700'
                  }`}
                >
                  Populer
                </Button>
              </div>
            </div>

            {/* --- Grid Produk --- */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((p, i) => (
                  <ProductCard
                    key={`${p.name}-${i}`}
                    product={p}
                    isCustomer={isCustomer}
                  />
                ))
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 dark:bg-slate-900/30">
                  <div className="size-16 rounded-full bg-slate-200/50 flex items-center justify-center mb-4 dark:bg-slate-800/50">
                    <Package className="size-8 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                    Belum ada produk
                  </p>
                  <p className="text-sm text-slate-500 mt-1 max-w-sm dark:text-slate-400">
                    Belum ada produk di kategori tab "{activeTab}".
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </LayoutApp>
    </>
  );
}
