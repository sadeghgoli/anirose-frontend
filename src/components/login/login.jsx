'use client'
import React, { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import OtpInput from "react-otp-input";
import { sendOtp, verifyOtp } from "../../api/services/auth.js";
import useStore from "../../store/index.js";

const Login = () => {
    const router = useRouter();
    const { setState } = useStore();
    const [step, setStep] = useState("phone");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [serverError, setServerError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const startCountdown = () => {
      setCountdown(120);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const handleSendOtp = async (e) => {
      e.preventDefault();
      setServerError(null);
      setIsSubmitting(true);

      try {
        await sendOtp(mobile);
        setStep("otp");
        startCountdown();
      } catch (error) {
        if (error.response?.status === 429) {
          setServerError("تعداد درخواست‌های مجاز را رد کرده‌اید. لطفاً ۱۰ دقیقه بعد تلاش کنید.");
        } else if (error.response?.data?.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError("خطا در ارتباط با سرور. لطفاً اینترنت خود را بررسی کنید.");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleVerifyOtp = async (e) => {
      e.preventDefault();
      if (otp.length < 6) {
        setServerError("لطفاً کد تأیید را به طور کامل وارد کنید");
        return;
      }
      setServerError(null);
      setIsSubmitting(true);

      try {
        const result = await verifyOtp(mobile, otp);
        if (result?.token) {
          localStorage.setItem("authToken", result.token);
          setState({ accessToken: result.token, user: result.user });
          router.push("/", { replace: true });
        } else {
          setServerError("خطا در ورود. لطفاً دوباره تلاش کنید.");
        }
      } catch (error) {
        if (error.response?.status === 422) {
          setServerError(error.response.data?.message || "کد تأیید نامعتبر یا منقضی شده است");
        } else {
          setServerError("خطا در ارتباط با سرور. لطفاً اینترنت خود را بررسی کنید.");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleResendOtp = async () => {
      if (countdown > 0) return;
      setOtp("");
      setServerError(null);
      setIsSubmitting(true);
      try {
        await sendOtp(mobile);
        startCountdown();
      } catch {
        setServerError("خطا در ارسال مجدد کد");
      } finally {
        setIsSubmitting(false);
      }
    };

    const formatCountdown = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const inputClass = "w-full p-[12px_14px] border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#64a39a]/50 bg-gray-50 transition";

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FB]">
            {/* فرم - سمت راست */}
            <div className="w-full md:w-1/2 lg:w-[46%] flex items-center justify-center px-5 py-12 md:py-16">
                <div className="w-full max-w-md">
                    <div className="flex justify-center mb-8">
                        <Link href="/" aria-label="آنی رز">
                            <Image
                                src="/images/test/Group-43-1.png"
                                alt="آنی رز"
                                width={120}
                                height={120}
                                className="w-[90px] h-auto md:w-[110px]"
                                loading="lazy"
                            />
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-7 md:p-10">
                        <h1 className="text-[#0c5505] font-bold text-[26px] md:text-[30px] mb-2 text-center">
                            حساب کاربری
                        </h1>

                        {step === "phone" && (
                          <>
                            <h2 className="mb-6 text-[18px] font-semibold text-[#1e293b] text-center">ورود / ثبت نام</h2>
                            <p className="text-gray-500 text-sm text-center mb-7 leading-6">
                              برای ادامه، شماره موبایل خود را وارد کنید تا کد تأیید برایتان ارسال شود.
                            </p>

                            {serverError && (
                              <div className="bg-[#f8d7da] text-[#721c24] p-3 mb-6 rounded-xl text-sm">{serverError}</div>
                            )}

                            <form onSubmit={handleSendOtp} noValidate>
                              <label htmlFor="mobile" className="block mb-2 font-semibold text-gray-700 text-sm">
                                شماره موبایل <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                id="mobile"
                                className={inputClass}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                required
                              />

                              <button
                                type="submit"
                                className="w-full mt-6 bg-[#64a39a] text-white border-none py-3.5 px-6 rounded-xl text-[15px] font-medium cursor-pointer transition-all hover:bg-[#5a8f85] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={isSubmitting || mobile.length < 11}
                              >
                                {isSubmitting ? "در حال ارسال..." : "ارسال کد تأیید"}
                              </button>
                            </form>
                          </>
                        )}

                        {step === "otp" && (
                          <>
                            <h2 className="mb-3 text-[18px] font-semibold text-[#1e293b] text-center">تأیید کد</h2>
                            <p className="text-gray-500 text-sm text-center mb-6 leading-6">کد تأیید به شماره {mobile} ارسال شد</p>

                            {serverError && (
                              <div className="bg-[#f8d7da] text-[#721c24] p-3 mb-6 rounded-xl text-sm">{serverError}</div>
                            )}

                            <form onSubmit={handleVerifyOtp} noValidate>
                              <div className="flex justify-center mb-6" dir="ltr">
                                <OtpInput
                                  value={otp}
                                  onChange={setOtp}
                                  numInputs={6}
                                  containerStyle={{ gap: "8px", direction: "ltr" }}
                                  inputStyle={{
                                    width: "48px",
                                    height: "52px",
                                    fontSize: "20px",
                                    borderRadius: "10px",
                                    border: "1px solid #e2e8f0",
                                    backgroundColor: "#f8fafc",
                                    textAlign: "center",
                                    outline: "none",
                                    fontFamily: "inherit",
                                  }}
                                  renderInput={(props, index) => <input {...props} aria-label={`کد تأیید رقم ${index + 1}`} />}
                                />
                              </div>

                              <div className="text-center mb-4">
                                {countdown > 0 ? (
                                  <span className="text-gray-500 text-sm">ارسال مجدد کد تا {formatCountdown(countdown)}</span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    className="text-[#64a39a] bg-transparent border-none cursor-pointer text-sm font-medium"
                                  >
                                    ارسال مجدد کد
                                  </button>
                                )}
                              </div>

                              <button
                                type="submit"
                                className="w-full bg-[#64a39a] text-white border-none py-3.5 px-6 rounded-xl text-[15px] font-medium cursor-pointer transition-all hover:bg-[#5a8f85] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={isSubmitting || otp.length < 6}
                              >
                                {isSubmitting ? "در حال ورود..." : "ورود"}
                              </button>

                              <p className="text-center mt-5">
                                <button
                                  type="button"
                                  onClick={() => { setStep("phone"); setOtp(""); setServerError(null); }}
                                  className="text-[#767676] bg-transparent border-none cursor-pointer text-sm hover:underline"
                                >
                                  تغییر شماره موبایل
                                </button>
                              </p>
                            </form>
                          </>
                        )}
                    </div>
                </div>
            </div>

            {/* تصویر بزرگ - سمت چپ */}
            <div className="hidden md:block w-full md:w-1/2 lg:w-[54%] relative min-h-[420px]">
                <div className="absolute inset-0 bg-gradient-to-tl from-[#0C5505]/30 via-transparent to-transparent z-[2]" />
                <Image
                    src="/images/banners/about1.JPG"
                    alt="ورود به آنی رز"
                    fill
                    sizes="(max-width: 768px) 100vw, 54vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute bottom-8 right-8 z-[3] max-w-md bg-black/70 p-3 rounded-xl">
                    <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
                        سلامتی، انتخاب روزانه شما
                    </h2>
                    <p className="text-white/90 text-sm md:text-base mt-2 drop-shadow leading-7">
                        محصولات طبیعی و ارگانیک آنی رز، همراه شما در مسیر زندگی سالم‌تر.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
