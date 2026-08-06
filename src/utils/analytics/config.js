// src/utils/analytics/config.js

export const ANALYTICS_CONFIG = {
    TOP_ITEMS_LIMIT: 2,
    SEND_INTERVAL: {
        TEST: 30000,
        PRODUCTION: 43200000
    },
    LOG_INTERVAL: {
        TEST: 60000,
        PRODUCTION: 300000
    },
    IS_TEST_MODE: false,
    STORAGE_KEYS: {
        PAGE_VIEWS: 'analytics_page_views',
        PRODUCT_VIEWS: 'analytics_product_views',
        SEARCHES: 'analytics_searches',
        CLICKS: 'analytics_clicks',
        TIME_SPENT: 'analytics_time_spent',
        LAST_SENT: 'analytics_last_sent'
    }
};