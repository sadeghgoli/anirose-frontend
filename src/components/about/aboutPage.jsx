import Link from "next/link";
import Image from "next/image";

const productCategories = [
  {
    id: 1, title: "انواع نشاءهای گیاهان دارویی",
    items: "نعناع فلفلی، آویشن، رزماری، اسطوخودوس و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    id: 2, title: "انواع بذرهای گیاهان دارویی",
    items: "بذر زیره سبز، بذر کاسنی، بذر پنیرک، کنجد، اسفرزه و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    )
  },
  {
    id: 3, title: "انواع چای",
    items: "چای سبز، چای ترش، چای سیاه، چای ماسالا، چای اولانگ و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    )
  },
  {
    id: 4, title: "انواع دمنوش‌های ساده و ترکیبی",
    items: "دمنوش نعناع فلفلی، دمنوش ملیس، دمنوش ترکیبی لاغری، دمنوش آرامبخش و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="2" x2="8" y2="4"/><line x1="16" y1="2" x2="16" y2="4"/><path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/>
      </svg>
    )
  },
  {
    id: 5, title: "گیاهان نادر و کمیاب",
    items: "جینکو بیلوبا، حب بلسان، دورنج عقربی، بالدور، انواع جنسینگ و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    id: 6, title: "گیاهان صادراتی",
    items: "زعفران، زرشک، زیره سبز، عناب و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  },
  {
    id: 7, title: "گیاهان آروما و اسماچ",
    items: "اسطوخودوس، مریم گلی، اسپند، اسماچ و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    id: 8, title: "انواع ادویه‌جات اصلی و ترکیبی",
    items: "زردچوبه، فلفل سیاه و قرمز، دارچین، ادویه پاستا، ادویه دودی، ادویه مرغ و ماهی و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    )
  },
  {
    id: 9, title: "انواع صمغ‌ها و شیره‌های گیاهی",
    items: "ترنجبین، آنغوزه، مصطکی و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    id: 10, title: "سبزیجات خشک",
    items: "جعفری، شوید، تره، گشنیز و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    )
  },
  {
    id: 11, title: "بیو ارگانو‌ها",
    items: "قارچ گانودرما، شیتاکه، جلبک اسپیرولینا و ...",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4"/><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
      </svg>
    )
  },
  {
    id: 12, title: "بسته‌های کادویی",
    items: "بسته‌بندی ویژه و لوکس مناسب هدیه و کادو",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    )
  }
];

