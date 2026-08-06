'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock } from "react-feather";
import { fetchContactSettings } from "../../../api/services/contact.js";

const STATIC_FOOTER_DATA = {
  topImage: "/images/test/Asset-1-12.png",
  slogan: { text: "هنر نزد ایرانیان است و بس." },
  description: "فروشگاه آنی رز ارائه دهنده بهترین محصولات ارگانیک و طبیعی با بالاترین کیفیت",
  importantLinks: {
    title: "لینک های مهم",
    links: [
      { title: "درباره ما", url: "/about" },
      { title: "تماس با ما", url: "/contact" },
      { title: "سوالات متداول", url: "/faq" },
      { title: "قوانین و مقررات", url: "/rules" },
    ],
  },
  quickAccess: {
    title: "دسترسی سریع",
    links: [
      { title: "فروشگاه", url: "/shop" },
      { title: "سبد خرید", url: "/cart" },
      { title: "حساب کاربری", url: "/profile" },
      { title: "سفارشات", url: "/orders" },
    ],
  },
  contact: {
    title: "مسیر های ارتباطی",
    items: [
      { text: "آدرس: تهران، خیابان انقلاب، ..." },
      { text: "شماره تماس: ۰۹۱۲۱۲۳۴۵۶۷" },
      { text: "ساعت کاری: شنبه تا پنجشنبه ۹ تا ۱۸" },
    ],
  },
  socials: {
    instagram: "#",
    telegram: "#",
  },
  trustBadges: {
    title: "نماد های اعتماد",
    images: ["/images/test/enamad-1-5.png", "/images/test/samandehipng.parspng-3.png"],
  },
  bottomLogo: "/images/test/Asset-1-3-1.png",
  copyright: "تمام حقوق وبسایت آنی رز محفوظ است.",
};

const normalizeSocials = (socials) => {
  if (!socials) return { instagram: null, telegram: null };
  if (Array.isArray(socials)) {
    const obj = {};
    socials.forEach((item) => {
      if (!item) return;
      if (typeof item === 'string') {
        if (item.includes('instagram')) obj.instagram = item;
        else if (item.includes('t.me') || item.includes('telegram')) obj.telegram = item;
      } else if (typeof item === 'object') {
        if (item.instagram) obj.instagram = item.instagram;
        if (item.telegram) obj.telegram = item.telegram;
      }
    });
    return obj;
  }
  return socials;
};

