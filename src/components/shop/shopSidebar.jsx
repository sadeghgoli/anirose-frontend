'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, ChevronUp } from 'react-feather';
import { getPriceRange } from '../../utils/api/shopService/shopService';
import PriceRangeSlider from './priceRangeSlider';

const FilterPanel = ({
    draft,
    applied,
    categories,
    priceRange,
    openSection,
    onToggleSection,
    onToggleCategory,
    onPriceChange,
    onApply,
    onClear,
    onRemoveApplied,
}) => {
    const appliedCount = (applied.categories?.length || 0)
        + (applied.minPrice != null ? 1 : 0)
        + (applied.maxPrice != null ? 1 : 0)
        + (applied.searchTerm ? 1 : 0);
    const draftCount = (draft.categories?.length || 0)
        + (draft.minPrice != null ? 1 : 0)
        + (draft.maxPrice != null ? 1 : 0);

    return (
        <>
            {appliedCount > 0 && (
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">فیلترهای فعال</h4>
                    <div className="flex flex-wrap gap-2">
                        {applied.searchTerm && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                جستجو: {applied.searchTerm}
                                <button type="button" onClick={() => onRemoveApplied('search')} className="hover:text-red-500" aria-label="حذف جستجو">
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                        {applied.categories.map((catId) => {
                            const cat = categories?.find((c) => c.id === catId);
                            return cat ? (
                                <span key={cat.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    {cat.name}
                                    <button type="button" onClick={() => onRemoveApplied('category', cat.id)} className="hover:text-red-500" aria-label={`حذف فیلتر ${cat.name}`}>
                                        <X size={12} />
                                    </button>
                                </span>
                            ) : null;
                        })}
                        {(applied.minPrice != null || applied.maxPrice != null) && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                {applied.minPrice != null && `از ${applied.minPrice.toLocaleString('fa-IR')}`}
                                {applied.minPrice != null && applied.maxPrice != null && ' تا '}
                                {applied.maxPrice != null && `تا ${applied.maxPrice.toLocaleString('fa-IR')}`} تومان
                                <button type="button" onClick={() => onRemoveApplied('price')} className="hover:text-red-500" aria-label="حذف فیلتر قیمت">
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                        <button type="button" onClick={onClear} className="text-xs text-red-500 hover:underline">
                            حذف همه
                        </button>
                    </div>
                </div>
            )}

            <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                    type="button"
                    onClick={() => onToggleSection('category')}
                    className="flex justify-between items-center w-full text-right group"
                >
                    <h4 className="font-semibold text-gray-800 text-base">دسته بندی محصولات</h4>
                    <span className="text-gray-400 group-hover:text-[#64a39a] transition-colors">
                        {openSection === 'category' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                </button>
                {openSection === 'category' && (
                    <ul className="mt-3 space-y-2 max-h-[250px] overflow-y-auto scrollbar-thin">
                        {categories?.map((cat) => (
                            <li key={cat.id}>
                                <label className="flex items-center justify-between gap-2 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={draft.categories.includes(Number(cat.id))}
                                            onChange={() => onToggleCategory(Number(cat.id))}
                                            className="w-4 h-4 rounded accent-[#64a39a]"
                                        />
                                        <span className="text-sm text-gray-600">{cat.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {cat.products_count || 0}
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <PriceRangeSlider
                isOpen={openSection === 'price'}
                onToggle={() => onToggleSection('price')}
                minPrice={draft.minPrice}
                maxPrice={draft.maxPrice}
                onPriceChange={onPriceChange}
                priceRange={priceRange}
            />

            <button
                type="button"
                onClick={onApply}
                className="w-full bg-[#0C5505] text-white py-3 rounded-lg font-semibold hover:bg-[#0a4a04] transition-colors mt-4"
            >
                اعمال فیلتر ({draftCount})
            </button>
        </>
    );
};

const ShopSidebar = ({ filters, categories, onApplyFilters, onClearFilters, onRemoveFilter }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
    const [openSection, setOpenSection] = useState('category');
    const [draft, setDraft] = useState({
        categories: filters?.categories || [],
        minPrice: filters?.minPrice ?? null,
        maxPrice: filters?.maxPrice ?? null,
    });

    useEffect(() => {
        getPriceRange()
            .then((priceData) => setPriceRange(priceData || { min: 0, max: 10000000 }))
            .catch(() => {});
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDraft({
            categories: filters?.categories || [],
            minPrice: filters?.minPrice ?? null,
            maxPrice: filters?.maxPrice ?? null,
        });
    }, [filters?.categories, filters?.minPrice, filters?.maxPrice]);

    const toggleSection = useCallback((section) => {
        setOpenSection((prev) => (prev === section ? null : section));
    }, []);

    const handleCategoryToggle = useCallback((categoryId) => {
        setDraft((prev) => {
            const exists = prev.categories.includes(categoryId);
            const categoriesNext = exists
                ? prev.categories.filter((id) => id !== categoryId)
                : [...prev.categories, categoryId];
            return { ...prev, categories: categoriesNext };
        });
    }, []);

    const handlePriceChange = useCallback(({ minPrice, maxPrice }) => {
        setDraft((prev) => ({ ...prev, minPrice, maxPrice }));
    }, []);

    const handleApply = useCallback(() => {
        onApplyFilters({
            categories: draft.categories,
            minPrice: draft.minPrice,
            maxPrice: draft.maxPrice,
        });
        setIsMobileOpen(false);
    }, [draft, onApplyFilters]);

    const panelProps = {
        draft,
        applied: filters,
        categories,
        priceRange,
        openSection,
        onToggleSection: toggleSection,
        onToggleCategory: handleCategoryToggle,
        onPriceChange: handlePriceChange,
        onApply: handleApply,
        onClear: onClearFilters,
        onRemoveApplied: onRemoveFilter,
    };

    const appliedCount = (filters.categories?.length || 0)
        + (filters.minPrice != null ? 1 : 0)
        + (filters.maxPrice != null ? 1 : 0)
        + (filters.searchTerm ? 1 : 0);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#64a39a] text-white p-4 rounded-full shadow-lg flex items-center gap-2"
            >
                <Filter size={20} />
                <span>فیلتر</span>
                {appliedCount > 0 && (
                    <span className="bg-white text-[#64a39a] text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {appliedCount}
                    </span>
                )}
            </button>

            <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-md p-5 sticky top-3 border border-gray-100 max-h-[calc(100vh-2rem)] overflow-y-auto">
                    <div className="flex items-center gap-3 mb-5 p-4 rounded-lg border-b border-gray-200 bg-gray-300">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <Filter size={24} className="text-black" fill="currentColor" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">فیلتر محصولات</h3>
                    </div>
                    <FilterPanel {...panelProps} />
                </div>
            </div>

            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-xl"
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-800">فیلتر محصولات</h3>
                                    <button type="button" onClick={() => setIsMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="بستن فیلترها">
                                        <X size={20} />
                                    </button>
                                </div>
                                <FilterPanel {...panelProps} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ShopSidebar;
