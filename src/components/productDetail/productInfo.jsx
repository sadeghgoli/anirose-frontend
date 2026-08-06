// src/components/common/ProductDetail/ProductInfo.jsx
'use client'
import React, { useState } from "react";
import QuantitySelector from "./quantitySelector";
import Link from "next/link";

const formatPrice = (price) => {
  const num = Number(price) || 0;
  return num.toLocaleString() + " تومان";
};

const ProductInfo = ({ product, onQuantityChange, quantity, onAddToCart, addingToCart }) => {
    const weights = product.type_of_weights || [];
    const [selectedWeightId, setSelectedWeightId] = useState(
      weights.length ? weights[0].id : null
    );

    const selectedWeight = weights.find((w) => w.id === selectedWeightId) || null;

    const getWeightPivot = () => {
      const pivot = selectedWeight?.pivot;
      if (!pivot || typeof pivot.price === 'undefined') return null;
      return pivot;
    };

    const weightPivot = getWeightPivot();

    const displayPrice = weightPivot
      ? Number(weightPivot.price_discounted || weightPivot.price) || 0
      : Number(product.price) || 0;
    const displayBasePrice = weightPivot
      ? Number(weightPivot.price) || 0
      : Number(product.price) || 0;
    const hasDiscount = weightPivot
      ? Number(weightPivot.price_discounted) > 0 && Number(weightPivot.price_discounted) < Number(weightPivot.price)
      : (product.salePrice != null && product.salePrice < product.price);

    const discountPercent = hasDiscount && displayBasePrice > 0
      ? Math.round((1 - displayPrice / displayBasePrice) * 100)
      : 0;

    const ratingValue = product.rating?.toFixed(1) || "۰";

    const stock = weightPivot ? Number(weightPivot.stock) : Number(product.stock);
    const isInStock = stock > 0;
    const isLowStock = stock > 0 && stock <= 5;

    const handleWeightChange = (weightId) => {
      setSelectedWeightId(weightId);
    };

    const handleAddToCart = () => {
      onAddToCart?.({
        product_id: product.id,
        type_of_weight_id: selectedWeight ? selectedWeight.id : undefined,
        quantity,
      });
    };

    return (
        <div className="flex-1 min-w-[280px]">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

            <div className="flex items-center gap-3 flex-wrap mb-4">
                <span className="bg-[#f5a623] text-white px-2.5 py-2.5 rounded-full text-sm inline-flex items-center gap-1">
                    ★★★★★ {ratingValue}
                </span>

                {isInStock ? (
                    <span className={`px-2.5 py-2.5 rounded-full text-sm inline-flex items-center gap-1 ${
                        isLowStock
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                    }`}>
                        {isLowStock ? (
                            <>⚠️ تنها {stock} عدد باقی مانده</>
                        ) : (
                            <>✓ موجود در انبار</>
                        )}
                    </span>
                ) : (
                    <span className="bg-red-100 text-red-700 px-2.5 py-2.5 rounded-full text-sm inline-flex items-center gap-1">
                        ✗ ناموجود
                    </span>
                )}
            </div>

            <div className="mb-4">
                {hasDiscount ? (
                    <>
                        <span className="text-3xl font-bold text-[#E0A96D]">{formatPrice(displayPrice)}</span>
                        <span className="text-gray-400 line-through mr-2 text-sm">{formatPrice(displayBasePrice)}</span>
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full mr-2">
                            {discountPercent}% تخفیف
                        </span>
                    </>
                ) : (
                    <span className="text-3xl font-bold text-amber-600">{formatPrice(displayPrice)}</span>
                )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.mini_description}</p>

            {weights.length > 0 && (
                <div className="mb-6">
                    <span className="block text-sm font-semibold text-gray-700 mb-2">انتخاب نوع وزن</span>
                    <div className="flex flex-wrap gap-2">
                        {weights.map((w) => {
                            const pivotStock = Number(w.pivot?.stock ?? product.stock);
                            const disabled = pivotStock <= 0;
                            return (
                                <button
                                    key={w.id}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => handleWeightChange(w.id)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                                        selectedWeightId === w.id
                                            ? "bg-[#0C5505] text-white border-[#0C5505]"
                                            : "border-gray-300 text-gray-700 hover:border-[#0C5505]"
                                    } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {w.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
                {isInStock && (
                    <QuantitySelector min={1} max={Math.max(stock, 1)} onChange={onQuantityChange} />
                )}

                <button
                    onClick={handleAddToCart}
                    className={`font-semibold px-6 py-4 rounded-lg transition ${
                        isInStock
                            ? "bg-[#E0A96D] text-white hover:bg-[#c99555] cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isInStock || addingToCart}
                >
                    {addingToCart
                        ? "در حال افزودن..."
                        : isInStock
                            ? "🛒 افزودن به سبد خرید"
                            : "ناموجود"}
                </button>

                <Link href="/omde" className="bg-[#333333] text-white font-semibold px-6 py-4 rounded-lg transition hover:bg-[#444444]">
                    💰 خرید عمده
                </Link>
            </div>

            <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
                <p>🆔 کد محصول: {product.tracking_code}</p>
                <p>📦 وزن: {selectedWeight ? `${selectedWeight.title}` : "—"}</p>
                <p>🏭 برند: آنی‌رز</p>
            </div>
        </div>
    );
};

export default ProductInfo;
