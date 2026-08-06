import Image from "next/image";

const HeroSlider = () => {
    return (
        <div className="relative w-full py-10 overflow-x-clip">
            {/* بک‌گراند راست (Frame-41-2.png) */}
            <div className="absolute top-0 right-0 w-[90px] h-full z-0 pointer-events-none">
                <Image
                    src="/images/test/Frame-41-2.png"
                    alt=""
                    fill
                    className="object-contain object-right"
                    priority={false}
                />
            </div>

            {/* بک‌گراند چپ (Frame-74.png) */}
            <div className="absolute top-0 left-0 w-[90px] h-full z-0 pointer-events-none">
                <Image
                    src="/images/test/Frame-74.png"
                    alt=""
                    fill
                    className="object-contain object-left"
                    priority={false}
                />
            </div>

            <div className="relative z-10 w-full max-w-14xl mx-auto px-14 lg:px-18 overflow-visible">
                <div className="relative max-w-[1250px] mx-auto overflow-visible">
                    {/* بنر ثابت و کشیده */}
                    <div className="w-full hero-banner-back rounded-[20px] overflow-hidden px-5 py-8 max-sm:px-3 max-sm:py-4">
                        <div className="flex flex-row items-center max-sm:flex-col-reverse max-sm:gap-3">
                    
                            {/* بخش تصویر بنر */}
                            <div className="relative !h-[300px] w-full">
                                <Image
                                    src="/images/banners/IMG_20260729_092200_700.jpg" // مسیر تصویر بنر را تغییر دهید
                                    alt="بنر اصلی"
                                    fill
                                    className="md:object-cover object-contain rounded-3xl w-full !h-[300px]"
                                     loading="lazy"
                                    sizes="width:100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;