'use client'
// src/components/common/Shop/ShopPage.jsx
import React from 'react';
import { useShopFilters } from '../../hooks/useShopFilters';
import ShopSidebar from './shopSidebar';
import ProductGrid from './productGrid';
import Pagination from './pagination';

const ShopPage = () => {
    const {
        products,
        loading,
        totalPages,
        currentPage,
        filters,
        categories,
        applyFilters,
        changePage,
        removeFilter,
        clearAllFilters,
    } = useShopFilters(12);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800">فروشگاه</h1>
                    <p className="text-gray-500 mt-2">مجموعه‌ای از بهترین محصولات طبیعی</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <ShopSidebar
                        filters={filters}
                        categories={categories}
                        onApplyFilters={applyFilters}
                        onClearFilters={clearAllFilters}
                        onRemoveFilter={removeFilter}
                    />
                    <div className="flex-1">
                        <ProductGrid products={products || []} loading={loading} categories={categories} />
                        {!loading && totalPages > 1 && (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
