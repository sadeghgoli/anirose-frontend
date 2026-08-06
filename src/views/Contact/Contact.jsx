'use client'
import React, { useEffect, useState } from "react";
import { Phone, MapPin, Mail, Clock, MessageSquare, Printer } from "react-feather";
import { fetchContactSettings } from "../../api/services/contact.js";

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

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await fetchContactSettings();
        if (mounted) setContact(data);
      } catch {
        if (mounted) setContact(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const phones = (contact?.phones && contact.phones.length ? contact.phones : ["021-12345678", "09121234567"]);
  const emails = contact?.emails && contact.emails.length ? contact.emails : ["info@aniroz.ir"];
  const addresses = contact?.addresses && contact.addresses.length ? contact.addresses : ["تهران، خیابان انقلاب، ..."];
  const workingHours = contact?.working_hours || "شنبه تا پنجشنبه ۹ تا ۱۸";
  const fax = contact?.fax || "021-12345679";
  const supportTitle = contact?.support_title || "پشتیبانی آنی رز";
  const socials = normalizeSocials(contact?.socials);

  const items = [
    {
      icon: <Phone size={22} />,
      title: "تلفن تماس",
      value: phones.map((p) => <span key={p} dir="ltr" className="block">{p}</span>),
    },
    {
      icon: <Mail size={22} />,
      title: "ایمیل",
      value: emails.map((e) => <span key={e} dir="ltr" className="block">{e}</span>),
    },
    {
      icon: <MapPin size={22} />,
      title: "آدرس",
      value: addresses.map((a) => <span key={a} className="block">{a}</span>),
    },
    {
      icon: <Clock size={22} />,
      title: "ساعت کاری",
      value: workingHours,
    },
    ...(fax ? [{ icon: <Printer size={22} />, title: "فکس", value: fax }] : []),
  ];

  const hasSocials = socials.instagram || socials.telegram;

  return (
    <div className="min-h-[60vh] bg-[#F8F9FB] py-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0c5505] mb-3">{supportTitle}</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            تیم پشتیبانی آنی روز آماده پاسخگویی به سوالات شماست
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">در حال بارگذاری...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#64a39a]/10 text-[#0c5505] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 mb-1">{item.title}</h2>
                  <div className="text-gray-500 text-sm leading-6">{item.value}</div>
                </div>
              </div>
            ))}

            {hasSocials && (
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#64a39a]/10 text-[#0c5505] flex-shrink-0">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 mb-2">شبکه‌های اجتماعی</h2>
                  <div className="flex items-center gap-3">
                    {socials.instagram && (
                      <a href={socials.instagram} target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                      </a>
                    )}
                    {socials.telegram && (
                      <a href={socials.telegram} target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 11.75a29.94 29.94 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29.94 29.94 0 0 0 .46-5.25 29.94 29.94 0 0 0-.46-5.33z"/>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
