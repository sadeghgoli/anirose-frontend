'use client'
import React, { useEffect, useRef } from 'react';
import { useShopFilters } from '../../hooks/useShopFilters';
import { SORT_OPTIONS } from '../../utils/shopQuery';
import ShopSidebar from './shopSidebar';
import ProductGrid from './productGrid';
import Pagination from './pagination';

const ShopPage = () => {
    const {
        products,
        loading,
        totalPages,
        totalItems,
        currentPage,
        filters,
        categories,
        applyFilters,
        changeSortBy,
        removeFilter,
        clearAllFilters,
        buildPageHref,
    } = useShopFilters(12);

    const skipScroll = useRef(true);
    useEffect(() => {
        if (skipScroll.current) {
            skipScroll.current = false;
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <p className="text-sm text-gray-500">
                                {loading ? 'در حال بارگذاری...' : `${totalItems.toLocaleString('fa-IR')} محصول`}
                            </p>
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <span>مرتب‌سازی</span>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => changeSortBy(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0C5505]/20 focus:border-[#0C5505]"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <ProductGrid products={products || []} loading={loading} categories={categories} />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                buildHref={buildPageHref}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
