'use client'
// src/components/common/ProductDetail/ProductTabs.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "./starRating";

// تب‌ها
const TabButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium border-b-3 transition-all duration-300 cursor-pointer
            ${isActive
            ? "text-[#e0a96d] border-b-[3px] border-[#e0a96d] font-semibold"
            : "text-gray-500 border-b-3 border-transparent hover:text-[#e0a96d]"
        }`}
        style={{ fontFamily: "YekanBakhMedium, Sans-serif" }}
    >
        {label}
    </button>
);

// کامپوننت فرم خرید عمده با react-hooks-form
const BulkOrderForm = ({ productName }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fullname: "",
            phone: "",
            weight: "",
            quality: "درجه یک (پریمیوم)",
            description: "",
        },
    });

    const onSubmit = async () => {
        setIsSubmitting(true);
        setSubmitMessage({ type: "", text: "" });

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitMessage({
                type: "success",
                text: "✅ درخواست شما با موفقیت ثبت شد. کارشناسان ما با شما تماس می‌گیرند."
            });
            reset();
            setTimeout(() => setSubmitMessage({ type: "", text: "" }), 5000);
        } catch {
            setSubmitMessage({ type: "error", text: "❌ خطا در ثبت درخواست. لطفاً مجدداً تلاش کنید." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#FEF8F0] rounded-xl p-5 md:p-6 border border-[#e0a96d]">
            <h3 className="text-[#e0a96d] text-lg md:text-xl font-semibold mb-3">
                💰 خرید عمده {productName}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-5">
                برای خرید عمده و دریافت قیمت ویژه، فرم زیر را تکمیل کنید. کارشناسان فروش عمده آنی‌رز در اسرع وقت با شما
                تماس می‌گیرند.
            </p>

            {submitMessage.text && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                    submitMessage.type === "success"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-700 border border-red-300"
                }`}>
                    {submitMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="producttabs-fullname" className="block text-gray-600 text-sm font-medium mb-1">
                            نام و نام خانوادگی <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="producttabs-fullname"
                            type="text"
                            {...register("fullname", {
                                required: "نام و نام خانوادگی الزامی است",
                                minLength: { value: 3, message: "حداقل ۳ کاراکتر وارد کنید" }
                            })}
                            placeholder="نام و نام خانوادگی"
                            className={`w-full px-3 bg-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition ${
                                errors.fullname ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.fullname && (
                            <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="producttabs-phone" className="block text-gray-600 text-sm font-medium mb-1">
                            شماره تماس <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="producttabs-phone"
                            type="tel"
                            {...register("phone", {
                                required: "شماره تماس الزامی است",
                                pattern: {
                                    value: /^(09|۰۹)[0-9۰-۹]{9}$/,
                                    message: "شماره موبایل معتبر نیست"
                                }
                            })}
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                            className={`w-full px-3 bg-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition ${
                                errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="producttabs-weight" className="block text-gray-600 text-sm font-medium mb-1">
                            وزن درخواستی (کیلوگرم) <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="producttabs-weight"
                            type="number"
                            step="0.5"
                            {...register("weight", {
                                required: "وزن درخواستی الزامی است",
                                validate: (value) => {
                                    if (value && value <= 0) return "وزن باید بیشتر از ۰ باشد";
                                    if (value && value > 10000) return "وزن نمی‌تواند بیشتر از ۱۰۰۰۰ کیلوگرم باشد";
                                }
                            })}
                            placeholder="مثال: ۱۰"
                            className={`w-full px-3 bg-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition ${
                                errors.weight ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.weight && (
                            <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-600 text-sm font-medium mb-1">
                            درجه کیفیت
                        </label>
                        <select
                            {...register("quality")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition bg-white"
                        >
                            <option>درجه یک (پریمیوم)</option>
                            <option>درجه یک</option>
                            <option>درجه دو (اقتصادی)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        توضیحات
                    </label>
                    <textarea
                        rows="3"
                        {...register("description", {
                            maxLength: { value: 500, message: "حداکثر ۵۰۰ کاراکتر" },
                            validate: (value) => {
                                if (value && value.trim().length < 10) return "در صورت وارد کردن توضیحات، حداقل ۱۰ کاراکتر وارد کنید";
                                return true;
                            }
                        })}
                        placeholder="نیازها و توضیحات خود را بنویسید..."
                        className={`w-full px-3 bg-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none ${
                            errors.description ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">اختیاری - در صورت وارد کردن، حداقل ۱۰ کاراکتر</p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#E0A96D] hover:bg-[#c99555] text-white font-semibold px-5 py-2.5 rounded-lg transition-all hover:translate-y-[-2px] hover:shadow-md active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    {isSubmitting ? "در حال ثبت..." : "ثبت درخواست خرید عمده"}
                </button>
            </form>

            <div className="mt-5 pt-4 border-t border-dashed border-amber-300">
                <p className="text-gray-500 text-xs md:text-sm">
                    📞 <strong className="text-[#e0a96d]">تماس مستقیم:</strong> ۰۲۱-۱۲۳۴۵۶۷۸ | 📧 <strong
                    className="text-[#e0a96d]">ایمیل:</strong> bulk@anirose.com
                </p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">
                    🚚 ارسال به سراسر کشور برای سفارشات بالای ۵۰ کیلوگرم رایگان است.
                </p>
            </div>
        </div>
    );
};

const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState("description");
    const { specifications } = product;

    // وضعیت موجودی
    const stock = product.stock || 0;
    const isInStock = stock > 0;

    return (
        <div className="mt-8">
            <div className="flex flex-wrap border-b border-gray-200">
                <TabButton label="📝 توضیحات محصول" isActive={activeTab === "description"}
                           onClick={() => setActiveTab("description")} />
            
            </div>

            {/* ========== توضیحات ========== */}
            {activeTab === "description" && (
                <div className="py-6 w-full max-w-2xl">
                    <div className="space-y-6">
                        {product.description}
                
                    </div>
                </div>
            )}

            {/* ========== مشخصات فنی ========== */}
            {activeTab === "specs" && (
                <div className="py-6 w-full max-w-2xl">
                    <div className="rounded-lg border border-gray-300 overflow-hidden">
                        <table className="w-full border-collapse">
                            <tbody>
                            {Object.entries(specifications || {}).map(([key, value], idx) => (
                                <tr key={key} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="py-3 px-4 font-semibold text-gray-700 w-2/5 border-l border-r border-gray-300">
                                        {key}
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                                        {value}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ========== خرید عمده - فقط اگه موجود باشه ========== */}
            {isInStock && activeTab === "bulk" && (
                <div className="py-6 w-full max-w-3xl">
                    <BulkOrderForm productName={product.name} />
                </div>
            )}
        </div>
    );
};

export default ProductTabs;

