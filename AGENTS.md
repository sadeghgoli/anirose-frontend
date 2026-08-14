# AGENTS.md — AniRoz (آنی رز) — Complete Project Reference

This file is the exhaustive, verified reference for the AniRoz e-commerce project. It is organized so that a new agent can ramp up without re-reading the whole codebase. **Every claim below was verified against the actual source at the time of writing.** When docs in the repo conflict with code, trust the code.

**Project:** Next.js 16.2.12 (App Router + Turbopack), React 19, RTL Persian e-commerce store (فروشگاه اینترنتی آنی رز / AniRoz). Tailwind CSS 4, Zustand, React Query, Swiper 12, axios, framer-motion, react-hook-form, react-toastify, jose, js-cookie, react-otp-input.

**Canonical site:** `https://aniroz.ir` (defined once in `src/utils/seo.js` as `SITE_URL`). Backend: `https://aniroseco.ir/backend/api/v1/`.

**No test suite exists. No CI pipeline exists.** `data/` dir is empty and unused. `public/jsons/` holds static JSON used by several home sections.

---

# 1. Commands

There are exactly four npm scripts (see `package.json`):

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build + **TypeScript check** (there is NO separate typecheck script; `build` IS the typecheck) |
| `npm start` | Serve the production build on port 3000 |
| `npm run lint` | ESLint (flat config, eslint 10). Must pass before finishing any task |

**Order of validation before finishing any work:** `npm run lint` → `npm run build` → verify sitemap, robots.txt, internal links, a11y.

**Project rules for changes (mandatory):**
- Only make changes with a **measurable benefit (≥1%)**. Never rewrite working code. Prefer minimal changes with maximum SEO/performance impact.
- **Architectural changes require the user's confirmation IN PERSIAN first.** Small fixes may be applied directly.
- Do NOT add code comments unless asked.

---

# 2. Critical operational gotchas (READ FIRST)

1. **The production server runs on port 3000.** Before `npm run build`, stop it. Find the PID with `Get-NetTCPConnection -LocalPort 3000 -State Listen` → `Stop-Process -Id <pid> -Force`, build, then restart with `Start-Process -FilePath "cmd.exe" -ArgumentList "/c","npm run start > server.log 2>&1" -WorkingDirectory "<root>" -WindowStyle Hidden`. Otherwise the build overwrites `.next` under a running server (which breaks the running server).

2. **The backend `https://aniroseco.ir/backend/api/v1/` times out from the dev machine** but is reachable from production. `serverFetch` returns `null` on timeout; all server data paths must degrade gracefully to empty/fallback. Never block a page render on `serverFetch` succeeding. Local verification of live data is therefore unreliable — the production site is healthy even when local fetches fail.

3. **Backend endpoints `/cart*` are NOT deployed (404)** and `/auth/send-otp` validation is broken. The gift/bulkOrder/doctors/consultant services return **mock data**. Do NOT treat local 404s on those as regressions. Cart UI will show an empty cart / error locally even though production works.

4. **Two parallel service trees exist** (see §7 and §11). When editing a data path, check BOTH `src/api/services/` (modern axios services) and `src/utils/api/<name>Service/` (older per-section server helpers). Many of the older ones are dead code (documented in §12).

5. **DO NOT depend on live backend verification during local work.** The dev machine cannot reach the backend; the production server can.

6. **React Query provider is present but no hook uses it.** `ClientLayout.jsx` wraps the app in `QueryClientProvider`, but all 7 hooks in `src/hooks/` are hand-rolled `useState`/`useEffect`. Don't assume `useQuery` is used anywhere.

---

# 3. Tech stack & tooling

## 3.1 package.json dependencies

- `next` ^16.2.12, `react` ^19.2.4, `react-dom` ^19.2.4
- `@tanstack/react-query` ^5.94.5 (provider only)
- `axios` ^1.13.6
- `zustand` ^5.0.11
- `swiper` ^12.1.6
- `framer-motion` ^12.38.3
- `react-hook-form` ^7.71.2
- `react-toastify` ^11.0.5
- `react-otp-input` ^3.1.1
- `react-loading-skeleton` ^3.5.0
- `react-feather` ^2.0.10
- `jose` ^6.2.1, `js-cookie` ^3.0.5
- `validator` ^13.15.35, `immer` ^11.1.4
- Dev: `eslint` ^10.8.0, `@eslint/js` ^9.39.1, `eslint-plugin-react-hooks` ^7.0.1, `globals` ^16.5.0, `tailwindcss` ^4.2.4, `@tailwindcss/postcss`, `autoprefixer`, `postcss`, `tailwindcss-rtl`, `@types/react`, `@types/react-dom`

## 3.2 ESLint (`eslint.config.js`)

- Flat config. `globalIgnores(['.next', 'node_modules', 'dist', 'public'])`.
- `files: ['**/*.{js,jsx}']` extends `js.configs.recommended` + `reactHooks.configs.flat.recommended`.
- Rule: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }]` — so variables starting with uppercase or `_` and args starting with `_` are exempt.
- `globals.browser` for app files; `globals.node` for config files.
- **`process` global is whitelisted only for these files:** `app/sitemap.js`, `app/shop/page.jsx`, `app/product/**/page.jsx`, `app/api/**/route.js`, `src/api/config.js`, `src/utils/api/serverApi.js`.

## 3.3 `next.config.js`

- `images.remotePatterns`: only `{ protocol: 'https', hostname: 'aniroseco.ir' }`.
- **`images.unoptimized: true`** — images are served as-is (required because backend images aren't re-optimizable; the `next/image` optimizer is effectively off).
- `deviceSizes: [480, 640, 768, 1024, 1280, 1536]`, `imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]`, `formats: ['image/webp']`.
- `compress: true`, `poweredByHeader: false`.
- Custom headers:
  - `/fonts/:path*` → `Cache-Control: public, max-age=31536000, immutable`
  - `/images/:path*` → `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`
  - `/:path*` → `X-DNS-Prefetch-Control: on`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()`

## 3.4 `jsconfig.json`

- `@/*` maps to project root. **Not used consistently** — most imports are relative (`../../api/...`). Only `categoryProductSlider.jsx` and `categoryProductsService/` use the `@/` alias.

## 3.5 `app/globals.css` (2 lines)

```css
@import "tailwindcss";
@import "../src/index.css";
```

## 3.6 `.env`

```
BACKEND_API_URL=https://aniroseco.ir/backend/api/v1/
```

`NEXT_PUBLIC_API_URL` is used as a fallback in several places (proxy route, serverApi, shop page).

---

# 4. Directory map (verified)

```
app/                      App Router: routes (page.jsx + metadata + JSON-LD), layout, providers, proxy
  api/[...path]/route.js  Backend proxy (force-dynamic, no-store)
  about/ addresses/ blog/ cart/ checkout/ contact/ doctor/ doctors/ faq/
  login/ omde/ orders/ orders/[id]/ payment/ product/[id]/[slug]/ profile/ rules/ shop/
  ClientLayout.jsx        client providers + Authorize + AnalyticsInit
  layout.jsx              root metadata + fonts + JsonLd (Store/WebSite/Breadcrumb)
  fonts.js                Peyda (9) + Pinar (7) local fonts
  globals.css  manifest.js  not-found.jsx  robots.txt  sitemap.js

src/views/                Page-level view components
  Root/ Shop/ Contact/ Login/ Profile/ Orders/ OrderDetail/ Addresses/
  Checkout/ Cart/ Payment/ ProductDetail/ Doctors/ ConsultantProfile/ NotFound/

src/components/           Reusable components
  common/                 Header/ Footer/ GuestRoute/ ProtectedRoute/ ScrollToTop/
                          UserPanelLayout/ ErrorOnFetchApi/
  index/                  home sections (heroSlider doubleBanner whyChooseUs saleSection
                          giftRequest aboutSection aniroseStats categories
                          categoryProductSlider testimonials blogPostsSlider)
  blog/ cart/ checkout/ login/ payment/ productDetail/ shop/ bulkOrder/
  doctorsPage/ consultantProfile/ skeleton/ JsonLd/ notFound/

src/hooks/                useCart useCartCount useCheckout usePayment useProduct
                          useShopFilters usePersianDateValidator  (NONE use React Query)

src/api/                  client data layer
  config.js axios.js cache.js
  services/               categories products articles cart auth orders addresses
                          provinces shipping discounts typeOfWeights gift bulkOrder
                          consultant contact doctors  (16 files)

src/store/index.js        single Zustand store

src/utils/
  api/                    serverApi.js serverData.js + 23 per-section Service dirs
  analytics/              config AnalyticsCore AnalyticsSender clickTracker
                          productViewTracker searchTracker timeTracker index
  helpers/                jwt.js cookie.js
  cartEvents.js  seo.js

public/
  fonts/                  Peyda*.woff2, Pinar*.woff2
  jsons/                  static JSON: about-data, anirose-stats, testimonials,
                          why-choose-us-data, blog-posts (each loaded as `data.data`)
  images/banners/         home hero banner JPG (dated filename)
  images/test/            legacy theme images (Group-*, Asset-*, Frame-*, etc.)
```

---

# 5. SEO conventions (mandatory, from project rules)

- **App Router only.** Never use Pages Router, `next/head`, or deprecated APIs. Only the official Metadata API (`export const metadata` / `generateMetadata`).
- **Only make changes with measurable benefit (≥1%)**; never rewrite working code.
- **Architectural changes require user confirmation in Persian first.** Small fixes may be applied directly.
- Final validation: `npm run lint` → `npm run build` → verify sitemap, robots.txt, internal links, a11y.
- Deliverable reports follow a fixed **13-section format**: (1) Files modified, (2) Files created, (3) SEO issues found, (4) SEO issues fixed, (5) Accessibility issues fixed, (6) Structured Data improvements, (7) Metadata improvements, (8) Remaining issues, (9) Recommendations, (10) Overall SEO score before, (11) Overall SEO score after, (12) Lighthouse SEO estimate, (13) Core Web Vitals estimate.

## 5.1 Metadata pitfalls (verified behavior — very important)

- **Per-page `openGraph` SHALLOW-replaces the root layout's `openGraph`.** If a page defines its own `openGraph` without `images`, the layout's `og:image` is silently dropped (verified in rendered HTML). Always include `images` — use the shared `defaultOgImage` from `src/utils/seo.js`. Same applies to `twitter`.
- **No `meta keywords` anywhere** (Google ignores it — it was removed).
- JSON-LD is rendered via `<JsonLd data={...} />` from `src/components/JsonLd/index.jsx` — a plain component that emits `<script type="application/ld+json">`.
- **Exactly one H1 per page.** Client-heavy views wrapped in `<Suspense fallback>` do NOT emit their H1 in SSR HTML (the H1 exists only after hydration). The home page gets its H1 as `sr-only` inside `heroSlider.jsx`.
- `robots.txt` is a **static file** at `app/robots.txt` (NOT a `robots.js` metadata route).
- Sitemap is `app/sitemap.js` with `revalidate = 3600`.
- ISR: `revalidate = 40` on `/`, `/shop`, `/blog`, blog-detail, product-detail. `generateStaticParams` for `/product/[id]/[slug]` and `/blog/[id]/[slug]`.

---

# 6. `app/` — exhaustive route documentation

## 6.1 `app/layout.jsx` (root layout)

**Imports:** `Suspense` (react), `./globals.css`, `./ClientLayout`, `{ peyda, pinar }` from `./fonts`, `JsonLd` from `../src/components/JsonLd`, `Header` from `../src/components/common/Header`, `Footer` from `../src/components/common/Footer`.

**Exact `metadata`:**

| Key | Exact value |
|---|---|
| `metadataBase` | `new URL('https://aniroz.ir')` |
| `title.default` | `"آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک"` |
| `title.template` | `"%s"` |
| `description` | `"فروشگاه اینترنتی آنی رز - مرجع تخصصی خرید محصولات طبیعی، ارگانیک و سلامت محور با بهترین قیمت و کیفیت در ایران"` |
| `authors` | `[{ name: "آنی رز" }]` |
| `creator` | `"آنی رز"` |
| `publisher` | `"آنی رز"` |
| `openGraph.type` | `"website"` |
| `openGraph.locale` | `"fa_IR"` |
| `openGraph.siteName` | `"آنی رز"` |
| `openGraph.title` | `"آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک"` |
| `openGraph.description` | `"فروشگاه اینترنتی آنی رز - خرید انواع محصولات طبیعی و ارگانیک با بهترین قیمت"` |
| `openGraph.url` | `"https://aniroz.ir"` |
| `openGraph.images` | `[{ url: "/images/test/Asset-1-3-1.png", width: 200, height: 200, alt: "آنی رز" }]` |
| `openGraph.countryName` | `"Iran"` |
| `twitter.card` | `"summary_large_image"` |
| `twitter.title` | `"آنی رز | AniRoz"` |
| `twitter.description` | `"فروشگاه اینترنتی آنی رز - خرید انواع محصولات طبیعی و ارگانیک"` |
| `twitter.images` | `[{ url: "/images/test/Asset-1-3-1.png", alt: "آنی رز" }]` |
| `robots.index` | `true` |
| `robots.follow` | `true` |
| `robots.googleBot` | `{ index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 }` |
| `alternates.canonical` | `"https://aniroz.ir"` |
| `alternates.languages` | `{ "fa-IR": "https://aniroz.ir" }` |
| `category` | `"business"` |
| `icons.icon` / `shortcut` / `apple` | `"/cropped-Group-48-3-32x32.png"` |
| `icons.other` | `[ { rel:"icon", url:"/images/test/cropped-Group-48-3-192x192.png", sizes:"192x192", type:"image/png" }, { rel:"apple-touch-icon", url:"/images/test/cropped-Group-48-3-180x180.png", sizes:"180x180" } ]` |

