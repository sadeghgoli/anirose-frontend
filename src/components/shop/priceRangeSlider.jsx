'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

const PriceRangeSlider = ({ isOpen, onToggle, minPrice, maxPrice, onPriceChange, priceRange }) => {
    const absoluteMin = priceRange?.min ?? 0;
    const absoluteMax = priceRange?.max ?? 10000000;
    const gap = Math.max(1000, Math.floor((absoluteMax - absoluteMin) / 100) || 1000);

    const [tempMin, setTempMin] = useState(minPrice ?? absoluteMin);
    const [tempMax, setTempMax] = useState(maxPrice ?? absoluteMax);
    const [textMin, setTextMin] = useState(String(minPrice ?? absoluteMin));
    const [textMax, setTextMax] = useState(String(maxPrice ?? absoluteMax));
    const [isMinFocused, setIsMinFocused] = useState(false);
    const [isMaxFocused, setIsMaxFocused] = useState(false);

    useEffect(() => {
        const nextMin = minPrice ?? absoluteMin;
        const nextMax = maxPrice ?? absoluteMax;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTempMin(nextMin);
        setTempMax(nextMax);
        if (!isMinFocused) setTextMin(String(nextMin));
        if (!isMaxFocused) setTextMax(String(nextMax));
    }, [minPrice, maxPrice, absoluteMin, absoluteMax, isMinFocused, isMaxFocused]);

    const commit = useCallback((min, max) => {
        let nextMin = Number.isFinite(min) ? min : absoluteMin;
        let nextMax = Number.isFinite(max) ? max : absoluteMax;
        nextMin = Math.max(absoluteMin, Math.min(nextMin, nextMax - gap));
        nextMax = Math.min(absoluteMax, Math.max(nextMax, nextMin + gap));
        setTempMin(nextMin);
        setTempMax(nextMax);
        if (!isMinFocused) setTextMin(String(nextMin));
        if (!isMaxFocused) setTextMax(String(nextMax));
        onPriceChange({
            minPrice: nextMin > absoluteMin ? nextMin : null,
            maxPrice: nextMax < absoluteMax ? nextMax : null,
        });
    }, [absoluteMin, absoluteMax, gap, isMaxFocused, isMinFocused, onPriceChange]);

    const handleLeftChange = (e) => {
        commit(parseInt(e.target.value, 10), tempMax);
    };

    const handleRightChange = (e) => {
        commit(tempMin, parseInt(e.target.value, 10));
    };

    const handleMinBlur = () => {
        setIsMinFocused(false);
        const num = parseInt(String(textMin).replace(/\D/g, ''), 10);
        commit(Number.isFinite(num) ? num : absoluteMin, tempMax);
    };

    const handleMaxBlur = () => {
        setIsMaxFocused(false);
        const num = parseInt(String(textMax).replace(/\D/g, ''), 10);
        commit(tempMin, Number.isFinite(num) ? num : absoluteMax);
    };

    const formatDisplayPrice = (price) => `${(price || 0).toLocaleString('fa-IR')} تومان`;
    const span = absoluteMax - absoluteMin || 1;
    const leftPercent = ((tempMin - absoluteMin) / span) * 100;
    const rightPercent = ((tempMax - absoluteMin) / span) * 100;

    return (
        <div className="border-b border-gray-200 pb-4 mb-4">
            <button type="button" onClick={onToggle} className="flex justify-between items-center w-full text-right group">
                <h4 className="font-semibold text-gray-800 text-base">فیلتر بر اساس قیمت</h4>
                <span className="text-gray-400 group-hover:text-[#0C5505] transition-colors">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
            </button>

            {isOpen && (
                <>
                    <div className="flex justify-between text-xs text-gray-500 mt-4">
                        <span>{formatDisplayPrice(absoluteMax)}</span>
                        <span>{formatDisplayPrice(absoluteMin)}</span>
                    </div>

                    <div className="relative h-1 bg-gray-200 rounded-full mt-6 mb-8 mx-1">
                        <div
                            className="absolute h-1 bg-[#0C5505] rounded-full"
                            style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
                        />
                        <input
                            type="range"
                            min={absoluteMin}
                            max={absoluteMax}
                            step={gap}
                            value={tempMin}
                            onChange={handleLeftChange}
                            aria-label="حداقل قیمت"
                            className="absolute w-full h-2 -top-0.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0C5505] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                            style={{ direction: 'ltr' }}
                        />
                        <input
                            type="range"
                            min={absoluteMin}
                            max={absoluteMax}
                            step={gap}
                            value={tempMax}
                            onChange={handleRightChange}
                            aria-label="حداکثر قیمت"
                            className="absolute w-full h-2 -top-0.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0C5505] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                            style={{ direction: 'ltr' }}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <label htmlFor="price-max" className="block text-xs text-gray-500 mb-1 text-right">حداکثر قیمت</label>
                            <div className="relative">
                                <input
                                    id="price-max"
                                    type="text"
                                    inputMode="numeric"
                                    value={textMax}
                                    onChange={(e) => setTextMax(e.target.value)}
                                    onFocus={() => setIsMaxFocused(true)}
                                    onBlur={handleMaxBlur}
                                    placeholder={String(absoluteMax)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0C5505]/20 focus:border-[#0C5505] transition-all"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">تومان</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="price-min" className="block text-xs text-gray-500 mb-1 text-right">حداقل قیمت</label>
                            <div className="relative">
                                <input
                                    id="price-min"
                                    type="text"
                                    inputMode="numeric"
                                    value={textMin}
                                    onChange={(e) => setTextMin(e.target.value)}
                                    onFocus={() => setIsMinFocused(true)}
                                    onBlur={handleMinBlur}
                                    placeholder={String(absoluteMin)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0C5505]/20 focus:border-[#0C5505] transition-all"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">تومان</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-sm whitespace-nowrap text-gray-500 py-2 bg-gray-50 rounded-lg mt-3">
                        <span>محدوده انتخاب شده: </span>
                        <span className="text-[#0C5505] whitespace-nowrap font-semibold">{formatDisplayPrice(tempMin)}</span>
                        <span> تا </span>
                        <span className="text-[#0C5505] whitespace-nowrap font-semibold">{formatDisplayPrice(tempMax)}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default PriceRangeSlider;
