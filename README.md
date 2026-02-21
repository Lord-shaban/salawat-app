# تطبيق الصلوات المليارية (Salawat App) 📿

تطبيق ويب عالمي حديث مبني لغرض نبيل: إنشاء عداد عالمي ضخم ومستقر للصلوات على النبي محمد ﷺ. تم تصميم البنية التحتية للتطبيق بحيث يكون قادراً على استيعاب ملايين الزوار ومليارات الصلوات في وقت واحد وبدون توقف (Downtime).

## ✨ المميزات الأساسية
- **أداء فائق**: واجهة تفاعلية سريعة مبنية بشكل كامل باستخدام مكتبات React 19 و Next.js 16.
- **حفظ لحظي وسريع (Real-time & High Scale)**: الاستعانة بـ `Upstash Redis` (قاعدة بيانات في الذاكرة) للتعامل وتزامن ملايين الضغطات في أجزاء من الثانية.
- **تصميم عصري وتفاعلي**: بناء واجهات جذابة ومريحة للعين باستخدام `Tailwind CSS v4` وإضافة تأثيرات حركية متناغمة بواسطة `Framer Motion`.
- **مزامنة البيانات**: استخدام `SWR` لمزامنة العداد بين ملايين المستخدمين في شتى أنحاء العالم لضمان بقاء الرقم دقيقاً للجميع.

## 🛠 التقنيات المستخدمة

- [Next.js (App Router)](https://nextjs.org) - إطار العمل
- [React 19](https://react.dev) - واجهات المستخدم
- [Upstash Redis](https://upstash.com/) - لتخزين وحساب العدادات بسرعة هائلة
- [Tailwind CSS v4](https://tailwindcss.com/) - لتنسيق الواجهات
- [Framer Motion](https://www.framer.com/motion/) - للأنيميشن
- [Lucide React](https://lucide.dev/) - أيقونات التطبيق
- [SWR](https://swr.vercel.app/) - جلب وتحديث البيانات

## 🚀 كيفية تشغيل المشروع محلياً

1. **استنساخ المستودع (Clone):**
   ```bash
   git clone https://github.com/your-username/salawat-app.git
   ```

2. **تثبيت الحزم (Install Dependencies):**
   ```bash
   cd salawat-app
   npm install
   ```

3. **إعداد متغيرات البيئة:**
   قم بإنشاء ملف `.env.local` في الجذر الرئيسي للمشروع، وأضف فيه مفاتيح Upstash الخاصة بك:
   ```env
   UPSTASH_REDIS_REST_URL="YOUR_UPSTASH_URL"
   UPSTASH_REDIS_REST_TOKEN="YOUR_UPSTASH_TOKEN"
   ```

4. **تشغيل الخادم المحلي:**
   ```bash
   npm run dev
   ```
   سيتم تشغيل التطبيق على الرابط: `http://localhost:3000`.

## 🤝 المشاركة في التطوير
إذا أردت المساهمة لتطوير هذا التطبيق لكسب الأجر والمشاركة في هذا العمل، يرجى قراءة ملف [CONTRIBUTING.md](./CONTRIBUTING.md) لمعرفة الخطوات الصحيحة.

## 📄 الترخيص (License)
هذا المشروع مفتوح المصدر وتحت رخصة [MIT License](./LICENSE).
