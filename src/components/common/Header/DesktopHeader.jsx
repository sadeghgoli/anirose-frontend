"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Minus, Plus, XCircle, X } from "react-feather";

import { fetchCart, removeCartItem as removeItem, updateCartItem } from "../../../api/services/cart.js";
import { subscribeCartUpdated } from "../../../utils/cartEvents.js";
import { trackSearch } from "../../../utils/analytics/index.js";

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7.34166 1.66666L4.325 4.69166" stroke="#373737" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.6583 1.66666L15.675 4.69166" stroke="#373737" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.66666 6.54167C1.66666 5 2.49166 4.875 3.51666 4.875H16.4833C17.5083 4.875 18.3333 5 18.3333 6.54167C18.3333 8.33333 17.5083 8.20833 16.4833 8.20833H3.51666C2.49166 8.20833 1.66666 8.33333 1.66666 6.54167Z" stroke="#373737" strokeWidth="1.5" />
    <path d="M8.13333 11.6667V14.625" stroke="#373737" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.9667 11.6667V14.625" stroke="#373737" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.91666 8.33334L4.09166 15.5333C4.35833 17.15 5 18.3333 7.38333 18.3333H12.4083C15 18.3333 15.3833 17.2 15.6833 15.6333L17.0833 8.33334" stroke="#373737" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const OverflowNav = ({ items = [], isActiveLink, className = "", justify = "end" }) => {
  const outerRef = useRef(null);
  const probeRefs = useRef([]);
  const dotsRef = useRef(null);
  const hoverTimeout = useRef(null);

  const [visibleCount, setVisibleCount] = useState(items.length);
  const [showDots, setShowDots] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const justifyClass = justify === "start" ? "justify-end" : "justify-start";

  useEffect(() => {
    probeRefs.current = [];
    setVisibleCount(items.length);
    setShowDots(false);
    setShowAll(false);
  }, [items]);

  const calculate = useCallback(() => {
    const outer = outerRef.current;
    if (!outer || !items.length) return;

    const containerWidth = outer.clientWidth;
    if (!containerWidth) return;

    const widths = probeRefs.current.map((el) => el?.getBoundingClientRect().width || 0);
    if (widths.some((w) => w === 0)) return;

    const totalWidth = widths.reduce((sum, w) => sum + w, 0);

    if (totalWidth <= containerWidth) {
      setVisibleCount(items.length);
      setShowDots(false);
      return;
    }

    const dotsWidth = dotsRef.current?.getBoundingClientRect().width || 40;
    const availableWidth = Math.max(0, containerWidth - dotsWidth);

    let usedWidth = 0;
    let count = 0;

    for (let i = 0; i < widths.length; i += 1) {
      if (usedWidth + widths[i] > availableWidth) break;
      usedWidth += widths[i];
      count += 1;
    }

    if (count < 1) count = 1;

    setVisibleCount(count);
    setShowDots(count < items.length);
  }, [items]);

  useLayoutEffect(() => {
    const run = () => calculate();
    requestAnimationFrame(run);

    const outer = outerRef.current;
    if (!outer) return undefined;

    const observer = new ResizeObserver(run);
    observer.observe(outer);

    return () => observer.disconnect();
  }, [calculate]);

  const hiddenItems = items.slice(visibleCount);

  const handleEnter = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setShowAll(true);
  }, []);

  const handleLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setShowAll(false), 180);
  }, []);

  return (
    <div className={`relative flex items-center w-full overflow-visible ${className}`}>
      <div
        ref={outerRef}
        className={`flex-1 min-w-0 flex items-center flex-nowrap overflow-hidden ${justifyClass}`}
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-0 whitespace-nowrap overflow-hidden">
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={item.link}
              ref={(el) => {
                probeRefs.current[index] = el;
              }}
              className="inline-block px-[6px] sm:px-[9px] py-[5px] text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {items.slice(0, visibleCount).map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="inline-block px-[6px] sm:px-[9px] py-[5px] no-underline text-xs sm:text-sm md:text-base font-normal whitespace-nowrap flex-shrink-0"
            style={{
              color: isActiveLink(item.link) ? "#0c5505" : "#6f6f6f",
            }}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {showDots && (
        <div
          ref={dotsRef}
          className="relative flex-shrink-0 w-[40px] flex justify-center"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <span className="cursor-pointer px-2 py-1 text-sm font-bold text-[#6f6f6f] hover:text-[#0c5505] select-none">
            ...
          </span>

          {showAll && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-gray-100 rounded-lg z-[99999] max-h-[300px] overflow-y-auto py-1 min-w-[180px]">
              {hiddenItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="block px-5 py-2.5 whitespace-nowrap text-sm hover:bg-gray-50 no-underline"
                  style={{
                    color: isActiveLink(item.link) ? "#0c5505" : "#6f6f6f",
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DesktopHeader = ({ data, isLoggedIn }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartUpdating, setCartUpdating] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  const hoverTimeout = useRef(null);
  const cartContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam) {
      setSearchValue(qParam);
      trackSearch(qParam);
    }
  }, [searchParams]);

  const formatPrice = (price) => new Intl.NumberFormat("fa-IR").format(price) + " تومان";

  const loadCart = async () => {
    try {
      const result = await fetchCart();
      if (result.status === "success" && result.data) {
        setCartItems(result.data.items || []);
        setCartTotal(result.data.total || 0);
        setCartQuantity((result.data.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0));
      }
    } catch {
      void 0;
    }
  };

  useEffect(() => {
    loadCart();
    const unsubscribe = subscribeCartUpdated(loadCart);
    return unsubscribe;
  }, []);

  const handleRemoveItem = async (itemId) => {
    setCartUpdating(true);
    try {
      await removeItem(itemId);
      await loadCart();
    } finally {
      setCartUpdating(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartUpdating(true);
    try {
      await updateCartItem(itemId, newQuantity);
      await loadCart();
    } finally {
      setCartUpdating(false);
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsCartHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsCartHovered(false), 200);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      trackSearch(searchValue.trim());
      router.push(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    router.push("/shop");
  };

  const isActiveLink = (link) => {
    if (link === "/") return pathname === "/";
    if (link === "/shop") return pathname.startsWith("/shop");
    return pathname === link;
  };

  if (!data) return null;

  return (
    <section
      className="pb-[22px] relative bg-[#F8F9FB] shadow-[0px_0px_30px_0px_rgba(100,163,154,0.23)]"
      style={{
        backgroundImage: `url("/images/test/riglt-min-1-1.png")`,
        backgroundPosition: "top right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/images/test/foliage2.png")`,
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          opacity: 1,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex items-stretch">
          <div className="flex flex-col justify-end flex-1 min-w-0 pt-6">
            <div className="flex items-center justify-start gap-1 pr-4 sm:pr-8 md:pr-12 lg:pr-16">
              <Image
                width={16}
                height={16}
                src={data?.topBar?.leftIcon || "/images/test/Group-2-1.png"}
                alt="آیکون تزئینی"
                className="w-4 h-auto flex-shrink-0"
                loading="lazy"
              />
              <h2 className="text-[#6f6f6f] m-0 leading-none text-sm sm:text-base font-medium whitespace-nowrap flex-shrink-0 px-[6px]">
                {data?.topBar?.text || "آنی رز، سلامتی هر روز!"}
              </h2>
              <Image
                width={16}
                height={16}
                src={data?.topBar?.rightIcon || "/images/test/Group-2-1.png"}
                alt="آیکون تزئینی"
                className="w-4 h-auto flex-shrink-0 scale-x-[-1]"
                loading="lazy"
              />
            </div>

            <div className="py-[14px]">
              <div className="border-t border-[#BBBBBB] w-full" />
            </div>

            <OverflowNav
              items={data?.mainMenu || []}
              isActiveLink={isActiveLink}
              justify="end"
            />
          </div>

          <div
            className="flex items-end justify-center flex-shrink-0 px-2 sm:px-4"
            style={{
              backgroundImage: `url("/images/test/Asset-1-3-1.png")`,
              backgroundPosition: "top center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "64px auto",
              minWidth: "100px",
            }}
          >
            <Link href={data?.logo?.link || "/"}>
              <Image
                src={data?.logo?.src || "/images/test/Group-43-1.png"}
                alt={data?.logo?.alt || "لوگوی آنی رز"}
                width={70}
                height={70}
                className="w-[60px] sm:w-[70px] mt-5 border-none"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="flex flex-col justify-end flex-1 min-w-0 pt-6">
            <div className="flex items-end justify-end gap-0 flex-nowrap">
              <form onSubmit={handleSearch} className="relative ml-2 sm:ml-4 w-[200px] sm:w-[250px] md:w-[300px] flex-shrink-0">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="جستجو نمایید"
                  aria-label="جستجو"
                  className="w-full rounded-[14px] outline-none px-[10px] sm:px-[14px] py-[16px] sm:py-[20px] border-0 text-xs sm:text-[13px] font-medium text-[#7A7A7A] bg-white shadow-[0px_3px_0px_0px_rgba(156,168,167,0.3)]"
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>

              <div
                className="ml-2 sm:ml-4 flex-shrink-0"
                ref={cartContainerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="سبد خرید"
                  className="p-2 sm:p-3 relative bg-white rounded-full border-none cursor-pointer shadow-[0px_0px_30px_0px_rgba(95,106,105,0.3)]"
                >
                  <CartIcon />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#64a39a] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartQuantity}
                    </span>
                  )}

                  <div
                    ref={dropdownRef}
                    className={`absolute top-full left-0 w-[320px] sm:w-[380px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-[99999] transition-all duration-500 ease-in-out ${
                      isCartHovered ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-100 bg-[#f8f9fa] rounded-t-xl">
                      <div className="flex items-center gap-2">
                        <CartIcon />
                        <span className="bg-[#0C5505] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {cartQuantity}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">کل سبد: {formatPrice(cartTotal)}</span>
                    </div>

                    <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto py-2">
                      {cartUpdating ? (
                        <div className="text-center py-6 sm:py-8 text-gray-500">در حال بارگذاری...</div>
                      ) : cartItems.length === 0 ? (
                        <div className="text-center py-6 sm:py-8 text-gray-500">سبد خرید شما خالی است</div>
                      ) : (
                        <ul className="list-none m-0 p-0">
                          {cartItems.map((item) => (
                            <li key={item.cart_item_id} className="flex items-center p-2 sm:p-3 border-b border-gray-100 relative group">
                              <button
                                onClick={() => handleRemoveItem(item.cart_item_id)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all"
                              >
                                <XCircle size={20} className="sm:w-6 sm:h-6" />
                              </button>

                              <Image
                                src={item.image}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="object-cover rounded-lg ml-2 sm:ml-3"
                                loading="lazy"
                              />

                              <div className="flex-1 min-w-0">
                                <span className="text-gray-800 no-underline text-xs sm:text-sm font-medium block truncate">{item.name}</span>
                                <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                                  <button
                                    onClick={() => handleUpdateQuantity(item.cart_item_id, item.quantity - 1)}
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                  >
                                    <Minus size={10} className="sm:w-3 sm:h-3" />
                                  </button>
                                  <span className="text-xs sm:text-sm text-gray-500 min-w-[24px] sm:min-w-[30px] text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item.cart_item_id, item.quantity + 1)}
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                  >
                                    <Plus size={10} className="sm:w-3 sm:h-3" />
                                  </button>
                                  <span className="text-xs sm:text-sm font-bold text-gray-500 mr-1 sm:mr-2">
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {cartItems.length > 0 && (
                      <>
                        <div className="flex justify-between items-center p-3 sm:p-4 border-t border-gray-100 bg-[#f8f9fa]">
                          <strong className="text-sm sm:text-base font-semibold text-gray-700">جمع کل:</strong>
                          <span className="amount text-sm sm:text-base font-bold text-gray-700">
                            {formatPrice(cartTotal)}
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2 p-3 sm:p-4">
                          <Link
                            href="/cart"
                            className="bg-[#64a39a] text-white w-full text-center py-2 rounded-sm text-xs sm:text-sm font-medium no-underline transition-all hover:bg-[#5a8f85]"
                          >
                            مشاهده سبد خرید
                          </Link>
                          <Link
                            href="/checkout"
                            className="bg-[#64a39a] text-white w-full text-center py-2 rounded-sm text-xs sm:text-sm font-medium no-underline transition-all hover:bg-[#5a8f85]"
                          >
                            تسویه حساب
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={isLoggedIn ? (data?.userAccount?.dashboardLink || "/profile") : (data?.userAccount?.loginLink || "/login")}
                className="inline-block bg-white rounded-[70px] px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] no-underline text-xs sm:text-base font-medium text-[#838383] shadow-[0px_0px_30px_0px_rgba(95,106,105,0.3)] flex-shrink-0 whitespace-nowrap"
              >
                {data?.userAccount?.text || "حساب کاربری"}
              </Link>
            </div>

            <div className="py-[14px] w-full">
              <div className="border-t border-[#BBBBBB] w-full" />
            </div>

            <OverflowNav
              items={data?.secondaryMenu || []}
              isActiveLink={isActiveLink}
              justify="start"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopHeader;
