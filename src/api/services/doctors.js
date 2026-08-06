const MOCK_DOCTORS = [
  {
    id: 1,
    name: 'دکتر علیرضا احمدی',
    specialty: 'متخصص تغذیه',
    image: '/images/test/doctor-1.jpg',
    bio: 'متخصص تغذیه و رژیم‌درمانی با بیش از ۱۵ سال سابقه',
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 2,
    name: 'دکتر مریم کریمی',
    specialty: 'دکترای گیاهان دارویی',
    image: '/images/test/doctor-2.jpg',
    bio: 'متخصص گیاهان دارویی و محصولات طبیعی',
    rating: 4.9,
    reviews: 256,
  },
  {
    id: 3,
    name: 'دکتر حسین رحیمی',
    specialty: 'متخصص طب سنتی',
    image: '/images/test/doctor-3.jpg',
    bio: 'متخصص طب سنتی ایرانی با مدرک از دانشگاه علوم پزشکی',
    rating: 4.7,
    reviews: 189,
  },
];

export const fetchDoctorsData = async () => {
  await new Promise((r) => setTimeout(r, 500));
  return { data: MOCK_DOCTORS };
};