const Footer = () => {
    const [data, setData] = useState(STATIC_FOOTER_DATA);
    useEffect(() => {
        const load = async () => {
            try {
                const contact = await fetchContactSettings();
                if (contact) {
                  const socials = normalizeSocials(contact.socials);
                  setData((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      items: [
                        { text: contact.addresses?.length ? `آدرس: ${contact.addresses[0]}` : prev.contact.items[0].text },
                        { text: contact.phones?.length ? `شماره تماس: ${contact.phones[0]}` : prev.contact.items[1].text },
                        { text: contact.working_hours ? `ساعت کاری: ${contact.working_hours}` : prev.contact.items[2].text },
                      ],
                    },
                    socials: {
                      instagram: socials.instagram || prev.socials.instagram,
                      telegram: socials.telegram || prev.socials.telegram,
                    },
                    support_title: contact.support_title,
                    copyright: contact.footer_note || prev.copyright,
                  }));
                }
            } catch {
                void 0;
            }
        };
        load();
    }, []);
    // هنگام در دسترس نبودن API، داده‌های پیش‌فرض نمایش داده می‌شود
    return (
        <footer className="w-full  max-w-14xl mx-auto px-14 lg:px-18">
            <section>
                <div className="max-w-[1250px] mx-auto flex justify-center p-0">
                    <Image src={data?.topImage || "/images/test/Asset-1-12.png"} alt="آنی رز"
                         width={240} height={0} sizes="100vw" className="max-sm:w-[160px] w-[240px] h-auto"  loading="lazy" />
                </div>
            </section>

            <section className="px-4 max-sm:px-2">
                <div className="max-w-[1200px] mx-auto">
                    <div
                        className="w-full rounded-t-[80px] rounded-b-[20px] flex flex-col items-center justify-center
                       px-[70px] pt-[28px] pb-0
                       max-lg:px-[40px] max-lg:pt-[20px]
                       max-md:px-[24px] max-md:pt-[20px] max-md:rounded-t-[60px] max-md:rounded-b-[15px]
                       max-sm:px-[16px] max-sm:pt-[24px] max-sm:rounded-t-[40px] max-sm:rounded-b-[10px]"
                        style={{
                            backgroundImage: `url("/images/test/Frame-69.jpg")`,
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}
                    >
                        <div className="flex items-center justify-center py-0 gap-1">
                            <Image src="/images/test/Group-7-min.png" alt="نقش تزئینی" width={16} height={16} className="scale-x-[-1] max-sm:w-[12px]"  loading="lazy" />
                            <h2 className="text-[#DDDDDD] text-base font-normal m-0 max-sm:text-sm">
                                {data?.slogan?.text || "هنر نزد ایرانیان است و بس."}
                            </h2>
                            <Image src="/images/test/Group-7-min.png" alt="نقش تزئینی" width={16} height={16} className="max-sm:w-[12px]"  loading="lazy" />
                        </div>

                        <p className="text-[#A8A8A8] text-base font-normal text-center mt-3 max-w-full max-sm:text-sm max-sm:mt-2">
                            {data?.description}
                        </p>

                        <div className="flex items-center justify-center w-full gap-0 py-[15px] max-sm:py-[10px]">
                            <div className="flex-1 border-t border-[#818181]" />
                            <div className="flex items-center gap-x-4 px-6 flex-shrink-0 max-sm:gap-x-3 max-sm:px-3">
                                {data?.socials?.instagram && data.socials.instagram !== '#' && (
                                    <Link href={data.socials.instagram} target="_blank" rel="noopener"
                                       className="w-[35px] h-[35px] bg-[#0c5505] rounded-full flex items-center justify-center hover:scale-110 transition-transform max-sm:w-[30px] max-sm:h-[30px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                        </svg>
                                    </Link>
                                )}
                                {data?.socials?.telegram && data.socials.telegram !== '#' && (
                                    <Link href={data.socials.telegram} target="_blank" rel="noopener"
                                       className="w-[35px] h-[35px] bg-[#0c5505] rounded-full flex items-center justify-center hover:scale-110 transition-transform max-sm:w-[30px] max-sm:h-[30px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 11.75a29.94 29.94 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29.94 29.94 0 0 0 .46-5.25 29.94 29.94 0 0 0-.46-5.33z"/>
                                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                                        </svg>
                                    </Link>
                                )}
                            </div>
                            <div className="flex-1 border-t border-[#818181]" />
                        </div>

                        <div className="w-full">
                            <div className="flex flex-wrap -mx-5 max-sm:mt-[14px] max-sm:-mx-2">
                                <div className="w-[20%] max-lg:w-[50%] max-sm:w-1/2 max-sm:px-0 px-5 max-sm:px-2">
                                    <div className="flex items-center">
                                        <h2 className="text-[#0c5505] text-[18px] font-bold m-0 max-sm:text-[15px]">
                                            {data?.importantLinks?.title || "لینک های مهم"}
                                        </h2>
                                        <Image src="/images/test/Group-7-min.png" alt="نقش تزئینی" width={20} height={20} className="mr-2 max-sm:w-[16px]"  loading="lazy" />
                                    </div>
                                    <ul className="list-none mt-[10px] p-0 space-y-[7px] max-sm:mt-[8px] max-sm:space-y-[5px]">
                                        {data?.importantLinks?.links?.map((link, i) => (
                                            <li key={i}>
                                                <Link href={link.url} className="text-[#A8A8A8] text-base font-normal no-underline hover:text-white transition-colors max-sm:text-sm">
                                                    {link.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="w-[20%] max-lg:w-[50%] max-sm:w-1/2 max-sm:px-0 px-5 max-sm:px-2">
                                    <div className="flex items-center">
                                        <h2 className="text-[#0c5505] text-[18px] font-bold m-0 max-sm:text-[15px]">
                                            {data?.quickAccess?.title || "دسترسی سریع"}
                                        </h2>
                                        <Image src="/images/test/Group-7-min.png" alt="نقش تزئینی" width={20} height={20} className="mr-2 max-sm:w-[16px]"  loading="lazy" />
                                    </div>
                                    <ul className="list-none mt-[10px] p-0 space-y-[7px] max-sm:mt-[8px] max-sm:space-y-[5px]">
                                        {data?.quickAccess?.links?.map((link, i) => (
                                            <li key={i}>
                                                <Link href={link.url} className="text-[#A8A8A8] text-base font-normal no-underline hover:text-white transition-colors max-sm:text-sm">
                                                    {link.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="w-[37.753%] max-lg:w-[50%] max-sm:w-full max-sm:mt-[15px] max-sm:px-0 px-5 max-sm:px-2">
                                    <div className="flex items-center">
                                        <h2 className="text-[#0c5505] text-[18px] font-bold m-0 max-sm:text-[15px]">
                                            {data?.contact?.title || "مسیر های ارتباطی"}
                                        </h2>
<Image src="/images/test/Group-7-min.png" alt="نقش تزئینی" width={20} height={20} className="mr-2 max-sm:w-[16px]"  loading="lazy" />
                                    </div>
                                    <div className="flex flex-col gap-[15px] mt-[6px] max-sm:gap-[10px] max-sm:mt-[4px]">
                                        <div className="flex items-center gap-3 text-right max-sm:gap-2">
                                            <span className="bg-[#0c5505] rounded-full p-[0.4em] flex-shrink-0 flex items-center justify-center max-sm:p-[0.3em]">
                                                <MapPin size={15} color="white" className="max-sm:w-3 max-sm:h-3" />
                                            </span>
                                            <h3 className="text-white text-base font-medium m-0 max-sm:text-sm">
                                                {data?.contact?.items?.[0]?.text || "آدرس: تهران، خیابان انقلاب، ..."}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3 text-right max-sm:gap-2">
                                            <span className="bg-[#0c5505] rounded-full p-[0.4em] flex-shrink-0 flex items-center justify-center max-sm:p-[0.3em]">
                                                <Phone size={15} color="white" className="max-sm:w-3 max-sm:h-3" />
                                            </span>
                                            <h3 className="text-white text-base font-medium m-0 max-sm:text-sm">
                                                {data?.contact?.items?.[1]?.text || "شماره تماس: ۰۹۱۲۱۲۳۴۵۶۷"}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3 text-right max-sm:gap-2">
                                            <span className="bg-[#0c5505] rounded-full p-[0.4em] flex-shrink-0 flex items-center justify-center max-sm:p-[0.3em]">
                                                <Clock size={15} color="white" className="max-sm:w-3 max-sm:h-3" />
                                            </span>
                                            <h3 className="text-white text-base font-medium m-0 max-sm:text-sm">
                                                {data?.contact?.items?.[2]?.text || "ساعت کاری: شنبه تا پنجشنبه ۹ تا ۱۸"}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[22%] max-lg:w-[50%] max-sm:w-full max-sm:mt-[15px] max-sm:px-0 px-5 max-sm:px-2">
                                    <div className="flex items-center">
                                        <h2 className="text-[#0c5505] text-[18px] font-bold m-0 max-sm:text-[15px]">
                                            {data?.trustBadges?.title || "نماد های اعتماد"}
                                        </h2>
                                        <Image src="/images/test/Group-7-min.png" alt="نقش تزئینی" width={20} height={20} className="mr-2 max-sm:w-[16px]"  loading="lazy" />
                                    </div>
                                    <div className="flex items-center justify-start gap-[7px] mt-3 max-sm:mt-2 max-sm:gap-[5px]">
                                        {data?.trustBadges?.images?.map((img, i) => (
                                            <Link key={i} href={img} target="_blank" rel="nofollow"
                                               className="flex-shrink min-w-0">
                                                <Image src={img} alt="نماد اعتماد" width={0} height={0} sizes="100vw" className="w-full h-auto max-h-[200px] object-contain max-sm:max-h-[120px]"  loading="lazy" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center max-sm:py-2">
                            <Image src={data?.bottomLogo || "/images/test/Asset-1-3-1.png"} alt="آنی رز"
                                 width={80} height={0} sizes="100vw" className="h-auto scale-y-[-1] max-sm:w-[60px] w-[80px]"  loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-[14px] max-sm:px-2">
                <div className="max-w-[1200px] mx-auto text-center pt-[10px] max-sm:pt-[6px]">
                    <h2 className="text-[#4F4F4F] text-base font-normal m-0 max-sm:text-xs">
                        {data?.copyright || "تمام حقوق وبسایت آنی رز محفوظ است."}
                        طراحی و توسعه شرکت <Link className="text-blue-500" href="https://electera.top/">الکترا</Link>
                    </h2>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
