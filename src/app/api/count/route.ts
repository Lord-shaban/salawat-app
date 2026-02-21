import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// إذا كان المستخدم لم يضع بيانات Upstash، نستخدم متغير وهمي في الذاكرة لتجربة الموقع
let mockGlobalCount = 1205634500;

// محاولة الاتصال بقاعدة البيانات Redis إن وجدت
const redis =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        })
        : null;

/**
 * دالة القراءة (GET) - تعيد الرقم الكلي
 * مجهزة للتخزين المؤقت (Caching) على مستوى الشبكة لامتصاص المليارات
 */
export async function GET() {
    try {
        let currentCount = mockGlobalCount;

        if (redis) {
            currentCount = (await redis.get<number>("global_salawat_count")) || 0;
        }

        // إرجاع النتيجة مع تفعيل الـ Cache لثانيتين على الـ CDN
        // هذا يعني لو دخل مليون مستخدم في نفس الثانية، طلب واحد فقط سيذهب لقاعدة البيانات
        // والباقي 999,999 سيتم الرد عليهم من حافة السيرفر (Edge CDN) فوراً!
        return NextResponse.json(
            { count: currentCount },
            {
                headers: {
                    "Cache-Control": "s-maxage=2, stale-while-revalidate",
                },
            }
        );
    } catch (error) {
        console.error("Redis Error:", error);
        return NextResponse.json({ count: mockGlobalCount, error: "Database not connected" }, { status: 500 });
    }
}

/**
 * دالة الإضافة (POST) - ترسل الحزم التجميعية وتزيد الرقم
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const addAmount = Number(body.amount);

        // حماية أساسية لعدم إرسال أرقام خيالية أو سالبة من المخربين
        if (!addAmount || addAmount <= 0 || addAmount > 50000) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        let newCount = mockGlobalCount;

        if (redis) {
            // INCRBY يضمن أن الزيادة تتم بشكل آمن (Atomic) حتى لو ضغط مليون شخص في نفس اللحظة
            newCount = await redis.incrby("global_salawat_count", addAmount);
        } else {
            mockGlobalCount += addAmount;
            newCount = mockGlobalCount;
        }

        return NextResponse.json({ count: newCount });
    } catch (error) {
        console.error("Redis Error:", error);
        return NextResponse.json({ error: "Failed to update database" }, { status: 500 });
    }
}
