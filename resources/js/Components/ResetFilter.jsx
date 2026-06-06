import { RotateCcw } from "lucide-react";

export default function ResetButton({ resetFn }) {
    return (
        <button
            onClick={resetFn}
            className="inline-flex size-9 sm:size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm shrink-0"
            title="Reset Filter"
        >
            <RotateCcw className="size-4 sm:size-5" />
        </button>
    );
}