'use client'
import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../../api/services/categories.js";
import useStore from "../../../store/index.js";
import DesktopHeader from "./DesktopHeader";
import TabletHeader from "./TabletHeader";
import MobileHeader from "./MobileHeader";

const MENU = {
  home: { id: 0, title: "خانه", link: "/" },
  consultation: { id: 1000, title: "مشاوره طب سنتی", link: "/doctors" },
  shop: { id: 999, title: "فروشگاه", link: "/shop" },
  about: { id: 0, title: "درباره ما", link: "/about" },
  contact: { id: 1, title: "تماس با ما", link: "/contact" },
  blog: { id: 2, title: "وبلاگ", link: "/blog" },
};

const buildBottomNav = (isAuthenticated) => [
  { id: 0, title: "خانه", link: "/", icon: "home" },
  { id: 1, title: "فروشگاه", link: "/shop", icon: "shopping-basket" },
  { id: 2, title: "سبد خرید", link: "/cart", icon: "shopping-cart" },
  { id: 3, title: "حساب کاربری", link: isAuthenticated ? "/profile" : "/login", icon: "user" },
];

const buildHeaderData = (isAuthenticated) => ({
  topBar: { leftIcon: "/images/test/Group-2-1.png", text: "آنی رز، جوانی هر روز!", rightIcon: "/images/test/Group-2-1.png" },
  logo: { src: "/images/test/Group-43-1.png", alt: "آنی رز", link: "/" },
  userAccount: { text: "حساب کاربری", loginLink: "/login", dashboardLink: "/profile" },
  mainMenu: [MENU.home, MENU.consultation, MENU.shop],
  secondaryMenu: [MENU.about, MENU.contact, MENU.blog],
  mobileMenu: [MENU.home, MENU.consultation, MENU.shop, MENU.about, MENU.contact, MENU.blog],
  bottomNav: buildBottomNav(isAuthenticated),
});

const Header = () => {
    const isAuthenticated = useStore((s) => s.isAuthenticated);
    const [headerData, setHeaderData] = useState(() => buildHeaderData(isAuthenticated));

    useEffect(() => {
        let cancelled = false;
        const loadHeaderData = async () => {
            try {
                const categories = await fetchCategories();
                if (cancelled) return;
                const headerMenu = categories.slice(0, 6).map((cat) => ({
                  id: cat.id,
                  title: cat.name,
                  link: `/shop?category=${cat.id}`,
                }));
                setHeaderData((prev) => ({
                  ...prev,
                  mainMenu: [MENU.home, MENU.consultation, ...headerMenu, MENU.shop],
                  mobileMenu: [MENU.home, MENU.consultation, ...headerMenu, MENU.shop, ...prev.secondaryMenu],
                  bottomNav: buildBottomNav(isAuthenticated),
                }));
            } catch {
                void 0;
            }
        };
        loadHeaderData();
        return () => {
            cancelled = true;
        };
    }, [isAuthenticated]);

    return (
        <header className="sticky top-0 z-50">
            <div className="hidden lg:block w-full">
                <DesktopHeader data={headerData} isLoggedIn={isAuthenticated} />
            </div>
            <div className="hidden md:block lg:hidden">
                <TabletHeader data={headerData} isLoggedIn={isAuthenticated} />
            </div>
            <div className="block md:hidden">
                <MobileHeader data={headerData} isLoggedIn={isAuthenticated} />
            </div>
        </header>
    );
};

export default Header;
