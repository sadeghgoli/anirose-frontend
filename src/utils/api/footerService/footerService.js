import { fetchContactSettings } from "../../../api/services/contact.js";

const STATIC_FOOTER = {
  topImage: "/images/test/Asset-1-12.png",
  slogan: { text: "هنر نزد ایرانیان است و بس." },
  description: "فروشگاه آنی رز ارائه دهنده بهترین محصولات ارگانیک و طبیعی با بالاترین کیفیت",
  importantLinks: {
    title: "لینک های مهم",
    links: [
      { title: "درباره ما", url: "/about" },
      { title: "تماس با ما", url: "/contact" },
      { title: "سوالات متداول", url: "/faq" },
    ],
  },
  quickAccess: {
    title: "دسترسی سریع",
    links: [
      { title: "فروشگاه", url: "/shop" },
      { title: "سبد خرید", url: "/cart" },
      { title: "حساب کاربری", url: "/profile" },
    ],
  },
  contact: {
    title: "مسیر های ارتباطی",
    items: [
      { text: "آدرس: تهران، میدان انقلاب،‌ کوچه سوم" },
      { text: "شماره تماس: ۰۹۱۲۳۴۵۶۷۸۹" },
      { text: "ساعت کاری : روز های کاری ساعت ۱۰ تا ۲۰" },
    ],
  },
  trustBadges: { title: "نماد های اعتماد", images: ["/images/test/enamad.png", "/images/test/samandehi.png"] },
  bottomLogo: "/images/test/Asset-1-3-1.png",
  copyright: "تمام حقوق وبسایت آنی رز محفوظ است.",
};

export const fetchFooterData = async () => {
  try {
    const contact = await fetchContactSettings();
    if (contact) {
      return {
        ...STATIC_FOOTER,
        contact: {
          ...STATIC_FOOTER.contact,
          items: [
            { text: contact.addresses?.[0] || STATIC_FOOTER.contact.items[0].text },
            { text: contact.phones?.[0] || STATIC_FOOTER.contact.items[1].text },
            { text: contact.working_hours || STATIC_FOOTER.contact.items[2].text },
          ],
        },
        copyright: contact.footer_note || STATIC_FOOTER.copyright,
      };
    }
  } catch {
    void 0;
  }
  return STATIC_FOOTER;
};