**`viewport` export:**
```js
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0c5505" };
```

**Three JSON-LD blocks** (server-rendered at the end of `<body>`):

1. **`Store`** (`organizationJsonLd`): `@type: "Store"`, `@id: "https://aniroz.ir/#store"`, `name: "آنی رز"`, `alternateName: "AniRoz"`, `url`, `logo` + `image` both `https://aniroz.ir/images/test/Asset-1-3-1.png`, `brand: { "@type": "Brand", name: "آنی رز" }`, `address: { "@type": "PostalAddress", streetAddress: "تهران", addressLocality: "تهران", addressCountry: "IR" }`, `contactPoint: { "@type": "ContactPoint", telephone: "+98-9123456789", contactType: "customer service", availableLanguage: "fa" }`, `sameAs: ["https://instagram.com/aniroz"]`, `openingHours: "Sa-Th 09:00-20:00"`, `priceRange: "$$$"`. **⚠️ telephone/address/instagram are PLACEHOLDERS — report before changing.**
2. **`WebSite`** (`webSiteJsonLd`): `@id: "https://aniroz.ir/#website"`, `name: "آنی رز"`, `alternateName: "AniRoz"`, `url`, `inLanguage: "fa-IR"`, `publisher: { "@id": "#store" }`, `potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://aniroz.ir/shop?q={search_term_string}" }, "query-input": "required name=search_term_string" }`.
3. **`BreadcrumbList`** (`breadcrumbJsonLd`): single item `{ position 1, name: "خانه", item: "https://aniroz.ir" }`.

**JSX structure:**
- `<html lang="fa" dir="rtl" className={`${peyda.variable} ${pinar.variable}`}>`
- `<head>`: `<link rel="preconnect" href="https://aniroseco.ir" />`, `<link rel="dns-prefetch" href="https://aniroseco.ir" />`, `<meta name="geo.region" content="IR" />`, `<meta name="geo.placename" content="Tehran" />`
- `<body suppressHydrationWarning className={peyda.className}>`
  - `<ClientLayout>` → `<Suspense fallback={null}><Header /></Suspense>` → `<main>{children}</main>` → `<Footer />`
  - Then the three `<JsonLd>` components.

## 6.2 `app/ClientLayout.jsx`

`"use client"`. Provider tree (outermost → innermost):
1. `QueryClientProvider client={queryClient}` — module-level `const queryClient = new QueryClient();` singleton.
2. `SkeletonProvider` — from `src/components/skeleton/MainSkeleton/MainSkeleton.jsx`.
3. `Authorize` — local component: on mount reads `localStorage.getItem('authToken')`; if token → `setAuthToken(token)` (sets axios `Authorization`) and `setState({ accessToken: token })` (Zustand). Deps `[setState]`.
4. `AnalyticsInit` — local component using `usePathname()`:
   - Effect 1 (per pathname): guards `typeof window === 'undefined'`, calls `initAnalytics()`, references `AnalyticsSender.sendData` and `TimeTracker.startTracking` as bare property accesses (no parens — the singleton Proxy getter still instantiates the classes and starts their intervals), sets `trackedPath.current = pathname`.
   - Effect 2 (per pathname): if `trackedPath.current === null || === pathname` returns; else `AnalyticsCore.addPageView(pathname)`.
5. `ScrollToTop` — floating button (see §8.1.6).
6. `{children}`.
7. `ToastContainer` — react-toastify global container.

## 6.3 `app/fonts.js`

Both `next/font/local` with `display: 'swap'`.

- **`peyda`** (variable `--font-peyda`), 9 weights: `PeydaWebFaNum-{Thin,ExtraLight,Light,Regular,Medium,SemiBold,Bold,ExtraBold,Black}.woff2` for weights 100–900.
- **`pinar`** (variable `--font-pinar`), 7 weights: `Pinar-FD-{Light,Regular,Medium,SemiBold,Bold,ExtraBold,Black}.woff2` for weights 300–900.

`peyda.variable` + `pinar.variable` on `<html>`; `peyda.className` on `<body>`. Font files cached immutable via next.config.

## 6.4 `app/manifest.js`

`export default function manifest()` returns: `name: "آنی رز | فروشگاه محصولات طبیعی و ارگانیک"`, `short_name: "آنی رز"`, `id: "https://aniroz.ir/"`, `start_url: "/"`, `scope: "/"`, `display: "standalone"`, `orientation: "portrait"`, `background_color: "#0c5505"`, `theme_color: "#0c5505"`, `lang: "fa"`, `dir: "rtl"`, `categories: ["shopping","health","lifestyle"]`, icons 32x32 (`/cropped-Group-48-3-32x32.png`), 180x180, 192x192 (`purpose: "any maskable"`).

## 6.5 `app/sitemap.js`

- `revalidate = 3600`.
- Base URL `https://aniroz.ir`. Fetches `serverFetch('products?per_page=100')` and `serverFetch('articles?per_page=100')`, both `json?.data || []` (graceful empty fallback).
- Static URLs (priority / changeFrequency):
  - `/` 1.0 daily; `/shop` 0.9 daily; `/blog` 0.8 daily; `/doctors` 0.8 weekly; `/doctor` 0.7 weekly; `/omde` 0.7 weekly; `/about` 0.6 monthly; `/contact` 0.6 monthly; `/faq` 0.5 monthly; `/rules` 0.5 monthly.
- Dynamic: blog URLs `/blog/${id}/${slug}` (weekly, 0.7); product URLs `/product/${id}/${slug || "product"}` (weekly, 0.8).
- **Locally the sitemap only contains the 10 static URLs** because `serverFetch` times out; in production product/blog URLs appear automatically.

## 6.6 `app/robots.txt` (static file)

```
User-agent: *
Allow: /
Disallow: /profile
Disallow: /orders
Disallow: /orders/
Disallow: /addresses
Disallow: /checkout
Disallow: /payment
Disallow: /cart
Disallow: /login
Disallow: /api/

Sitemap: https://aniroz.ir/sitemap.xml
```

## 6.7 `app/not-found.jsx`

- Metadata: `title: "صفحه پیدا نشد | آنی رز"`, `description: "صفحه مورد نظر شما در آنی رز یافت نشد"`, `robots: { index: false, follow: false }`.
- Renders one inline `WebPage` JSON-LD, `<h1>۴۰۴</h1>` (Persian digits, `font-pinar`), `<p>صفحه مورد نظر پیدا نشد!</p>`, and `<Link href="/">بازگشت به خانه</Link>`.

## 6.8 `app/api/[...path]/route.js` — backend proxy

- **Base:** `process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://aniroseco.ir/backend/api/v1/'`.
- `passthroughHeaders = Set(['accept','accept-language','content-type','user-agent','x-requested-with','x-csrf-token','origin','referer'])`.
- `export const dynamic = 'force-dynamic';`
- Handler (async, awaits params):
  1. `path = versioned.slice(1).join('/')` — **strips the first segment (`v2`)** so `/api/v2/products` → `/products`.
  2. Preserves query string. Normalizes slashes: `replace(/\/{2,}/g,'/').replace(/\/+$/,'')`.
  3. `targetUrl = BACKEND + path + search`.
  4. Forwards `cookie` and `authorization` headers verbatim. Copies passthrough headers. If `accept` missing or contains `text/html` → forces `'application/json'`. Non-GET/HEAD gets content-type (default `application/json`) and body as `arrayBuffer()`.
  5. First fetch: `redirect: 'manual', cache: 'no-store'`.
  6. On 3xx: if location matches `/login|auth/i` → return **401** `{ message: 'برای دسترسی به این بخش باید وارد شوید' }` with `cache-control: no-store`. Otherwise re-fetch with `redirect: 'follow'`.
  7. On catch → **502** `{ message: 'خطا در ارتباط با سرور', error }`.
  8. Response headers: `cache-control: no-store, no-cache, must-revalidate, max-age=0`, `pragma: no-cache`, `expires: 0`, set-cookie forwarded (via `getSetCookie` if available), content-type forwarded.
  9. Exports `GET/POST/PUT/PATCH/DELETE = handler`.

## 6.9 Route-by-route page documentation

### `/` — `app/page.jsx` (Home)
- Metadata: title `"آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک"`, description `"فروشگاه اینترنتی آنی رز - مرجع تخصصی خرید محصولات طبیعی، ارگانیک و سلامت محور با بهترین قیمت و کیفیت در ایران"`, canonical `https://aniroz.ir`, openGraph `{title, description, url: "https://aniroz.ir", images: [defaultOgImage]}`, twitter summary_large_image. No robots/revalidate here.
- JSON-LD: one `WebPage` (`@id: #webpage`, `isPartOf: #website`, `about: #store`).
- Renders `<Root />` (server orchestrator). No guard, no Suspense (lazy sections handled inside Root).

### `/about` — `app/about/page.jsx`
- Metadata: title `"درباره ما | آنی رز"`, description `"آشنایی با فروشگاه اینترنتی آنی رز - مرجع تخصصی محصولات طبیعی و ارگانیک با هدف سلامتی و کیفیت زندگی"`, canonical `/about`, OG with `defaultOgImage`. No twitter/robots.
- JSON-LD: `AboutPage` + `BreadcrumbList` (خانه/درباره ما).
- Static server component, `<h1>درباره آنی رز</h1>` + 3 paragraphs.

### `/addresses` — `app/addresses/page.jsx`
- Metadata: title `"آدرس‌ها | آنی رز"`, `robots: { index: false, follow: false }`, OG with `defaultOgImage`. No canonical.
- JSON-LD: `WebPage`. Renders `<ProtectedRoute><Addresses /></ProtectedRoute>`.

### `/blog` — `app/blog/page.jsx`
- `revalidate = 40`. Metadata: title `"وبلاگ | آنی رز"`, canonical `/blog`, OG + twitter.
- JSON-LD: `BreadcrumbList` (خانه/وبلاگ), `Blog` (`@id: /blog#blog`), `CollectionPage`.
- Renders `<Suspense fallback={<BlogSkeleton />}><BlogList /></Suspense>`. No guard.

### `/blog/[id]/[slug]` — `app/blog/[id]/[slug]/page.jsx`
- `revalidate = 40`. `SITE_URL = "https://aniroz.ir"`.
- `generateStaticParams`: `serverFetch('articles?per_page=50')` → `{ id: String(a.id), slug: a.slug }`.
- `generateMetadata`: fetch article by slug; if missing → `{ title: "مقاله | آنی رز", robots: { index: false } }`. Otherwise title `` `${article.title} | آنی رز` ``, description `excerpt || title`, canonical, OG `type: "article"` with image `{ url, alt }`, twitter with image alt, robots `max-image-preview: large`.
- JSON-LD: `BlogPosting` (headline, description, image, datePublished/dateModified as `YYYY-MM-DD`, author Person or Organization fallback, publisher Organization, mainEntityOfPage) + `BreadcrumbList` (خانه/وبلاگ/title).
- Renders hero Image (fill, `priority`), category pill, `<h1>` title, body via `dangerouslySetInnerHTML`, CTA "همین حالا خرید کنید" → `/shop`, "مطالب مرتبط" section (up to 3 via `fetchRelatedArticles`).

### `/cart` — `app/cart/page.jsx`
- Metadata: title `"سبد خرید | آنی رز"`, `robots: { index: false, follow: false }`, OG with `defaultOgImage`.
- JSON-LD: `WebPage`. Renders `<Cart />`. **No guard** (cart accessible to guests).

### `/checkout` — `app/checkout/page.jsx`
- Metadata: title `"تسویه حساب | آنی رز"`, `robots: { index: false, follow: false }`, OG with `defaultOgImage`.
- JSON-LD: `WebPage`. Renders `<ProtectedRoute><Checkout /></ProtectedRoute>`.

