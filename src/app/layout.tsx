import type { Metadata } from "next";
import { Amiri, Tajawal } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
});

const tajawal = Tajawal({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "صلوات | منصة عالمية للصلاة على النبي",
  description: "منصة عالمية لجمع الصلوات على النبي صلى الله عليه وسلم بقوة واستقرار تام",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} ${amiri.variable} font-sans antialiased bg-slate-950 text-slate-100 min-h-screen`}
      >
        <div className="relative min-h-screen overflow-hidden">
          {/* خلفية زخرفية ناعمة */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950 -z-10"></div>
          {/* تأثيرات لمعان خفيفة الملامح للمليارات */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          {children}
        </div>
      </body>
    </html>
  );
}
