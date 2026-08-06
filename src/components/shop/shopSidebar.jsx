'use client'
// src/components/common/Shop/ShopSidebar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, ChevronUp } from 'react-feather';
import { getPriceRange } from '../../utils/api/shopService/shopService';
import ShopSidebarSkeleton from '../skeleton/Shop/ShopSidebarSkeleton';
import PriceRangeSlider from './priceRangeSlider';

const ShopSidebar = ({ filters, categories, onApplyFilters, onClearFilters }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
    const [loading, setLoading] = useState(true);
    const [openSection, setOpenSection] = useState('category');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [localFilters, setLocalFilters] = useState({
        categories: filters?.categories || [],
        minPrice: filters?.minPrice || null,
        maxPrice: filters?.maxPrice || null,
    });

    useEffect(() => {
        const fetchPriceRange = async () => {
            setLoading(true);
            try {
                const priceData = await getPriceRange();
                setPriceRange(priceData || { min: 0, max: 10000000 });
            } catch (error) {
                console.error("خطا:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPriceRange();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedCategories(filters?.categories || []);
        setLocalFilters({
            categories: filters?.categories || [],
            minPrice: filters?.minPrice || null,
            maxPrice: filters?.maxPrice || null,
        });
    }, [filters]);

    const toggleSection = useCallback((section) => {
        setOpenSection(prev => prev === section ? null : section);
    }, []);

    const handleCategoryToggle = useCallback((categoryId) => {
        setSelectedCategories(prev => {
            const newCategories = prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId];
            setLocalFilters(prevFilters => ({ ...prevFilters, categories: newCategories }));
            return newCategories;
        });
    }, []);

    const handlePriceChange = useCallback(({ minPrice, maxPrice }) => {
        setLocalFilters(prev => ({ ...prev, minPrice, maxPrice }));
    }, []);

    const handleApplyFilters = useCallback(() => {
        onApplyFilters({
            categories: localFilters.categories,
            minPrice: localFilters.minPrice,
            maxPrice: localFilters.maxPrice
        });
        setIsMobileOpen(false);
    }, [onApplyFilters, localFilters]);

    const handleClearFilters = useCallback(() => {
        setSelectedCategories([]);
        setLocalFilters({ categories: [], minPrice: null, maxPrice: null });
        onClearFilters();
    }, [onClearFilters]);

    const handleRemoveFilter = useCallback((type, value) => {
        if (type === 'category') {
            const newCategories = selectedCategories.filter(id => id !== value);
            setSelectedCategories(newCategories);
            setLocalFilters(prev => ({ ...prev, categories: newCategories }));
            onApplyFilters({
                categories: newCategories,
                minPrice: localFilters.minPrice,
                maxPrice: localFilters.maxPrice
            });
        } else if (type === 'price') {
            setLocalFilters(prev => ({ ...prev, minPrice: null, maxPrice: null }));
            onApplyFilters({
                categories: localFilters.categories,
                minPrice: null,
                maxPrice: null
            });
        }
    }, [selectedCategories, localFilters, onApplyFilters]);

    const filterCount = (selectedCategories?.length || 0) + (localFilters.minPrice ? 1 : 0) + (localFilters.maxPrice ? 1 : 0);

    if (loading) return <ShopSidebarSkeleton />;

    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#64a39a] text-white p-4 rounded-full shadow-lg flex items-center gap-2"
            >
                <Filter size={20} />
                <span>فیلتر</span>
                {filterCount > 0 && (
                    <span className="bg-white text-[#64a39a] text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {filterCount}
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

                    {filterCount > 0 && (
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">فیلترهای فعال</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedCategories.map(catId => {
                                    const cat = categories?.find(c => c.id === catId);
                                    return cat && (
                                        <span key={cat.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                            {cat.name}
                                            <button onClick={() => handleRemoveFilter('category', cat.id)} className="hover:text-red-500">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    );
                                })}
                                {(localFilters.minPrice || localFilters.maxPrice) && (
                                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        {localFilters.minPrice && `از ${localFilters.minPrice.toLocaleString()}`}
                                        {localFilters.minPrice && localFilters.maxPrice && ' تا '}
                                        {localFilters.maxPrice && `تا ${localFilters.maxPrice.toLocaleString()}`} تومان
                                        <button onClick={() => handleRemoveFilter('price')} className="hover:text-red-500">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                <button onClick={handleClearFilters} className="text-xs text-red-500 hover:underline">
                                    حذف همه
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <button
                            onClick={() => toggleSection('category')}
                            className="flex justify-between items-center w-full text-right group"
                        >
                            <h4 className="font-semibold text-gray-800 text-base">دسته بندی محصولات</h4>
                            <span className="text-gray-400 group-hover:text-[#64a39a] transition-colors">
                                {openSection === 'category' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </span>
                        </button>
                        {openSection === 'category' && (
                            <ul className="mt-3 space-y-2 max-h-[250px] overflow-y-auto scrollbar-thin">
                                {categories?.map(cat => (
                                    <li key={cat.id}>
                                        <label className="flex items-center justify-between gap-2 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-gray-50">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(cat.id)}
                                                    onChange={() => handleCategoryToggle(cat.id)}
                                                    className="w-4 h-4 rounded accent-[#64a39a]"
                                                />
                                                <span className="text-sm text-gray-600">{cat.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count || 0}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <PriceRangeSlider
                        isOpen={openSection === 'price'}
                        onToggle={() => toggleSection('price')}
                        minPrice={localFilters.minPrice}
                        maxPrice={localFilters.maxPrice}
                        onPriceChange={handlePriceChange}
                        priceRange={priceRange}
                    />

                    <button
                        onClick={handleApplyFilters}
                        className="w-full bg-[#0C5505] text-white py-3 rounded-lg font-semibold hover:bg-[#0a4a04] transition-colors mt-4"
                    >
                        اعمال فیلتر ({filterCount})
                    </button>
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
                                    <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                                        <X size={20} />
                                    </button>
                                </div>

                                {filterCount > 0 && (
                                    <div className="border-b border-gray-200 pb-4 mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">فیلترهای فعال</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCategories.map(catId => {
                                                const cat = categories?.find(c => c.id === catId);
                                                return cat && (
                                                    <span key={cat.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                        {cat.name}
                                                        <button onClick={() => handleRemoveFilter('category', cat.id)} className="hover:text-red-500">
                                                            <X size={12} />
                                                        </button>
                                                    </span>
                                                );
                                            })}
                                            {(localFilters.minPrice || localFilters.maxPrice) && (
                                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                    {localFilters.minPrice && `از ${localFilters.minPrice.toLocaleString()}`}
                                                    {localFilters.minPrice && localFilters.maxPrice && ' تا '}
                                                    {localFilters.maxPrice && `تا ${localFilters.maxPrice.toLocaleString()}`} تومان
                                                    <button onClick={() => handleRemoveFilter('price')} className="hover:text-red-500">
                                                        <X size={12} />
                                                    </button>
                                                </span>
                                            )}
                                            <button onClick={handleClearFilters} className="text-xs text-red-500 hover:underline">
                                                حذف همه
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="border-b border-gray-200 pb-4 mb-4">
                                    <button
                                        onClick={() => toggleSection('category')}
                                        className="flex justify-between items-center w-full text-right group"
                                    >
                                        <h4 className="font-semibold text-gray-800 text-base">دسته بندی محصولات</h4>
                                        <span className="text-gray-400 group-hover:text-[#64a39a] transition-colors">
                                            {openSection === 'category' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </span>
                                    </button>
                                    {openSection === 'category' && (
                                        <ul className="mt-3 space-y-2 max-h-[250px] overflow-y-auto scrollbar-thin">
                                            {categories?.map(cat => (
                                                <li key={cat.id}>
                                                    <label className="flex items-center justify-between gap-2 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-gray-50">
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedCategories.includes(cat.id)}
                                                                onChange={() => handleCategoryToggle(cat.id)}
                                                                className="w-4 h-4 rounded accent-[#64a39a]"
                                                            />
                                                            <span className="text-sm text-gray-600">{cat.name}</span>
                                                        </div>
                                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count || 0}</span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <PriceRangeSlider
                                    isOpen={openSection === 'price'}
                                    onToggle={() => toggleSection('price')}
                                    minPrice={localFilters.minPrice}
                                    maxPrice={localFilters.maxPrice}
                                    onPriceChange={handlePriceChange}
                                    priceRange={priceRange}
                                />

                                <button
                                    onClick={handleApplyFilters}
                                    className="w-full bg-[#0C5505] text-white py-3 rounded-lg font-semibold hover:bg-[#0a4a04] transition-colors mt-4"
                                >
                                    اعمال فیلتر ({filterCount})
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ShopSidebar;
