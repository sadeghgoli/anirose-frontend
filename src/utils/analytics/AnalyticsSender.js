import axiosInstance from "../../api/axios.js";
import { API_ENDPOINTS } from "../../api/config.js";
import AnalyticsCore from "./AnalyticsCore.js";
import { ANALYTICS_CONFIG } from "./config.js";

class AnalyticsSender {
    constructor() {
        this.intervalId = null;
        this.startSending();
    }

    startSending() {
        const interval = ANALYTICS_CONFIG.IS_TEST_MODE
            ? ANALYTICS_CONFIG.SEND_INTERVAL.TEST
            : ANALYTICS_CONFIG.SEND_INTERVAL.PRODUCTION;

        this.intervalId = setInterval(() => {
            this.sendData();
        }, interval);
    }

    async sendData() {
        const data = AnalyticsCore.getFullData();

        if (data.topPages.length === 0 && data.topProducts.length === 0) {
            return;
        }

        try {
            await axiosInstance.post(API_ENDPOINTS.analytics.collect, data);
            AnalyticsCore.resetData();
        } catch (error) {
            console.error("❌ خطا در ارسال دیتا:", error.message);
        }
    }

    async sendManually() {
        await this.sendData();
    }
}

let _instance = null;
const _handler = {
  get(_, prop) {
    if (!_instance) _instance = new AnalyticsSender();
    const val = _instance[prop];
    return typeof val === 'function' ? val.bind(_instance) : val;
  }
};
export default new Proxy({}, _handler);
