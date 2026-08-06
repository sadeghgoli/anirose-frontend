'use client'
// src/components/common/Shop/PriceRangeSlider.jsx
import React, {useState, useEffect, useCallback} from 'react';
import {ChevronDown, ChevronUp} from 'react-feather';

const PriceRangeSlider = ({isOpen, onToggle, minPrice, maxPrice, onPriceChange, priceRange}) => {
    const [tempMin, setTempMin] = useState(0);
    const [tempMax, setTempMax] = useState(10000000);
    const [textMin, setTextMin] = useState('');
    const [textMax, setTextMax] = useState('');
    const [isMinFocused, setIsMinFocused] = useState(false);
    const [isMaxFocused, setIsMaxFocused] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const absoluteMin = priceRange?.min ?? 0;
    const absoluteMax = priceRange?.max ?? 10000000;

    useEffect(() => {
        if (!isInitialized) {
            const newMin = (minPrice !== undefined && minPrice !== null) ? minPrice : absoluteMin;
            const newMax = (maxPrice !== undefined && maxPrice !== null) ? maxPrice : absoluteMax;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTempMin(newMin);
            setTempMax(newMax);
            setTextMin(newMin.toString());
            setTextMax(newMax.toString());
            setIsInitialized(true);
        } else {
            if (minPrice !== undefined && minPrice !== null && minPrice !== tempMin) {
                setTempMin(minPrice);
                if (!isMinFocused) setTextMin(minPrice.toString());
            }
            if (maxPrice !== undefined && maxPrice !== null && maxPrice !== tempMax) {
                setTempMax(maxPrice);
                if (!isMaxFocused) setTextMax(maxPrice.toString());
            }
        }
    }, [minPrice, maxPrice, absoluteMin, absoluteMax, isInitialized, tempMin, tempMax, isMinFocused, isMaxFocused]);

    const getLeftPercent = useCallback(() => {
        if (absoluteMax === absoluteMin) return 0;
        return ((tempMin - absoluteMin) / (absoluteMax - absoluteMin)) * 100;
    }, [tempMin, absoluteMin, absoluteMax]);

    const getRightPercent = useCallback(() => {
        if (absoluteMax === absoluteMin) return 100;
        return ((tempMax - absoluteMin) / (absoluteMax - absoluteMin)) * 100;
    }, [tempMax, absoluteMin, absoluteMax]);

    const handleLeftChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = absoluteMin;
        val = Math.min(val, tempMax - 1000);
        val = Math.max(val, absoluteMin);
        setTempMin(val);
        if (!isMinFocused) setTextMin(val.toString());
    };

    const handleRightChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = absoluteMax;
        val = Math.max(val, tempMin + 1000);
        val = Math.min(val, absoluteMax);
        setTempMax(val);
        if (!isMaxFocused) setTextMax(val.toString());
    };

    const handleMinTextChange = (e) => {
        const rawValue = e.target.value;
        setTextMin(rawValue);
        if (rawValue === '') return;
        let num = parseInt(rawValue.replace(/\D/g, ''));
        if (!isNaN(num)) {
            num = Math.min(num, tempMax - 1000);
            num = Math.max(num, absoluteMin);
            setTempMin(num);
        }
    };

    const handleMaxTextChange = (e) => {
        const rawValue = e.target.value;
        setTextMax(rawValue);
        if (rawValue === '') return;
        let num = parseInt(rawValue.replace(/\D/g, ''));
        if (!isNaN(num)) {
            num = Math.max(num, tempMin + 1000);
            num = Math.min(num, absoluteMax);
            setTempMax(num);
        }
    };

    const handleMinFocus = () => {
        setIsMinFocused(true);
        setTextMin(textMin.replace(/\D/g, ''));
    };

    const handleMinBlur = () => {
        setIsMinFocused(false);
        if (textMin === '') {
            setTempMin(absoluteMin);
            setTextMin(absoluteMin.toString());
        } else {
            let num = parseInt(textMin.replace(/\D/g, ''));
            if (isNaN(num)) num = absoluteMin;
            num = Math.min(num, tempMax - 1000);
            num = Math.max(num, absoluteMin);
            setTempMin(num);
            setTextMin(num.toString());
        }
        onPriceChange({
            minPrice: tempMin > absoluteMin ? tempMin : null,
            maxPrice: tempMax < absoluteMax ? tempMax : null
        });
    };

    const handleMaxFocus = () => {
        setIsMaxFocused(true);
        setTextMax(textMax.replace(/\D/g, ''));
    };

    const handleMaxBlur = () => {
        setIsMaxFocused(false);
        if (textMax === '') {
            setTempMax(absoluteMax);
            setTextMax(absoluteMax.toString());
        } else {
            let num = parseInt(textMax.replace(/\D/g, ''));
            if (isNaN(num)) num = absoluteMax;
            num = Math.max(num, tempMin + 1000);
            num = Math.min(num, absoluteMax);
            setTempMax(num);
            setTextMax(num.toString());
        }
        onPriceChange({
            minPrice: tempMin > absoluteMin ? tempMin : null,
            maxPrice: tempMax < absoluteMax ? tempMax : null
        });
    };

    const formatDisplayPrice = (price) => price?.toLocaleString() + ' تومان';
    const leftPercent = getLeftPercent();
    const rightPercent = getRightPercent();

    return (
        <div className="border-b border-gray-200 pb-4 mb-4">
            <button onClick={onToggle} className="flex justify-between items-center w-full text-right group">
                <h4 className="font-semibold text-gray-800 text-base">فیلتر بر اساس قیمت</h4>
                <span className="text-gray-400 group-hover:text-[#0C5505] transition-colors">
                    {isOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </span>
            </button>

            {isOpen && (
                <>
                    <div className="flex justify-between text-xs text-gray-500 mt-4">
                        <span>{formatDisplayPrice(absoluteMax)}</span>
                        <span>{formatDisplayPrice(absoluteMin)}</span>
                    </div>

                    <div className="relative h-1 bg-gray-200 rounded-full mt-6 mb-8 mx-1">
                        <div className="absolute h-1 bg-[#0C5505] rounded-full"
                             style={{left: `${leftPercent}%`, right: `${100 - rightPercent}%`}}/>
                        <input
                            type="range"
                            min={absoluteMin}
                            max={absoluteMax}
                            step={1000}
                            value={tempMin}
                            onChange={handleLeftChange}
                            aria-label="حداقل قیمت"
                            className="absolute w-full h-2 -top-0.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0C5505] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                            style={{direction: 'ltr'}}
                        />
                        <input
                            type="range"
                            min={absoluteMin}
                            max={absoluteMax}
                            step={1000}
                            value={tempMax}
                            onChange={handleRightChange}
                            aria-label="حداکثر قیمت"
                            className="absolute w-full h-2 -top-0.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0C5505] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                            style={{direction: 'ltr'}}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <label htmlFor="price-max" className="block text-xs text-gray-500 mb-1 text-right">حداکثر قیمت</label>
                            <div className="relative">
                                <input id="price-max" type="text" value={textMax} onChange={handleMaxTextChange}
                                       onFocus={handleMaxFocus} onBlur={handleMaxBlur}
                                       placeholder={absoluteMax.toString()}
                                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0C5505]/20 focus:border-[#0C5505] transition-all"/>
                                <span
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">تومان</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="price-min" className="block text-xs text-gray-500 mb-1 text-right">حداقل قیمت</label>
                            <div className="relative">
                                <input id="price-min" type="text" value={textMin} onChange={handleMinTextChange}
                                       onFocus={handleMinFocus} onBlur={handleMinBlur}
                                       placeholder={absoluteMin.toString()}
                                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0C5505]/20 focus:border-[#0C5505] transition-all"/>
                                <span
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">تومان</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-sm whitespace-nowrap text-gray-500 py-2 bg-gray-50 rounded-lg">
                        <span>محدوده انتخاب شده: </span>
                        <span
                            className="text-[#0C5505] whitespace-nowrap font-semibold">{formatDisplayPrice(tempMin)}</span>
                        <span> تا </span>
                        <span
                            className="text-[#0C5505] whitespace-nowrap font-semibold">{formatDisplayPrice(tempMax)}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default PriceRangeSlider;
