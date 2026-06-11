import { Skeleton } from '@/Components/UI/skeleton';

export default function DashboardLayoutSkeleton({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] border-r border-border bg-sidebar text-sidebar-foreground lg:block">
                <div className="flex h-20 items-center gap-3 border-b border-border px-7">
                    <Skeleton className="size-10 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-20 rounded-xl" />
                        <Skeleton className="h-5 w-28 rounded-xl" />
                    </div>
                </div>

                <div className="space-y-7 px-5 py-6">
                    {Array.from({ length: 4 }).map((_, sectionIndex) => (
                        <div key={sectionIndex}>
                            <Skeleton className="mb-3 h-3 w-20 rounded-xl" />
                            <div className="space-y-2">
                                {Array.from({ length: sectionIndex === 1 ? 3 : 2 }).map((__, itemIndex) => (
                                    <Skeleton key={itemIndex} className="h-11 w-full rounded-2xl" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-sidebar p-5">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <Skeleton className="h-4 w-24 rounded-xl" />
                            <Skeleton className="h-4 w-16 rounded-full" />
                        </div>
                        <Skeleton className="size-9 rounded-xl" />
                    </div>
                </div>
            </aside>

            <main className="lg:pl-[260px]">
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur lg:px-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="size-9 rounded-xl lg:hidden" />
                        <Skeleton className="hidden size-5 rounded lg:block" />
                        <div className="h-6 w-px bg-border" />
                        <Skeleton className="h-4 w-28 rounded-xl" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Skeleton className="hidden h-9 w-24 rounded-xl sm:block" />
                        <Skeleton className="size-9 rounded-xl" />
                        <Skeleton className="size-9 rounded-xl" />
                    </div>
                </header>

                <section className="min-h-[calc(100vh-80px)] bg-background px-5 py-8 lg:px-10 transition-colors duration-300">
                    {children}
                </section>
            </main>
        </div>
    );
}
