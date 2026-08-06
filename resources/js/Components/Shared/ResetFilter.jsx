import { RotateCcw } from 'lucide-react';
import { Button } from '@/Components/UI/button';

export default function ResetButton({ resetFn }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={resetFn}
      className="rounded-2xl border-slate-200 bg-white text-slate-500 hover:text-rose-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
      title="Reset Filter"
    >
      <RotateCcw className="size-4" />
    </Button>
  );
}
