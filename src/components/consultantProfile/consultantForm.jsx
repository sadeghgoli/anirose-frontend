'use client'
import React, { useState } from "react";
import { submitConsultationForm } from "../../utils/api/consultantService/consultantService.js";
import Link from "next/link";

const initialForm = {
    fullname: "",
    mobile: "",
    phone: "",
    email: "",
    productCategory: "",
    orderType: "",
    products: "",
    budget: "",
    contactMethod: "",
    bestTime: "",
    description: "",
    newsletter: false,
    terms: false,
};

const ConsultantForm = ({ formData }) => {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!form.terms) {
            setMessage({ type: "error", text: "لطفاً با قوانین و مقررات موافقت کنید." });
            return;
        }

        setSubmitting(true);
        try {
            const res = await submitConsultationForm(form);
            if (res.status === "success") {
                setMessage({ type: "success", text: "✅ درخواست شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم." });
                setForm(initialForm);
            } else {
                throw new Error(res.message || "خطا در ثبت");
            }
        } catch (err) {
            setMessage({ type: "error", text: err.message || "❌ خطا در ثبت درخواست. لطفاً دوباره تلاش کنید." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="">
            {/* هدر فرم */}
            <div className="mb-6">
                <h2 className="text-[1.8rem] text-[#0c5505] mb-2 font-bold">{formData.title}</h2>
                <p className="text-gray-600 font-bold text-sm leading-7">{formData.subtitle}</p>
            </div>

            {/* پیام */}
            {message && (
                <div
                    className={`p-3 rounded-xl text-sm mb-4 border-r-4 ${
                        message.type === "success"
                            ? "bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]"
                            : "bg-[#ffebee] text-[#c62828] border-[#c62828]"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* نام */}
                <div>
                    <label htmlFor="consultant-fullname" className="block mb-2 font-semibold text-gray-700 text-sm">نام و نام خانوادگی *</label>
                    <input
                        id="consultant-fullname"
                        type="text"
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        placeholder="نام و نام خانوادگی خود را وارد کنید"
                        required
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition"
                    />
                </div>

                {/* موبایل و تلفن */}
                <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
                    <div>
                        <label htmlFor="consultant-mobile" className="block mb-2 font-semibold text-gray-700 text-sm">شماره موبایل *</label>
                        <input
                            id="consultant-mobile"
                            type="tel"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                            required
                            className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="consultant-phone" className="block mb-2 font-semibold text-gray-700 text-sm">تلفن ثابت</label>
                        <input
                            id="consultant-phone"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
                            className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition"
                        />
                    </div>
                </div>

                {/* ایمیل */}
                <div>
                    <label htmlFor="consultant-email" className="block mb-2 font-semibold text-gray-700 text-sm">ایمیل</label>
                    <input
                        id="consultant-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition"
                    />
                </div>

                {/* دسته‌بندی محصول */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">دسته‌بندی محصول مورد نظر *</label>
                    <select
                        name="productCategory"
                        value={form.productCategory}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition bg-white"
                    >
                        <option value="">انتخاب کنید</option>
                        {(formData?.productCategories || []).map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* نوع سفارش */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">نوع سفارش *</label>
                    <select
                        name="orderType"
                        value={form.orderType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition bg-white"
                    >
                        <option value="">انتخاب کنید</option>
                        {(formData?.orderTypes || []).map((type, i) => (
                            <option key={i} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* محصولات */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">محصول(های) مورد نظر</label>
                    <textarea
                        name="products"
                        value={form.products}
                        onChange={handleChange}
                        rows="3"
                        placeholder="نام محصولات مورد نظر خود را بنویسید..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition resize-none"
                    />
                </div>

                {/* بودجه */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">بودجه تقریبی (تومان)</label>
                    <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition bg-white"
                    >
                        <option value="">انتخاب کنید</option>
                        {(formData?.budgets || []).map((b, i) => (
                            <option key={i} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                {/* روش تماس */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">روش تماس دلخواه *</label>
                    <select
                        name="contactMethod"
                        value={form.contactMethod}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition bg-white"
                    >
                        <option value="">انتخاب کنید</option>
                        {(formData?.contactMethods || []).map((m, i) => (
                            <option key={i} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </div>

                {/* زمان تماس */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">زمان مناسب تماس</label>
                    <select
                        name="bestTime"
                        value={form.bestTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition bg-white"
                    >
                        <option value="">انتخاب کنید (اختیاری)</option>
                        {(formData?.bestTimes || []).map((t, i) => (
                            <option key={i} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </div>

                {/* توضیحات */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">توضیحات بیشتر</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="نیازها، سوالات یا توضیحات تکمیلی خود را بنویسید..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#e0a96d] focus:ring-2 focus:ring-[#e0a96d]/20 transition resize-none"
                    />
                </div>

                {/* چک‌باکس خبرنامه */}
                <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="newsletter"
                            checked={form.newsletter}
                            onChange={handleChange}
                            className="w-4 h-4 accent-[#e0a96d]"
                        />
                        <span className="text-sm text-gray-600">مایل به دریافت خبرنامه و تخفیف‌های ویژه آنی‌رز هستم</span>
                    </label>
                </div>

                <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={form.terms}
                            onChange={handleChange}
                            required
                            className="w-4 h-4 accent-[#e0a96d]"
                        />
                        <span className="text-sm text-gray-600">
            با <Link href="/terms" className="text-[#e0a96d] hover:underline">قوانین و مقررات</Link> سایت موافقم *
        </span>
                    </label>
                </div>

                {/* دکمه ثبت */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#e0a96d] text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-[#c99555] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                    {submitting && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    {submitting ? "در حال ثبت..." : "ثبت درخواست مشاوره رایگان"}
                </button>

                <p className="text-center text-xs text-[#2e7d32] bg-[#e8f5e9] p-3 rounded-lg mt-4">
                    ✅ مشاوره کاملاً رایگان است. پس از ثبت درخواست، حداکثر ظرف ۲۴ ساعت با شما تماس می‌گیریم.
                </p>
            </form>
        </div>
    );
};

export default ConsultantForm;
