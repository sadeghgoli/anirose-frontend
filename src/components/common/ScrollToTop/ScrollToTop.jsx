'use client'
// src/components/common/ScrollToTop.jsx
import React, { useState, useEffect } from "react";
import { ChevronUp } from "react-feather";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollY = window.scrollY;
            // بین 300 تا 400px نمایش بده، کمتر از 300 نباشه، بیشتر از 400 هم باشه
            if (scrollY > 100 && scrollY < document.body.scrollHeight - window.innerHeight - 100) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        visible && (
            <button
                onClick={scrollToTop}
                className="fixed left-4 bottom-20 z-50
                   w-9 h-9
                   bg-[#64a39a] hover:bg-[#5a9490]
                   text-white
                   rounded-md
                   flex items-center justify-center
                   shadow-lg
                   transition-all duration-300
                   animate-bounce"
                aria-label="اسکرول به بالا"
            >
                <ChevronUp size={18} />
            </button>
        )
    );
};

export default ScrollToTop;
