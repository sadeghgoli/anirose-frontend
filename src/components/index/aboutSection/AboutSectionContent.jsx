'use client'
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const AboutSectionContent = ({ data }) => {
    const [counters, setCounters] = useState({});
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        if (!data) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);

                        (data.stats || []).forEach((stat) => {
                            const targetValue = stat.value;
                            let currentValue = 0;
                            const step = Math.ceil(targetValue / 50);

                            const interval = setInterval(() => {
                                currentValue += step;
                                if (currentValue >= targetValue) {
                                    currentValue = targetValue;
                                    clearInterval(interval);
                                }
                                setCounters(prev => ({
                                    ...prev,
                                    [stat.id]: currentValue
                                }));
                            }, 30);
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        const node = statsRef.current;
        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        };
    }, [data, hasAnimated]);

    if (!data) return null;

    return (
        <React.Fragment>
            <section
                ref={sectionRef}
                className="relative w-full  py-10 overflow-hidden"
            >
                <div className="absolute inset-0 z-0" />

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
                    <div className="flex flex-col lg:flex-row items-center">

                        <div className="w-full lg:w-9.2/12 order-2 pl-6 lg:order-1">
                           <div className="md:block flex flex-col items-center">
                               <div className="mb-4 mt-5 md:mt-0">
                                <Image
                                     src="/images/test/Group-3-min.png"
                                     alt=""
                                     width={92}
                                     height={0}
                                     sizes="100vw"
                                     className="w-[70px] md:w-[92px] h-auto inline-block"
                                  loading="lazy" />
                               </div>

                               <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0C5505] mb-4">
                                   {/* {data.title ? data.title : "???? ?? ??? ?? ??? ??????"} */}
                                   درباره آنی رز
                               </h2>

                               <p className="text-sm md:text-base text-[#334155] leading-relaxed mb-8 max-w-2xl">
                                   {/* {data.description} */}
                                   شرکت کشت و صنعت درخت زندگی با برند آنی رز، از سال ۱۳۹۸ فعالیت خود را در حوزه تامین محصولات ارگانیک، گیاهان دارویی و ادویه جات آغاز نموده و به عنوان تامین کننده، با شرکت‌های دارویی، آرایشی و بهداشتی، شرکت‌های غذایی و عطاری‌ها، سلامتکده‌ها و هایپرهای بزرگ همکاری می‌نماید.


                               </p>
                           </div>

                            <div
                                ref={statsRef}
                                className="flex flex-col sm:flex-row gap-4 md:gap-6"
                                style={{
                                    backgroundImage: `url("/images/test/Frame-1000001594-3-1.jpg")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: "24px",
                                    padding: "20px"
                                }}
                            >
                                {(data.stats || []).map((stat) => (
                                    <div
                                        key={stat.id}
                                        className="flex bg-white rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div
                                            className="inline-flex items-center justify-center gap-1 rounded-xl ml-3"
                                            style={{
                                                backgroundImage: `url("/images/test/Frame-1000001595-1.jpg")`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                minWidth : "60px"
                                            }}
                                        >
                                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-[#64a39a]">
                                            {counters[stat.id] || 0}
                                        </span>
                                            {stat.suffix && (
                                                <span className="text-xl md:text-1xl lg:text-3xl font-bold text-[#64a39a]">
                                                {stat.suffix}
                                            </span>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <h3 className="text-base md:text-sm font-semibold text-[#54595F] mt-2">
                                                {stat.title}
                                            </h3>
                                            <p className="text-xs md:text-sm text-[#64748b] mt-1">
                                                {stat.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-5/12 order-1 h-full lg:order-2">
                            <div className="flex justify-center md:justify-end h-full items-center">
                                <Image
                                    src={data.image}
                                    alt="تصویر درباره آنی رز"
                                    width={350}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full max-w-[220px] md:max-w-[320px] lg:max-w-[350px] h-auto rounded-2xl"
                                 loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-4">
                <div className="w-full">
                    <Image
                        src="/images/test/line.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto"
                     loading="lazy" />
                </div>
            </div>
        </React.Fragment>
    );
};

export default AboutSectionContent;
