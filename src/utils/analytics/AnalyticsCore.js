// src/utils/analytics/AnalyticsCore.js
import { ANALYTICS_CONFIG } from './config';

class AnalyticsCore {
    constructor() {
        this.data = {
            pageViews: {},
            productViews: {},
            searches: {},
            clicks: {},
            clicksDetails: [],
            timeSpent: {}
        };
        this.sessionStartTime = Date.now();
        this.currentPage = window.location.pathname;
        this.is404Page = this.currentPage === '/404' || this.currentPage.includes('404');
        this.recordedSearches = new Set();
        this.lastSearchTerm = '';
        this.lastSearchTime = 0;
        this.startAutoLogging();
    }

    addPageView(page) {
        if (page === '/404' || page.includes('404')) return;
        if (!this.data.pageViews[page]) {
            this.data.pageViews[page] = 0;
        }
        this.data.pageViews[page]++;
        this.saveToLocalStorage();
    }

    trackProductView(productId, productName) {
        if (this.is404Page) return;
        const id = String(productId);
        if (!this.data.productViews[id]) {
            this.data.productViews[id] = { count: 0, name: productName };
        }
        this.data.productViews[id].count++;
        this.saveToLocalStorage();
    }

    trackSearch(searchTerm) {
        if (this.is404Page) return;

        let term = searchTerm.trim().toLowerCase();
        if (!term) return;

        term = decodeURIComponent(term).replace(/[^\u0600-\u06FF\uFB8A\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\s\w]/g, '');

        const now = Date.now();
        if (this.lastSearchTerm === term && (now - this.lastSearchTime) < 1000) {
            return;
        }

        this.lastSearchTerm = term;
        this.lastSearchTime = now;

        const searchKey = term + '_' + this.getSessionId();
        if (this.recordedSearches.has(searchKey)) return;
        this.recordedSearches.add(searchKey);

        if (!this.data.searches[term]) {
            this.data.searches[term] = 0;
        }
        this.data.searches[term]++;
        this.saveToLocalStorage();
    }

    trackClick(href, linkText = '') {
        if (this.is404Page) return;
        if (!href || href === '#' || href === 'javascript:void(0)') return;
        if (href.includes('/404')) return;

        if (!this.data.clicks[href]) {
            this.data.clicks[href] = 0;
        }
        this.data.clicks[href]++;

        this.data.clicksDetails.unshift({
            href: href,
            text: linkText,
            timestamp: new Date().toISOString(),
            page: this.currentPage
        });

        if (this.data.clicksDetails.length > 100) {
            this.data.clicksDetails.pop();
        }

        this.saveToLocalStorage();
    }

    trackTimeSpent(page, seconds) {
        if (page === '/404' || page.includes('404')) return;

        if (!this.data.timeSpent[page]) {
            this.data.timeSpent[page] = 0;
        }
        this.data.timeSpent[page] += seconds;
        this.saveToLocalStorage();
    }

    startAutoLogging() {
        const interval = ANALYTICS_CONFIG.IS_TEST_MODE
            ? ANALYTICS_CONFIG.LOG_INTERVAL.TEST
            : ANALYTICS_CONFIG.LOG_INTERVAL.PRODUCTION;

        setInterval(() => {
            this.printSummaryLog();
        }, interval);
    }

    printSummaryLog() {
        // گزارش‌های آماری جهت بررسی دستی (در حالت تست)
    }

    getTopPages(limit = 2) {
        const entries = Object.entries(this.data.pageViews);
        entries.sort((a, b) => b[1] - a[1]);
        return entries.slice(0, limit).map(([name, count]) => ({ name, count }));
    }

    getTopProducts(limit = 2) {
        const entries = Object.entries(this.data.productViews);
        entries.sort((a, b) => b[1].count - a[1].count);
        return entries.slice(0, limit).map(([id, data]) => ({
            productId: id,
            productName: data.name,
            views: data.count
        }));
    }

    getTopClicks(limit = 2) {
        const entries = Object.entries(this.data.clicks);
        entries.sort((a, b) => b[1] - a[1]);
        return entries.slice(0, limit).map(([name, count]) => ({ name, count }));
    }

    getTopSearches(limit = 2) {
        const entries = Object.entries(this.data.searches);
        entries.sort((a, b) => b[1] - a[1]);
        return entries.slice(0, limit).map(([name, count]) => ({ name, count }));
    }

    getTopTimePages(limit = 2) {
        const entries = Object.entries(this.data.timeSpent);
        entries.sort((a, b) => b[1] - a[1]);
        return entries.slice(0, limit).map(([name, seconds]) => ({ name, seconds }));
    }

    getTotalPageViews() {
        return Object.values(this.data.pageViews).reduce((a, b) => a + b, 0);
    }

    getTotalProductViews() {
        return Object.values(this.data.productViews).reduce((a, b) => a + b.count, 0);
    }

