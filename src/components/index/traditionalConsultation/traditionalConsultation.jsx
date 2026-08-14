import Link from "next/link";

const TraditionalConsultation = () => {
  return (
    <div className="w-full py-10">
      <div className="w-full relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"
            >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ backgroundImage: 'url("/images/banners/pezesh_banner.png")', backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-[#0C5505]/90 via-[#0C5505]/70 to-[#0C5505]/40" />

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-7/12 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span className="text-white/70 text-xs font-medium tracking-wider uppercase">Traditional Medicine</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                مشاوره طب سنتی
              </h2>

              <p className="text-gray-200/90 leading-relaxed text-sm md:text-base mb-2 max-w-lg">
                تشخیص مزاج، اصلاح تغذیه و تجویز دمنوش‌های گیاهی متناسب با شرایط بدنی شما
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {["تشخیص مزاج", "رژیم غذایی", "نسخه گیاهی"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:w-5/12 p-6 md:p-10 flex items-center justify-center">

                <Link
                  href="/shop"
                  className="relative w-100 flex items-center p-2 justify-center rounded-lg  shadow-[0_0_60px_rgba(100,163,154,0.4)] hover:shadow-[0_0_80px_rgba(100,163,154,0.6)] hover:scale-105 transition-all duration-300 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="mb-1 group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                  <span className="text-white font-bold text-sm md:text-base text-center leading-tight">
                    دریافت
                    مشاوره
                  </span>
                </Link>
            </div>
          </div>


          {/* Steam Effect */}
          <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
            <span className="steam-particle steam-1" />
            <span className="steam-particle steam-2" />
            <span className="steam-particle steam-3" />
            <span className="steam-particle steam-4" />
            <span className="steam-particle steam-5" />
            <span className="steam-particle steam-6" />
          </div>
        </div>
      </div>

      <style>{`
        .steam-particle {
          position: absolute;
          bottom: -10px;
          display: block;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          filter: blur(12px);
          animation: steamRise linear infinite;
          opacity: 0;
        }
        .steam-1 {
          width: 80px;
          height: 100px;
          left: 5%;
          animation-duration: 4s;
          animation-delay: 0s;
        }
        .steam-2 {
          width: 60px;
          height: 80px;
          left: 20%;
          animation-duration: 4.5s;
          animation-delay: 0.6s;
        }
        .steam-3 {
          width: 90px;
          height: 110px;
          left: 38%;
          animation-duration: 3.8s;
          animation-delay: 1.5s;
        }
        .steam-4 {
          width: 55px;
          height: 75px;
          left: 55%;
          animation-duration: 4.2s;
          animation-delay: 2.1s;
        }
        .steam-5 {
          width: 70px;
          height: 90px;
          left: 72%;
          animation-duration: 3.6s;
          animation-delay: 3s;
        }
        .steam-6 {
          width: 65px;
          height: 85px;
          left: 88%;
          animation-duration: 4.8s;
          animation-delay: 1s;
        }
        @keyframes steamRise {
          0% {
            transform: translateY(0) translateX(0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.55;
          }
          50% {
            transform: translateY(-80px) translateX(8px) scale(1.3);
            opacity: 0.25;
          }
          80% {
            opacity: 0.05;
          }
          100% {
            transform: translateY(-160px) translateX(-12px) scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TraditionalConsultation;