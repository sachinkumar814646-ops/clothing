"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "lib/Link";
import Image from "lib/NextImage";
import BrandLogo from "components/ui/BrandLogo";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Camera,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Package,
} from "lucide-react";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { useCart } from "lib/cart-context";
import { useWishlist } from "lib/wishlist-context";
import { products } from "lib/data";
import { fetchSheetRows } from "lib/google-sheet-api";
import { getMenu } from "../../services/api/menu";
import { useApp } from "../../lib/menu-context";
// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROMO_MESSAGES = [
  "EXTRA 10% OFF EVERYTHING – Use Code: EXTRA10",
  "FREE DELIVERY ON ORDERS OVER £30 — Shop Now",
  "NEXT DAY DELIVERY AVAILABLE — Order Before 10PM",
];
const NAV_ITEMS = [];
// ─── TOP LIGHT PROMO BAR ──────────────────────────────────────────────────────
const DEFAULT_MENU_ROUTE_BY_SLUG = {
  men: "/men",
  women: "/women",
  cricket: "/cricket",
  accessories: "/accessories",
};
function resolveMenuHref(slug) {
  if (!slug) return "/new";
  return DEFAULT_MENU_ROUTE_BY_SLUG[slug] || "/new";
}
function mapApiMenuToNavItems(menuData) {
  if (!Array.isArray(menuData) || menuData.length === 0) return null;

  const mapped = menuData
    .map((category) => {
      const slug = (category.slug || "").toLowerCase();
      const isSale = slug === "sale";

      return {
        label: category.name || "",

        href: isSale ? "/products/sale" : `/category/${category.slug}`,

        sale: isSale,
        hot: false,

        columns: Array.isArray(category.subcategories)
          ? category.subcategories.map((sub) => ({
              title: sub.name || "Category",
              href: `/category/${sub.slug}`,

              links: Array.isArray(sub.children)
                ? sub.children
                    .filter((child) => child?.name && child?.slug)
                    .map((child) => ({
                      label: child.name,
                      href: `/product-category/${child.slug}`,
                    }))
                : [],
            }))
          : [],
      };
    })
    .filter((item) => item.label && item.href);

  return mapped.length > 0 ? mapped : null;
}
function pickValue(row, keys) {
  const entries = Object.entries(row);
  for (const key of keys) {
    const found = entries.find(([k]) => k.toLowerCase().trim() === key);
    if (found) return String(found[1] || "").trim();
  }
  for (const key of keys) {
    const found = entries.find(([k]) => k.toLowerCase().includes(key));
    if (found) return String(found[1] || "").trim();
  }
  return "";
}
function mapSheetRowsToNavItems(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const grouped = new Map();
  rows.forEach((row) => {
    const category = pickValue(row, [
      "category",
      "menu",
      "main category",
      "section",
    ]);
    const slug = pickValue(row, ["slug", "category slug", "menu slug"]);
    const subcategory = pickValue(row, [
      "subcategory",
      "sub category",
      "column",
      "group",
    ]);
    const item = pickValue(row, ["item", "child", "link", "name", "label"]);
    if (!category) return;
    const categoryKey = category.toLowerCase();
    if (!grouped.has(categoryKey)) {
      const normalizedSlug = (slug || category)
        .toLowerCase()
        .replace(/\s+/g, "-");

      grouped.set(categoryKey, {
        label: category,
        href: resolveMenuHref(normalizedSlug),
        sale: category.toLowerCase() === "sale",
        hot: false,
        columns: [],
      });
    }
    const cat = grouped.get(categoryKey);
    const colTitle = subcategory || "Category";
    let col = cat.columns.find((c) => c.title === colTitle);
    if (!col) {
      col = { title: colTitle, links: [] };
      cat.columns.push(col);
    }
    if (item && !col.links.includes(item)) col.links.push(item);
  });
  const mapped = [...grouped.values()].filter((c) => c.columns.length > 0);
  return mapped.length ? mapped : null;
}

