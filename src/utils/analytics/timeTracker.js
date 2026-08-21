// src/utils/analytics/TimeTracker.js
import AnalyticsCore from "./AnalyticsCore.js";

class TimeTracker {
    constructor() {
        this.pageEnterTime = Date.now();
        this.currentPage = window.location.pathname;
        this.intervalId = null;
        this.startTracking();

        window.addEventListener('popstate', () => this.onPageChange());
        window.addEventListener('beforeunload', () => this.onPageLeave());
    }

    startTracking() {
        this.intervalId = setInterval(() => {
            const now = Date.now();
            const spentSeconds = Math.floor((now - this.pageEnterTime) / 1000);
            if (spentSeconds >= 60) {
                AnalyticsCore.trackTimeSpent(this.currentPage, 60);
                this.pageEnterTime = now;
            }
        }, 60000);
    }

    onPageChange() {
        const now = Date.now();
        const spentSeconds = Math.floor((now - this.pageEnterTime) / 1000);
        if (spentSeconds > 0) {
            AnalyticsCore.trackTimeSpent(this.currentPage, spentSeconds);
        }
        this.pageEnterTime = now;
        this.currentPage = window.location.pathname;
    }

    onPageLeave() {
        const now = Date.now();
        const spentSeconds = Math.floor((now - this.pageEnterTime) / 1000);
        if (spentSeconds > 0) {
            AnalyticsCore.trackTimeSpent(this.currentPage, spentSeconds);
        }
    }
}

let _instance = null;
const _handler = {
  get(_, prop) {
    if (!_instance) _instance = new TimeTracker();
    const val = _instance[prop];
    return typeof val === 'function' ? val.bind(_instance) : val;
  }
};
export default new Proxy({}, _handler);
