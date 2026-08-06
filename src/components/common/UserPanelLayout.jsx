'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut, ChevronRight, Home } from "react-feather";
import { logout } from "../../api/services/auth.js";
import { fetchProfile } from "../../api/services/auth.js";
import useStore from "../../store/index.js";
import { toast } from "react-toastify";

const menuItems = [
  { href: "/profile", title: "حساب کاربری", icon: <User size={18} /> },
  { href: "/orders", title: "سفارش‌های من", icon: <Package size={18} /> },
  { href: "/addresses", title: "آدرس‌های من", icon: <MapPin size={18} /> },
];

const UserPanelLayout = ({ children, title }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout: storeLogout } = useStore();
  const [profile, setProfile] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchProfile();
        if (result?.data) setProfile(result.data);
      } catch {
        void 0;
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      void 0;
    }
    await storeLogout();
    toast.success("با موفقیت خارج شدید");
    router.push("/login");
  };

  const displayName = profile?.name || profile?.mobile || "کاربر";
  const mobile = profile?.mobile || "—";

  return (
    <div className="bg-[#F4F7F5] min-h-screen py-6 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="flex items-center gap-1 hover:text-[#0c5505] transition-colors">
            <Home size={14} /> خانه
          </Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-500">{title || "پنل کاربری"}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-[280px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden md:sticky md:top-24">
              <div className="p-5 bg-gradient-to-l from-[#0c5505] to-[#64a39a] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                    {displayName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{displayName}</p>
                    <p dir="ltr" className="text-[#D6F0E8] text-xs mt-0.5 text-left">{mobile}</p>
                  </div>
                </div>
              </div>

              <div className="md:hidden p-3 border-b border-gray-100">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#F4F7F5] rounded-xl text-sm font-medium text-gray-700"
                >
                  منوی حساب کاربری
                  <span className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`}>▾</span>
                </button>
              </div>

              <nav className={`${mobileOpen ? "block" : "hidden"} md:block p-3`}>
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/profile" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm mb-1 transition-all ${
                        isActive
                          ? "bg-[#0c5505] text-white font-medium shadow-md"
                          : "text-gray-600 hover:bg-[#F4F7F5] hover:text-[#0c5505]"
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all mt-3"
                >
                  <LogOut size={18} />
                  خروج از حساب
                </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserPanelLayout;
