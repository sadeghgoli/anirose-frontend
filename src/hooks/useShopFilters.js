'use client'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetchFilteredProducts } from '../api/services/products.js';
import { fetchCategories } from '../api/services/categories.js';
import { parseShopQuery, shopHref } from '../utils/shopQuery.js';

export const useShopFilters = (itemsPerPage = 12) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const query = useMemo(() => parseShopQuery(searchParams), [searchParams]);
    const queryKey = useMemo(() => shopHref(query, pathname), [query, pathname]);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [categories, setCategories] = useState([]);

    const setQuery = useCallback((next, { replace = false } = {}) => {
        const current = parseShopQuery(searchParams);
        const merged = { ...current, ...next };
        const href = shopHref(merged, pathname);
        if (href === shopHref(current, pathname)) return;
        if (replace) {
            router.replace(href, { scroll: false });
        } else {
            router.push(href, { scroll: false });
        }
    }, [pathname, router, searchParams]);

    useEffect(() => {
        let cancelled = false;
        fetchCategories()
            .then((cats) => {
                if (!cancelled) setCategories(cats);
            })
            .catch(() => {
                if (!cancelled) setCategories([]);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let cancelled = false;
        const currentQuery = parseShopQuery(new URL(queryKey, 'http://localhost').searchParams);

        const load = async () => {
            setLoading(true);
            try {
                const result = await fetchFilteredProducts(currentQuery, currentQuery.page, itemsPerPage, {
                    signal: controller.signal,
                });
                if (cancelled) return;
                setProducts(result.products || []);
                setTotalItems(result.total || 0);
                const lastPage = Math.max(1, result.totalPages || 1);
                setTotalPages(lastPage);
                if (currentQuery.page > lastPage) {
                    const href = shopHref({ ...currentQuery, page: lastPage }, pathname);
                    router.replace(href, { scroll: false });
                }
            } catch (error) {
                if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError') {
                    return;
                }
                if (!cancelled) {
                    setProducts([]);
                    setTotalItems(0);
                    setTotalPages(1);
                }
            } finally {
                if (!cancelled && !controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        load();
        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [queryKey, itemsPerPage, pathname, router]);

    const applyFilters = useCallback((partial) => {
        setQuery({ ...partial, page: 1 });
    }, [setQuery]);

    const changePage = useCallback((page) => {
        const next = Number(page);
        if (!Number.isInteger(next) || next < 1) return;
        setQuery({ page: next });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setQuery]);

    const removeFilter = useCallback((filterType, value) => {
        if (filterType === 'category') {
            setQuery({
                categories: parseShopQuery(searchParams).categories.filter((id) => id !== Number(value)),
                page: 1,
            });
        } else if (filterType === 'price') {
            setQuery({ minPrice: null, maxPrice: null, page: 1 });
        } else if (filterType === 'search') {
            setQuery({ searchTerm: '', page: 1 });
        }
    }, [searchParams, setQuery]);

    const clearAllFilters = useCallback(() => {
        setQuery({
            categories: [],
            minPrice: null,
            maxPrice: null,
            sortBy: 'default',
            searchTerm: '',
            page: 1,
        });
    }, [setQuery]);

    const changeSortBy = useCallback((sortBy) => {
        setQuery({ sortBy, page: 1 });
    }, [setQuery]);

    const buildPageHref = useCallback((page) => shopHref({ ...query, page }, pathname), [pathname, query]);

    return {
        products,
        loading,
        totalPages,
        totalItems,
        currentPage: query.page,
        filters: query,
        categories,
        applyFilters,
        changePage,
        changeSortBy,
        removeFilter,
        clearAllFilters,
        buildPageHref,
    };
};