const AboutPage = () => {
  return (
    <>
      {/* Page Header */}
      <section className="relative bg-[#0C5505] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: "url('/images/test/Frame-41-2.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute top-0 left-0 w-[120px] h-full opacity-20"
             style={{ backgroundImage: "url('/images/test/Frame-74.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center left", backgroundSize: "contain" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <Image src="/images/test/Group-3-min.png" alt="آیکون" width={72} height={72} sizes="72px" className="w-[60px] md:w-[72px] h-auto mx-auto" loading="lazy" />
          </div>
          <h2 className="text-sm md:text-base text-gray-300 font-normal mb-2">کشت و صنعت درخت زندگی</h2>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">درباره ما</h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            تامین کننده محصولات ارگانیک، گیاهان دارویی و ادویه جات
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-4">
        <Image src="/images/test/line.png" alt="" width={1200} height={24} sizes="100vw" className="w-full h-auto" loading="lazy" />
      </div>

      {/* Stats */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
               style={{ backgroundImage: `url("/images/test/Frame-1000001594-3-1.jpg")`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "24px", padding: "20px" }}>
            {[
              { id: 1, value: "۱۳۹۸", suffix: "", title: "سال تاسیس", subtitle: "از سال ۱۳۹۸" },
              { id: 2, value: "500", suffix: "+", title: "محصول گیاهی", subtitle: "ذخایر شرکت" },
              { id: 3, value: "30", suffix: " هکتار", title: "زمین کشاورزی", subtitle: "زیر کشت محصولات" },
            ].map((stat) => (
              <div key={stat.id} className="flex bg-white rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex-1">
                <div className="inline-flex items-center justify-center gap-1 rounded-xl ml-3"
                     style={{ backgroundImage: `url("/images/test/Frame-1000001595-1.jpg")`, backgroundSize: "cover", backgroundPosition: "center", minWidth: "60px" }}>
                  <span className="text-lg md:text-xl lg:text-2xl font-bold text-[#64a39a]">{stat.value}</span>
                  {stat.suffix && <span className="text-sm lg:text-base font-bold text-[#64a39a]">{stat.suffix}</span>}
                </div>
                <div className="text-right">
                  <h3 className="text-base md:text-sm font-semibold text-[#54595F] mt-2">{stat.title}</h3>
                  <p className="text-xs md:text-sm text-[#64748b] mt-1">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Image src="/images/test/Group-3-min.png" alt="آیکون" width={64} height={64} sizes="64px" className="w-12 md:w-16 h-auto mx-auto mb-3" loading="lazy" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0C5505]">شرکت کشت و صنعت درخت زندگی</h2>
            <div className="w-16 h-[3px] bg-[#64a39a] mx-auto mt-4 rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-sm md:text-base text-[#334155] leading-loose text-justify mb-6">
              شرکت کشت و صنعت درخت زندگی با برند <strong className="text-[#0C5505]">آنی رز</strong>، از سال ۱۳۹۸ فعالیت خود را در حوزه تامین محصولات ارگانیک، گیاهان دارویی و ادویه جات آغاز نموده و به عنوان تامین کننده، با شرکت‌های دارویی، آرایشی و بهداشتی، شرکت‌های غذایی و عطاری‌ها، سلامتکده‌ها و هایپرهای بزرگ همکاری می‌نماید.
            </p>
          </div>

          {/* Why Aniroz */}
          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C5505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C5505]">چرا آنی رز؟</h3>
            </div>
            <p className="text-sm md:text-base text-[#334155] leading-loose text-justify">
              چشم انداز شرکت به اینگونه می‌باشد که با استفاده از امکانات موجود و تیم‌های متخصص، جوان و پر تلاش، محصولی سالم و با کیفیت در سبد خانوارهای عزیز ایرانی روانه بازار کند تا با این محصول گامی بزرگ در جهت سلامتی و تندرستی هم وطنان عزیز ایرانی بردارد.
            </p>
          </div>
        </div>
      </section>

      {/* Step 1 */}
      <section className="py-10 bg-[#f0fdf4]/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block bg-[#0C5505] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">گام نخست</span>
              <h3 className="text-xl md:text-2xl font-bold text-[#0C5505] mb-4">بانک محصولات گیاهی</h3>
              <p className="text-sm md:text-base text-[#334155] leading-loose text-justify mb-4">
                در گام نخست بر آن شدیم تا بانکی از محصولات گیاهی را در شرکت تهیه و آماده کنیم. از انواع گیاهان دارویی و ادویه جات گرفته تا گیاهان کمیاب و نادر و محصولات ارگانیک. اکنون <strong className="text-[#0C5505]">بیش از ۱۰۰۰ محصول گیاهی</strong> جزء ذخایر شرکت بوده و در حال توزیع این محصولات هستیم. این کار باعث دسترسی سریع مشتریان عزیز به انواع گیاهان دارویی شده و با کمترین زمان در دسترس قرار می‌گیرند.
              </p>
              <p className="text-sm md:text-base text-[#334155] leading-loose text-justify">
                با ایجاد زیرساخت‌های لازم، کلیه مراحل سورت، بوجاری، آسیاب و بسته‌بندی محصول با نظارت کارشناسان متخصص حوزه گیاهان دارویی انجام می‌گیرد.
              </p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#64a39a]/10 rounded-3xl rotate-6" />
                <Image src="/images/banners/about1.JPG" alt="بانک محصولات گیاهی" width={350} height={400} sizes="(max-width: 1024px) 100vw, 350px" className="w-full max-w-[350px] rounded-3xl relative z-10" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0C5505]/10 rounded-3xl -rotate-6" />
                <Image src="/images/banners/about2.JPG" alt="کشت و تولید" width={350} height={400} sizes="(max-width: 1024px) 100vw, 350px" className="w-full max-w-[350px] rounded-3xl relative z-10" loading="lazy" />
              </div>
            </div>
            <div>
              <span className="inline-block bg-[#64a39a] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">گام دوم</span>
              <h3 className="text-xl md:text-2xl font-bold text-[#0C5505] mb-4">کشت و تولید گیاهان دارویی</h3>
              <p className="text-sm md:text-base text-[#334155] leading-loose text-justify mb-4">
                در گام دوم هدف ما کشت و تولید گیاهان دارویی بوده و با ورود به تولید این گیاهان، چرخه تامین گیاهان دارویی را تکمیل کردیم. از سال ۱۳۹۸ با ایجاد مزرعه گیاهان دارویی کار را آغاز کرده و در حال حاضر <strong className="text-[#0C5505]">30 هکتار</strong> از انواع محصولات گیاهان دارویی را زیر کشت برده‌ایم.
              </p>
              <p className="text-sm md:text-base text-[#334155] leading-loose text-justify">
                بخش عمده این محصولات بصورت کشت قراردادی با مشارکت کشاورزان محترم اجرایی شده است و کارشناسان ما با حضور در این مزارع کار مشاوره و نظارت را مستقیما انجام می‌دهند.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
        <Image src="/images/test/line.png" alt="" width={1200} height={24} sizes="100vw" className="w-full h-auto" loading="lazy" />
      </div>

      {/* Product Categories */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Image src="/images/test/Group-3-min.png" alt="آیکون" width={64} height={64} sizes="64px" className="w-12 md:w-16 h-auto mx-auto mb-3" loading="lazy" />
            <h3 className="text-base md:text-sm font-normal text-gray-500">Our Products</h3>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0C5505] mt-2">دسته‌بندی محصولات</h2>
            <p className="text-sm text-[#64748b] mt-3 max-w-2xl mx-auto">
              شرکت کشت و صنعت درخت زندگی، تولید کننده و تامین کننده انواع محصولات گیاهی، در دسته‌بندی‌های زیر، با افتخار آماده همکاری با صنایع و کارخانه‌جات تبدیلی (شرکت‌ها و صنایع دارویی، غذایی، آرایشی و بهداشتی، اسانس‌ها و عصاره‌گیری‌ها و کارخانجات عرق‌گیری) می‌باشد.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productCategories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] group-hover:bg-[#0C5505] flex items-center justify-center flex-shrink-0 text-[#0C5505] group-hover:text-white transition-all duration-300">
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1e293b] mb-2">{cat.id}. {cat.title}</h4>
                    <p className="text-xs text-[#64748b] leading-relaxed">{cat.items}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden py-12 md:py-16 px-6 md:px-12 text-center"
               style={{ backgroundImage: `url("/images/test/Frame-74-2.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-[#0C5505]/85" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                تعهد ما به سلامتی شما
              </h2>
              <p className="text-gray-200 text-sm md:text-base max-w-3xl mx-auto leading-loose mb-8">
                کشت و صنعت درخت زندگی با جوانان متخصص و پرشور ضمن تبریک سال نو شمسی،
                تعهد دارد تا در جهت سلامتی جامعه ایرانی، محصولی سالم و ارگانیک را در سبد غذایی و سلامت ایرانیان قرار دهد.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop"
                  className="inline-block bg-white text-[#0C5505] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
                  مشاهده فروشگاه
                </Link>
                <Link href="/contact"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-[#0C5505] transition-all">
                  تماس با ما
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;