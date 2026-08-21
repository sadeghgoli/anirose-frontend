'use client'
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ConsultantResume = ({ consultant }) => {
    const { name, title, avatar, rating, reviewCount, contact, resume = {}, reviews = [] } = consultant || {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* هدر پروفایل */}
            <div className="flex items-center gap-6 px-8 mb-5 max-lg:flex-col max-lg:text-center max-lg:-mt-8 max-lg:px-0">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-[120px] h-[120px] rounded-full overflow-hidden border-[5px] border-white shadow-lg bg-gray-100 flex-shrink-0 max-sm:w-[90px] max-sm:h-[90px]"
                >
                    <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="object-cover"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = "/images/test/v.jpg";
                            e.target.onerror = null;
                        }}
                    />
                </motion.div>

                <div>
                    <h1 className="text-[1.8rem] font-bold text-[#2c2c2c] mb-1 max-sm:text-[1.4rem]">
                        {name}
                    </h1>
                    <span className="inline-block bg-[#e0a96d] text-white px-4 py-1 rounded-full text-sm font-medium">
                        {title}
                    </span>
                    <div className="mt-2">
                        <span className="text-[#f5a623] text-sm tracking-wider">
                            {"★".repeat(rating)}
                        </span>
                        <span className="text-gray-500 text-xs mr-2">({reviewCount} نظر مشتریان)</span>
                    </div>
                </div>
            </div>

            {/* اطلاعات تماس */}
            <div className="bg-gray-50 rounded-xl p-5">
                {[
                    { label: "🎓 تخصص مشاوره:", value: contact.specialty },
                    { label: "📧 ایمیل:", value: contact.email },
                    { label: "📞 تماس مستقیم:", value: contact.phone },
                    { label: "🕒 ساعات پاسخگویی:", value: contact.hours },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="flex py-2.5 border-b border-gray-200 last:border-b-0 max-lg:flex-col"
                    >
                        <span className="w-[130px] font-semibold text-gray-600 max-lg:w-auto max-lg:mb-1">
                            {item.label}
                        </span>
                        <span className="flex-1 text-gray-700">{item.value}</span>
                    </div>
                ))}
            </div>
            <h2 className="text-2xl text-[#0c5505]  ">
                رزومه و سوابق مشاوره
            </h2>
            {/* تحصیلات */}
            <div className="mb-5 mt-3">
                <h3 className="text-[#e0a96d] text-lg font-semibold mb-3">📘 تحصیلات و تخصص‌ها</h3>
                <ul className="pr-5 space-y-2">
                    {(resume.education || []).map((edu, i) => (
                        <li
                            key={i}
                            className="text-gray-600 leading-7 before:content-['•'] before:text-[#e0a96d] before:ml-2"
                        >
                            <strong>{edu.label}</strong> - {edu.institution}
                        </li>
                    ))}
                </ul>
            </div>

            {/* سوابق */}
            <div className="mb-5">
                <h3 className="text-[#e0a96d] text-lg font-semibold mb-3">🏆 سوابق حرفه‌ای</h3>
                <ul className="pr-5 space-y-2">
                    {(resume.experience || []).map((exp, i) => (
                        <li
                            key={i}
                            className="text-gray-600 leading-7 before:content-['•'] before:text-[#e0a96d] before:ml-2"
                        >
                            {exp}
                        </li>
                    ))}
                </ul>
            </div>

            {/* زمینه مشاوره */}
            <div className="mb-5">
                <h3 className="text-[#e0a96d] text-lg font-semibold mb-3">💡 زمینه‌های مشاوره</h3>
                <p className="text-gray-600 leading-7">{resume.fields}</p>
            </div>

            {/* نظرات */}
            <div className="mt-8">
                <h3 className="text-gray-800 text-lg font-bold mb-4">نظرات مشتریان آنی‌رز</h3>
                {(reviews || []).map((review, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-2 flex-wrap max-lg:flex-col max-lg:items-start max-lg:gap-1">
                            <strong className="text-gray-800 text-sm">{review.name}</strong>
                            <span className="text-[#f5a623] text-xs">
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-7 m-0">{review.text}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ConsultantResume;
