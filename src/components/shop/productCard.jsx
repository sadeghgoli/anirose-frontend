"use client";
// src/components/common/Shop/ProductCard.jsx
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "react-feather";
import Image from "next/image";

const ProductCard = ({ product, index, categories }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomLoading, setIsBottomLoading] = useState(false);

  if (!product || !product.id) return null;

  const mainPrice = product.price
    ? parseInt(String(product.price).replace(/,/g, ""))
    : 0;
  const salePriceValue = product.salePrice
    ? parseInt(String(product.salePrice).replace(/,/g, ""))
    : null;

  if (mainPrice === 0 && !salePriceValue) return null;

  const getCategoryName = () => {
    if (!categories || categories.length === 0) return "محصولات";
    const category = categories.find((cat) => cat.id === product.categoryId);
    return category?.name || "محصولات";
  };

  // تبدیل نام محصول به آدرس سئو پسند
  const productSlug = product.name.replace(/\s+/g, "-");
  const productUrl = `/product/${product.id}/${productSlug}`;

  const handleAddToCartTop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }, 2000);
  };

  const handleAddToCartBottom = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBottomLoading(true);
    setTimeout(() => {
      setIsBottomLoading(false);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.05 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Link href={productUrl} className="block">
        {/* بخش تصویر */}
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/images/test/placeholder.jpg"}
            alt={product.name || "محصول"}
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              e.target.src = "/images/test/placeholder.jpg";
            }}
          />
        </div>

        {/* دکمه سبد خرید بالا */}
        <div
          className={`absolute left-3 top-3 transition-all duration-300 z-10 ${
            isLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={handleAddToCartTop}
            disabled={isLoading}
            className="relative bg-white p-2 rounded-full shadow-md transition-colors duration-300 flex items-center justify-center w-9 h-9"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gray-800 animate-dot-pulse" />
              </div>
            )}
            <div
              className={`transition-opacity duration-200 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            >
              <ShoppingBag
                size={18}
                className="text-gray-600 transition-colors"
              />
            </div>

            {/* تولتیپ دکمه بالا */}
            {!isLoading && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all duration-200 pointer-events-none z-20">
                {isAddedToCart ? "افزوده شد!" : "افزودن به سبد خرید"}
              </span>
            )}
          </button>
        </div>

        {/* اطلاعات محصول */}
        <div className="p-4 pt-0 text-center">
          <div className="text-xs text-gray-400 mb-1">{getCategoryName()}</div>
          <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-2 transition-colors">
            {product.name}
          </h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-2">
            {salePriceValue ? (
              <>
                <span className="text-sm font-bold">
                  {salePriceValue.toLocaleString()} تومان
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {mainPrice.toLocaleString()} تومان
                </span>
              </>
            ) : (
              <span className="text-sm font-bold">
                {mainPrice.toLocaleString()} تومان
              </span>
            )}
          </div>

          {/* دکمه افزودن به سبد خرید پایین */}
          <button
            onClick={handleAddToCartBottom}
            disabled={isBottomLoading}
            className={`relative ${
              salePriceValue ? "" : "mt-11"
            }  w-full mt-4 bg-[#64A39A] py-2 rounded-lg flex items-center justify-center gap-2 text-white transition-all duration-300 overflow-hidden ${
              isBottomLoading ? "opacity-70" : "hover:bg-[#4a7d73]"
            }`}
          >
            <ShoppingBag
              size={16}
              className={`transition-all duration-200 ${
                isBottomLoading ? "opacity-50" : ""
              }`}
            />
            <span
              className={`text-sm transition-all duration-200 ${
                isBottomLoading ? "opacity-50" : ""
              }`}
            >
              {isBottomLoading ? "در حال افزودن..." : "افزودن به سبد خرید"}
            </span>
            {/* لودر سفید کنار متن با محو خیلی کم */}
            {isBottomLoading && (
              <div className="absolute right-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse-subtle" />
              </div>
            )}
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
