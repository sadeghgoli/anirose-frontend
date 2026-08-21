'use client'
import React, { useState } from "react";

const FormField = ({
                       label,
                       name,
                       type = "text",
                       register,
                       error,
                       required = false,
                       placeholder = "",
                       options = [],
                       isSelect = false,
                       isTextarea = false,
                       className = "",
                       validate = {}
                   }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(!!e.target.value);
    };

    // ترکیب اعتبارسنجی‌های required و validate سفارشی
    const validationRules = { ...validate };
    if (required) {
        validationRules.required = `${label} الزامی است`;
    }

    const baseInputClass = `w-full p-3 border rounded-lg text-gray-600 transition-all duration-200 
        focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e0a96d] 
        ${error ? "border-red-500" : "border-gray-300"}
        ${isFocused || hasValue ? "placeholder-transparent" : "placeholder-gray-400"}`;

    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={name} className="block font-semibold text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {isTextarea ? (
                <textarea
                    id={name}
                    {...register(name, validationRules)}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    rows={4}
                    className={baseInputClass}
                />
            ) : isSelect ? (
                <select
                    id={name}
                    {...register(name, validationRules)}
                    className={baseInputClass}
                >
                    <option value="">{placeholder || "انتخاب کنید"}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={name}
                    type={type}
                    {...register(name, validationRules)}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    className={baseInputClass}
                />
            )}

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default FormField;