### `/contact` — `app/contact/page.jsx`
- Metadata: title `"تماس با ما | آنی رز"`, description `"راه‌های ارتباط با فروشگاه آنی رز - تلفن، ایمیل و آدرس برای پشتیبانی و مشاوره خرید"`, canonical `/contact`, OG with `defaultOgImage`.
- JSON-LD: `ContactPage` + `BreadcrumbList` (خانه/تماس با ما).
- Renders `<Contact />` (client view).

### `/doctor` — `app/doctor/page.jsx`
- Metadata: title `"مشاوره تخصصی | آنی رز"`, canonical `/doctor`, OG with `defaultOgImage`.
- JSON-LD: `ProfessionalService` (`areaServed: "IR"`, `availableLanguage: "fa"`) + `BreadcrumbList`.
- Renders `<ConsultantProfile />`. No guard/Suspense.

### `/doctors` — `app/doctors/page.jsx`
- Metadata: title `"متخصصان | آنی رز"`, canonical `/doctors`, OG with `defaultOgImage`.
- JSON-LD: `CollectionPage` (no inLanguage/isPartOf on this one) + `BreadcrumbList`.
- Renders `<Doctors />`. No guard/Suspense.

### `/faq` — `app/faq/page.jsx`
- Metadata: title `"سوالات متداول | آنی رز"`, canonical `/faq`, OG with `defaultOgImage`.
- JSON-LD: `FAQPage` with **6 hardcoded Q/A pairs** + `BreadcrumbList`.
- Static server component, `<h1>سوالات متداول</h1>`, `<details>/<summary>` per FAQ.

### `/login` — `app/login/page.jsx`
- Metadata: title `"ورود | آنی رز"`, `robots: { index: false, follow: false }`, OG with `defaultOgImage`.
- JSON-LD: `WebPage`. Renders `<GuestRoute><Login /></GuestRoute>`.

### `/omde` — `app/omde/page.jsx`
- Metadata: title `"سفارش عمده | آنی رز"`, canonical `/omde`, OG with `defaultOgImage`.
- JSON-LD: `Service` (`provider` Organization, `serviceType: "Bulk Order"`, `category: "Bulk Order"`) + `BreadcrumbList`.
- Renders `<BulkOrderPage />` (client form). No guard/Suspense.

### `/orders` — `app/orders/page.jsx`
- Metadata: title `"سفارشات | آنی رز"`, `robots: { index: false, follow: false }`, OG with `defaultOgImage`.
- JSON-LD: `WebPage`. Renders `<ProtectedRoute><Orders /></ProtectedRoute>`.

### `/orders/[id]` — `app/orders/[id]/page.jsx`
- Metadata: title `"جزئیات سفارش | آنی رز"`, `robots: { index: false, follow: false }`. **No openGraph/twitter/canonical** (inherits layout OG).
- JSON-LD: `WebPage` (no `url` field on this one). Renders `<ProtectedRoute><OrderDetail id={id} /></ProtectedRoute>`.

### `/payment` — `app/payment/page.jsx`
- Metadata: title `"پرداخت | آنی رز"`, `robots: { index: false, follow: false }`, OG with `defaultOgImage`.
- JSON-LD: `WebPage`. Renders `<Suspense fallback={<div>در حال بارگذاری...</div>}><PaymentPage /></Suspense>`. No guard.

### `/product/[id]/[slug]` — `app/product/[id]/[slug]/page.jsx`
- `revalidate = 40`. `SITE_URL` and `PRICE_VALID_UNTIL = Date.now() + 30 days` (module-evaluated).
- `generateStaticParams`: `serverFetch('products?per_page=100')` → `{ id: String(p.id), slug: p.slug || 'product' }` (catch → `[]`).
- `generateMetadata`: fetch product; missing → `{ title: "محصول | آنی رز", description: "محصول مورد نظر یافت نشد" }`. Else title `` `${product.name} | آنی رز` ``, description `shortDescription || description || name`, canonical, OG `type: 'website'` with image `{ url, alt }`, twitter with image alt, robots `max-image-preview: large`.
- JSON-LD:
  1. **`Product`** — name, description, image, `sku`/`mpn` = id, brand "آنی رز", category "محصولات طبیعی", `offers` (price = salePrice || price, `priceCurrency: "IRR"`, priceValidUntil, InStock/OutOfStock, NewCondition, seller, `shippingDetails` with free shipping to IR, `hasMerchantReturnPolicy` 7-day free return), `additionalProperty` وضعیت.
  2. **`WebPage`** — name, url, isPartOf #website.
  3. **`BreadcrumbList`** — خانه/فروشگاه/product name.
- Renders `<ProductDetail id={id} slug={slug} />` (the view ignores these props; client uses `useParams()`).

### `/profile` — `app/profile/page.jsx`
- Metadata: title `"پروفایل | آنی رز"`, `robots: { index: false, follow: false }`, OG with `defaultOgImage`.
- JSON-LD: `WebPage`. Renders `<ProtectedRoute><Profile /></ProtectedRoute>`.

### `/rules` — `app/rules/page.jsx`
- Metadata: title `"قوانین و مقررات | آنی رز"`, canonical `/rules`, OG with `defaultOgImage`.
- JSON-LD: `WebPage` (no description) + `BreadcrumbList`.
- Static component, `<h1>قوانین و مقررات</h1>` + 5 sections (`ثبت سفارش`, `پرداخت`, `ارسال سفارش`, `بازگشت کالا`, `حریم خصوصی`).

### `/shop` — `app/shop/page.jsx`
- `revalidate = 40`. Metadata: title `"فروشگاه | آنی رز"`, canonical `/shop`, OG + twitter.
- **Dead constant:** `const API_BASE = process.env.NEXT_PUBLIC_API_URL || "..."` (unused).
- `fetchProductsForJsonLd()`: `serverFetch('products?per_page=24')` → `data?.data || []`.
- JSON-LD: `BreadcrumbList`, `CollectionPage`, `ItemList` (only when products exist; each ListItem has name/url/image/offers with `priceCurrency: "IRR"`).
- Renders `<Suspense fallback={<div>در حال بارگذاری...</div>}><Shop /></Suspense>`.

## 6.10 Route guards / Suspense / ISR summary

| Route | Guard | Suspense | ISR | generateStaticParams |
|---|---|---|---|---|
| `/` | — | — | (in Root layer) | — |
| `/about` | — | — | — | — |
| `/addresses` | ProtectedRoute | — | — | — |
| `/blog` | — | BlogSkeleton | 40 | — |
| `/blog/[id]/[slug]` | — | — | 40 | yes |
| `/cart` | — | — | — | — |
| `/checkout` | ProtectedRoute | — | — | — |
| `/contact` | — | — | — | — |
| `/doctor` | — | — | — | — |
| `/doctors` | — | — | — | — |
| `/faq` | — | — | — | — |
| `/login` | GuestRoute | — | — | — |
| `/omde` | — | — | — | — |
| `/orders` | ProtectedRoute | — | — | — |
| `/orders/[id]` | ProtectedRoute | — | — | — |
| `/payment` | — | loading div | — | — |
| `/product/[id]/[slug]` | — | — | 40 | yes |
| `/profile` | ProtectedRoute | — | — | — |
| `/rules` | — | — | — | — |
| `/shop` | — | loading div | 40 | — |

**ProtectedRoute pages:** profile, orders, orders/[id], addresses, checkout.
**GuestRoute page:** login.

---

# 7. Data fetching (TWO layers — do not mix them up)

## 7.1 Server-side layer — `src/utils/api/serverApi.js`

```js
const SERVER_BASE_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://aniroseco.ir/backend/api/v1/';
const REVALIDATE_SECONDS = 40;
```

- `fetchRaw(path, options)` (not exported): `AbortController` + timeout `options.timeout || 8000` ms; `cache: noStore ? 'no-store' : 'force-cache'`; `next: { revalidate: options.revalidate ?? 40 }` unless noStore; `if (!res.ok) return null`; **any throw → null**.
- `serverFetch(path, options)` = `cache(async (path, options) => fetchRaw(path, options))` — wrapped in React `cache()`.

**Used by:** `app/shop/page.jsx`, `app/blog/[id]/[slug]/page.jsx`, `app/product/[id]/[slug]/page.jsx`, `app/sitemap.js`, `src/components/blog/BlogList.jsx`, `src/components/index/saleSection/saleSection.jsx`, `src/utils/api/serverData.js`.

## 7.2 Server data helpers — `src/utils/api/serverData.js`

- `mapProduct(p)` → `{ id, name: p.title, slug, price: Number, sale: !!priceDiscounted, salePrice, stock, image: p.primary_image }`.
- `getSaleProducts()` → `serverFetch('products?suggested=1&per_page=20')`. Used by `saleSection.jsx`.
- `getArticlesForSlider()` → `serverFetch('articles?per_page=20')` → `{ id, title, slug, image }`. **No consumers.**

## 7.3 Client layer — `src/api/`

### `config.js`
- `API_BASE_URL = '/api/v2'`.
- `API_ENDPOINTS` exact map:
  - auth: `sendOtp '/auth/send-otp'`, `verifyOtp '/auth/verify-otp'`, `logout '/auth/logout'`, `profile '/user/profile'`.
  - `categories '/categories'`, `products '/products'`, `typeOfWeights '/type-of-weights'`, `provinces '/provinces'`, `shippingMethods '/shipping-methods'`, `articles '/articles'`, `contactSettings '/contact-settings'`, `addresses '/user/addresses'`, `orders '/user/orders'`, `discountValidate '/discount/validate'`.
  - cart: `get '/cart'`, `count '/cart/count'`, `items '/cart/items'`, `applyDiscount '/cart/apply-discount'`, `removeDiscount '/cart/remove-discount'`, `selectShipping '/cart/select-shipping'`, `sync '/cart/sync'`, `checkout '/cart/checkout'`, `clear '/cart'`.
  - `analytics.collect '/analytics/collect'`.
- `CACHE_DURATION = 40 * 1000`. `TOKEN_VALIDATION_INTERVAL = 50 * 1000` (exported, **no consumer**).

### `axios.js`
- Instance: `baseURL '/api/v2'`, `timeout: 20000`, JSON content-type/accept.
- `setAuthToken(token)` — sets/deletes `Authorization: Bearer <token>` globally on the instance.
- Response interceptor: on `status === 401` → `handleUnauthorized()`: removes `localStorage['authToken']` + `sessionStorage['authToken']`, dynamically imports `cookie.js` → `removeCookie('token')`, dynamically imports store → `clearAuth()`, and if not on `/login` → `window.location.href = '/login'`.
- Request interceptor: pass-through.

### `cache.js` (in-memory fetch cache)
- `configureCache(enabled)`, `clearCache()`, `invalidateCache(key)`, `fetchWithCache(key, fetcher, duration = CACHE_DURATION)`.
- Behavior: fresh (< duration) → return cached; stale → fire background refresh, return stale (**stale-while-revalidate**); no cache → await fetcher, store, return.

## 7.4 Client services — `src/api/services/` (16 files)

### categories.js
- `mapCategory(cat)` → `{ id, name: title || '', title, slug, image, status, parent_id, children: recursive, products_count }`.
- `fetchCategories()` — cache key `'categories'`, `GET /categories`, returns `(result?.data || []).map(mapCategory)`.
- `fetchCategoryById(id)` — `GET /categories/${id}` (not cached).

### products.js
- `mapProduct(p)` → `{ id, name: p.title, slug, tracking_code, categoryId, category, price, sale, salePrice, has_discount, price_buy, stock, status, suggested, description, mini_description, shortDescription, image (primary_image), primary_image, images[], type_of_weights[], rating: 0, reviewsCount: 0 }`.
- `fetchProducts(params)` — query from page/per_page/category_id/search/suggested/sort; cache key `products_${JSON.stringify(queryParams)}`; returns `{ products, meta }` (`meta` defaults to `{current_page:1,last_page:1,per_page:12,total:0}`).
- `fetchProductById(id)` — cache `product_${id}`; returns mapped product + `relatedProducts` from `data.related_products`.
- `fetchFilteredProducts(filters, page, perPage=12)` — maps `searchTerm→search`, `categories[0]→category_id`, sortBy → sort; then **client-side filters by minPrice/maxPrice** on `salePrice || price`. Returns `{ products, total, totalPages, currentPage }`.
- `fetchSaleProducts()` → `{ data: { products } }`. `fetchCategoryProducts(categoryId)` → `{ data: result.products }`. `fetchAllProducts()` → array.

