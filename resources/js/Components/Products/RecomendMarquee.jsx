import { usePage } from "@inertiajs/react";
import { products } from '../../Constants/Data.Products';
import ProductCard from '@/Components/Products/Card';
import { useEffect, useRef } from "react";

export default function RecomendMarquee() {
    const { auth } = usePage().props ?? {};
    const isCustomer = Boolean(auth?.user);
    
    const scrollContainerRef = useRef(null);
    const isInteractingRef = useRef(false);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId;
        const speed = 0.8; // Kecepatan jalan otomatis
        
        // SOLUSI UTAMA: Simpan posisi asli di variabel float agar tidak dibulatkan jadi 0 oleh PC
        let currentScroll = container.scrollLeft;

        const autoScroll = () => {
            // Jika user scroll pake mouse-wheel / trackpad di PC, sinkronkan posisinya
            if (Math.abs(container.scrollLeft - currentScroll) > 1) {
                currentScroll = container.scrollLeft;
            }

            if (!isInteractingRef.current) {
                currentScroll += speed;

                // Loop kembali ke awal kalau sudah mentok di ujung kanan
                if (currentScroll >= container.scrollWidth - container.clientWidth) {
                    currentScroll = 0;
                }
                container.scrollLeft = currentScroll;
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        // Mulai animasi
        animationFrameId = requestAnimationFrame(autoScroll);

        const handleInteractionStart = () => { 
            isInteractingRef.current = true; 
        };

        const handleInteractionEnd = () => {
            // Catat posisi terakhir setelah dilepas agar jalannya mulus tidak melompat
            currentScroll = container.scrollLeft;
            setTimeout(() => {
                isInteractingRef.current = false;
            }, 1000); 
        };

        container.addEventListener("touchstart", handleInteractionStart, { passive: true });
        container.addEventListener("touchend", handleInteractionEnd);
        container.addEventListener("mousedown", handleInteractionStart);
        container.addEventListener("mouseup", handleInteractionEnd);
        container.addEventListener("mouseleave", handleInteractionEnd);

        return () => {
            cancelAnimationFrame(animationFrameId);
            container.removeEventListener("touchstart", handleInteractionStart);
            container.removeEventListener("touchend", handleInteractionEnd);
            container.removeEventListener("mousedown", handleInteractionStart);
            container.removeEventListener("mouseup", handleInteractionEnd);
            container.removeEventListener("mouseleave", handleInteractionEnd);
        };
    }, []);

    return (
        <>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Rekomendasi Produk Terbaik.
            </h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-base text-slate-600 dark:text-slate-400">
                Produk unggulan berdasarkan kualitas dan tingkat penjualan teratas.
            </p>

            <div className="mt-4 sm:mt-5">
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {[...products, ...products].map((p, index) => (
                        <div 
                            key={`${p.name}-${index}`} 
                            className="w-[240px] sm:w-[320px] shrink-0"
                        >
                            <ProductCard
                                product={p}
                                isCustomer={isCustomer}
                                minHeight="240px" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}