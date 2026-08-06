const MOCK_CONSULTANT = {
  id: 1,
  name: 'دکتر علیرضا احمدی',
  specialty: 'مشاور تغذیه و سلامت',
  degree: 'دکترای تخصصی تغذیه',
  avatar: '/images/test/doctor-avatar.jpg',
  bio: 'متخصص تغذیه و سلامت با بیش از ۱۵ سال سابقه در زمینه مشاوره محصولات ارگانیک و طبیعی',
  experience: 15,
  education: 'دکترای تخصصی تغذیه از دانشگاه تهران',
  contact: { email: 'dr.ahmadi@aniroz.ir', phone: '09121234567' },
  consultation_fields: ['تغذیه', 'محصولات ارگانیک', 'سلامت عمومی'],
  stats: { consultations: 1250, rating: 4.8, reviews: 342 },
  reviews: [
    { id: 1, name: 'محمد رضایی', rating: 5, text: 'مشاوره بسیار عالی و مفید بود', date: '1405/03/15' },
    { id: 2, name: 'سارا محمدی', rating: 4, text: 'توصیه‌های مفیدی برای تغذیه روزانه داشتم', date: '1405/02/20' },
  ],
};

export const fetchConsultantData = async () => {
  await new Promise((r) => setTimeout(r, 500));
  return { data: MOCK_CONSULTANT };
};

export const submitConsultationForm = async (_formData) => {
  await new Promise((r) => setTimeout(r, 800));
  return { status: 'success', message: 'درخواست مشاوره با موفقیت ثبت شد' };
};
