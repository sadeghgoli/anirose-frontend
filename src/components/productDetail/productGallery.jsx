'use client'
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";

const FALLBACK_IMAGE = "/images/test/placeholder.jpg";

const ProductGallery = ({ mainImage, images = [], name = "" }) => {
    const safeMainImage = mainImage || FALLBACK_IMAGE;
    const productAlt = name ? `تصویر ${name}` : "تصویر محصول";
    const [activeImage, setActiveImage] = useState(safeMainImage);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomStyle, setZoomStyle] = useState({});
    const containerRef = useRef(null);

    let uniqueImages = [safeMainImage, ...images.filter(img => img !== mainImage)];
    uniqueImages = uniqueImages.filter((img, index, self) => self.indexOf(img) === index);

    if (uniqueImages.length === 1 && images.length > 0) {
        uniqueImages = [
            safeMainImage,
            `${safeMainImage}?fake=1`,
            `${safeMainImage}?fake=2`,
            `${safeMainImage}?fake=3`
        ];
    }

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomStyle({
            backgroundImage: `url(${activeImage})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: "250%",
            backgroundRepeat: "no-repeat",
        });
    }, [activeImage]);

    return (
        <div className="flex-1 min-w-[280px]">
            <div
                ref={containerRef}
                className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 cursor-crosshair hidden lg:block"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
            >
                <Image src={activeImage} alt={productAlt} width={0} height={0} sizes="100vw" className="w-full h-auto object-cover"  loading="lazy" />
                {showZoom && (
                    <div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={zoomStyle}
                    />
                )}
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 block lg:hidden">
                <Image src={activeImage} alt={productAlt} width={0} height={0} sizes="100vw" className="w-full h-auto object-cover"  loading="lazy" />
            </div>
            {uniqueImages.length > 1 && (
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 min-w-0">
            {uniqueImages.map((img, idx) => (
                <button
                    key={idx}
                    type="button"
                    aria-label={`مشاهده تصویر ${idx + 1}`}
                    aria-pressed={activeImage === img}
                    onClick={() => setActiveImage(img)}
                    className={`relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border-2 transition-all ${
                        activeImage === img
                            ? "border-amber-500 shadow-md"
                            : "border-gray-200 hover:border-amber-300"
                    }`}
                >
                    <Image
                        src={img}
                        alt={`تصویر ${idx + 1}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="64px"
                    />
                </button>
            ))}
        </div>
            )}
        </div>
    );
};

export default ProductGallery;
