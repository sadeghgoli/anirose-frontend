'use client'
import React, { useState } from "react";
import Link from 'next/link'
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

    return (
        <div className="ast-container container py-[60px] mx-auto px-[250px]">
            <div id="primary" className="content-area primary w-full">
                <main
                    id="main"
                    className="site-main border border-1 border-gray-300 rounded-lg bg-white relative flex flex-col"
                    style={{ padding: "1.75rem", minHeight: "550px" }}
                >
                    <div
                        className="absolute top-0 right-0 w-[150px] h-[150px] z-0 pointer-events-none"
                        style={{
                            backgroundImage: `url("/images/test/562633767640.png")`,
                            backgroundPosition: "top right",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            transform: "scaleX(-1)",
                        }}
                    />
                    <div
                        className="absolute top-0 left-0 w-[150px] h-[150px] z-0 pointer-events-none"
                        style={{
                            backgroundImage: `url("/images/test/562633767640.png")`,
                            backgroundPosition: "top left",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                        }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-[150px] h-[150px] z-0 pointer-events-none"
                        style={{
                            backgroundImage: `url("/images/test/562633767640.png")`,
                            backgroundPosition: "bottom right",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            transform: "rotate(180deg)",
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-[150px] h-[150px] z-0 pointer-events-none"
                        style={{
                            backgroundImage: `url("/images/test/562633767640.png")`,
                            backgroundPosition: "bottom left",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            transform: "scaleY(-1)",
                        }}
                    />

                    <article className="post-11 page p-10 type-page status-publish ast-article-single relative z-10 flex-1" id="post-11">
                        <header className="entry-header ast-no-thumbnail">
                            <h1 className="entry-title text-[#1e293b] font-semibold text-[32px] mb-5">
                                حساب کاربری
                            </h1>
                        </header>

                        <div className="entry-content clear">
                            <div className="woocommerce">
                                {step === "phone" && (
                                  <>
                                    <h2 className="mb-5 text-[24px] font-semibold text-[#1e293b]">ورود / ثبت نام</h2>

                                    {serverError && (
                                      <div className="bg-[#f8d7da] text-[#721c24] p-3 mb-8 rounded-[4px]">{serverError}</div>
                                    )}

                                    <form className="woocommerce-form woocommerce-form-login login" onSubmit={handleSendOtp} noValidate>
                                      <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-5">
                                        <label htmlFor="mobile" className="text-right block mb-2 font-semibold">
                                          شماره موبایل &nbsp;<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          id="mobile"
                                          className="woocommerce-Input woocommerce-Input--text input-text w-full p-[10px_12px] border text-[16px] focus:outline-none focus:ring-2 focus:ring-[#64a39a]/50"
                                          value={mobile}
                                          onChange={(e) => setMobile(e.target.value)}
                                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                          style={{ borderColor: "#e2e8f0" }}
                                          required
                                        />
                                      </p>

                                      <div className="form-row mb-5">
                                        <div className="mt-4">
                                          <button
                                            type="submit"
                                            className="woocommerce-button button woocommerce-form-login__submit bg-[#64a39a] text-white border-none py-3 px-6 rounded-[3px] text-[16px] font-medium cursor-pointer transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                                            disabled={isSubmitting || mobile.length < 11}
                                          >
                                            {isSubmitting ? "در حال ارسال..." : "ارسال کد تأیید"}
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </>
                                )}

                                {step === "otp" && (
                                  <>
                                    <h2 className="mb-5 text-[24px] font-semibold text-[#1e293b]">تأیید کد</h2>
                                    <p className="text-gray-600 mb-4">کد تأیید به شماره {mobile} ارسال شد</p>

                                    {serverError && (
                                      <div className="bg-[#f8d7da] text-[#721c24] p-3 mb-8 rounded-[4px]">{serverError}</div>
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
                                            height: "48px",
                                            fontSize: "20px",
                                            borderRadius: "8px",
                                            border: "1px solid #e2e8f0",
                                            textAlign: "center",
                                            outline: "none",
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

                                      <div className="form-row mb-5">
                                        <div className="mt-4">
                                          <button
                                            type="submit"
                                            className="woocommerce-button button woocommerce-form-login__submit bg-[#64a39a] text-white border-none py-3 px-6 rounded-[3px] text-[16px] font-medium cursor-pointer transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                                            disabled={isSubmitting || otp.length < 6}
                                          >
                                            {isSubmitting ? "در حال ورود..." : "ورود"}
                                          </button>
                                        </div>
                                      </div>

                                      <p className="text-center mt-4">
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
                    </article>
                </main>
            </div>
        </div>
    );
};

export default Login;
