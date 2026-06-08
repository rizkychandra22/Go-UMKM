import { Card, CardContent, CardHeader } from '@/Components/UI/card';
import { Skeleton } from '@/Components/UI/skeleton';

export default function SellerDashboardSkeleton() {
    return (
        <div className="space-y-6">
            <Card className="glass-panel rounded-[28px] border-t-4 border-t-emerald-400 shadow-none">
                <CardContent className="space-y-6 p-5 sm:p-8">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-64 rounded-xl" />
                        <Skeleton className="h-5 w-80 rounded-xl" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="rounded-2xl border border-slate-200 bg-white/50 p-3 sm:p-4">
                                <Skeleton className="h-5 w-24 rounded-xl" />
                                <Skeleton className="mt-4 h-8 w-16 rounded-xl" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <Card
                    key={sectionIndex}
                    className="glass-panel rounded-[28px] border-t-4 border-t-emerald-400 shadow-none"
                >
                    <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="space-y-2">
                                <Skeleton className="h-7 w-48 rounded-xl" />
                                <Skeleton className="h-4 w-72 rounded-xl" />
                            </div>
                            <Skeleton className="h-10 w-24 rounded-2xl" />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <Skeleton className="h-12 w-full rounded-2xl sm:col-span-1" />
                            <Skeleton className="h-12 w-full rounded-2xl" />
                            <Skeleton className="h-12 w-full rounded-2xl" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                            {Array.from({ length: sectionIndex === 2 ? 3 : 4 }).map((__, itemIndex) => (
                                <Skeleton
                                    key={itemIndex}
                                    className={sectionIndex === 2 ? 'h-20 w-full rounded-3xl' : 'h-32 w-full rounded-3xl'}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
