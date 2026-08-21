'use client'
// src/components/common/ProductDetail/QuantitySelector.jsx
import React, { useState } from "react";

const QuantitySelector = ({ min = 1, max = 99, onChange }) => {
    const [quantity, setQuantity] = useState(min);

    const increase = () => {
        if (quantity < max) {
            const newVal = quantity + 1;
            setQuantity(newVal);
            onChange?.(newVal);
        }
    };
    const decrease = () => {
        if (quantity > min) {
            const newVal = quantity - 1;
            setQuantity(newVal);
            onChange?.(newVal);
        }
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button type="button" onClick={decrease} aria-label="کاهش تعداد" className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold">-</button>
            <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
            <button type="button" onClick={increase} aria-label="افزایش تعداد" className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold">+</button>
        </div>
    );
};

export default QuantitySelector;
