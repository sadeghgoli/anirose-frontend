'use client'
// src/pages/NotFound/NotFound.jsx
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Home, Search, ArrowLeft, AlertCircle } from "react-feather";

const NotFoundPage = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(20);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-white to-[#F8F9FB] flex items-center justify-center px-4 py-20">
            <div className="relative max-w-2xl w-full">
                {/* محتوای اصلی */}
                <div className="text-center">
                    {/* عدد 404 با افکت */}
                    <div className="relative mb-8">
                        <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-black leading-none select-none">
                            <span className="bg-gradient-to-r from-[#64a39a] to-[#0C5505] bg-clip-text text-transparent animate-pulse">
                                4
                            </span>
                            <span className="bg-gradient-to-r from-[#0C5505] to-[#64a39a] bg-clip-text text-transparent animate-bounce inline-block">
                                0
                            </span>
                            <span className="bg-gradient-to-r from-[#64a39a] to-[#0C5505] bg-clip-text text-transparent animate-pulse">
                                4
                            </span>
                        </h1>

                        {/* دایره‌های تزئینی */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-r from-[#64a39a]/5 to-[#0C5505]/5 -z-10 animate-ping" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full bg-gradient-to-r from-[#64a39a]/10 to-[#0C5505]/10 -z-10" />
                    </div>

                    {/* آیکون خطا */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertCircle size={40} className="text-amber-500" />
                        </div>
                    </div>

                    {/* عنوان */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        صفحه مورد نظر یافت نشد!
                    </h2>

                    {/* توضیحات */}
                    <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                        متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
                        ممکن است آدرس را اشتباه وارد کرده باشید.
                    </p>

                    {/* دکمه‌های اقدام */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#64a39a] to-[#0C5505] text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <Home size={18} />
                            <span>صفحه اصلی</span>
                        </Link>

                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#64a39a] text-[#64a39a] rounded-xl font-medium transition-all duration-300 hover:bg-[#64a39a] hover:text-white hover:border-transparent"
                        >
                            <Search size={18} />
                            <span>مشاهده محصولات</span>
                        </Link>
                    </div>

                    {/* تایمر شمارش معکوس */}
                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            در <span className="text-[#64a39a] font-bold text-lg">{countdown}</span> ثانیه دیگر به صفحه اصلی هدایت می‌شوید
                        </p>

                        {/* نوار پیشرفت */}
                        <div className="w-full max-w-xs mx-auto mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#64a39a] to-[#0C5505] rounded-full transition-all duration-1000"
                                style={{ width: `${(countdown / 20) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => router.back()}
                    className="absolute -top-16 left-0 flex items-center gap-2 text-gray-500 hover:text-[#64a39a] transition-colors duration-300"
                >
                    <span className="text-sm font-medium">بازگشت</span>
                    <ArrowLeft size={18} />

                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;