### articles.js
- `mapArticle(a)` → `{ id, title, slug, excerpt, image/featured_image, category_id, category, reading_minutes, view_count, is_featured, published_at, created_at, body, tags[], author, meta_title, meta_description, meta_keywords }`.
- `fetchArticles(params)` — cache key `articles_${JSON.stringify(params)}`; returns `{ articles, meta }`.
- `fetchArticleBySlug(slug)` — `GET /articles/${slug}` (no cache); returns article + `relatedArticles`, or null.

### cart.js (⚠️ backend NOT deployed — 404)
- `mapCartItem(item)` → `{ cart_item_id: item.item_id, product_id, name, image, price: unit_price, quantity, subtotal: line_total, weight, available_stock, type_of_weight, type_of_weight_id, product }`.
- `mapCart(data)` → `{ items, subtotal: summary.total_amount, total: summary.final_amount, discount: summary.discount_amount, total_weight, total_quantity, shipping_fee, discount_info, coupon_code: data.discount?.code, shipping }`.
- `fetchCart()` → `{ status:'success', data: mapCart(...) }`.
- `fetchCartCount()` → `response.data?.data?.count || 0`.
- `addToCart({product_id, type_of_weight_id, quantity=1})` → `POST /cart/items`, calls `notifyCartUpdated()`.
- `updateCartItem(itemId, quantity)` → `PUT /cart/items/${itemId}`, notify.
- `removeCartItem(itemId)` → `DELETE /cart/items/${itemId}`, notify.
- `clearCart()` → `DELETE /cart`, notify.
- `applyCoupon(code, type='discount')` → `POST /cart/apply-discount`, notify.
- `removeCoupon(type='discount')` → `POST /cart/remove-discount`, notify.
- `selectShipping(shippingMethodId)` → `POST /cart/select-shipping`, notify.
- `syncCart()` → `POST /cart/sync`, notify.
- `checkoutCart({address_id, notes=''})` → `POST /cart/checkout`, notify.
- `updateCart()` — alias of `syncCart()`.

### auth.js
- `sendOtp(mobile)` → `POST /auth/send-otp`. `verifyOtp(mobile, otp)` → `POST /auth/verify-otp`; if token → `setAuthToken(token)` + `invalidateCache('profile')`.
- `logout()` → tries `POST /auth/logout` (swallows), `setAuthToken(null)`, invalidate profile.
- `fetchProfile()` — cache `'profile'` 40s, `GET /user/profile`.
- `updateProfile(data)` → `PUT /user/profile`, invalidate profile.
- `validateToken()` → `GET /user/profile` try/catch → boolean.

### orders.js
- `mapOrderItem` → `{ id, cart_item_id, product_id, product_name, name, product_code, product_image, image, quantity, unit_price, price, discount_percent, discount_amount, final_price, subtotal, product_options }`.
- `mapOrder(order)` → `{ id, order_id, order_number, source, total_amount, subtotal, shipping_fee, shipping_cost, insurance_cost, discount_amount, final_amount, total, total_weight, shipping_status(_label), payment_status(_label), payment_method, shipping_method, shipping_address, shipping_city, shipping_state, shipping_postal_code, shipping_recipient_name, shipping_phone, shipping_tracking_code, notes, items_count, items[], histories[], created_at, updated_at }`.
- `fetchOrders()` → `{ orders, meta }`. `fetchOrderById(id)` → mapped or null. `placeOrder(orderData)` → `POST /user/orders`. `cancelOrder(id)` → `POST /user/orders/${id}/cancel`.

### addresses.js
- `mapAddress(a)` → `{ id, user_id, first_name, last_name, full_name, province_id, province_name, city_id, city_name, full_address, address (alias), postal_code, mobile, phone (alias), is_default, is_active }`.
- `fetchAddresses()` → `{ status:'success', data }`. `createAddress(data)`, `updateAddress(id, data)`, `deleteAddress(id)`, `setDefaultAddress(id)` → `POST /user/addresses/${id}/default`.

### provinces.js
- `fetchProvinces()` — cache `'provinces'`, duration `CACHE_DURATION * 6` (240s), maps `{id, name, area_code}`.
- `fetchCities(provinceId)` — cache `cities_${provinceId}`, 240s.

### shipping.js
- `fetchShippingMethods()` — cache `'shipping_methods'`, 240s; maps to `{ id, name, cost: base_shipping_cost, base_shipping_cost, base_insurance_cost, base_packaging_cost, package_weight_limit, extra_weight_cost, extra_weight_per_kg, description, sort_order, is_active }`.

### discounts.js
- `validateDiscountCode(code, type='discount', totalAmount=0)` → `POST /discount/validate`; on 422 returns `error.response.data`.

### typeOfWeights.js
- `fetchTypeOfWeights()` — cache `'type-of-weights'`, returns raw `response` (i.e. `response.data`).

### gift.js — **MOCK**
- `submitGiftRequest(_phone)` — 800ms delay, returns `{ status:'success', message:'درخواست کارت هدیه با موفقیت ثبت شد' }`. No network.

### bulkOrder.js — **MOCK**
- `submitBulkOrder(_formData)` — 800ms delay, `{ status:'success', message:'درخواست سفارش عمده با موفقیت ثبت شد' }`.

### consultant.js — **MOCK**
- `MOCK_CONSULTANT` (id 1, 'دکتر علیرضا احمدی', specialty 'مشاور تغذیه و سلامت', avatar `/images/test/doctor-avatar.jpg`, contact `{email:'dr.ahmadi@aniroz.ir', phone:'09121234567'}`, education, experience 15, consultation_fields `['تغذیه','محصولات ارگانیک','سلامت عمومی']`, stats `{consultations:1250, rating:4.8, reviews:342}`, reviews[2]).
- `fetchConsultantData()` — 500ms delay → `{ data: MOCK_CONSULTANT }`. `submitConsultationForm(_formData)` — 800ms delay → success.

### contact.js
- `fetchContactSettings()` — cache `'contact-settings'` 40s; `GET /contact-settings`; returns `response?.data || null` (try/catch → null).

### doctors.js — **MOCK**
- `MOCK_DOCTORS` (3): 'دکتر علیرضا احمدی' (متخصص تغذیه), 'دکتر مریم کریمی' (دکترای گیاهان دارویی), 'دکتر حسین رحیمی' (متخصص طب سنتی), images `/images/test/doctor-{1,2,3}.jpg`.
- `fetchDoctorsData()` — 500ms delay → `{ data: MOCK_DOCTORS }`.

---

# 8. `src/hooks/` (7 hooks — NONE use React Query)

## 8.1 `useCart.js`
State: `cart, loading, updating, totalsLoading, error, successMessage`. Returns `{ cart, loading, updating, totalsLoading, error, successMessage, updateQuantity, updateLocalQuantity, removeItem, applyCoupon, removeCoupon, updateCart, refreshCart }`.
- `loadCart` → `fetchCart()`; only sets if `status === "success"`.
- Mutations call the cart service + re-fetch. `updateLocalQuantity(cartItemId, qty)` recomputes `subtotal = price*qty`, totals locally.
- Success messages auto-clear after 3s. `useEffect` loads cart on mount.

## 8.2 `useCartCount.js`
State: `count, loading`. `refresh()` → `fetchCartCount()` (0 on error). Subscribes to `cart:updated` event via `subscribeCartUpdated`. Used by Tablet/Mobile headers.

