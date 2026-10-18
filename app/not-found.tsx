import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5fc2ea] p-4 text-slate-900">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-4 border-amber-300 dark:border-amber-400 shadow-2xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 animate-spin" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-amber-600">
          Lost in the Clouds • 404
        </span>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Meadow Clearing Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          The owl scout could not find this branch. Let&apos;s guide you back to the sunny picnic meadow!
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Return to Moolies World</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
