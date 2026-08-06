'use client'
import { useState, useEffect } from "react";
import { fetchProductById } from "../api/services/products.js";

export const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError("محصولی یافت نشد");
            setLoading(false);
            return;
        }

        const load = async () => {
            try {
                const productData = await fetchProductById(productId);
                if (!productData) {
                    setError("محصول مورد نظر وجود ندارد");
                    setLoading(false);
                    return;
                }
                setProduct(productData);
                setRelatedProducts(productData.relatedProducts || []);
            } catch (err) {
                setError("خطا در دریافت اطلاعات محصول");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [productId]);

    return { product, relatedProducts, loading, error };
};
