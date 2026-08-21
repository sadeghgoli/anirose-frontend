'use client'
// src/components/common/ProductDetail/ProductDetailPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, notFound } from "next/navigation";
import { toast } from "react-toastify";
import { useProduct } from "../../hooks/useProduct";
import ProductGallery from "./productGallery";
import ProductInfo from "./productInfo";
import ProductTabs from "./productTabs";
import RelatedProducts from "./relatedProducts";
import ProductDetailSkeleton from "./productDetailSkeleton";
import { addToCart } from "../../api/services/cart.js";
import { trackProductView } from "../../utils/analytics/index.js";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, relatedProducts, loading, error } = useProduct(id);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        if (product && product.id) {
            trackProductView(product.id, product.name);
        }
    }, [product]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQuantity(1);
    }, [id]);

    const handleAddToCart = useCallback(async (payload) => {
        setAddingToCart(true);
        try {
            await addToCart(payload);
            toast.success("محصول با موفقیت به سبد خرید اضافه شد");
        } catch (err) {
            toast.error(err?.response?.data?.message || "خطا در افزودن به سبد خرید");
        } finally {
            setAddingToCart(false);
        }
    }, []);

    if (loading) return <ProductDetailSkeleton />;
    if (error || !product) {
      notFound();
      return null;
    }

    return (
        <div className="relative w-full py-10 overflow-x-clip">
            <div className="absolute top-0 right-0 w-[90px] h-full z-0 pointer-events-none" style={{ backgroundImage: "url('/images/test/Frame-41-2.png')", backgroundPosition: "center right", backgroundRepeat: "no-repeat", backgroundSize: "contain" }} />
            <div className="absolute top-0 left-0 w-[90px] h-full z-0 pointer-events-none" style={{ backgroundImage: "url('/images/test/Frame-74.png')", backgroundPosition: "center left", backgroundRepeat: "no-repeat", backgroundSize: "contain" }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex flex-wrap gap-8">
                        <ProductGallery
                            mainImage={product.image}
                            images={product.images?.length ? product.images.map((i) => i.url) : [product.image]}
                            name={product.name}
                        />
                        <ProductInfo
                            product={product}
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            onAddToCart={handleAddToCart}
                            addingToCart={addingToCart}
                        />
                    </div>

                    <ProductTabs product={product} reviews={[]} />
                    <RelatedProducts products={relatedProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
