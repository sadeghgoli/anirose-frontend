'use client'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchFilteredProducts } from '../api/services/products.js';
import { fetchCategories } from '../api/services/categories.js';

const parseCategories = (searchParams) =>
    searchParams
        .getAll('category')
        .map(Number)
        .filter((id) => Number.isFinite(id) && id > 0);

const parseOptionalNumber = (value) => {
    if (value == null || value === '') return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

const parseFiltersFromSearchParams = (searchParams) => ({
    categories: parseCategories(searchParams),
    minPrice: parseOptionalNumber(searchParams.get('min_price')),
    maxPrice: parseOptionalNumber(searchParams.get('max_price')),
    sortBy: searchParams.get('sort_by') || 'default',
    searchTerm: searchParams.get('q') || '',
});

const parsePage = (searchParams) => {
    const parsed = Number(searchParams.get('page'));
    if (!Number.isFinite(parsed) || parsed < 1) return 1;
    return Math.floor(parsed);
};

const buildShopSearchParams = (filters, page, extraName) => {
    const params = new URLSearchParams();
    if (extraName) params.set('name', extraName);
    (filters.categories || [])
        .filter((id) => Number.isFinite(id) && id > 0)
        .forEach((cat) => params.append('category', String(cat)));
    if (filters.minPrice != null) params.set('min_price', String(filters.minPrice));
    if (filters.maxPrice != null) params.set('max_price', String(filters.maxPrice));
    if (filters.sortBy && filters.sortBy !== 'default') params.set('sort_by', filters.sortBy);
    if (filters.searchTerm && filters.searchTerm.trim() !== '') params.set('q', filters.searchTerm.trim());
    if (page && page > 1) params.set('page', String(page));
    return params;
};

export const useShopFilters = (itemsPerPage = 12) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const requestIdRef = useRef(0);

    const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams]);
    const currentPage = useMemo(() => parsePage(searchParams), [searchParams]);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const cats = await fetchCategories();
            setCategories(cats);
        };
        loadCategories();
    }, []);

    const updateURL = useCallback((newFilters, page) => {
        const params = buildShopSearchParams(newFilters, page, searchParams.get('name'));
        const qs = params.toString();
        const next = qs ? `${pathname}?${qs}` : pathname;
        const currentQs = searchParams.toString();
        const current = currentQs ? `${pathname}?${currentQs}` : pathname;
        if (next === current) return;
        router.replace(next, { scroll: false });
    }, [router, pathname, searchParams]);

    useEffect(() => {
        const requestId = ++requestIdRef.current;
        const controller = new AbortController();
        setLoading(true);

        fetchFilteredProducts(filters, currentPage, itemsPerPage, { signal: controller.signal })
            .then((result) => {
                if (requestId !== requestIdRef.current) return;
                setProducts(result.products || []);
                setTotalItems(result.total || 0);
                setTotalPages(result.totalPages || 1);
            })
            .catch((error) => {
                if (controller.signal.aborted || error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError') {
                    return;
                }
                if (requestId !== requestIdRef.current) return;
                console.error('Error fetching products:', error);
                setProducts([]);
            })
            .finally(() => {
                if (requestId !== requestIdRef.current) return;
                setLoading(false);
            });

        return () => {
            requestIdRef.current += 1;
            controller.abort();
        };
    }, [filters, currentPage, itemsPerPage]);

    const applyFilters = useCallback((newFilters) => {
        updateURL({ ...filters, ...newFilters }, 1);
    }, [filters, updateURL]);

    const changePage = useCallback((page) => {
        const nextPage = Math.floor(Number(page));
        if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage === currentPage) return;
        updateURL(filters, nextPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters, currentPage, updateURL]);

    const removeFilter = useCallback((filterType, value) => {
        if (filterType === 'category') {
            applyFilters({ categories: filters.categories.filter((c) => c !== value) });
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
    }, [filters, applyFilters]);

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
