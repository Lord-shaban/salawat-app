import Counter from "@/components/Counter";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between relative overflow-hidden bg-black selection:bg-amber-900/30">

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

      {/* Top Section: Hadith / Verse */}
      <div className="w-full max-w-4xl px-6 pt-20 pb-10 z-10 flex flex-col items-center justify-center text-center">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-serif text-amber-50/90 leading-[2.5]"
          style={{ fontFamily: "var(--font-amiri)" }}
        >
          "مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا"
        </h1>
        <div className="mt-8 flex items-center justify-center gap-4 opacity-60">
          <div className="h-[1px] w-12 bg-gradient-to-l from-amber-500/50 to-transparent"></div>
          <span className="text-sm tracking-[0.3em] font-sans text-amber-200 uppercase">صحيح مسلم</span>
          <div className="h-[1px] w-12 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
        </div>
      </div>

      {/* Center Section: Main Counter */}
      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 px-4">
        <Counter />
      </div>

      {/* Bottom Minimal Indicator */}
      <div className="pb-12 z-10 flex flex-col items-center justify-center gap-3 opacity-40">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="text-[10px] tracking-[0.2em] font-sans text-amber-100/50 uppercase">
          متصل بالشبكة العالمية
        </span>
      </div>

    </main>
  );
}
