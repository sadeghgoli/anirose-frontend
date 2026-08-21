'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "react-feather";
import { fetchContactSettings } from "../../api/services/contact.js";

const STATIC_CONTACT = {
    title: "تماس با ما",
    subtitle_en: "Contact Us",
    subtitle_fa: "با آنی رز در ارتباط باشید",
    description: "ما آماده پاسخگویی به سوالات و نظرات شما هستیم.",
    address: "خراسان رضوی، سبزوار، شهرک صنعتی، فاز 1",
    phone: "051-44333416",
    mobile: "09040187753",
    email: "info@aniroseco.ir",
    workingHours: "شنبه تا پنجشنبه: 8 صبح تا 17 عصر",
    socialLinks: [
        { id: 1, name: "Instagram", icon: "instagram", url: "https://instagram.com/aniroz.ir" },
        { id: 2, name: "Telegram", icon: "telegram", url: "https://telegram.org/sepehr_aniroz" },
        { id: 3, name: "WhatsApp", icon: "whatsapp", url: "https://whatsapp/sepehr_aniroz" },
        { id: 4, name: "Eitaa", icon: "telegram", url: "https://web.eitaa.com/#@sepehr_aniroz" },
        { id: 5, name: "Rubika", icon: "telegram", url: "https://web.rubika.ir/#@sepehr_aniroz" },
    ]
};

const socialIcons = {
    instagram: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
    ),
    telegram: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2.5L2.5 10.5L9.5 13.5L13.5 20.5L21.5 2.5Z"/>
            <path d="M9.5 13.5L13.5 9.5"/>
        </svg>
    ),
    whatsapp: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
    ),
};

