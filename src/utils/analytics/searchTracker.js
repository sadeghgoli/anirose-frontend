// src/utils/analytics/searchTracker.js
import AnalyticsCore from "./AnalyticsCore.js";

export const trackSearch = (searchTerm) => {
    AnalyticsCore.trackSearch(searchTerm);
};