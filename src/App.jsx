import React, { useMemo, useEffect, useState } from "react";
import { CartProvider } from "lib/cart-context";
import { WishlistProvider } from "lib/wishlist-context";
import { AppProvider } from "lib/menu-context";

import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import CartDrawer from "components/cart/CartDrawer";

import HomePage from "app/page";
import AccountPage from "app/account/page";
import PaymentSuccess from "app/payment/success/page";
import PaymentFailure from "app/payment/failure/page";
import OrderPage from "app/order/page";
import CartPage from "app/cart/page";
import CheckoutPage from "app/checkout/page";
import WishlistPage from "app/wishlist/page";
import ProductPage from "app/product/[slug]/page";
import CategoryPage from "app/women/page";
import NewPage from "app/new/page";
import SubCategoryPage from "app/womenCategory/page";
import AboutUsPage from "app/about";
import SizeGuidePage from "app/size-guide";
import FaqPage from "app/faq";
import ContactUsPage from "app/contact-us";
import TermsAndConditionsPage from "app/termsandconditions";
import PrivacyPolicyPage from "app/privacy-policy";
import NotFoundPage from "app/not-found";

function getView(pathname) {
  if (pathname === "/") {
    return {
      title: "Coombb - Modern Luxury Fashion",
      view: <HomePage />,
    };
  }

  // ✅ Dynamic Category
  if (pathname.startsWith("/category/")) {
    const slug = pathname.split("/")[2];

    return {
      title: `${slug} - Coombb`,
      view: <CategoryPage slug={slug} />,
    };
  }
  if (pathname.startsWith("/products/")) {
    const slug = pathname.split("/")[2];

    return {
      title: `${slug} - Coombb`,
      view: <NewPage slug={slug} />,
    };
  }
  // ✅ Dynamic Category
  if (pathname.startsWith("/product-category/")) {
    const slug = pathname.split("/")[2];

    return {
      title: `${slug} - Coombb`,
      view: <SubCategoryPage slug={slug} />,
    };
  }

  if (pathname === "/account") {
    return { title: "Account - Coombb", view: <AccountPage /> };
  }
  if (pathname === "/payment/success") {
    return { title: "Payment Success - Coombb", view: <PaymentSuccess /> };
  }
  if (pathname === "/payment/cancel") {
    return { title: "Payment Failure - Coombb", view: <PaymentFailure /> };
  }

  if (pathname === "/cart") {
    return { title: "Cart - Coombb", view: <CartPage /> };
  }

  if (pathname === "/checkout") {
    return { title: "Checkout - Coombb", view: <CheckoutPage /> };
  }

  if (pathname === "/wishlist") {
    return { title: "Wishlist - Coombb", view: <WishlistPage /> };
  }
  if (pathname === "/orders") {
    return { title: "Orders - Coombb", view: <OrderPage /> };
  }

  // ✅ Product Page
  if (pathname.startsWith("/product/")) {
    const slug = pathname.split("/")[2]; // extract slug

    return {
      title: "Product - Coombb",
      view: <ProductPage params={{ slug }} />, // ✅ FIXED
    };
  }

  if (pathname === "/about-us") {
    return { title: "About Us - Coombb", view: <AboutUsPage /> };
  }
  if (pathname === "/contact-us") {
    return { title: "Contact Us - Coombb", view: <ContactUsPage /> };
  }
  if (pathname === "/terms-and-conditions") {
    return {
      title: "Terms and Conditions - Coombb",
      view: <TermsAndConditionsPage />,
    };
  }
  if (pathname === "/privacy-policy") {
    return { title: "Privacy Policy - Coombb", view: <PrivacyPolicyPage /> };
  }
  if (pathname === "/size-guide") {
    return { title: "Size Guide - Coombb", view: <SizeGuidePage /> };
  }
  if (pathname === "/faq") {
    return { title: "FAQ - Coombb", view: <FaqPage /> };
  }

  return {
    title: "Not Found - Coombb",
    view: <NotFoundPage />,
  };
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  // ✅ Listen for browser navigation
  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);

    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const current = useMemo(() => getView(path), [path]);

  // ✅ Update page title
  useEffect(() => {
    document.title = current.title;
  }, [current]);

  return (
    <AppProvider>
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <CartDrawer />
          <main className="page-content bg-white">{current.view}</main>
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </AppProvider>
  );
}
