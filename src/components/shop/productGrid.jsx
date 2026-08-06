// src/components/common/Shop/ProductGrid.jsx
import React from 'react';
import ProductCard from './productCard';
import { ProductGridSkeleton } from '../skeleton/Shop/ProductSkeleton';

const ProductGrid = ({ products, loading, categories }) => {
    if (loading) {
        return <ProductGridSkeleton count={8} />;
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">محصولی یافت نشد!</h3>
                <p className="text-gray-500">لطفاً فیلترهای دیگری را امتحان کنید.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} categories={categories} />
            ))}
        </div>
    );
};

export default ProductGrid;