## 8.3 `useCheckout.js`
State: `cart, addresses, shippingMethods, selectedAddressId, selectedShippingId, loading, submitting, updating, error, successMessage, orderResult`. Returns those + `setSelectedAddressId, handleApplyCoupon, handleRemoveCoupon, handleSelectShipping, handlePlaceOrder, refreshCart, formatPrice`.
- `loadData` → `Promise.all([fetchCart(), fetchShippingMethods(), fetchAddresses()])`; auto-selects default shipping (cart's shipping.id → first active → first) and auto-calls `selectShipping` if different; auto-selects default address (`is_default` → first).
- `handlePlaceOrder({address_id, notes})` → `checkoutCart(...)`; success if `response?.message`; `orderResult = response.data || response`.
- `formatPrice` → `(price||0).toLocaleString() + ' تومان'`.

## 8.4 `usePayment.js`
State: `loading, paymentResult, orderData, error, trackingCode`. Uses `useSearchParams` + `useRouter` + `hasRun` ref.
- Reads URL params `Authority`, `Status`, `order_id`, `tracking`.
- If no params: reads `sessionStorage['payment_result']`; restores or errors `"اطلاعات پرداخت یافت نشد"`.
- If `Status === "OK"` or Authority present: synthesizes `{ status:'ok', code:100, data:{ order_id, tracking_code } }`, persists to sessionStorage, calls `clearCart()` (no await), `router.replace('/payment?...tracking')`.
- Else: `{ status:'nok', code:101 }` + error. **Fully front-end synthesized result — no backend verification call.**

## 8.5 `useProduct.js`
`useProduct(productId)` → `{ product, relatedProducts, loading, error }`. Calls `fetchProductById` on id change; null → `"محصول مورد نظر وجود ندارد"`.

## 8.6 `useShopFilters.js`
`useShopFilters(itemsPerPage = 12)` → `{ products, loading, totalPages, totalItems, currentPage, filters, categories, applyFilters, changePage, changeSortBy, removeFilter, clearAllFilters }`.
- URL is source of truth: reads `category` (multi), `min_price`, `max_price`, `sort_by`, `q`, `page`.
- On mount loads categories; syncs filters/page from `searchParams`.
- `fetchFilteredProducts(filters, currentPage, itemsPerPage)` on change. `updateURL` via `router.replace(pathname?, {scroll:false})`. `applyFilters` resets to page 1. `changePage` scrolls to top.

## 8.7 `usePersianDateValidator.js`
`usePersianDateValidator()` → `{ isValidPersianDate }`.
- Regex `^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$`; Jalali leap rule `year % 33 ∈ {1,5,9,13,17,22,26,30}` (Esfand 30 days); compares against today via `persianToJulian`/`gregorianToJalali`. Valid years 1300–1500. Used by bulkOrderForm delivery_date.

---

# 9. `src/store/index.js` — Zustand store

```js
'use client'
import { create } from "zustand";
```
- State: `accessToken: null, user: null, isAuthenticated: false`.
- `setState(data)` — if `data?.accessToken` → `setAuthToken(data.accessToken)`; then `set({ accessToken, user, isAuthenticated: !!accessToken })`.
- `setUser(user)`.
- `logout()` (async) — `setAuthToken(null)`, `await removeCookie("token")`, `localStorage.removeItem('authToken')`, reset state.
- `clearAuth()` — `setAuthToken(null)`, reset state.

Auth rehydration lives in `ClientLayout.jsx` `<Authorize>` (NOT in the store).

---

# 10. Auth flow

- Token stored in `localStorage['authToken']` and rehydrated by `ClientLayout` → `<Authorize>` into the store + axios on mount. Also a `token` cookie via `src/utils/helpers/cookie.js`.
- `setAuthToken(token)` sets axios `Authorization` globally.
- Login flow (`src/components/login/login.jsx`): phone step → `sendOtp(mobile)` → OTP step → `verifyOtp(mobile, otp)` → `localStorage.setItem("authToken", result.token)` + `setState(...)` + `router.push("/", { replace: true })`. 429 → "تعداد درخواستهای مجاز را رد کردهاید..."; 422 → invalid/expired code.
- Route guards are **client components only** (no SSR auth): `ProtectedRoute` (redirects to `/login`), `GuestRoute` (redirects to `/`). Both read `localStorage['authToken']` in an effect, `setState({ accessToken: token })`, then `queueMicrotask(() => setChecking(false))`.
- Logout (in `UserPanelLayout.handleLogout`): `logout()` API (swallowed) → store `logout()` (clears cookie + localStorage + axios header) → `toast.success` → `router.push('/login')`.
- JWT helpers (`src/utils/helpers/jwt.js`): `encryptJWT(payload)` (HS256, `jose`, 1-day expiry, secret `new TextEncoder().encode("key code")` — hardcoded), `decryptJWT(session)` → payload or null. `cookie.js`: `setCookie/getCookie/removeCookie` (async; `getCookie` returns `false` on failure).

---

# 11. `src/components/` — exhaustive component reference

## 11.1 `common/`

### 11.1.1 `Header/Header.jsx` (orchestrator)
- **Client component.** State: `headerData` (lazy init via `buildHeaderData(isAuthenticated)`), `isAuthenticated` from store.
- **Effect `[isAuthenticated]`:** `loadHeaderData()` → `fetchCategories()` (cache key `'categories'`, 40s); `cancelled` flag guards unmount. On success builds `headerMenu = categories.slice(0, 6).map(...)` with link `` `/shop?category=${cat.id}&name=${encodeURIComponent(cat.name.replace(/\s+/g,'-'))}` ``; merges `mainMenu: [home, ...headerMenu, shop]`, `mobileMenu: [home, ...headerMenu, shop, ...secondaryMenu]`, `bottomNav`. Empty `catch` = static fallback.
- **Static fallback (`MENU`):** `home {/}`, `shop {/shop}`, `about {/about}`, `contact {/contact}`, `blog {/blog}`.
- `buildHeaderData` → `topBar: { leftIcon: "/images/test/Group-2-1.png", text: "آنی رز، سلامتی هر روز!", rightIcon: same }`, `logo: { src: "/images/test/Group-43-1.png", alt: "آنی رز", link: "/" }`, `userAccount: { text: "حساب کاربری", loginLink: "/login", dashboardLink: "/profile" }`, mainMenu/secondaryMenu/mobileMenu/bottomNav.
- Renders `<header className="sticky top-0 z-50">` with `hidden lg:block` DesktopHeader, `hidden md:block lg:hidden` TabletHeader, `block md:hidden` MobileHeader. Rendered inside `<Suspense fallback={null}>` in layout.
- **KEY SEO/PERF FACT:** header always renders static menu immediately (no `return null` on loading), then upgrades in background when categories arrive. Header IS in SSR HTML.

### 11.1.2 `Header/DesktopHeader.jsx`
- Client. Topbar slogan + `OverflowNav` main menu + centered logo + search + hover cart dropdown + account link.
- Data: `fetchCart` (404 locally), `removeItem`, `updateCartItem`, `subscribeCartUpdated`, `trackSearch`.
- **Search input** has `placeholder="جستجو نمایید"` + `aria-label="جستجو"`. Submit → `router.push('/shop?q=...')`. Logs `?q=` param on load.
- Cart dropdown: `role="button" tabIndex={0} aria-label="سبد خرید"`, hover-only (no keyboard). Empty → `سبد خرید شما خالی است`.
- Logo alt: `data?.logo?.alt || "لوگوی آنی رز"`. Topbar icons `alt="آیکون تزئینی"`.
- `formatPrice` uses `Intl.NumberFormat("fa-IR")`.
- **Gotcha:** render-phase `setState` when `?q=` present (unusual pattern, can warn).

### 11.1.3 `Header/TabletHeader.jsx` and `Header/MobileHeader.jsx`
- Nearly byte-for-byte **duplicates** of each other. Tablet: `hidden md:block lg:hidden`; Mobile: `block md:hidden` (never both).
- Centered logo, hamburger dropdown menu, search modal (`aria-label="جستجو"` input, `h3>جستجو`), cart badge via `useCartCount`, account link, fixed bottom nav.
- Bottom nav: 4 items (خانه/فروشگاه/سبد خرید/حساب کاربری), `style={{ backgroundColor: "#1e1e1e" }}`, icons `home`, `shopping-basket`, `shopping-cart`, `user`. Active color `#64a39a`.
- **Inject `<style>` tag**: forces `.max-md\:block { display: block !important; }` and `body { padding-bottom: 80px !important; }` under `max-width: 768px`, plus fade-in/zoom-in keyframes.
- `useCartCount` hits `/api/v2/cart/count` (404 locally → badge stays 0).
- Search modal `openSearchModal` pre-fills from `location.search` `q`.

### 11.1.4 `Footer/Footer.jsx`
- Client. Static `STATIC_FOOTER_DATA` enhanced by `fetchContactSettings()` (cache `'contact-settings'`, 40s).
- STATIC data: `topImage /images/test/Asset-1-12.png`, slogan `"هنر نزد ایرانیان است و بس."`, description, importantLinks (درباره ما/تماس با ما/سوالات متداول/قوانین و مقررات), quickAccess (فروشگاه/سبد خرید/حساب کاربری/سفارشات), contact items (آدرس: تهران، خیابان انقلاب، ... / شماره تماس: ۰۹۱۲۱۲۳۴۵۶۷ / ساعت کاری: شنبه تا پنجشنبه ۹ تا ۱۸), socials `{ instagram: "#", telegram: "#" }`, trustBadges images `["/images/test/enamad-1-5.png", "/images/test/samandehipng.parspng-3.png"]`, bottomLogo `/images/test/Asset-1-3-1.png`, copyright `"تمام حقوق وبسایت آنی رز محفوظ است."`.
- **⚠️ Contact items are PLACEHOLDERS.** Trust badge images use `alt="نماد اعتماد"` (was URL). Social links render only if value is truthy and not `"#"`.
- `normalizeSocials(socials)` — handles array (strings containing `instagram`/`t.me`/`telegram`, or objects with keys) or object.
- Footer is rendered directly in layout (no Suspense) → part of SSR HTML.
- Credit line: `طراحی و توسعه شرکت <Link href="https://electera.top/">الکترا</Link>`.

### 11.1.5 `GuestRoute.jsx`
- Client. `checking` state; reads `localStorage['authToken']`, `setState({ accessToken: token })`, `queueMicrotask(() => setChecking(false))`. If `!checking && isAuthenticated` → `router.replace('/')`. Else renders children.

### 11.1.6 `ProtectedRoute.jsx`
- Client. Same pattern; if `!checking && !isAuthenticated` → `router.replace('/login')`.

### 11.1.7 `ScrollToTop/ScrollToTop.jsx`
- Client. Floating button `fixed left-4 bottom-20 z-50`, `aria-label="اسکرول به بالا"`, `animate-bounce`, shows when `scrollY > 100` and not near bottom. Smooth scroll.

### 11.1.8 `UserPanelLayout.jsx`
- Client. Shared shell for Profile/Orders/OrderDetail/Addresses: breadcrumb (خانه → title), gradient header card (avatar = first char of `profile?.name || profile?.mobile || "کاربر"`), nav menu (حساب کاربری/سفارشهای من/آدرسهای من), logout button.
- Fetches `fetchProfile()` (cache 40s) on mount. `handleLogout` as in §10. Active link class `bg-[#0c5505] text-white`.
- Mobile accordion button `منوی حساب کاربری` + `▾`.

### 11.1.9 `ErrorOnFetchApi/ErrorOnFetchApi.jsx`
- Client, framer-motion animated top-center error banner. Props `{ message, onClose, isVisible = true }`. Red gradient, `AlertTriangle`, wobble animation, optional close button. Used by consultantProfile. **No `role="alert"`/`aria-live`.**

## 11.2 `login/login.jsx`
- Client. Two-step: phone → OTP (react-otp-input, 6 digits).
- Step `"phone"`: `<h1>حساب کاربری</h1>`, `<h2>ورود / ثبت نام</h2>`, label `شماره موبایل`, **input `id="mobile"`** (fixes broken label association), placeholder `۰۹۱۲۳۴۵۶۷۸۹`, submit `ارسال کد تأیید` (disabled until 11 chars).
- Step `"otp"`: `<h2>تأیید کد</h2>`, `OtpInput numInputs={6}` with `renderInput={(props, index) => <input {...props} aria-label={`کد تأیید رقم ${index + 1}`} />}`, countdown 120s, resend, `ورود` button, `تغییر شماره موبایل`.
- 429 → "تعداد درخواستهای مجاز را رد کردهاید...". Uses WooCommerce-ish classnames (`woocommerce-form`, `entry-title`) — theme remnant.

## 11.3 `blog/BlogList.jsx`
- **Server component (async)** — the only true server component in these dirs. Uses `serverFetch('articles?per_page=50')`.
- `<h1>وبلاگ آنی رز</h1>`. Grid of post cards (Link `/blog/{id}/{slug}`, Image `alt={post.title}` lazy, `<h2>` title, chip `مشاهده مقاله`).
- Emits its own `Blog` JSON-LD (`blogPost` array of BlogPosting) + `ItemList` JSON-LD (these are separate from the page-level JSON-LD in `app/blog/page.jsx`).
- Empty state: `مجله‌ای وجود ندارد` + `به زودی مقالات جدیدی منتشر خواهیم کرد`.

## 11.4 `cart/`

### `cartPage.jsx`
- Client, `useCart()`. `<h1>سبد خرید</h1>`.
- Desktop table: headers `حذف/تصویر/محصول/قیمت/تعداد/جمع جزء`; quantity `<input type="number" min="1" aria-label={`تعداد ${item.name}`}>`; remove button (Trash2, **no aria-label**).
- tfoot: `<CouponForm>` + `بروزرسانی سبد خرید` button (RefreshCw).
- Mobile card list + mobile CouponForm/update. `<CartTotals>` sidebar. Empty state `سبد خرید شما خالی است` / link `مشاهده فروشگاه`.
- `formatPrice` uses default `toLocaleString()` (NOT fa-IR, unlike Header).
- Because `/cart*` 404 locally: error shows `"خطا در ارتباط با سرور"`, empty state renders.

### `cartTable.jsx`
- **Entirely commented-out dead code.** Not rendered. Contains stale react-router-ish imports and a `window.confirm('آیا از حذف این محصول اطمینان دارید؟')` remove flow.

### `cartTotals.jsx`
- Server-compatible. Props `{ subtotal, discount, total, shippingFee, couponCode, loading }`. `<h2>جمع کل سبد خرید</h2>`, rows `جمع جزء/تخفیف ({code})/هزینه ارسال/مجموع`, CTA `همین الان خرید کنید` → `/checkout`. Skeleton when loading.

### `couponForm.jsx`
- Client. Props `{ onApplyCoupon, updating, error, successMessage }`. Input `placeholder="کد تخفیف خود را وارد کنید"` + **`aria-label="کد تخفیف"`**. Empty → `"لطفاً کد تخفیف را وارد کنید"` (3s). `onSuccessOnlySidebar` prop passed by CartPage but **not destructured** (dead prop).

## 11.5 `checkout/`

### `checkoutPage.jsx`
- Client, `useCheckout()`. `<h1>تسویه حساب</h1>`.
- `submitFormRef` bridges OrderSummary's `ثبت سفارش` to CheckoutForm's submit.
- `handleSubmitOrderWrapper(formData)` → `handlePlaceOrder`; if `result?.success && result?.data?.payment_url` → `window.location.href = result.data.payment_url`.
- Success view: `<h2>سفارش شما با موفقیت ثبت شد!</h2>`, order number, total, `پرداخت آنلاین` (if payment_url), `ادامه خرید` (→/shop), `مشاهده سفارشات` (→/orders).
- Composes `CouponCheckout`, `CheckoutForm`, `OrderSummary`.

### `checkoutForm.jsx`
- Client. Props `{ addresses, selectedAddressId, onSelectAddress, shippingMethods, selectedShippingId, onSelectShipping, updating, onSubmit, onSubmitOrder }`. State `notes`, `serverError`; `handleSubmitRef` registered via `onSubmitOrder`.
- `handleSubmit` → `onSubmit({ address_id, notes })`; surfaces `result?.error`.
- Headings: `آدرس ارسال` (+ link `مدیریت آدرسها`), `روش ارسال`, `توضیحات سفارش (اختیاری)`. Empty-address banner: `هنوز آدرسی ثبت نکردهاید.` / `برای ثبت سفارش ابتدا یک آدرس اضافه کنید`.

### `orderSummary.jsx`
- Server-compatible. Props `{ cart, updating, formatPrice, onSubmitOrder, submitting }`. Headings `سفارش شما`, `محصول`, `جمع جزء`, `تخفیف ({cart.coupon_code})`, `هزینه ارسال`, `مجموع`, `سیاست های حریم خصوصی`, button `ثبت سفارش`/`در حال پردازش...`. Hardcoded WooCommerce "no payment methods available" notice. Skeleton when updating.

### `couponCheckout.jsx`
- Client. Props `{ onApplyCoupon, updating }`. Collapsible `کد تخفیف دارید؟`, input + `aria-label="کد تخفیف"`, button `اعمال کد تخفیف`. Success → `کد تخفیف با موفقیت اعمال شد`.

### `checkoutSkeleton.jsx`
- Static `react-loading-skeleton` layout.

## 11.6 `payment/`

### `paymentPage.jsx`
- Client, `usePayment()`. Branches: loading → `<PaymentLoading/>`; error/nok → `<PaymentFailed/>`; ok+orderData → `<PaymentSuccess/>`; else renders **nothing** (commented-out fallback).

### `paymentSuccess.jsx`
- Client. Props `{ orderData, trackingCode }`. Scale-in green check. `<h1>پرداخت موفق</h1>`, `پرداخت شما با موفقیت انجام شد`, `کد سفارش:` + `کپی` (`navigator.clipboard` + `alert`), `<h3>📦 اقلام سفارش</h3>` table, totals (`هزینه ارسال` → `رایگان` when 0), buttons `پیگیری سفارش` (→ `/track-order?code={order_id}` — **note: no such route exists**) and `بازگشت به خانه`, thanks box.
- Totals via `||` fallbacks across `total_amount/subtotal/discount_amount/shipping_cost/shipping_fee/final_amount/total`.

### `paymentFailed.jsx`
- Client. Props `{ orderData, errorMessage, trackingCode }`. Red `✕`, `<h1>پرداخت ناموفق</h1>`, error banner, `<h3>📦 اقلام سفارش</h3>`, totals, buttons `بازگشت به سبد خرید` (→/cart) + `بازگشت به خانه`, refund note `در صورت کسر وجه از حساب شما، طی ۷۲ ساعت آینده به حساب شما بازگردانده خواهد شد.`

### `paymentSkeleton.jsx`
- `PaymentLoading` — static `animate-pulse` divs (not react-loading-skeleton).

## 11.7 `productDetail/`

### `productDetailPage.jsx`
- Client. `useParams()` → `{ id }`; `useProduct(id)`. State `quantity (1)`, `addingToCart`. `trackProductView` on product change; resets quantity on id change.
- `handleAddToCart(payload)` → `addToCart(payload)` (POST `/cart/items`); toasts.
- `if (error || !product) { notFound(); return null; }` (client-side 404).
- Renders `ProductGallery {mainImage, images, name}`, `ProductInfo`, `ProductTabs {product, reviews: []}`, `RelatedProducts {products: relatedProducts}`.

### `productGallery.jsx`
- Client. Props `{ mainImage, images = [], name = "" }`. State `activeImage, showZoom, zoomStyle`; ref `containerRef`.
- `productAlt = name ? `تصویر ${name}` : "تصویر محصول"`. If only 1 image, fabricates 4 thumbs via `?fake=1..3` (may 404 on backend images).
- Hover zoom via `handleMouseMove` (backgroundPosition %, size 250%). Thumb buttons `aria-label={`مشاهده تصویر ${idx + 1}`}` `aria-pressed`. `FALLBACK_IMAGE = "/images/test/placeholder.jpg"`.

### `productInfo.jsx`
- Client. Props `{ product, onQuantityChange, quantity, onAddToCart, addingToCart }`. **Contains the product H1**: `<h1>{product.name}</h1>`.
- `selectedWeightId` (default first `type_of_weights`). Pricing from weight pivot `{price, price_discounted, stock}` or product fallback. `discountPercent`, `isInStock`, `isLowStock (≤5)`.
- Badges: `★★★★★ {ratingValue}` (`product.rating?.toFixed(1) || "۰"`), `✓ موجود در انبار` / `⚠️ تنها {stock} عدد باقی مانده` / `✗ ناموجود`, `{discountPercent}% تخفیف`.
- Weight selector `انتخاب نوع وزن`; `<QuantitySelector min={1} max={Math.max(stock,1)}>`; add button `🛒 افزودن به سبد خرید`/`در حال افزودن...`/`ناموجود`; `💰 خرید عمده` → `/omde`; meta `🆔 کد محصول: {tracking_code}`, `📦 وزن`, `🏭 برند: آنیرز`.
- `handleAddToCart` payload `{ product_id, type_of_weight_id: selectedWeight?.id, quantity }`.

### `quantitySelector.jsx`
- Client. Props `{ min=1, max=99, onChange }`. Internal state is source of truth (parent prop not synced back). Buttons `aria-label="کاهش تعداد"` / `"افزایش تعداد"`.

### `productTabs.jsx`
- Client. Props `{ product, reviews }` (reviews unused). State `activeTab ('description')`.
- **Only the description tab button is rendered** — `specs` and `bulk` branches are unreachable dead code.
- Description rendered from `product.description`. Specs table from `Object.entries(product.specifications || {})`.
- `BulkOrderForm` (unreachable) uses react-hook-form: `fullname` (required, min 3), `phone` (`/^(09|۰۹)[0-9۰-۹]{9}$/`), `weight` (0–10000), `quality` select, `description` (≤500, ≥10 if filled). **Fake submit** (1500ms, no API). Contact line `۰۲۱-۱۲۳۴۵۶۷۸` / `bulk@anirose.com` (**placeholders**). `🚚 ارسال به سراسر کشور برای سفارشات بالای ۵۰ کیلوگرم رایگان است.`

### `relatedProducts.jsx`
- Server-compatible. Props `{ products }`; null if empty. `<h3>🔄 محصولات مشابه و پیشنهادی</h3>`. **Link omits slug**: `/product/${product.id}` (client-side redirects). `formatPrice = price + " تومان"` (no toLocaleString).

### `starRating.jsx`
- Plain. Props `{ rating, reviewCount }`. 5 `★` spans + half-star `½`. **Unused** by ProductTabs/ProductInfo.

### `productDetailSkeleton.jsx`
- Plain `react-loading-skeleton` layout.

## 11.8 `shop/`

### `shopPage.jsx`
- Client. `useShopFilters(12)`. `<h1>فروشگاه</h1>` + `<p>مجموعهای از بهترین محصولات طبیعی</p>`.
- Renders `ShopSidebar {filters, categories, onApplyFilters, onClearFilters, onRemoveFilter}`, `ProductGrid {products, loading, categories}`, `Pagination {currentPage, totalPages, onPageChange}` (only when `!loading && totalPages > 1`).

### `shopSidebar.jsx`
- Client. Props `{ filters, categories, onApplyFilters, onClearFilters }` (`onRemoveFilter` declared but **not passed** — dead).
- State `isMobileOpen, priceRange {min:0, max:10000000}, loading, openSection ('category'), selectedCategories, localFilters`.
- Fetches `getPriceRange()` from `shopService` (fetches 50 products, computes min/max of `salePrice||price`).
- Headings: `فیلتر محصولات`, `فیلترهای فعال`, `دسته بندی محصولات`, `حذف همه`, `اعمال فیلتر ({filterCount})`. Framer-motion mobile drawer.

### `priceRangeSlider.jsx`
- Client. Props `{ isOpen, onToggle, minPrice, maxPrice, onPriceChange, priceRange }`.
- Two `type="range"` inputs (`step={1000}`, `aria-label="حداقل قیمت"`/`"حداکثر قیمت"`, `direction:'ltr'`) + two text inputs with `<label htmlFor="price-max">حداکثر قیمت</label>` / `<label htmlFor="price-min">حداقل قیمت</label>` (id/for wired).
- Clamp `tempMax - 1000` min gap; text inputs strip non-digits; blur commits `onPriceChange({minPrice, maxPrice})` (null at bounds). Headings `فیلتر بر اساس قیمت`, `محدوده انتخاب شده:`.

### `productCard.jsx`
- Client. Props `{ product, index, categories }`. **Add-to-cart is FAKE** — `handleAddToCartTop` (2s) / `handleAddToCartBottom` (1.5s) only toggle state via setTimeout; no API call.
- `productSlug = product.name.replace(/\s+/g,'-')`; URL `/product/{id}/{slug}`. Category label via `categories.find(cat => cat.id === product.categoryId)`.
- Image `alt={product.name || "محصول"}` with onError fallback. `<h3>{product.name}</h3>`. Prices with line-through on sale. `motion.div` fade-up (`delay index*0.05`).

### `productGrid.jsx`
- Server-compatible. Props `{ products, loading, categories }`. Loading → `<ProductGridSkeleton count={8}/>` (named export from `ProductSkeleton.jsx`). Empty → `<h3>محصولی یافت نشد!</h3>`. Grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.

### `pagination.jsx`
- Server-compatible. Props `{ currentPage, totalPages, onPageChange }`. `getPageNumbers()` delta=2 with `'...'`. Returns null if `totalPages <= 1`. Active class `bg-[#e0a96d] text-white`. Chevron prev/next.

## 11.9 `bulkOrder/`

### `bulkOrderPage.jsx`
- Client. Used directly by `app/omde/page.jsx`. `<h2>Bulk Order</h2>`, **`<h1>فروش عمده محصولات آنیرز</h1>`**, `Image alt=""` (rotate-180), description paragraph, `<BulkOrderForm/>`.

### `bulkOrderForm.jsx`
- Client. **Mock submit** via `bulkOrderService` (800ms delay, always success); on success toast + `router.push("/")` after 2500ms.
- `useForm` defaults: `fullname, company, mobile, phone, email, province, product_name, quality_grade, weight, package_count, packaging_type, delivery_date, shipping_method, description, representative_phone, contact_time, contact_method_call, contact_method_whatsapp, contact_method_sms, contact_method_email, terms`.
- Validation: mobile `/^(09|۰۹)[0-9۰-۹]{9}$/`; landline `/^(0[0-9]{2,3})-?[0-9]{5,8}$/`; email regex; weight `min 0.1`; delivery_date via `isValidPersianDate` (≥ today); terms required; at-least-one contact method.
- Option arrays: 10 provinces, 25 products (دمنوشها، عسل، خشکبار، ادویه...), 4 quality grades, 6 packaging types, 4 shipping methods, 3 contact times.
- Section headings: `اطلاعات درخواستکننده`, `مشخصات محصول مورد نظر`, `زمان تحویل و نحوه ارسال`, `توضیحات تکمیلی`, `مشاوره فروش عمده`. Contact-method checkboxes `تماس تلفنی/واتساپ / ایتا/پیامک/ایمیل`. Terms checkbox `id="bulk-terms"` + label htmlFor. Submit `ثبت درخواست سفارش عمده`.
- Contact box placeholders: `📞 ... ۰۲۱-۱۲۳۴۵۶۷۸ (داخلی ۲۰۲)`, `📧 ایمیل فروش عمده: bulk@anirose.com`. Renders `<Toast/>`.

### `formField.jsx`
- Client, reusable labeled field. Props `{ label, name, type="text", register, error, required, placeholder, options, isSelect, isTextarea, className, validate }`.
- `<label htmlFor={name}>` + input/select/textarea `id={name}`. `validationRules` merges custom + `required: `${label} الزامی است``. `isFocused`/`hasValue` drive `placeholder-transparent` styling.

### `toast.jsx`
- Client. Props `{ message, type="success", onClose }`. Auto-dismiss 3s. `fixed top-20 left-1/2` pill, green/red.

## 11.10 `doctorsPage/doctorsPage.jsx`
- Client. `fetchDoctorsData()` (mock, 500ms). `if (loading) return <DoctorsPageSkeleton />`; `!data → null`.
- Destructure `{ title, icon, doctors = [] }`. **`<h1>{title}</h1>`**, decorative `Image alt=""`, per-doctor `<h3>{doctor.name}</h3>`, specialty badge, bio. Images `/images/test/doctor-{1,2,3}.jpg`.

## 11.11 `consultantProfile/`

### `consultantProfile.jsx`
- Client. `loadData()` → `fetchConsultantData()` (mock, 500ms); throws `new Error("دادهای دریافت نشد")` if falsy. Loading → `<ConsultantProfileSkeleton />`; error → `<ErrorOnFetchApi message={error} isVisible={!!error && !data} onClose={() => setError(null)} />` + `🔄 تلاش مجدد`.
- Renders `<ConsultantResume consultant={data.consultant} />` + `<ConsultantForm formData={data.form} />`.

### `consultantResume.jsx`
- Client. Props `{ consultant }`. Destructure `name, title, avatar, rating, reviewCount, contact, resume, reviews`.
- `<h1>{name}</h1>`, `<h2>رزومه و سوابق مشاوره</h2>`, `<h3>📘 تحصیلات و تخصصها</h3>` (`resume.education [{label, institution}]`), `<h3>🏆 سوابق حرفهای</h3>` (`resume.experience: string[]`), `<h3>💡 زمینههای مشاوره</h3>` (`resume.fields`), `<h3>نظرات مشتریان آنیرز</h3>` (`reviews [{name, rating, text}]`). Contact rows `🎓 تخصص مشاوره / 📧 ایمیل / 📞 تماس مستقیم / 🕒 ساعات پاسخگویی`. Avatar fallback `/images/test/v.jpg`. Framer-motion entrances.

### `consultantForm.jsx`
- Client. Props `{ formData }`. State `form` initialized from `formData`; `handleChange`. `<h2>{formData.title}</h2>`.
- Labels wired: `consultant-fullname` (نام و نام خانوادگی *), `consultant-mobile` (شماره موبایل *), `consultant-phone` (تلفن ثابت), `consultant-email` (ایمیل). Checkboxes wrapped in labels (properly labeled).
- Submit via mock `submitConsultationForm` (800ms delay) → success/error toast.

## 11.12 `skeleton/` (loading components)

- `Blog/BlogSkeleton.jsx`, `Cart/CartSkeleton.jsx` (exports `CartPageSkeleton`), `DoctorsPage/DoctorsPageSkeleton.jsx`, `ProductDetail/ProductDetailSkeleton.jsx`, `Shop/ProductSkeleton.jsx` (named export `ProductGridSkeleton`), `MainSkeleton/MainSkeleton.jsx` (exports `SkeletonProvider` used in ClientLayout), `Shop/ShopSidebarSkeleton.jsx`, `Blog/BlogPostsSliderSkeleton`, `Testimonials/TestimonialsSkeleton`, `Categories/CategoriesSkeleton`, `CategoryProductSlider/CategoryProductSliderSkeleton`. Most use `react-loading-skeleton`; `paymentSkeleton` uses `animate-pulse`.

## 11.13 `JsonLd/index.jsx`

```jsx
const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
export default JsonLd;
```

## 11.14 `notFound/notFound.jsx`
- Standalone 404 view (used by `src/views/NotFound/`). `<h1 className="text-[150px]...">` 404 digits, `<h2>` message, link home. The actual route 404 is handled by `app/not-found.jsx`.

---

# 12. `src/views/` — view-layer reference

**Pattern:** most views are thin server wrappers re-exported by `index.js`; the real logic lives in `src/components/`.

| View dir | Component | Type | Renders | Notes |
|---|---|---|---|---|
| `Root/` | `Root.jsx` | server | `<HeroSlider/> <LazyCategories/> <DoubleBanner/> <WhyChooseUs/> <SaleSection/> <GiftRequestComponent/> <LazyCategoryProductSlider/> <AboutSection/> <LazyCategoryProductSlider contrary={true}/> <AniroseStats/> <LazyTestimonials/> <LazyBlogPostsSlider/>` | Home orchestrator |
| `Root/` | `HomeLazySections.jsx` | client module | exports `LazyCategories`, `LazyCategoryProductSlider`, `LazyTestimonials`, `LazyBlogPostsSlider` via `dynamic(..., { ssr: false })` with skeletons | Keeps swiper out of initial bundle |
| `Shop/` | `Shop.jsx` | server | `<ShopPage/>` (client) | — |
| `Contact/` | `Contact.jsx` | client | self-contained | See §13 |
| `Login/` | `Login.jsx` | server | `<LoginComponents/>` (client) | — |
| `Profile/` | `Profile.jsx` | client | self-contained | See §13 |
| `Orders/` | `Orders.jsx` | client | self-contained | See §13 |
| `OrderDetail/` | `OrderDetail.jsx` | client | self-contained | See §13 |
| `Addresses/` | `Addresses.jsx` | client | self-contained | See §13 |
| `Checkout/` | `Checkout.jsx` | server | `<CheckoutPage/>` (client) | — |
| `Cart/` | `Cart.jsx` | server | `<CartPage/>` (client) | — |
| `Payment/` | `Payment.jsx` | server | `<PaymentPage/>` | app/payment imports component directly |
| `ProductDetail/` | `ProductDetail.jsx` | server | `<ProductDetailPage/>` | **ignores `id`/`slug` props**; client reads `useParams()` |
| `Doctors/` | `Doctors.jsx` | server | `<DoctorsPage/>` | **component misnamed `Login` in source** (default export used as Doctors) |
| `ConsultantProfile/` | `ConsultantProfile.jsx` | server | `<ConsultantProfileComponent/>` | — |
| `NotFound/` | notFound | — | `src/components/notFound/notFound.jsx` | **orphaned view — never imported** |

## 12.1 `Contact/Contact.jsx` (client, self-contained)
- State `contact (null), loading (true)`. Fetches `fetchContactSettings()` (cache `'contact-settings'`, 40s).
- **Fallback data (placeholders):** phones `["021-12345678", "09121234567"]`, emails `["info@aniroz.ir"]`, addresses `["تهران، خیابان انقلاب، ..."]`, workingHours `"شنبه تا پنجشنبه ۹ تا ۱۸"`, fax `"021-12345679"`, supportTitle `"پشتیبانی آنی رز"`.
- `<h1>{supportTitle}</h1>`, subtitle `تیم پشتیبانی آنی رز آماده پاسخگویی به سوالات شماست`, `<h2>` items `تلفن تماس/ایمیل/آدرس/ساعت کاری/فکس/شبکههای اجتماعی`. Icons from react-feather. `normalizeSocials` helper. Social links `target="_blank" rel="noopener noreferrer"`.

## 12.2 `Profile/Profile.jsx` (client)
- State `profile, loading, saving, name, email`. `fetchProfile()`/`updateProfile({name, email})` from auth.js (cache `'profile'`).
- `<UserPanelLayout title="حساب کاربری">`, `<h1>حساب کاربری</h1>`, stat cards `شماره موبایل/وضعیت حساب/ایمیل`, `<h2>ویرایش اطلاعات</h2>`, labels wired (`profile-name`, `profile-email`), button `ذخیره تغییرات`/`در حال ذخیره...`. `profile?.is_active ? "فعال" : "غیرفعال"`.

## 12.3 `Orders/Orders.jsx` (client)
- State `orders ([]), loading`. `fetchOrders()` → `result.orders || []`. `statusColors` map: `pending_review→yellow, packaging→blue, shipping→purple, completed→green, cancelled→red`. `formatPrice` fa-IR + `تومان`.
- `<UserPanelLayout title="سفارشهای من">`, `<h1>سفارشهای من</h1>`, badge `{orders.length} سفارش`, empty state `شما هنوز سفارشی ثبت نکردهاید` + `مشاهده فروشگاه`, cards → `/orders/${order.id}`.

## 12.4 `OrderDetail/OrderDetail.jsx` (client)
- Props `id`. `fetchOrderById(id)`, `cancelOrder(id)`. Cancel guarded by `window.confirm("آیا از لغو این سفارش اطمینان دارید؟")`; only when `shipping_status` in `pending_review|packaging`.
- `<h1>جزئیات سفارش</h1>`, status badges, cards `روش ارسال/گیرنده/آدرس ارسال`, `<h3>محصولات سفارش</h3>` table, totals (`جمع کل/هزینه ارسال/تخفیف/مبلغ قابل پرداخت`), `<h3>تاریخچه سفارش</h3>` timeline (first dot `#0c5505`). Payment badge green when `payment_status === "paid"`. `dir="ltr"` on order number.

## 12.5 `Addresses/Addresses.jsx` (client)
- State `addresses, loading, showForm, editingId, provinces, saving, form {first_name, last_name, province_id, city_name, full_address, postal_code, mobile, is_default}`.
- `Promise.all([fetchAddresses(), fetchProvinces()])`. CRUD + `setDefaultAddress`. `handleSubmit` payload includes `province_name` + `Number(province_id)`.
- `<UserPanelLayout title="آدرسهای من">`, `<h1>آدرسهای من</h1>`, form `<h3>آدرس جدید</h3>`/`<h3>ویرایش آدرس</h3>`, labels wired (`address-first-name` etc.), checkbox `آدرس پیشفرض` wrapped in label. Toasts on success; `window.confirm` on delete.

---

# 13. Home page sections (`src/components/index/`)

## 13.1 `heroSlider/heroSlider.jsx` (server, SSR)
- Static banner (no Swiper). **Contains the home H1 as `sr-only`: `<h1 className="sr-only">آنی رز - فروشگاه محصولات طبیعی و ارگانیک</h1>`**.
- Decor `Frame-41-2.png` / `Frame-74.png` with `alt=""`. Banner `Image src="/images/banners/IMG_20260729_092200_700.jpg" alt="بنر اصلی" loading="lazy"`. **Banner filename is dated/hardcoded — must exist in `public/images/banners/`.**

## 13.2 `doubleBanner/doubleBanner.jsx` (server, SSR)
- Two dark cards `تخفیف ویژه` / `محصولات جدید` (badge `ویژه`/`جدید`), each linking `/shop`. `<h3>` titles. No images.

## 13.3 `whyChooseUs/whyChooseUs.jsx` (server, SSR)
- **Imports JSON directly:** `public/jsons/why-choose-us-data.json` → `data.data`. Title icon `/images/test/Group-3-min.png` (alt `""`), `titleEn: "Why should we buy from anirose?"`, `titleFa: "چرا باید از آنی رز خرید کنیم؟"`. 3 features (ارسال با پست پیشتاز، حمایت از هنر و کالای ایرانی، پرداخت درب منزل) with inline SVG icons `delivery/support/payment`. `<h3>{titleEn}</h3><h2>{titleFa}</h2>`, per-feature `<h4>`.

## 13.4 `saleSection/` (SSR wrapper + client lazy)
- `saleSection.jsx` (server async): `getSaleProducts()` → `serverFetch('products?suggested=1&per_page=20')`; `if (!products.length) return null;` → `<SaleSectionClient products={products} />`.
- `SaleSectionClient.jsx` (client): `dynamic(() => import("./SaleSectionContent.jsx"), { ssr: false, loading: () => <SaleSectionSkeleton /> })`.
- `SaleSectionContent.jsx` (client, lazy): `<h3>Anirose discounts</h3>`, `<h2>حراجی های آنی رز</h2>`. Swiper (Autoplay + Navigation), breakpoints 480→2 … 1280→5. `addToCart` via `cartServiceButton`. Nav glyphs with `Image alt="قبلی"/"بعدی"`. Rotating decor `/images/test/Objects-4.png`. Custom `<style>` for keyframes.

## 13.5 `giftRequest/giftRequest.jsx` (client, SSR-emitted)
- Background `Frame-74-2.jpg` + backdrop-blur. `<h2>هدیه ای خاص از جنس سلامتی</h2>`, phone `<input type="tel" aria-label="شماره تماس">`, button `ثبت درخواست`/`در حال ثبت...`.
- Validation `/^(09|۰۹)[0-9۰-۹]{9}$/`, `normalizePhone` (Persian digit shift). Submit via **mock** `giftService` (800ms). Success waits 2s → `درخواست شما با موفقیت ثبت شد...`. Error branches 400/429/network.

## 13.6 `aboutSection/`
- `aboutSection.jsx` (server): **imports `public/jsons/about-data.json` directly** (`data.data`): title `"هدیه ای خاص از جنس سلامتی"`, image `/images/test/Group-14-4.png`, stats 3 (`سابقه فعالیت 5+`, `تعداد محصولات 40`, `اعضای تیم 10`). → `<AboutSectionContent data={aboutData} />`.
- `AboutSectionContent.jsx` (client, statically imported — SSR emitted): count-up via IntersectionObserver (`threshold 0.3`, step/50, 30ms). `<h2>{data.title || "???? ?? ??? ?? ??? ??????"}</h2>` — **fallback text is mojibake**. Stats block bg `Frame-1000001594-3-1.jpg`. `<Image src={data.image} alt="تصویر درباره آنی رز">`. Divider `line.png` `alt=""`.

## 13.7 `aniroseStats/`
- `aniroseStats.jsx` (server): **imports `public/jsons/anirose-stats.json` directly**: topLogo `Asset-1-3-1.png`, leaves `Group-7-min.png`, centerLogo `QalamOnline-13-1.png`, 4 stats (تیم آنی رز 20 نفر، سفارشات تکمیل شده 5 هزار، اشتغال زایی 100، تجربه 15 سال، prefix `بیش از`). → `<AniroseStatsContent />`.
- `AniroseStatsContent.jsx` (client, statically imported): count-up same pattern. Logos `alt="لوگوی آنی رز"`, leaves `alt=""`. **Stats rendered twice** (mobile grid + desktop grid) sharing ONE `statsRef` — the second grid won't be observed, counters stay 0 until first grid triggers.

## 13.8 `categories/categories.jsx` (client, LAZY `ssr:false`)
- `fetchCategoriesData()` → `/api/v2/categories` (cache 40s). Title block `<h2>products categorization</h2>` + `<h2>دسته بندی محصولات</h2>` (bg `Group-45-min-1.png`). Decor `Group-3-min.png` + `Frame-73.png` both `alt=""`.
- Swiper (Autoplay 3000 + Navigation), breakpoints 640→3 … 1280→5. Slide: Link `/shop?category={id}&name={slugified}`, background `1-min-2-1.png` (**same image for all categories**), inner `category.image || placeholder` with `alt={category.name}`, `<span>{category.name}</span>`. Nav buttons `aria-label="اسلاید قبلی"/"اسلاید بعدی"`.

## 13.9 `categoryProductSlider/categoryProductSlider.jsx` (client, LAZY)
- Props `{ contrary = false }`. Fetches first category then `fetchCategoryProducts(firstCategory.id)` (cache 40s). Uses `@/` alias. `handleAddToCart` wrapped in `startTransition`.
- `<section aria-label="محصولات دستهبندی">`, banner column with `<Image src={IMAGES.banner} alt={category.name} priority quality={85}>` + `alt={`آیکون ${category.name}`}`. Slider column Swiper (loop when >4). Custom prev/next `aria-label="محصولات قبلی"/"محصولات بعدی"`. ProductCard button `aria-label={`افزودن ${product.name} به سبد خرید`}`. Discount badge `تخفیف!`. `formatPrice` fa-IR.

## 13.10 `testimonials/testimonials.jsx` (client, LAZY)
- **Fetches static JSON via raw axios:** `axios.get("/jsons/testimonials.json")` → `response.data.data` (not cached, not proxied). Title `titleFa: "نظرات مشتریان عزیز آنی رز"`. Section 2 `<h2>دیدگاه مشتریان ما</h2>`.
- Swiper (Autoplay 4000, loop). Slide: `Image alt={item.name}`, `<h4>{item.name}</h4>`, `<p>{item.role}</p>`, `StarRating`, comment (scrollable). Local `StarRating` with half-star opacity. Nav `aria-label="اسلاید قبلی"/"اسلاید بعدی"`.

## 13.11 `blogPostsSlider/blogPostsSlider.jsx` (client, LAZY)
- `fetchArticles({ per_page: 20 })` (new `api/services/articles.js`). `titleEn: "AniRoz Blog"`, `titleFa: "مجله سلامت آنی رز"`. Swiper breakpoints 640→2 … 1024→4. Slide: Link `/blog/{id}/{slug}`, `Image alt={post.title}`, overlay `-bottom-20` with `<h4>` title + `مشاهده` chip. Inline `<style>` overrides swiper overflow.

---

# 14. `src/utils/api/<name>Service/` — older service tree (many DEAD)

| Service dir | Exports | Endpoint/source | Used? |
|---|---|---|---|
| `aboutService` | `fetchAboutData()` | `axios.get('/jsons/about-data.json')` | **DEAD** (aboutSection imports JSON directly) |
| `aniroseStatsService` | `fetchAniroseStats()` | `axios.get('/jsons/anirose-stats.json')` | **DEAD** |
| `authService` | `loginUser(mobile, _password)`; re-exports sendOtp/verifyOtp | delegates to api/services/auth.js | **DEAD** |
| `bannersService` | `fetchBannersData()` | MOCK_BANNERS (2 hardcoded) | **DEAD** |
| `blogService` | `fetchBlogPosts()` | `axios.get('/jsons/blog-posts.json')` | **DEAD** |
| `bulkOrderService` | `submitBulkOrder` (alias) | mock api/services/bulkOrder.js | **USED** (bulkOrderForm) |
| `cartService` | fetchCart/updateCartItem/removeCartItem/applyCoupon/updateCart aliases | delegates to api/services/cart.js | **DEAD** |
| `cartServiceButton` | `addToCart(productId, typeOfWeightId, quantity=1)` | delegates to cart.js | **USED** (categoryProductSlider, SaleSectionContent) |
| `categoriesService` | `fetchCategoriesData()` → `{ categories }` | delegates to categories.js | **USED** (categories, categoryProductSlider) |
| `categoryProductsService` | `fetchCategoryProducts(categoryId)` | delegates to products.js | **USED** (categoryProductSlider) |
| `checkoutService` | re-exports provinces/applyCouponCheckout/placeOrder; fetchCheckoutCart | delegates | **DEAD** |
| `consultantService` | `fetchConsultantData()`, `submitConsultationForm` | mock consultant.js | **USED** (consultantProfile, consultantForm) |
| `doctorsService` | `fetchDoctorsData()` | mock doctors.js | **USED** (doctorsPage) |
| `footerService` | `fetchFooterData()` | merges STATIC_FOOTER + contact-settings | **DEAD** (Footer uses api/services/contact.js) |
| `giftService` | `submitGiftRequest` (alias) | mock gift.js | **USED** (giftRequest) |
| `headerService` | `fetchHeaderData()` (reads `localStorage['aniroz_cart']`); removeCartItem; updateCartQuantity | — | **DEAD** |
| `heroSliderService` | `fetchHeroSliderData()` | hardcoded 2 under-construction slides | **DEAD** |
| `paymentService` | `verifyPayment()`; `clearPendingOrder()` | mock; generates ORD-/TRK- codes | **DEAD** (usePayment has its own logic) |
| `productService` | `fetchAllProducts` (dynamic import); re-exports fetchProductById; fetchRelatedProducts | delegates | **DEAD** |
| `saleService` | `fetchSaleProducts()` → `{ products }` | delegates to products.js | **DEAD** (saleSection uses serverData) |
| `shopService` | `getFilteredProducts`, `getCategories`, `getPriceRange`, `getProductById` | delegates; getPriceRange fetches 50 products | **USED** (shopSidebar getPriceRange) |
| `testimonialsService` | `fetchTestimonialsData()` | `axios.get('/jsons/testimonials.json')` | **USED** (testimonials) |
| `whyChooseUsService` | `fetchWhyChooseUsData()` | `axios.get('/jsons/why-choose-us-data.json')` | **DEAD** (whyChooseUs imports JSON directly) |

**Rule of thumb:** the JSON-loading services are bypassed by their sections (which `import` the JSON statically); the delegate-to-api ones are only used by home sections and bulkOrder/consultant/doctors. When editing a data path, check which tree the actual component uses.

---

# 15. `src/utils/analytics/` — self-hosted analytics

- `config.js` — `ANALYTICS_CONFIG`: `TOP_ITEMS_LIMIT: 2`, `SEND_INTERVAL { TEST: 30000, PRODUCTION: 43200000 }` (12h prod), `LOG_INTERVAL { TEST: 60000, PRODUCTION: 300000 }`, `IS_TEST_MODE: false`, `STORAGE_KEYS` (5 keys; `analytics_last_sent` defined but unused).
- `AnalyticsCore.js` — singleton via Proxy lazy instantiation. Data: `{ pageViews, productViews, searches, clicks, clicksDetails, timeSpent }`. Methods: `addPageView` (skips /404), `trackProductView`, `trackSearch` (dedupe 1000ms + per-session), `trackClick` (skips #/javascript:/404; caps details at 100), `trackTimeSpent`, `getTop*`/`getTotal*`, `saveToLocalStorage`/`loadFromLocalStorage` (5 keys), `getFullData`, `getSessionId` (`sessionStorage['analytics_session_id']`), `getSummary`, `resetData`.
- `AnalyticsSender.js` — singleton; `setInterval(sendData, SEND_INTERVAL)`; `sendData` posts `getFullData()` to `API_ENDPOINTS.analytics.collect` (`/analytics/collect` via `/api/v2` proxy) with axiosInstance; short-circuits if topPages+topProducts empty; on success `resetData()`. `sendManually()`.
- `clickTracker.js` — global `document.addEventListener('click')`, `closest('a')`, link text from innerText/alt/`'لینک بدون متن'`.
- `productViewTracker.js` — `trackProductView(id, name)`. `searchTracker.js` — `trackSearch(term)`. Used by DesktopHeader and productDetailPage.
- `timeTracker.js` — singleton; `startTracking()` 60s interval, `popstate`/`beforeunload` flush.
- `index.js` — `initAnalytics()` (guarded by `isInitialized`): `loadFromLocalStorage`, page-view dedupe via `sessionStorage['analytics_page_seen_' + path]`, handles reload. Exports `initAnalytics`, `AnalyticsCore`, `AnalyticsSender`, `TimeTracker`, `trackProductView`, `trackSearch`.
- Init wiring in `ClientLayout.jsx` `AnalyticsInit` (see §6.2).

---

# 16. `src/utils/cartEvents.js` and `src/utils/seo.js`

- `cartEvents.js`: `CART_UPDATED_EVENT = 'cart:updated'`; `notifyCartUpdated()` dispatches window event (guarded); `subscribeCartUpdated(cb)` returns unsubscribe. Every mutating cart service calls `notifyCartUpdated()`.
- `seo.js`:
```js
export const SITE_URL = "https://aniroz.ir";
export const defaultOgImage = { url: `${SITE_URL}/images/test/Asset-1-3-1.png`, width: 200, height: 200, alt: "آنی رز" };
```

---

# 17. Persistence & cache key inventory (verified)

**localStorage keys:** `authToken` (auth; read by ClientLayout Authorize + both guards); `aniroz_cart` (dead — only read by dead headerService); `analytics_page_views`, `analytics_product_views`, `analytics_searches`, `analytics_clicks`, `analytics_time_spent` (AnalyticsCore).

**sessionStorage keys:** `authToken` (removed by axios 401 handler); `analytics_session_id`; `analytics_page_seen_${path}`; `payment_result` (usePayment).

**Cookie:** `token` (JWT-encrypted via `js-cookie`).

**Client in-memory cache keys (`src/api/cache.js`):** `categories`, `products_${query}`, `product_${id}`, `articles_${params}`, `profile`, `provinces`, `cities_${provinceId}`, `shipping_methods`, `contact-settings`, `type-of-weights`. Duration default 40s (provinces/cities/shipping 240s).

**Server (`react cache`):** all `serverFetch(path, options)` — 40s revalidate (configurable), 8s abort timeout, graceful `null`.

---

# 18. Known issues, dead code, placeholders, inconsistencies (verified)

## Placeholders (report, don't silently change without confirmation)
- `layout.jsx` JSON-LD Store: telephone `+98-9123456789`, address `تهران`, `sameAs https://instagram.com/aniroz`.
- `Contact.jsx` fallbacks: phones `021-12345678`/`09121234567`, emails `info@aniroz.ir`, fax `021-12345679`, address `تهران، خیابان انقلاب، ...`.
- `Footer.jsx` static contact items (placeholder numbers/address).
- `productTabs.jsx` bulk contact `۰۲۱-۱۲۳۴۵۶۷۸` / `bulk@anirose.com`.
- `bulkOrderForm.jsx` contact `۰۲۱-۱۲۳۴۵۶۷۸ (داخلی ۲۰۲)` / `bulk@anirose.com`.
- `consultant.js` mock contact `dr.ahmadi@aniroz.ir` / `09121234567`.
- OG image is only 200x200 (Google recommends 1200x630).

## Dead code / unused
- `cartTable.jsx` — fully commented out.
- `TOKEN_VALIDATION_INTERVAL` (config), `analytics_last_sent` (config) — unused.
- `relatedProducts.jsx` links omit slug; `starRating.jsx` unused; `productTabs` specs/bulk tabs unreachable.
- 14 of 23 `src/utils/api/<name>Service/` dirs dead (see §14).
- `API_BASE` const unused in `app/shop/page.jsx`; `Cookies` unused in DesktopHeader; `Link` unused in login.jsx; `getArticlesForSlider` has no consumers.
- `HomeLazySections` + skeleton dirs: several skeleton exports exist per-section.
- `src/views/NotFound/` view is orphaned (route uses `app/not-found.jsx`).
- `src/views/Doctors/Doctors.jsx` exports a component internally named `Login`.
- Mock services (gift, bulkOrder, consultant, doctors) stand in for non-deployed backend endpoints.

## Behavioral gotchas
- Cart endpoints 404 locally → cart pages show error/empty locally (production OK).
- Client-heavy pages (`/shop`, `/login`, `/cart`, `/checkout`, `/doctor`, `/doctors`, `/payment`) do NOT emit H1 in SSR HTML (H1 appears after hydration). `/omde` and `/about`, `/faq`, `/rules` DO emit H1 in SSR.
- `usePayment` synthesizes payment results client-side (no backend verification); `clearCart()` fires without await.
- `paymentSuccess` links to `/track-order?code=...` — **no such route exists** (potential 404 for users).
- ProductDetail view ignores its `id`/`slug` props; client uses `useParams()`.
- Testimonials section fetches `/jsons/testimonials.json` via raw axios (not the proxy, not cached).
- `AniroseStatsContent` renders stats twice sharing one `statsRef` → second grid animation may not fire.
- `categoryProductSlider` uses `@/` alias inconsistently; `cartServiceButton` variants exist in both trees.
- Some Persian comments in source are mojibake (`???? ?? ???`); avoid "fixing" strings that are functional fallbacks unless the fix is verified beneficial.

---

# 19. Routes: indexability, sitemap, robots (single source of truth)

- **Indexable + sitemapped:** home, shop, blog, blog detail, product detail, about, contact, faq, rules, doctor, doctors, omde.
- **noindex + excluded from sitemap + disallowed in robots.txt:** profile, orders, orders/[id], addresses, checkout, payment, cart, login, `/api/`.
- `/api/v2/*` is a proxy — never index it. `/manifest.webmanifest` and `/robots.txt` are static metadata routes.

---

# 20. Style guide

- RTL Persian UI; Persian comments/strings in components. Files use `.jsx`/`.js` (no TS).
- ESLint `no-unused-vars`: uppercase/`_`-prefixed vars and `_`-prefixed args are exempt; `process` only whitelisted in the files listed in §3.2.
- DO NOT add code comments unless asked.
- Follow existing patterns: lazy home sections via `HomeLazySections` + `*Content.jsx`/`*Client.jsx` split; server data via `serverFetch`; client data via `src/api/services/*`; SEO images via `defaultOgImage`.
