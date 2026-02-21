# Localization & Internationalization (i18n)

*Status: Planning Phase (Phase 2 Roadmap)*

The goal of the Salawat App is global adoption. Therefore, hardcoding strings (like "صَلِّ عَلَيْهِ" - "Send Blessings") is only a temporary measure for Phase 1.

## Architecture Proposal: Next.js App Router i18n

We plan to implement Next-intl for the Next.js 15+ App Router, utilizing dynamic dictionary loading to keep bundle sizes minuscule.

### URL Structure Strategy
- `/` -> Default language (Arabic) due to the nature of the application.
- `/en` -> English
- `/ur` -> Urdu
- `/id` -> Indonesian
- `/fr` -> French

### Directory Structure Redesign
When Phase 2 begins, the structure will shift from `src/app/page.tsx` to `src/app/[locale]/page.tsx`.

1. **Dictionaries:** JSON files stored in `src/messages/`.
   - `en.json`
   - `ar.json`
2. **Middleware:** A Next.js middleware function will intercept requests and match the user's `Accept-Language` header to route them automatically.

### Font Handling per Locale
Using `next/font`, the app will load different font subsets based on the active locale.
- **Arabic/Urdu:** `Amiri` and `Tajawal`.
- **English/French:** `Geist` or `Inter`.

*If you are an expert in a specific language, please watch the `ROADMAP.md` for the localization update or pitch a PR under the `.github/ISSUE_TEMPLATE/feature_request.md`.*