function TopPromoBar({ settings }) {
  const socialLinks = [
    {
      url: settings?.facebook_url,
      label: "Facebook",
      color: "#1877F2",
      Icon: Facebook,
    },
    {
      url: settings?.instagram_url,
      label: "Instagram",
      color: "#E4405F",
      Icon: Instagram,
    },
    {
      url: settings?.twitter_url,
      label: "Twitter",
      color: "#000000",
      Icon: Twitter,
    },
    {
      url: settings?.youtube_url,
      label: "YouTube",
      color: "#FF0000",
      Icon: Youtube,
    },
    {
      url: settings?.linkedin_url,
      label: "LinkedIn",
      color: "#0A66C2",
      Icon: Linkedin,
    },
  ];

  return (
    <div className="w-full bg-[#f5f5f5] border-b border-gray-200 hidden sm:block">
      <div className="max-w-[1400px] mx-auto h-9 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="font-body text-[10px] sm:text-[11px] tracking-[0.12em] text-gray-600 hover:text-charcoal transition-colors"
            >
              {settings.email}
            </a>
          )}

          {settings?.email && settings?.phone && (
            <span className="text-gray-400">|</span>
          )}

          {settings?.phone && (
            <a
              href={`tel:${settings.phone.replace(/^\+?44/, "")}`}
              className="font-body text-[10px] sm:text-[11px] tracking-[0.12em] text-gray-600 hover:text-charcoal transition-colors"
            >
              {settings.phone.replace(/^\+?44/, "")}
            </a>
          )}
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-3 sm:gap-4">
          {socialLinks.map(({ url, label, color, Icon }) => (
            <a
              key={label}
              href={url || "#"}
              target={url ? "_blank" : undefined}
              rel={url ? "noopener noreferrer" : undefined}
              aria-label={label}
              onClick={(e) => {
                if (!url) e.preventDefault();
              }}
              className="text-gray-500 transition-colors"
              style={{
                "--social-color": color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            >
              <Icon size={14} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
// ─── SEARCH BAR ───────────────────────────────────────────────────────────────
function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // ✅ NEW

  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  // ✅ Debounced API call
  useEffect(() => {
    if (query.length <= 1) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // ✅ Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // ✅ API function
  const fetchResults = async (searchText) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://coombb.com/backend/api/search?q=${searchText}`,
      );

      const data = await res.json();
      setResults(data.data || data);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ click outside close
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[600px]">
      {/* INPUT */}
      <div
        className={`flex items-center bg-[#f2f2f2] rounded-full px-4 py-2.5 gap-2 transition-all duration-200 ${focused ? "bg-white ring-2 ring-charcoal/20 shadow-sm" : "hover:bg-[#e8e8e8]"}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          // ✅ KEYBOARD CONTROL
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((prev) =>
                prev < results.length - 1 ? prev + 1 : 0,
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : results.length - 1,
              );
            }

            if (e.key === "Enter" && activeIndex >= 0) {
              const selected = results[activeIndex];
              window.location.href = `/product/${selected.slug}`;
            }

            if (e.key === "Escape") {
              setFocused(false);
              setActiveIndex(-1);
            }
          }}
          placeholder="Search products and brands"
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>

      {/* DROPDOWN */}
      {focused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-xl z-[60]">
          {/* Loading */}
          {loading && (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div>
              {results.slice(0, 6).map((p, index) => (
                <div
                  key={p.id}
                  // ✅ MOUSE HOVER SYNC
                  onMouseEnter={() => setActiveIndex(index)}
                  // ✅ CLICK REDIRECT
                  onClick={() => {
                    window.location.href = `/product/${p.slug}`;
                  }}
                  className={`p-3 cursor-pointer transition-colors ${
                    activeIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  {p.name}
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && query.length > 1 && results.length === 0 && (
            <div className="p-4 text-center text-gray-400">
              No results for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
// ─── MEGA MENU ────────────────────────────────────────────────────────────────
function MegaMenu({ item }) {
  const totalColumns = item.columns.length;

  const maxChildren = Math.max(...item.columns.map((c) => c.links.length));

  let columnClass = "xl:columns-8";

  // Tall content → fewer columns
  if (maxChildren >= 10) {
    columnClass = "xl:columns-6";
  } else if (maxChildren >= 6) {
    columnClass = "xl:columns-7";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.16 }}
      className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-[55]"
    >
      <div className="w-full px-6 py-6 overflow-y-auto max-h-[80vh]">
        {/* Less than 8 → Flex Row */}
        {totalColumns < 8 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {item.columns.map((col) => (
              <div key={col.title} className="w-[220px] flex-shrink-0">
                <h4 className="font-body text-[15px] font-bold tracking-[0.18em] text-charcoal mb-4 uppercase border-b border-gray-100 pb-2">
                  {col.title}
                </h4>

                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-[15px] text-gray-600 hover:text-charcoal transition-colors hover:underline underline-offset-2 cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          /* Masonry Layout */
          <div className={`columns-2 md:columns-4 ${columnClass} gap-8`}>
            {item.columns.map((col) => (
              <div key={col.title} className="break-inside-avoid mb-8">
                <h4 className="font-body text-[15px] font-bold tracking-[0.18em] text-charcoal mb-4 uppercase border-b border-gray-100 pb-2">
                  {col.title}
                </h4>

                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-[15px] text-gray-600 hover:text-charcoal transition-colors hover:underline underline-offset-2 cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
// ─── BLACK PROMO BAR + COUNTDOWN ─────────────────────────────────────────────
function BlackPromoBar({ settings }) {
  const TOP_PROMOS = [
    {
      id: 1,
      text: settings?.top_offer_title_1,
      link: settings?.top_offer_link_1,
    },
    {
      id: 2,
      text: settings?.top_offer_title_2,
      link: settings?.top_offer_link_2,
    },
    {
      id: 3,
      text: settings?.top_offer_title_3,
      link: settings?.top_offer_link_3,
    },
  ].filter((promo) => promo.text);

  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (TOP_PROMOS.length <= 1) return;

    const t = setInterval(() => {
      setMsgIdx((i) => (i + 1) % TOP_PROMOS.length);
    }, 4000);

    return () => clearInterval(t);
  }, [TOP_PROMOS.length]);

  if (!TOP_PROMOS.length) return null;

  const currentPromo = TOP_PROMOS[msgIdx];

  return (
    <div className="w-full bg-pinked text-white">
      <div className="w-full max-w-[1400px] mx-auto h-9 px-4 sm:px-6 lg:px-8 relative flex items-center justify-center">
        <div className="overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={currentPromo.link || "#"}
                className="font-body text-[11px] sm:text-xs tracking-[0.2em] font-medium whitespace-nowrap text-center cursor-pointer"
              >
                {currentPromo.text}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
// ─── MOBILE DRAWER ────────────────────────────────────────────────────────────
function MobileMenu({ onClose, navItems, navMobileItems }) {
  const [expanded, setExpanded] = useState(null);
  const { toggleCart, totalItems } = useCart();
  const { wishlist, fetchWishlist } = useWishlist();
  const [user, setUser] = useState(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authID");
    localStorage.removeItem("authUser");
    localStorage.clear();

    window.location.href = "/";
  };
  useEffect(() => {
    const name = localStorage.getItem("authUser");
    if (name) setUser(JSON.parse(name).name.split(" ")[0]);
  }, []);
  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 bottom-0 z-50 w-[320px] bg-white flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 flex-none">
          <Link href="/" onClick={onClose} className="inline-flex items-center">
            <BrandLogo mobile />
          </Link>
          <div className="flex items-center">
            {!user && (
              <Link
                href="/account"
                onClick={onClose}
                className="p-2 text-charcoal"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
            )}
            <Link
              href="/wishlist"
              onClick={onClose}
              className="relative p-2 text-charcoal"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />

              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-pinked text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {wishlist.length > 9 ? "9+" : wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => {
                onClose();
                toggleCart();
              }}
              className="relative p-2 text-charcoal"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-pinked text-white text-[9px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={onClose} className="p-2 text-charcoal">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {navItems?.map((item) => (
            <div key={item.label} className="border-b border-gray-100">
              <button
                onClick={() =>
                  setExpanded(expanded === item.label ? null : item.label)
                }
                className="flex items-center justify-between w-full px-5 py-3.5"
              >
                <span
                  className={`font-body text-sm font-semibold ${item.sale ? "text-coral" : "text-charcoal"}`}
                >
                  {item.label}
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`text-gray-400 transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {expanded === item.label && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-gray-50"
                  >
                    <div className="px-5 pb-4 pt-2 space-y-4">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="font-body text-[10px] tracking-[0.2em] text-gray-400 mb-2 uppercase">
                            {col.title}
                          </p>
                          <div className="flex flex-col gap-1.5">
                            {col.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href} // ✅ use correct child link
                                onClick={onClose}
                                className="font-body text-sm text-gray-700 hover:text-charcoal flex items-center gap-1.5"
                              >
                                <ChevronRight
                                  size={10}
                                  className="text-gray-300 flex-none"
                                />
                                {link.label} {/* ✅ render label */}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="inline-block font-body text-[11px] tracking-[0.15em] px-4 py-2 bg-pinked text-white hover:bg-pinked/80 transition-colors"
                      >
                        SHOP ALL {item.label.toUpperCase()}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="px-5 py-5 space-y-4 border-t border-gray-100">
            {user ? (
              <div className="w-full">
                <button
                  onClick={() => (window.location.href = "/orders")}
                  className="w-full flex items-center gap-3 text-left font-body text-sm text-gray-500 hover:text-charcoal transition-colors py-1"
                >
                  <Package size={16} strokeWidth={1.5} />
                  Orders
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 text-left font-body text-sm text-red-500 hover:text-red-600 transition-colors py-1 mt-2"
                >
                  <LogOut size={16} strokeWidth={1.5} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/account"
                onClick={onClose}
                className="w-full flex items-center gap-3 font-body text-sm text-gray-500 hover:text-charcoal transition-colors"
              >
                <User size={16} strokeWidth={1.5} />
                Account
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}
// ─── MAIN NAVBAR ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [navMobileItems, setNavMobileItems] = useState([]);
  const leaveTimer = useRef(null);
  const { toggleCart, totalItems } = useCart();
  const { wishlist, fetchWishlist } = useWishlist();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [image, setImage] = useState(null);
  const { menu, settings } = useApp();

  useEffect(() => {
    const name = localStorage.getItem("authUser");
    if (name) setUser(JSON.parse(name).name.split(" ")[0]);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (scrolled) setActiveMenu(null);
  }, [scrolled]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);
  useEffect(() => {
    if (!menu) return;

    const mapped = mapApiMenuToNavItems(menu);

    if (mapped && mapped.length > 0) {
      setNavItems(mapped);
    }

    if (settings) {
      setNavMobileItems(settings);
      setImage(settings.logo);
    }
  }, [menu, settings]);
  const handleEnter = useCallback((label) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(label);
  }, []);
  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 130);
  }, []);
  const activeItem = navItems.find((n) => n.label === activeMenu);
  const handleAccountClick = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      window.location.href = "/account";
      return;
    }

    setShowDropdown((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authID");
    localStorage.removeItem("authUser");
    localStorage.clear();

    window.location.href = "/";
  };
  const handleWishlistClick = async (e, closeMenu) => {
    e.preventDefault();

    await fetchWishlist();

    if (closeMenu) {
      closeMenu();
    }

    window.location.href = "/wishlist";
  };
  return (
    <React.Fragment>
      {/* ① Light grey top promo bar */}
      <TopPromoBar settings={navMobileItems} />

      {/* ② White sticky header */}
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : "border-b border-gray-100"}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* DESKTOP — Logo left | Search centre | Icons right */}
          <div className="hidden lg:flex items-center gap-6 py-3">
            {/* Logo — top left */}
            <Link
              href="/"
              className="flex-none inline-flex items-center hover:opacity-85 transition-opacity"
            >
              <BrandLogo />
            </Link>

            {/* Search — fills middle */}
            <div className="flex-1 flex justify-center">
              <HeaderSearch />
            </div>

            {/* Icons — top right */}
            <div className="flex items-center gap-0.5 flex-none">
              <div className="relative">
                <a
                  href="/account"
                  onClick={handleAccountClick}
                  className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-charcoal hover:text-stone transition-colors group"
                >
                  <User size={20} strokeWidth={1.5} />
                  <span className="font-body text-[9px] tracking-widest text-gray-400 group-hover:text-stone uppercase">
                    {user ? user : "Account"}
                  </span>
                </a>

                {/* 🔽 Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg z-50">
                    <button
                      onClick={() => (window.location.href = "/orders")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Orders
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <Link
                href="/wishlist"
                onClick={handleWishlistClick}
                className="relative p-2 text-charcoal flex flex-col items-center justify-center"
                aria-label="Wishlist"
              >
                <div className="relative">
                  <Heart size={20} strokeWidth={1.5} />

                  {wishlist.length > 0 && (
                    <span className="absolute -top-3 -right-3 min-w-[17px] h-[17px] px-1 bg-pinked text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                      {wishlist.length > 9 ? "9+" : wishlist.length}
                    </span>
                  )}
                </div>

                <span className="font-body text-[9px] tracking-widest text-gray-400 uppercase mt-1">
                  Wishlist
                </span>
              </Link>
              <button
                onClick={toggleCart}
                aria-label="Bag"
                className="relative flex flex-col items-center gap-0.5 px-2.5 py-1 text-charcoal hover:text-stone transition-colors group"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="font-body text-[9px] tracking-widest text-gray-400 group-hover:text-stone uppercase">
                  Bag
                </span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="b"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-1 w-[17px] h-[17px] bg-pinked text-white text-[9px] rounded-full flex items-center justify-center font-bold pointer-events-none"
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* MOBILE — hamburger | centred logo | wishlist + bag */}
          <div className="flex lg:hidden items-center h-[52px]">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="p-2 -ml-1 text-charcoal flex-none"
            >
              <Menu size={22} strokeWidth={2} />
            </button>
            <div className="flex-1 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center"
              >
                <BrandLogo mobile />
              </Link>
            </div>
            <div className="flex items-center flex-none">
              <Link
                href="/wishlist"
                onClick={handleWishlistClick}
                className="relative p-2 text-charcoal"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />

                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-pinked text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {wishlist.length > 9 ? "9+" : wishlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleCart}
                className="relative p-2 text-charcoal"
                aria-label="Bag"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="mb"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-pinked text-white text-[9px] rounded-full flex items-center justify-center font-bold pointer-events-none"
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="lg:hidden pb-3">
            <HeaderSearch />
          </div>
        </div>

        {/* DESKTOP CATEGORY NAV */}
        <nav
          className="hidden lg:block w-full border-t border-gray-100 relative bg-white"
          onMouseLeave={handleLeave}
        >
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => handleEnter(item.label)}
                className="relative flex-none"
              >
                <Link
                  href={item.href}
                  className={`relative block font-body font-medium whitespace-nowrap px-3 xl:px-3.5 py-3 text-[15px] xl:text-[20px] transition-colors ${
                    item.sale
                      ? "text-coral font-bold hover:text-coral/80"
                      : "text-charcoal hover:text-stone"
                  }`}
                >
                  {item.label}
                  {item.hot && (
                    <span className="absolute top-2 -right-0.5 w-1.5 h-1.5 bg-coral rounded-full" />
                  )}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-pinked transition-transform duration-200 origin-left ${activeMenu === item.label ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {activeMenu && activeItem && (
              <div
                onMouseEnter={() => {
                  if (leaveTimer.current) clearTimeout(leaveTimer.current);
                }}
                onMouseLeave={handleLeave}
              >
                <MegaMenu item={activeItem} />
              </div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* ③ Black promo bar */}
      <BlackPromoBar settings={navMobileItems} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            onClose={() => setMobileOpen(false)}
            navItems={navItems}
            navMobileItems={navMobileItems}
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
