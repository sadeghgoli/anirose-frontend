# آنی رز (AniRoz)

فروشگاه آنلاین محصولات طبیعی و ارگانیک — Next.js App Router

## تکنولوژی‌ها

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **Zustand** (مدیریت state)
- **React Query** (دیتای سمت سرور)
- **framer-motion** (انیمیشن)
- **Swiper** (اسلایدرها)

## شروع کار

```bash
npm install
npm run dev
```

- `npm run dev` — توسعه
- `npm run build` — بیلد تولید
- `npm start` — اجرای بیلد
- `npm run lint` — ESLint

## ساختار

```
app/                     صفحات App Router (مسیرها + metadata + SEO)
src/components/          کامپوننت‌ها (هدر، فوتر، محصولات،…)
src/views/               ویوهای اصلی (Home، Shop، Profile،…)
src/hooks/               هوک‌های سفارشی (usePayment، useCart،…)
src/store/               استورهای Zustand
src/api/                 لایه API (axios + سرویس‌ها)
src/utils/               ابزارها (analytics، formatters،…)
```

## محیط

متغیرهای محیطی را در `.env` (یا `.env.local`) تنظیم کنید:

```
NEXT_PUBLIC_API_URL=https://aniroseco.ir/backend/api/v1/
```

## SEO

- صفحه‌ها دارای `metadata` و `generateMetadata` هستند (title، description، openGraph، canonical).
- محصولات از JSON-LD (`Product` + `Offer` + Breadcrumb) استفاده می‌کنند.
- صفحات خصوصی (پروفایل، سفارشات، چک‌اوت، ورود و…) `noindex` هستند و از `sitemap.xml` خارج شده‌اند.
- صفحات اصلی دارای `alternates.canonical` هستند.
- گاردهای مسیر (`ProtectedRoute` / `GuestRoute`) در `src/components/common/`.
