'use client'
import React, { useState, useEffect } from "react";
import { fetchConsultantData } from "../../utils/api/consultantService/consultantService.js";
import ErrorOnFetchApi from "../common/ErrorOnFetchApi/ErrorOnFetchApi";
import ConsultantResume from "./consultantResume";
import ConsultantForm from "./consultantForm";
import ConsultantProfileSkeleton from "../skeleton/ConsultantProfile/ConsultantProfileSkeleton";

const ConsultantProfile = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setError(null);
        setLoading(true);
        try {
            const result = await fetchConsultantData();
            if (!result) throw new Error("داده‌ای دریافت نشد");
            setData(result);
        } catch (err) {
            console.error("❌ خطا در fetch اطلاعات مشاور:", err);
            setError(err.message || "خطا در دریافت اطلاعات");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData();
    }, []);

    if (loading) return <ConsultantProfileSkeleton />;

    return (
        <>
            <ErrorOnFetchApi
                message={error}
                isVisible={!!error && !data}
                onClose={() => setError(null)}
            />

            {error && !data && (
                <div className="max-w-[1200px] mx-auto px-4 py-8 text-center">
                    <button
                        onClick={loadData}
                        className="bg-[#e0a96d] text-white px-6 py-3 rounded-xl hover:bg-[#c99555] transition-all text-sm font-medium"
                    >
                        🔄 تلاش مجدد
                    </button>
                </div>
            )}

            {data && (
                <section
                    className="consultant-section-wrapper"
                    style={{ direction: "rtl", fontFamily: "peyda, Helvetica, Arial, sans-serif" }}
                >
                    <div className="flex gap-5 max-w-[1250px] mx-auto px-4 max-lg:px-3 max-sm:px-2 py-5 max-lg:flex-col">
                        {/* ستون رزومه */}
                        <div className="flex-1 bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] p-6 max-sm:p-4">
                            <ConsultantResume consultant={data.consultant} />
                        </div>

                        {/* ستون فرم */}
                        <div className="flex-1 bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] p-6 max-sm:p-4 lg:sticky lg:top-24 lg:h-fit">
                            <ConsultantForm formData={data.form} />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ConsultantProfile;

