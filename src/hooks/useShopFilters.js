'use client'
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchFilteredProducts } from '../api/services/products.js';
import { fetchCategories } from '../api/services/categories.js';

export const useShopFilters = (itemsPerPage = 12) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(() => {
        const page = Number(searchParams.get('page'));
        return Number.isFinite(page) && page > 1 ? page : 1;
    });
    const [categories, setCategories] = useState([]);

    const readCategoriesFromURL = (params) => (
        params.getAll('category').map(Number).filter((id) => Number.isFinite(id) && id > 0)
    );

    const [filters, setFilters] = useState({
        categories: readCategoriesFromURL(searchParams),
        minPrice: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : null,
        maxPrice: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : null,
        sortBy: searchParams.get('sort_by') || 'default',
        searchTerm: searchParams.get('q') || '',
    });

    useEffect(() => {
        const loadCategories = async () => {
            const cats = await fetchCategories();
            setCategories(cats);
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const q = searchParams.get('q') || '';
        const categoriesFromURL = readCategoriesFromURL(searchParams);
        const minPrice = searchParams.get('min_price') ? Number(searchParams.get('min_price')) : null;
        const maxPrice = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : null;
        const sortBy = searchParams.get('sort_by') || 'default';
        const rawPage = Number(searchParams.get('page'));
        const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

        if (q !== filters.searchTerm) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFilters(prev => ({ ...prev, searchTerm: q }));
        }

        if (JSON.stringify(categoriesFromURL) !== JSON.stringify(filters.categories)) {
            setFilters(prev => ({ ...prev, categories: categoriesFromURL }));
        }

        if (minPrice !== filters.minPrice) {
            setFilters(prev => ({ ...prev, minPrice }));
        }

        if (maxPrice !== filters.maxPrice) {
            setFilters(prev => ({ ...prev, maxPrice }));
        }

        if (sortBy !== filters.sortBy) {
            setFilters(prev => ({ ...prev, sortBy }));
        }

        if (page !== currentPage) {
            setCurrentPage(page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const updateURL = useCallback((newFilters, page) => {
        const params = new URLSearchParams();
        newFilters.categories?.forEach(cat => {
            params.append('category', cat);
        });
        if (newFilters.minPrice) params.set('min_price', newFilters.minPrice);
        if (newFilters.maxPrice) params.set('max_price', newFilters.maxPrice);
        if (newFilters.sortBy && newFilters.sortBy !== 'default') params.set('sort_by', newFilters.sortBy);
        if (newFilters.searchTerm && newFilters.searchTerm.trim() !== '') params.set('q', newFilters.searchTerm);
        if (page && page > 1) params.set('page', page);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, pathname]);

    const fetchProducts = useCallback(async (signal) => {
        setLoading(true);
        try {
            const result = await fetchFilteredProducts(filters, currentPage, itemsPerPage, { signal });
            setProducts(result.products || []);
            setTotalItems(result.total || 0);
            const lastPage = result.totalPages || 1;
            setTotalPages(lastPage);
            if (currentPage > lastPage && lastPage >= 1) {
                setCurrentPage(lastPage);
                updateURL(filters, lastPage);
            }
        } catch (error) {
            if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError') {
                return;
            }
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }, [filters, currentPage, itemsPerPage, updateURL]);

    const applyFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setCurrentPage(1);
        updateURL({ ...filters, ...newFilters }, 1);
    }, [filters, updateURL]);

    const changePage = useCallback((page) => {
        if (page === currentPage) return;
        setCurrentPage(page);
        updateURL(filters, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters, currentPage, updateURL]);

    const removeFilter = useCallback((filterType, value) => {
        if (filterType === 'category') {
            const newCategories = filters.categories.filter(c => c !== value);
            applyFilters({ categories: newCategories });
        } else if (filterType === 'price') {
            applyFilters({ minPrice: null, maxPrice: null });
        } else if (filterType === 'search') {
            applyFilters({ searchTerm: '' });
        }
    }, [filters, applyFilters]);

    const clearAllFilters = useCallback(() => {
        applyFilters({ categories: [], minPrice: null, maxPrice: null, sortBy: 'default', searchTerm: '' });
    }, [applyFilters]);

    const changeSortBy = useCallback((sortBy) => {
        if (sortBy === filters.sortBy) return;
        applyFilters({ sortBy });
    }, [filters.sortBy, applyFilters]);

    useEffect(() => {
        const controller = new AbortController();
        fetchProducts(controller.signal);
        return () => controller.abort();
    }, [fetchProducts]);

    return {
        products,
        loading,
        totalPages,
        totalItems,
        currentPage,
        filters,
        categories,
        applyFilters,
        changePage,
        changeSortBy,
        removeFilter,
        clearAllFilters,
    };
};
