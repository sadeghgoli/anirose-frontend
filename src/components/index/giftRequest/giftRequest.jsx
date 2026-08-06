'use client'
import React, { useState } from "react";
import { submitGiftRequest } from "../../../utils/api/giftService/giftService.js";

const GiftRequestComponent = () => {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // اعتبارسنجی شماره موبایل
  const validatePhone = (value) => {
    const phoneRegex = /^(09|۰۹)[0-9۰-۹]{9}$/;
    if (!value) return "شماره تماس الزامی است";
    if (!phoneRegex.test(value))
      return "شماره تماس معتبر نیست (مثال: 09123456789)";
    return "";
  };

  // تبدیل اعداد فارسی به انگلیسی
  const normalizePhone = (value) => {
    return value.replace(/[۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 1728)
    );
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const normalizedPhone = normalizePhone(phone);

    try {
      const result = await submitGiftRequest(normalizedPhone);

      if (result?.status === "ok" || result?.status === "success") {
        setTimeout(() => {
          setSuccess(
            "درخواست شما با موفقیت ثبت شد. کارشناسان ما به زودی با شما تماس می‌گیرند."
          );
          setPhone("");
        }, 2000);
      } else {
        setError("خطا در ثبت درخواست. لطفاً مجدداً تلاش کنید.");
      }
    } catch (err) {
      if (!err.response) {
        setError("خطا در ارتباط با سرور. لطفاً اینترنت خود را بررسی کنید.");
      } else if (err.response?.status === 400) {
        setError("شماره تماس نامعتبر است.");
      } else if (err.response?.status === 429) {
        setError(
          "تعداد درخواست‌های شما زیاد است. لطفاً چند دقیقه دیگر تلاش کنید."
        );
      } else {
        setError("خطای ناشناخته. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full piner py-12 bg-cover bg-center bg-no-repeat">
      <div className="w-full relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
        <div
          className="backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
          style={{ backgroundImage: "url('/images/test/Frame-74-2.jpg')" }}
        >
          <div className="flex flex-col md:flex-row">
            {/* سمت راست - متن */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-right">
                هدیه ای خاص از جنس سلامتی
              </h2>
              <p className="text-gray-300 leading-relaxed text-right text-sm md:text-base">
                اگر می خواهید هدیه ای از جنس سلامتی برای عزیزان خود تهیه کنید و
                متناسب با درخواست شما شخصی سازی شود فرم مقابل را پر کنید تا با
                شما در تماس باشیم.
              </p>
            </div>

            {/* سمت چپ - فرم */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="w-full">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-right">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm text-right">
                    {success}
                  </div>
                )}

                <div className="mb-4">
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="شماره تماس خود را وارد کنید."
                    aria-label="شماره تماس"
                    disabled={isSubmitting}
                    className={`w-full text-white px-4 py-3 rounded-xl text-right text-sm md:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#64a39a]/50 ${
                      error
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-[#64a39a]"
                    } ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                    style={{
                      backdropFilter: "blur(1px)",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                    }}
                    dir="rtl"
                  />
                </div>

                <div className="text-right md:text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#64a39a]  shadow-[0_10px_25px_-8px_rgba(0,255,219,0.38)] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-[#4a7d73] focus:outline-none focus:ring-2 focus:ring-[#64a39a]/50 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        در حال ثبت...
                      </span>
                    ) : (
                      "ثبت درخواست"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftRequestComponent;
