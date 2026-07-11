import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/Components/UI/button';

export default function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ]);

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const banners = [
        {
            id: 1,
            title: "Promo Spesial UMKM",
            subtitle: "Diskon hingga 50% untuk produk pilihan",
            bgColor: "bg-linear-to-r from-teal-300 to-emerald-200",
            imgUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 2,
            title: "Karya Anak Bangsa",
            subtitle: "Dukung produk lokal berkualitas",
            bgColor: "bg-linear-to-r from-orange-300 to-amber-200",
            imgUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 3,
            title: "Gratis Ongkir se-Bandung Raya",
            subtitle: "Belanja puas tanpa pusing biaya kirim",
            bgColor: "bg-linear-to-r from-sky-300 to-blue-200",
            imgUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    return (
        <div className="relative group w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-sm">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex touch-pan-y h-full">
                    {banners.map((banner) => (
                        <div key={banner.id} className="min-w-0 flex-[0_0_100%] relative h-full min-h-[200px] sm:min-h-[300px]">
                            <img src={banner.imgUrl} alt={banner.title} className="absolute inset-0 w-full h-full object-cover object-center opacity-40 dark:opacity-30" />
                            <div className={`absolute inset-0 opacity-80 ${banner.bgColor} mix-blend-multiply`} />
                            
                            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-16 md:px-24 text-white">
                                <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-1 sm:mb-4 fade-in-up">{banner.title}</h2>
                                <p className="text-xs sm:text-lg md:text-xl font-medium opacity-90 mb-4 sm:mb-8 fade-in-up-delay max-w-xl">{banner.subtitle}</p>
                                <div className="fade-in-up-delay-2">
                                    <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-4 sm:px-8 py-2 sm:py-6 rounded-lg sm:rounded-xl text-xs sm:text-base transition-transform hover:scale-105 shadow-xl h-auto">
                                        Cek Sekarang
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 dark:bg-slate-900/80 dark:text-white dark:hover:bg-slate-900"
                onClick={scrollPrev}
                aria-label="Previous slide"
            >
                <ChevronLeft className="size-6" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 dark:bg-slate-900/80 dark:text-white dark:hover:bg-slate-900"
                onClick={scrollNext}
                aria-label="Next slide"
            >
                <ChevronRight className="size-6" />
            </button>
        </div>
    );
}
