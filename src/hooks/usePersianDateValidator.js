// تبدیل تاریخ شمسی به عدد روز ژولیوسی (برای مقایسه)
const persianToJulian = (year, month, day) => {
    const y = year - 1300;
    let jd = 0;
    // محاسبه ساده برای مقایسه (معتبر برای سال‌های 1300 تا 1500)
    const monthDays = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    // اصلاح برای سال کبیسه (سال‌هایی که بر 33 بخش‌پذیر نباشند و...)
    const isLeap = (year % 33 === 1 || year % 33 === 5 || year % 33 === 9 ||
        year % 33 === 13 || year % 33 === 17 || year % 33 === 22 ||
        year % 33 === 26 || year % 33 === 30);
    monthDays[12] = isLeap ? 30 : 29;

    jd = (y - 1) * 365 + Math.floor((y - 1) / 4) - Math.floor((y - 1) / 100) + Math.floor((y - 1) / 400);
    for (let i = 1; i < month; i++) jd += monthDays[i];
    jd += day;
    return jd;
};

export const usePersianDateValidator = () => {
    const isValidPersianDate = (dateStr) => {
        if (!dateStr || typeof dateStr !== 'string') return false;

        const regex = /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
        if (!regex.test(dateStr)) return false;

        let [year, month, day] = dateStr.split('/').map(Number);

        // بررسی طول ماه‌ها در تقویم شمسی
        const monthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        // تشخیص سال کبیسه شمسی (قاعده ۳۳ ساله)
        const isLeap = (year % 33 === 1 || year % 33 === 5 || year % 33 === 9 ||
            year % 33 === 13 || year % 33 === 17 || year % 33 === 22 ||
            year % 33 === 26 || year % 33 === 30);
        if (month === 12) {
            if (day > (isLeap ? 30 : 29)) return false;
        } else {
            if (day > monthLengths[month-1]) return false;
        }

        // مقایسه با تاریخ امروز
        const today = new Date();
        const todayJalali = gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const inputJulian = persianToJulian(year, month, day);
        const todayJulian = persianToJulian(todayJalali[0], todayJalali[1], todayJalali[2]);

        return inputJulian >= todayJulian;
    };

    return { isValidPersianDate };
};

// تبدیل میلادی به شمسی (برای گرفتن تاریخ امروز)
function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    let jy = -1595 + (33 * Math.floor(days / 12053));
    days %= 12053;
    let jm = Math.floor(days / 31);
    days %= 31;
    let jd = days + 1;
    if (jm > 6) {
        jm = 6;
        jd = days - 186 + 1;
    }
    if (jm > 6) {
        jm = 7;
        jd = days - 186 + 1;
    }
    return [jy, jm, jd];
}