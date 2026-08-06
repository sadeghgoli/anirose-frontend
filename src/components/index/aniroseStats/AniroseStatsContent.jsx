'use client'
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const AniroseStatsContent = ({ data }) => {
  const [counters, setCounters] = useState({});
  const [hasAnimated, setHasAnimated] = useState(false);
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
                setCounters((prev) => ({
                  ...prev,
                  [stat.id]: currentValue,
                }));
              }, 30);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    const node = statsRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [data, hasAnimated]);

  if (!data) return null;

  return (
    <section className="relative w-full pt-10 overflow-hidden bg-gray-50">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
        <div
          className="rounded-3xl pb-12 lg:pb-20 mb-0 lg:mb-20"
          style={{
            backgroundImage: "url('/images/test/Frame-76-2.jpg')",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="flex justify-center mb-2 md:mb-4">
            <Image
              src={data.topLogo}
              alt="لوگوی آنی رز"
              width={92}
              height={0}
              sizes="100vw"
              className="w-20 md:w-23 h-auto"
             loading="lazy" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
            <Image
              src={data.leftLeaf}
              alt=""
              width={36}
              height={0}
              sizes="100vw"
              className="w-9 md:w-9 h-auto transform scale-x-[-1]"
             loading="lazy" />
            <Image
              src={data.centerLogo}
              alt="لوگوی آنی رز"
              width={192}
              height={0}
              sizes="100vw"
              className="w-40 md:w-48 h-auto"
             loading="lazy" />
            <Image
              src={data.rightLeaf}
              alt=""
              width={36}
              height={0}
              sizes="100vw"
              className="w-9 md:w-9 h-auto"
             loading="lazy" />
          </div>

          <div className="mx-auto text-center px-4 md:px-20 mt-2 md:mt-4">
            <p className="text-xs md:text-sm lg:text-base text-gray-300 leading-relaxed">
              {data.description}
            </p>
          </div>
          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:hidden lg:grid-cols-4 gap-4 md:gap-6 px-11 mt-10"
          >
            {(data.stats || []).map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3
                  className="text-sm md:text-md font-bold text-[#0C5505] p-2 rounded-xl mb-3"
                  style={{
                    backgroundImage: "url('/images/test/Frame-10.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {stat.title}
                </h3>
                <div className="flex items-center justify-center gap-1 flex-wrap">
                  <span className="text-sm text-gray-500">{stat.prefix}</span>
                  <span className="inline-block text-xl md:text-2xl font-bold text-[#0C5505]">
                    {counters[stat.id] || 0}
                  </span>
                  <span className="text-sm text-gray-500">{stat.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 hidden md:grid mb-4 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8 md:mt-[-11%]"
        >
          {(data.stats || []).map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3
                className="text-sm md:text-md font-bold text-[#0C5505] p-2 rounded-xl mb-3"
                style={{
                  backgroundImage: "url('/images/test/Frame-10.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {stat.title}
              </h3>
              <div className="flex items-center justify-center gap-1 flex-wrap">
                <span className="text-sm text-gray-500">{stat.prefix}</span>
                <span className="inline-block text-xl md:text-2xl font-bold text-[#0C5505]">
                  {counters[stat.id] || 0}
                </span>
                <span className="text-sm text-gray-500">{stat.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AniroseStatsContent;