const MAP_LAT = 36.2156415;
const MAP_LNG = 57.5395388;
const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_LNG - 0.01}%2C${MAP_LAT - 0.01}%2C${MAP_LNG + 0.01}%2C${MAP_LAT + 0.01}&layer=mapnik&marker=${MAP_LAT}%2C${MAP_LNG}`;

const ContactPage = () => {
    const [data, setData] = useState(STATIC_CONTACT);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [formStatus, setFormStatus] = useState({ submitting: false, success: "", error: "" });

    useEffect(() => {
        const load = async () => {
            try {
                const contact = await fetchContactSettings();
                if (contact) {
                    setData(prev => ({
                        ...prev,
                        address: contact.addresses?.[0] || prev.address,
                        phone: contact.phones?.[0] || prev.phone,
                        mobile: contact.mobiles?.[0] || prev.mobile,
                        email: contact.emails?.[0] || prev.email,
                        workingHours: contact.working_hours || prev.workingHours,
                    }));
                }
            } catch {
                // use static fallback
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (formStatus.error) setFormStatus(prev => ({ ...prev, error: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, phone, message } = formData;

        if (!name.trim()) {
            setFormStatus(prev => ({ ...prev, error: "نام و نام خانوادگی الزامی است" }));
            return;
        }
        if (!phone.trim()) {
            setFormStatus(prev => ({ ...prev, error: "شماره تماس الزامی است" }));
            return;
        }
        if (!message.trim()) {
            setFormStatus(prev => ({ ...prev, error: "متن پیام الزامی است" }));
            return;
        }

        setFormStatus({ submitting: true, success: "", error: "" });

        setTimeout(() => {
            setFormStatus({ submitting: false, success: "پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس می‌گیرند.", error: "" });
            setFormData({ name: "", email: "", phone: "", message: "" });
        }, 1500);
    };

    if (loading) return null;

    return (
        <>
            {/* Page Header */}
            <section className="relative bg-[#0C5505] py-16 md:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                     style={{
                         backgroundImage: "url('/images/test/Frame-41-2.png')",
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                     }}
                />
                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-4">
                        <Image
                            src="/images/test/Group-3-min.png"
                            alt="آیکون"
                            width={72}
                            height={72}
                            sizes="72px"
                            className="w-[60px] md:w-[72px] h-auto mx-auto"
                            loading="lazy"
                        />
                    </div>
                    <h2 className="text-sm md:text-base text-gray-300 font-normal mb-2">
                        {data.subtitle_en}
                    </h2>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                        {data.subtitle_fa}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </section>

            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-4">
                <div className="w-full">
                    <Image src="/images/test/line.png" alt="" width={1200} height={24} sizes="100vw" className="w-full h-auto" loading="lazy" />
                </div>
            </div>

            {/* Contact Info + Form Section */}
            <section className="py-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Contact Info - Right */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <Image src="/images/test/Group-7-min.png" alt="" width={20} height={20} sizes="20px" className="w-5 h-auto" loading="lazy" />
                                    <h2 className="text-xl font-bold text-[#0C5505]">اطلاعات تماس</h2>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#0C5505] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <MapPin size={16} color="white" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#1e293b] mb-1">آدرس</h4>
                                            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">{data.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#0C5505] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Phone size={16} color="white" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#1e293b] mb-1">شماره تماس</h4>
                                            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed" dir="ltr">{data.phone}</p>
                                            {data.mobile && <p className="text-xs md:text-sm text-[#64748b] leading-relaxed" dir="ltr">{data.mobile}</p>}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#0C5505] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Mail size={16} color="white" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#1e293b] mb-1">ایمیل</h4>
                                            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed" dir="ltr">{data.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#0C5505] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Clock size={16} color="white" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#1e293b] mb-1">ساعت کاری</h4>
                                            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">{data.workingHours}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white rounded-2xl p-6 shadow-md">
                                <h3 className="text-lg font-bold text-[#0C5505] mb-4">ما را دنبال کنید</h3>
                                <div className="flex gap-3">
                                    {(data.socialLinks || []).map((social) => (
                                        <a key={social.id}
                                           href={social.url}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="w-11 h-11 bg-[#f0fdf4] hover:bg-[#0C5505] rounded-full flex items-center justify-center text-[#0C5505] hover:text-white transition-all duration-300">
                                            {socialIcons[social.icon]}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form - Left */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <Image src="/images/test/Group-7-min.png" alt="" width={20} height={20} sizes="20px" className="w-5 h-auto" loading="lazy" />
                                    <h2 className="text-xl font-bold text-[#0C5505]">ارسال پیام</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {formStatus.error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-right">
                                            {formStatus.error}
                                        </div>
                                    )}
                                    {formStatus.success && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm text-right flex items-center gap-2">
                                            <CheckCircle size={18} />
                                            {formStatus.success}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#1e293b] mb-2 text-right">نام و نام خانوادگی *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="نام خود را وارد کنید"
                                                disabled={formStatus.submitting}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5505]/30 focus:border-[#0C5505] transition-all disabled:opacity-60"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#1e293b] mb-2 text-right">شماره تماس *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="مثال: 09123456789"
                                                disabled={formStatus.submitting}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5505]/30 focus:border-[#0C5505] transition-all disabled:opacity-60"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#1e293b] mb-2 text-right">ایمیل</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="example@email.com"
                                            disabled={formStatus.submitting}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5505]/30 focus:border-[#0C5505] transition-all disabled:opacity-60"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#1e293b] mb-2 text-right">متن پیام *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            placeholder="متن پیام خود را بنویسید..."
                                            disabled={formStatus.submitting}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5505]/30 focus:border-[#0C5505] transition-all resize-none disabled:opacity-60"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formStatus.submitting}
                                        className="w-full bg-[#0C5505] text-white py-3 rounded-xl font-bold hover:bg-[#0C5505]/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                                        {formStatus.submitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                </svg>
                                                در حال ارسال...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send size={18} />
                                                ارسال پیام
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md h-[350px] md:h-[400px] relative z-10">
                        <iframe
                            title="موقعیت فروشگاه آنی رز روی نقشه"
                            src={MAP_SRC}
                            style={{ border: 0, height: "100%", width: "100%" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;