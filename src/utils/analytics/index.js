// src/utils/analytics/index.js
import AnalyticsCore from "./AnalyticsCore.js";
import AnalyticsSender from "./AnalyticsSender.js";
import TimeTracker from "./timeTracker.js";
import ClickTracker from "./clickTracker.js";
import { ANALYTICS_CONFIG } from "./config.js";

let isInitialized = false;

const initAnalytics = () => {
    if (isInitialized) return;
    isInitialized = true;

    AnalyticsCore.loadFromLocalStorage();

    const path = window.location.pathname;
    const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';

    // چک می‌کنیم آیا این صفحه در این Session دیده شده است؟
    const pageSeenKey = `analytics_page_seen_${path}`;
    const hasSeenPage = sessionStorage.getItem(pageSeenKey);

    if (!hasSeenPage) {
        // اگر دیده نشده، ثبت کن
        sessionStorage.setItem(pageSeenKey, 'true');
        // مستقیماً داده را اضافه کن تا از چک تکراری بودن AnalyticsCore دور بزنیم
        if (!AnalyticsCore.data.pageViews[path]) {
            AnalyticsCore.data.pageViews[path] = 0;
        }
        AnalyticsCore.data.pageViews[path]++;
        AnalyticsCore.saveToLocalStorage();
    } else {
        // اگر دیده شده، اما رفرش است، ثبت کن
        if (isReload) {
            if (!AnalyticsCore.data.pageViews[path]) {
                AnalyticsCore.data.pageViews[path] = 0;
            }
            AnalyticsCore.data.pageViews[path]++;
            AnalyticsCore.saveToLocalStorage();
        }
    }
};

export {
    initAnalytics,
    AnalyticsCore,
    AnalyticsSender,
    TimeTracker
};
export { trackProductView } from "./productViewTracker.js";
export { trackSearch } from "./searchTracker.js";

