// src/utils/analytics/clickTracker.js
import AnalyticsCore from "./AnalyticsCore.js";

class ClickTracker {
    constructor() {
        this.initClickTracking();
    }

    initClickTracking() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link && link.href) {
                if (link.href.includes('/404')) return;
                if (!link.href || link.href === '#' || link.href === 'javascript:void(0)') return;

                let linkText = link.innerText?.trim();
                if (!linkText) {
                    const img = link.querySelector('img');
                    linkText = img?.alt || 'لینک بدون متن';
                }

                AnalyticsCore.trackClick(link.href, linkText);
            }
        });
    }
}

let _instance = null;
const _handler = {
  get(_, prop) {
    if (!_instance) _instance = new ClickTracker();
    const val = _instance[prop];
    return typeof val === 'function' ? val.bind(_instance) : val;
  }
};
export default new Proxy({}, _handler);
