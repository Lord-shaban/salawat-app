"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import useSWR from "swr";

interface Ripple {
    id: number;
    x: number;
    y: number;
}

// دالة جلب البيانات من الان بي اي الخاص بنا
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Counter() {
    const [globalCount, setGlobalCount] = useState<number | null>(null);
    const [localClicks, setLocalClicks] = useState(0);

    // هذه الذاكرة تحتفظ بالضغطات التي لم تُرسل بعد للسيرفر (Batch System)
    const pendingClicksRef = useRef(0);

    const controls = useAnimation();
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleIdRef = useRef(0);

    // استخدام SWR لجلب البيانات كل 3 ثواني من السيرفر بشكل صامت وخفيف
    // ميزة SWR أنه يدمج الطلبات إذا فتحنا أكثر من تبويبة، ويحفظ البيانات مؤقتاً
    const { data, error, mutate } = useSWR("/api/count", fetcher, {
        refreshInterval: 3000,
        revalidateOnFocus: true,
    });

    // تحديث العداد الرئيسي عندما يصل رد جديد من السيرفر
    useEffect(() => {
        if (data?.count !== undefined) {
            setGlobalCount((prev) => {
                // نأخذ الرقم الأكبر لضمان أن العداد لا يعود للخلف بسبب تأخر الشبكة
                return prev !== null ? Math.max(prev, data.count) : data.count;
            });
        }
    }, [data]);

    // إرسال الضغطات المجمعة (Batching/Debouncing) كل 1.5 ثانية إذا كان هناك ضغطات
    // هذه العبقرية تجعل مليون مستخدم يضغط 10 مرات في الثانية، يُتَرجم لطلب واحد فقط للسيرفر كل ثانية ونصف!
    useEffect(() => {
        const batchInterval = setInterval(async () => {
            const clicksToSend = pendingClicksRef.current;

            if (clicksToSend > 0) {
                // نصفر العداد المعلق فوراً حتى لا يتم إرساله مرتين
                pendingClicksRef.current = 0;

                try {
                    const res = await fetch("/api/count", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ amount: clicksToSend }),
                    });

                    if (res.ok) {
                        const result = await res.json();
                        // تحديث كاش SWR والعداد فورا بالرقم الحقيقي الصحيح من قاعدة البيانات
                        mutate({ count: result.count }, false);
                        setGlobalCount(result.count);
                    } else {
                        // في حال فشل الإرسال نعيد الأرقام للذاكرة لتُرسل في المحاولة القادمة
                        pendingClicksRef.current += clicksToSend;
                    }
                } catch (err) {
                    console.error("Failed to sync clicks to global server");
                    pendingClicksRef.current += clicksToSend;
                }
            }
        }, 1500);

        return () => clearInterval(batchInterval);
    }, [mutate]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // زيادة فورية للمرئيات (Optimistic UI) لكي يشعر المستخدم بالسرعة
        if (globalCount !== null) {
            setGlobalCount((prev) => (prev as number) + 1);
        }
        setLocalClicks((prev) => prev + 1);

        // إضافة للذاكرة لترسل للسيرفر لاحقاً (السر الحقيقي للتحمل)
        pendingClicksRef.current += 1;

        // تأثير الـ Ripple البصري
        const newRippleId = rippleIdRef.current++;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipples((prev) => [...prev, { id: newRippleId, x, y }]);
        setTimeout(() => {
            setRipples((prev) => prev.filter((p) => p.id !== newRippleId));
        }, 800);

        // تفاعل الزر
        controls.start({
            scale: [1, 0.98, 1.01, 1],
            transition: { duration: 0.3 }
        });
    };

    const formattedCount = globalCount !== null
        ? new Intl.NumberFormat("ar-EG").format(globalCount)
        : "٠";

    return (
        <div className="flex flex-col items-center justify-center gap-10 md:gap-20 w-full relative h-[50vh] md:h-[60vh] max-h-[600px]">

            {/* العداد العملاق */}
            <div className="relative flex flex-col items-center z-10 w-full">
                {/* توهج خافت خلف العداد */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                <motion.div
                    key={globalCount}
                    initial={{ opacity: 0.9, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative text-center px-4 md:px-0"
                >
                    <span
                        className={`block text-[15vw] leading-none sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-light text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-700/50 tabular-nums drop-shadow-[0_20px_40px_rgba(251,191,36,0.15)] select-none transition-opacity duration-1000 ${globalCount === null ? 'opacity-30 blur-sm animate-pulse' : 'opacity-100 blur-none'}`}
                        style={{ fontFamily: 'var(--font-tajawal)' }}
                    >
                        {formattedCount}
                    </span>
                    {error ? (
                        <span className="block mt-4 lg:mt-8 text-xs text-red-500/80 font-sans font-light">
                            غير متصل بالخادم
                        </span>
                    ) : (
                        <span className="block mt-4 lg:mt-8 tracking-[1em] text-[10px] sm:text-xs text-amber-500/60 uppercase font-sans font-light">
                            إجمالي الصلوات
                        </span>
                    )}
                </motion.div>
            </div>

            {/* زر التفاعل السينمائي */}
            <div className="relative z-20 flex flex-col items-center mt-4 md:mt-10">
                <motion.button
                    onClick={handleClick}
                    animate={controls}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden group outline-none rounded-full bg-black/50 border border-amber-900/50 backdrop-blur-xl transition duration-500 hover:border-amber-500/50 hover:bg-black/80 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]"
                >
                    {/* انعكاس زجاجي صاعد (Glass Glow) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700"></div>

                    <div className="relative flex items-center justify-center gap-5 px-10 py-5 sm:px-14 sm:py-6 h-full w-full">
                        <span
                            className="text-2xl sm:text-3xl font-serif text-amber-100 group-hover:text-amber-50 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] transition-colors duration-300"
                            style={{ fontFamily: "var(--font-amiri)" }}
                        >
                            صَلِّ عَلَيْهِ
                        </span>

                        <div className="h-6 w-px bg-amber-900/50"></div>

                        <span className="text-xl sm:text-2xl text-amber-500/80 group-hover:text-amber-400 font-light tabular-nums transition-colors duration-300" style={{ fontFamily: "var(--font-tajawal)" }}>
                            +{localClicks.toLocaleString('ar-EG')}
                        </span>
                    </div>

                    <AnimatePresence>
                        {ripples.map((ripple) => (
                            <motion.span
                                key={ripple.id}
                                initial={{ opacity: 0.6, scale: 0, x: ripple.x, y: ripple.y }}
                                animate={{ opacity: 0, scale: 5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute w-20 h-20 rounded-full bg-amber-500/30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen blur-[2px]"
                                style={{ left: 0, top: 0 }}
                            />
                        ))}
                    </AnimatePresence>
                </motion.button>

                <div className="absolute -bottom-6 w-2/3 h-6 bg-amber-500/20 blur-xl opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-700 pointer-events-none rounded-full"></div>
            </div>
        </div>
    );
}
