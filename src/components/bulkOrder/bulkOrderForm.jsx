'use client'
import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { useForm } from "react-hook-form";
import { submitBulkOrder } from "../../utils/api/bulkOrderService/bulkOrderService.js";
import { usePersianDateValidator } from "../../hooks/usePersianDateValidator.js";
import FormField from "./formField";
import Toast from "./toast";

const BulkOrderForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [contactMethodsError, setContactMethodsError] = useState("");
    const { isValidPersianDate } = usePersianDateValidator();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            fullname: "",
            company: "",
            mobile: "",
            phone: "",
            email: "",
            province: "",
            product_name: "",
            quality_grade: "",
            weight: "",
            package_count: "",
            packaging_type: "",
            delivery_date: "",
            shipping_method: "",
            description: "",
            representative_phone: "",
            contact_time: "",
            contact_method_call: false,
            contact_method_whatsapp: false,
            contact_method_sms: false,
            contact_method_email: false,
            terms: false,
        },
    });

    // روش‌های ارتباط
    // eslint-disable-next-line react-hooks/incompatible-library
    const contactMethodCall = watch("contact_method_call");
    const contactMethodWhatsapp = watch("contact_method_whatsapp");
    const contactMethodSms = watch("contact_method_sms");
    const contactMethodEmail = watch("contact_method_email");

    const isAnyContactMethodSelected = contactMethodCall || contactMethodWhatsapp || contactMethodSms || contactMethodEmail;

    // در صورت تغییر هر چک‌باکس، خطا را پاک کن
    const handleContactMethodChange = () => {
        if (contactMethodsError) setContactMethodsError("");
    };

    const onSubmit = async (data) => {
        // بررسی روش‌های ارتباط
        if (!isAnyContactMethodSelected) {
            setContactMethodsError("لطفاً حداقل یک روش ارتباط را انتخاب کنید");
            return;
        }

        const selectedContactMethods = [];
        if (contactMethodCall) selectedContactMethods.push("تماس تلفنی");
        if (contactMethodWhatsapp) selectedContactMethods.push("واتساپ / ایتا");
        if (contactMethodSms) selectedContactMethods.push("پیامک");
        if (contactMethodEmail) selectedContactMethods.push("ایمیل");

        setIsSubmitting(true);

        const payload = {
            ...data,
            contact_methods: selectedContactMethods,
        };

        try {
            const result = await submitBulkOrder(payload);
            if (result?.status === "success" || result?.status === "ok") {
                setToast({ message: "✅ درخواست شما با موفقیت ثبت شد. در حال انتقال به صفحه اصلی...", type: "success" });
                reset();
                setContactMethodsError("");
                setTimeout(() => router.push("/"), 2500);
            } else {
                setToast({ message: result?.message || "❌ خطا در ثبت درخواست", type: "error" });
                setTimeout(() => setToast(null), 3000);
            }
        } catch {
            setToast({ message: "❌ خطا در ارتباط با سرور", type: "error" });
            setTimeout(() => setToast(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ========== گزینه‌های سلیکت ==========
    const provinces = [
        "تهران", "اصفهان", "خراسان رضوی", "فارس", "خوزستان",
        "مازندران", "گیلان", "آذربایجان شرقی", "آذربایجان غربی", "سایر استان‌ها"
    ];
    const products = [
        "دمنوش بابونه", "دمنوش گل گاوزبان", "دمنوش نعنا فلفلی", "دمنوش چای سبز و زنجبیل",
        "آویشن کوهی", "مرزه", "پونه کوهی", "زعفران", "تخم شربتی",
        "عسل طبیعی آویشن", "عسل گون", "عسل کنار", "بره موم", "ژل رویال",
        "پسته", "بادام", "گردو", "کشمش", "خرما",
        "زردچوبه", "دارچین", "فلفل سیاه", "زنجبیل پودری", "هل سبز", "سایر محصولات"
    ];
    const qualityGrades = [
        "درجه یک (پریمیوم) - بهترین کیفیت",
        "درجه یک - کیفیت عالی",
        "درجه دو - کیفیت خوب (مناسب صنعتی)",
        "درجه اقتصادی - مناسب کسب و کارها"
    ];
    const packagingTypes = [
        "بسته‌بندی فله (بدون بسته)",
        "بسته‌بندی کیسه‌ای ۱ کیلویی",
        "بسته‌بندی کیسه‌ای ۵۰۰ گرمی",
        "بسته‌بندی کیسه‌ای ۲۵۰ گرمی",
        "بسته‌بندی صادراتی",
        "بسته‌بندی اختصاصی با برند مشتری",
        "سایر"
    ];
    const shippingMethods = [
        "ارسال با تیپ‌سان",
        "ارسال با باربری",
        "تحویل حضوری از انبار تهران",
        "ارسال سریع (هوایی)"
    ];
    const contactTimes = [
        "صبح (۹ تا ۱۲)",
        "بعد از ظهر (۱۲ تا ۱۷)",
        "عصر (۱۷ تا ۲۰)"
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* ========== اطلاعات درخواست‌کننده ========== */}
            <div>
                <h4 className="text-lg font-bold text-gray-800 border-r-4 border-[#e0a96d] pr-3 mb-4">اطلاعات درخواست‌کننده</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="نام و نام خانوادگی"
                        name="fullname"
                        register={register}
                        error={errors.fullname?.message}
                        required
                        placeholder="نام و نام خانوادگی"
                    />
                    <FormField
                        label="نام شرکت / سازمان"
                        name="company"
                        register={register}
                        error={errors.company?.message}
                        placeholder="نام شرکت (اختیاری)"
                    />
                    <FormField
                        label="شماره موبایل"
                        name="mobile"
                        type="tel"
                        register={register}
                        error={errors.mobile?.message}
                        required
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        validate={{
                            pattern: {
                                value: /^(09|۰۹)[0-9۰-۹]{9}$/,
                                message: "شماره موبایل معتبر نیست"
                            }
                        }}
                    />
                    <FormField
                        label="تلفن ثابت"
                        name="phone"
                        type="tel"
                        register={register}
                        error={errors.phone?.message}
                        required
                        placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
                        validate={{
                            pattern: {
                                value: /^(0[0-9]{2,3})-?[0-9]{5,8}$/,
                                message: "تلفن ثابت معتبر نیست (مثال: ۰۲۱-۱۲۳۴۵۶۷۸)"
                            }
                        }}
                    />
                    <FormField
                        label="ایمیل"
                        name="email"
                        type="email"
                        register={register}
                        error={errors.email?.message}
                        required
                        placeholder="example@gmail.com"
                        validate={{
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "ایمیل معتبر نیست"
                            }
                        }}
                    />
                    <FormField
                        label="استان"
                        name="province"
                        isSelect
                        options={provinces.map(p => ({ value: p, label: p }))}
                        register={register}
                        error={errors.province?.message}
                        required
                        placeholder="انتخاب استان"
                    />
                </div>
            </div>

            {/* ========== مشخصات محصول ========== */}
            <div>
                <h4 className="text-lg font-bold text-gray-800 border-r-4 border-[#e0a96d] pr-3 mb-4">مشخصات محصول مورد نظر</h4>
                <div className="space-y-4">
                    <FormField
                        label="نام محصول"
                        name="product_name"
                        isSelect
                        options={products.map(p => ({ value: p, label: p }))}
                        register={register}
                        error={errors.product_name?.message}
                        required
                        placeholder="انتخاب محصول"
                    />
                    <FormField
                        label="درجه کیفیت محصول"
                        name="quality_grade"
                        isSelect
                        options={qualityGrades.map(q => ({ value: q, label: q }))}
                        register={register}
                        error={errors.quality_grade?.message}
                        required
                        placeholder="انتخاب درجه کیفیت"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="وزن درخواستی (کیلوگرم)"
                            name="weight"
                            type="number"
                            step="0.5"
                            register={register}
                            error={errors.weight?.message}
                            required
                            placeholder="مثال: ۵۰"
                            validate={{
                                min: { value: 0.1, message: "وزن باید بیشتر از ۰ باشد" }
                            }}
                        />
                        <FormField
                            label="تعداد بسته‌بندی"
                            name="package_count"
                            register={register}
                            error={errors.package_count?.message}
                            required
                            placeholder="مثال: ۱۰۰ بسته ۵۰۰ گرمی"
                        />
                    </div>
                    <FormField
                        label="نوع بسته‌بندی مورد نظر"
                        name="packaging_type"
                        isSelect
                        options={packagingTypes.map(p => ({ value: p, label: p }))}
                        register={register}
                        error={errors.packaging_type?.message}
                        required
                        placeholder="انتخاب نوع بسته‌بندی"
                    />
                </div>
            </div>

            {/* ========== زمان تحویل و نحوه ارسال ========== */}
            <div>
                <h4 className="text-lg font-bold text-gray-800 border-r-4 border-[#e0a96d] pr-3 mb-4">زمان تحویل و نحوه ارسال</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="تاریخ مورد نیاز تحویل"
                        name="delivery_date"
                        register={register}
                        error={errors.delivery_date?.message}
                        required
                        placeholder="۱۴۰۴/۰۱/۱۵"
                        validate={{
                            validate: (value) => {
                                if (!value) return "تاریخ تحویل الزامی است";
                                if (!isValidPersianDate(value)) return "تاریخ معتبر نیست (فرمت: YYYY/MM/DD و نباید از امروز کمتر باشد)";
                                return true;
                            }
                        }}
                    />
                    <FormField
                        label="نحوه ارسال دلخواه"
                        name="shipping_method"
                        isSelect
                        options={shippingMethods.map(s => ({ value: s, label: s }))}
                        register={register}
                        error={errors.shipping_method?.message}
                        required
                        placeholder="انتخاب کنید"
                    />
                </div>
            </div>

            {/* ========== توضیحات تکمیلی ========== */}
            <div>
                <h4 className="text-lg font-bold text-gray-800 border-r-4 border-[#e0a96d] pr-3 mb-4">توضیحات تکمیلی</h4>
                <FormField
                    label="توضیحات"
                    name="description"
                    isTextarea
                    register={register}
                    error={errors.description?.message}
                    placeholder="نیازها، شرایط خاص، نوع مصرف محصول، سوالات خود را بنویسید..."
                    validate={{
                        minLength: { value: 10, message: "توضیحات باید حداقل ۱۰ کاراکتر باشد" }
                    }}
                />
            </div>

            {/* ========== مشاوره فروش عمده ========== */}
            <div>
                <h4 className="text-lg font-bold text-gray-800 border-r-4 border-[#e0a96d] pr-3 mb-4">مشاوره فروش عمده</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="شماره تماس نماینده شرکت"
                        name="representative_phone"
                        type="tel"
                        register={register}
                        error={errors.representative_phone?.message}
                        required
                        placeholder="شماره نماینده"
                        validate={{
                            pattern: {
                                value: /^(09|۰۹)[0-9۰-۹]{9}$/,
                                message: "شماره تماس معتبر نیست"
                            }
                        }}
                    />
                    <FormField
                        label="زمان مناسب تماس نماینده"
                        name="contact_time"
                        isSelect
                        options={contactTimes.map(c => ({ value: c, label: c }))}
                        register={register}
                        error={errors.contact_time?.message}
                        required
                        placeholder="انتخاب کنید"
                    />
                </div>

                {/* روش ارتباط دلخواه (چند انتخابی) */}
                <div className="mt-4">
                    <label className="block font-semibold text-gray-700 mb-2">روش ارتباط دلخواه شما <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("contact_method_call")}
                                className="w-4 h-4"
                                onChange={handleContactMethodChange}
                            />
                            <span>تماس تلفنی</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("contact_method_whatsapp")}
                                className="w-4 h-4"
                                onChange={handleContactMethodChange}
                            />
                            <span>واتساپ / ایتا</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("contact_method_sms")}
                                className="w-4 h-4"
                                onChange={handleContactMethodChange}
                            />
                            <span>پیامک</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("contact_method_email")}
                                className="w-4 h-4"
                                onChange={handleContactMethodChange}
                            />
                            <span>ایمیل</span>
                        </label>
                    </div>
                    {contactMethodsError && (
                        <p className="text-red-500 text-xs mt-1">{contactMethodsError}</p>
                    )}
                </div>
            </div>

            {/* ========== قوانین ========== */}
            <div className="flex items-center gap-2">
                <input
                    id="bulk-terms"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("terms", { required: "باید با قوانین و مقررات موافقت کنید" })}
                />
                <label htmlFor="bulk-terms">
                    با <Link href="#" className="text-[#e0a96d] hover:underline">قوانین و مقررات فروش عمده</Link> آنی‌رز موافقم *
                </label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

            {/* ========== دکمه ثبت ========== */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e0a96d] text-white font-bold py-3 rounded-lg hover:bg-[#c99555] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "در حال ارسال..." : "ثبت درخواست سفارش عمده"}
            </button>

            {/* اطلاعات تماس */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center text-gray-700 text-sm">
                <p>📞 <strong>تماس مستقیم با واحد فروش عمده:</strong> ۰۲۱-۱۲۳۴۵۶۷۸ (داخلی ۲۰۲)</p>
                <p>📧 <strong>ایمیل فروش عمده:</strong> bulk@anirose.com</p>
            </div>

            {/* توست */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </form>
    );
};

export default BulkOrderForm;