    getTotalClicks() {
        return Object.values(this.data.clicks).reduce((a, b) => a + b, 0);
    }

    getTotalSearches() {
        return Object.values(this.data.searches).reduce((a, b) => a + b, 0);
    }

    // ✅ متد جدید - گرفتن همه ۲ تای برتر
    getTopAnalytics() {
        return {
            topPages: this.getTopPages(2),
            topProducts: this.getTopProducts(2),
            topClicks: this.getTopClicks(2),
            topSearches: this.getTopSearches(2),
            topTimeSpentPages: this.getTopTimePages(2),
            summary: {
                totalPageViews: this.getTotalPageViews(),
                totalProductViews: this.getTotalProductViews(),
                totalClicks: this.getTotalClicks(),
                totalSearches: this.getTotalSearches()
            }
        };
    }

    saveToLocalStorage() {
        localStorage.setItem(ANALYTICS_CONFIG.STORAGE_KEYS.PAGE_VIEWS, JSON.stringify(this.data.pageViews));
        localStorage.setItem(ANALYTICS_CONFIG.STORAGE_KEYS.PRODUCT_VIEWS, JSON.stringify(this.data.productViews));
        localStorage.setItem(ANALYTICS_CONFIG.STORAGE_KEYS.SEARCHES, JSON.stringify(this.data.searches));
        localStorage.setItem(ANALYTICS_CONFIG.STORAGE_KEYS.CLICKS, JSON.stringify(this.data.clicks));
        localStorage.setItem(ANALYTICS_CONFIG.STORAGE_KEYS.TIME_SPENT, JSON.stringify(this.data.timeSpent));
    }

    loadFromLocalStorage() {
        const savedPageViews = localStorage.getItem(ANALYTICS_CONFIG.STORAGE_KEYS.PAGE_VIEWS);
        const savedProductViews = localStorage.getItem(ANALYTICS_CONFIG.STORAGE_KEYS.PRODUCT_VIEWS);
        const savedSearches = localStorage.getItem(ANALYTICS_CONFIG.STORAGE_KEYS.SEARCHES);
        const savedClicks = localStorage.getItem(ANALYTICS_CONFIG.STORAGE_KEYS.CLICKS);
        const savedTimeSpent = localStorage.getItem(ANALYTICS_CONFIG.STORAGE_KEYS.TIME_SPENT);
        if (savedPageViews) this.data.pageViews = JSON.parse(savedPageViews);
        if (savedProductViews) this.data.productViews = JSON.parse(savedProductViews);
        if (savedSearches) this.data.searches = JSON.parse(savedSearches);
        if (savedClicks) this.data.clicks = JSON.parse(savedClicks);
        if (savedTimeSpent) this.data.timeSpent = JSON.parse(savedTimeSpent);
    }

    getFullData() {
        return {
            timestamp: new Date().toISOString(),
            sessionId: this.getSessionId(),
            topPages: this.getTopPages(ANALYTICS_CONFIG.TOP_ITEMS_LIMIT),
            topProducts: this.getTopProducts(ANALYTICS_CONFIG.TOP_ITEMS_LIMIT),
            topSearches: this.getTopSearches(ANALYTICS_CONFIG.TOP_ITEMS_LIMIT),
            topClicks: this.getTopClicks(ANALYTICS_CONFIG.TOP_ITEMS_LIMIT),
            topTimeSpentPages: this.getTopTimePages(ANALYTICS_CONFIG.TOP_ITEMS_LIMIT),
            totalPageViews: this.getTotalPageViews(),
            totalProductViews: this.getTotalProductViews(),
            totalClicks: this.getTotalClicks(),
            totalSearches: this.getTotalSearches(),
            isTest: ANALYTICS_CONFIG.IS_TEST_MODE
        };
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 10);
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    }

    getSummary() {
        return {
            totalPageViews: this.getTotalPageViews(),
            totalProductViews: this.getTotalProductViews(),
            totalSearches: this.getTotalSearches(),
            totalClicks: this.getTotalClicks(),
            topPages: this.getTopPages(2),
            topProducts: this.getTopProducts(2),
            topSearches: this.getTopSearches(2),
            topClicks: this.getTopClicks(2),
            topTimePages: this.getTopTimePages(2)
        };
    }

    resetData() {
        this.data = {
            pageViews: {},
            productViews: {},
            searches: {},
            clicks: {},
            clicksDetails: [],
            timeSpent: {}
        };
        this.recordedSearches.clear();
        this.lastSearchTerm = '';
        this.lastSearchTime = 0;
        this.saveToLocalStorage();
    }
}

let _instance = null;
const _handler = {
  get(_, prop) {
    if (!_instance) _instance = new AnalyticsCore();
    const val = _instance[prop];
    return typeof val === 'function' ? val.bind(_instance) : val;
  },
  set(_, prop, value) {
    if (!_instance) _instance = new AnalyticsCore();
    _instance[prop] = value;
    return true;
  }
};
export default new Proxy({}, _handler);
