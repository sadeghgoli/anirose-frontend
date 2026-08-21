// src/components/common/ProductDetail/RelatedProducts.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
const formatPrice = (price) => price + " تومان";

const RelatedProducts = ({ products }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 border-r-4 border-amber-500 pr-3 mb-5">🔄 محصولات مشابه و پیشنهادی</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link href={`/product/${product.id}/${/[\u0600-\u06FF]/.test(product.name)
  ? product.name.replace(/\s+/g, "-")
  : product.name}`} key={product.id} className="bg-gray-50 rounded-xl p-3 text-center hover:shadow-md transition">
                        <Image
                            src={product.image || "/images/test/placeholder.jpg"}
                            alt={product.name}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full rounded-lg mb-2 h-32 object-contain"
                         loading="lazy" />                        <h4 className="font-semibold text-black text-sm mb-1">{product.name}</h4>
                        <p className="text-[#E0A96D] font-bold mb-6 mt-4 text-sm">{formatPrice(product.salePrice || product.price)}</p>
                        <span className="text-xs text-white bg-[#E0A96D] mt-4 py-1 px-3 rounded-md  ">مشاهده</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;