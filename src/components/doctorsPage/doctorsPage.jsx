'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { fetchDoctorsData } from "../../utils/api/doctorsService/doctorsService.js";
import DoctorsPageSkeleton from "../skeleton/DoctorsPage/DoctorsPageSkeleton.jsx";

const DoctorsPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const result = await fetchDoctorsData();
            setData(result);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <DoctorsPageSkeleton />;
    if (!data) return null;

    const { title, icon, doctors = [] } = data || {};

    return (
        <div className="ast-container container mx-auto py-10 md:py-12 px-4 lg:px-8">
            <div id="primary" className="content-area primary w-full">
                <main id="main" className="site-main">
                    <article className="post-87 page type-page status-publish ast-article-single" id="post-87">
                        <div className="entry-content clear">
                            <div className="doctors-list-section">

                                {/* هدر بخش */}
                                <div className="text-center mb-6">
                                    <h1 className="text-3xl md:text-4xl font-semibold text-[#1e293b] mb-3">
                                        {title}
                                    </h1>
                                    <div className="flex justify-center">
                                        <Image
                                            src={icon}
                                            alt=""
                                            width={80}
                                            height={80}
                                            className="rotate-180"
                                         loading="lazy" />
                                    </div>
                                </div>

                                {/* لیست پزشکان */}
                                <div className="doctors-container flex flex-col gap-7 md:gap-8 mt-8 rtl">
                                    {doctors.map((doctor) => (
                                        <div
                                            key={doctor.id}
                                            className="doctor-item flex flex-col md:flex-row items-center gap-5 md:gap-6 bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                        >
                                            {/* عکس پزشک */}
                                            <div className="doctor-image flex-shrink-0 w-24 h-24 md:w-[120px] md:h-[120px] rounded-full overflow-hidden bg-gray-100 border-4 border-[#e0a96d]">
                                                <Image
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    fill
                                                    className="object-cover"
                                                 loading="lazy" />
                                            </div>

                                            {/* اطلاعات پزشک */}
                                            <div className="doctor-info flex-1 text-center md:text-right">
                                                <h3 className="doctor-name text-xl md:text-2xl font-bold text-gray-800 mb-1">
                                                    {doctor.name}
                                                </h3>
                                                <span className="doctor-specialty inline-block bg-[#e0a96d]/20 text-[#e0a96d] text-xs md:text-sm font-medium px-3 py-1 rounded-full mb-3">
                                                    {doctor.specialty}
                                                </span>
                                                <p className="doctor-bio text-gray-600 text-sm md:text-base leading-relaxed">
                                                    {doctor.bio}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            </div>

            <style>{`
                .doctors-container {
                    direction: rtl;
                }
                .doctor-info {
                    direction: rtl;
                }
                @media (max-width: 768px) {
                    .doctor-item {
                        flex-direction: column;
                        text-align: center;
                    }
                    .doctor-info {
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default DoctorsPage;