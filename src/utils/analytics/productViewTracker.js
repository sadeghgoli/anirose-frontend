// src/utils/analytics/productViewTracker.js
import AnalyticsCore from "./AnalyticsCore.js";

export const trackProductView = (productId, productName) => {
    AnalyticsCore.trackProductView(productId, productName);
};