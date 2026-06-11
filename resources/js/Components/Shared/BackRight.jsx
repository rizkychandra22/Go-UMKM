import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function BackRightLink({ title, subtitle, icon: Icon, backRoute = 'home' }) {
    return (
        <div className="flex items-center gap-4">
            <Link 
                href={route(backRoute)} 
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
            >
                <ArrowLeft className="size-5" />
            </Link>
            <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 dark:text-white">
                    {Icon && <Icon className="size-5 text-amber-500 animate-pulse" />}
                    {title}
                </h2>
                <p className="text font-medium text-slate-500 mt-0.5 dark:text-slate-400">{subtitle}</p>
            </div>
        </div>
    );
}
