'use client'
import Image from "next/image";
import React, { useState } from "react";
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';
import { useCartCount } from "../../../hooks/useCartCount";
import { trackSearch } from "../../../utils/analytics/index.js";

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7.34166 1.66666L4.325 4.69166" stroke="#373737" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.6583 1.66666L15.675 4.69166" stroke="#373737" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.66666 6.54167C1.66666 5 2.49166 4.875 3.51666 4.875H16.4833C17.5083 4.875 18.3333 5 18.3333 6.54167C18.3333 8.33333 17.5083 8.20833 16.4833 8.20833H3.51666C2.49166 8.20833 1.66666 8.33333 1.66666 6.54167Z" stroke="#373737" strokeWidth="1.5"/>
        <path d="M8.13333 11.6667V14.625" stroke="#373737" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11.9667 11.6667V14.625" stroke="#373737" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2.91666 8.33334L4.09166 15.5333C4.35833 17.15 5 18.3333 7.38333 18.3333H12.4083C15 18.3333 15.3833 17.2 15.6833 15.6333L17.0833 8.33334" stroke="#373737" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

const ShopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

const TabletHeader = ({ data, isLoggedIn }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { count: cartQuantity } = useCartCount();

    const isActiveLink = (link) => {
        if (!link) return false;
        const currentPath = pathname.replace(/\/$/, '');
        const menuLink = link.replace(/\/$/, '');
        if (menuLink === "/" || menuLink === "") {
            return currentPath === "/" || currentPath === "";
        }
        if (menuLink === "/shop") {
            return currentPath.startsWith("/shop");
        }
        return currentPath === menuLink;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            trackSearch(searchValue.trim());
            setSearchModalOpen(false);
            router.push(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const handleClearSearch = () => {
        setSearchValue("");
    };

    const openSearchModal = () => {
        const params = new URLSearchParams(location.search);
        const qParam = params.get("q");
        if (qParam) {
            setSearchValue(qParam);
        } else {
            setSearchValue("");
        }
        setSearchModalOpen(true);
    };

    const mobileMenu = data?.mobileMenu?.length
        ? data.mobileMenu
        : [
            ...(data?.mainMenu || []),
            ...(data?.secondaryMenu || []),
          ];

    const bottomNav = data?.bottomNav?.length
        ? data.bottomNav
        : [
            { id: 0, title: "خانه", link: "/", icon: "home" },
            { id: 1, title: "فروشگاه", link: "/shop", icon: "shopping-basket" },
            { id: 2, title: "سبد خرید", link: "/cart", icon: "shopping-cart" },
            { id: 3, title: "حساب کاربری", link: isLoggedIn ? "/profile" : "/login", icon: "user" },
          ];

    return (
        <>
            <section
                className="pb-[14px] max-w-14xl mx-auto px-14 lg:px-18 relative bg-[#F8F9FB] shadow-[0px_0px_30px_0px_rgba(100,163,154,0.23)]"
                style={{
                    backgroundImage: `url("/images/test/riglt-min-1-1.png")`,
                    backgroundPosition: "top right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "280px auto"
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("/images/test/foliage2.png")`,
                        backgroundPosition: "top left",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "280px auto",
                        opacity: 1
                    }}
                />

                <div className="relative max-w-7xl mx-auto">
                    <div
                        className="flex items-end justify-center pt-[27px] pb-[12px]"
                        style={{
                            backgroundImage: `url("/images/test/Asset-1-3-1.png")`,
                            backgroundPosition: "top center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "40px auto"
                        }}
                    >
                        <Link href={data?.logo?.link || "/"}>
                            <Image src={data?.logo?.src || "/images/test/Group-43-1.png"} alt={data?.logo?.alt || "لوگوی آنی رز"}
                                 width={93} height={0} sizes="100vw" className="border-none"  loading="lazy" />
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <div className="w-[10%] flex justify-end p-0">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 bg-transparent border-none cursor-pointer" aria-label="منو">
                                {menuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>

                        <div className="w-[90%] flex items-center justify-end gap-0 p-0">
                            <button
                                onClick={openSearchModal}
                                className="ml-3 p-3 bg-white rounded-full border-none cursor-pointer shadow-[0px_0px_30px_0px_rgba(95,106,105,0.3)] flex-shrink-0 inline-flex items-center justify-center"
                                aria-label="جستجو"
                            >
                                <SearchIcon />
                            </button>

                            <Link href="/cart"
                                  className="ml-3 p-3 bg-white rounded-full border-none cursor-pointer shadow-[0px_0px_30px_0px_rgba(95,106,105,0.3)] flex-shrink-0 inline-block relative">
                                <CartIcon />
                                {cartQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#64a39a] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                        {cartQuantity}
                                    </span>
                                )}
                            </Link>

                            <Link href={isLoggedIn ? (data?.userAccount?.dashboardLink || "/profile") : (data?.userAccount?.loginLink || "/login")}
                                  className="inline-block bg-white rounded-[70px] px-[14px] py-[14px] no-underline text-base font-medium text-[#373737] shadow-[0px_0px_30px_0px_rgba(95,106,105,0.3)] flex-shrink-0 whitespace-nowrap">
                                {data?.userAccount?.text || "حساب کاربری"}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {menuOpen && (
                <div className="relative z-30 w-full bg-white shadow-lg rounded-b-lg overflow-hidden">
                    <nav className="flex flex-col gap-1 pb-4 pt-2">
                        {mobileMenu.map((item) => (
                            <Link
                                key={item.id}
                                href={item.link}
                                onClick={() => setMenuOpen(false)}
                                className="px-6 py-3 no-underline text-base font-normal rounded-lg transition-all whitespace-nowrap hover:bg-[#f9fafb] hover:text-[#0c5505]"
                                style={{ color: isActiveLink(item.link) ? "#0c5505" : "#334155" }}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

            {searchModalOpen && (
                <div className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center pt-20 px-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">جستجو</h3>
                            <button
                                onClick={() => setSearchModalOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-100 transition"
                                aria-label="بستن"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <form onSubmit={handleSearch} className="p-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="نام محصول را وارد کنید..."
                                    aria-label="جستجو"
                                    className="w-full rounded-xl border border-gray-200 outline-none px-4 py-3 text-base text-gray-700 bg-gray-50 focus:border-[#64a39a] focus:ring-1 focus:ring-[#64a39a] transition"
                                    autoFocus
                                />
                                {searchValue && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        aria-label="پاک کردن"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-4 bg-[#64a39a] text-white py-3 rounded-xl text-base font-medium hover:bg-[#5a8f85] transition"
                            >
                                جستجو
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="hidden max-md:block fixed bottom-0 left-0 right-0 z-30" style={{ backgroundColor: "#1e1e1e" }}>
                <div className="bg-white pt-[15px] pb-[20px] px-[5px]">
                    <ul className="flex justify-around items-start list-none m-0 p-0">
                        {bottomNav.slice(0, 4).map((item) => {
                            const icons = {
                                home: <HomeIcon />,
                                'shopping-basket': <ShopIcon />,
                                'shopping-cart': <CartIcon />,
                                user: <UserIcon />
                            };
                            const active = isActiveLink(item.link);
                            return (
                                <li key={item.id} className="flex-shrink-0">
                                    <Link
                                        href={item.link}
                                        className="flex flex-col items-center gap-[10px] no-underline"
                                        style={{
                                            minWidth: "64px",
                                            color: active ? "#64a39a" : "#818797"
                                        }}
                                    >
                                        <span className="flex text-[24px]" style={{ color: active ? "#64a39a" : "currentColor" }}>
                                            {icons[item.icon] || <HomeIcon />}
                                        </span>
                                        <span className="flex text-[14px] leading-[17px] tracking-[.48px] whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <style>{`
                @media only screen and (max-width: 768px) {
                    .max-md\\:block { display: block !important; }
                    body { padding-bottom: 80px !important; }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoom-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-in {
                    animation-duration: 0.2s;
                    animation-fill-mode: both;
                }
                .fade-in {
                    animation-name: fade-in;
                }
                .zoom-in {
                    animation-name: zoom-in;
                }
            `}</style>
        </>
    );
};

export default TabletHeader;
