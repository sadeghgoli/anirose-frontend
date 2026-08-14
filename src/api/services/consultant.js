const MOCK_CONSULTANT = {
  consultant: {
    id: 1,
    name: 'دکتر علیرضا احمدی',
    title: 'مشاور تغذیه و سلامت',
    avatar: '/images/test/doctor-avatar.jpg',
    rating: 5,
    reviewCount: 342,
    contact: {
      specialty: 'مشاور تغذیه و سلامت',
      email: 'dr.ahmadi@aniroz.ir',
      phone: '09121234567',
      hours: 'شنبه تا چهارشنبه، ۹ تا ۱۸',
    },
    resume: {
      education: [
        { label: 'دکترای تخصصی تغذیه', institution: 'دانشگاه تهران' },
        { label: 'کارشناسی ارشد علوم تغذیه', institution: 'دانشگاه علوم پزشکی تهران' },
      ],
      experience: [
        'بیش از ۱۵ سال سابقه مشاوره تغذیه و سلامت',
        'مشاور ارشد تغذیه در مراکز متعدد سلامت',
      ],
      fields: 'تغذیه، محصولات ارگانیک، سلامت عمومی',
    },
    reviews: [
      { name: 'محمد رضایی', rating: 5, text: 'مشاوره بسیار عالی و مفید بود' },
      { name: 'سارا محمدی', rating: 4, text: 'توصیه‌های مفیدی برای تغذیه روزانه داشتم' },
    ],
  },
  form: {
    title: 'درخواست مشاوره رایگان',
    subtitle: 'فرم زیر را تکمیل کنید؛ حداکثر ظرف ۲۴ ساعت با شما تماس می‌گیریم.',
    productCategories: ['محصولات ارگانیک', 'دمنوش‌ها', 'عسل و خشکبار', 'ادویه و چاشنی'],
    orderTypes: ['مشاوره خرید', 'مشاوره تغذیه', 'سفارش عمده'],
    budgets: ['زیر ۵۰۰ هزار تومان', '۵۰۰ هزار تا ۱ میلیون', '۱ تا ۵ میلیون', 'بیش از ۵ میلیون'],
    contactMethods: [
      { value: 'phone', label: 'تماس تلفنی' },
      { value: 'whatsapp', label: 'واتساپ' },
      { value: 'email', label: 'ایمیل' },
    ],
    bestTimes: [
      { value: 'morning', label: 'صبح (۹ تا ۱۲)' },
      { value: 'noon', label: 'ظهر (۱۲ تا ۱۵)' },
      { value: 'evening', label: 'عصر (۱۵ تا ۱۸)' },
    ],
  },
};

export const fetchConsultantData = async () => {
  await new Promise((r) => setTimeout(r, 500));
  return { data: MOCK_CONSULTANT };
};

export const submitConsultationForm = async (_formData) => {
  await new Promise((r) => setTimeout(r, 800));
  return { status: 'success', message: 'درخواست مشاوره با موفقیت ثبت شد' };
};
