import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Suspense,
  lazy,
} from "react";
import Hero from "components/home/Hero";
import { siteBanner, newArrival, siteSlider } from "services/api/menu";
import PageLoader from "components/ui/Loader";

// ✅ CRA equivalent of next/dynamic
const CategoryGrid = lazy(() => import("components/home/CategoryGrid"));
const NewArrivals = lazy(() => import("components/home/NewArrivals"));
const FeaturedProducts = lazy(() => import("components/home/FeaturedProducts"));
const SaleSection = lazy(() => import("components/home/SaleSection"));
const Editorial = lazy(() => import("components/home/Editorial"));

export default function Home() {
  const [bannerRes, setBannerRes] = useState(null);
  const [sliderRes, setSliderRes] = useState(null);
  const [arrivalRes, setArrivalRes] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showNewArrivals, setShowNewArrivals] = useState(false);

  const newArrivalsRef = useRef(null);

  // ================= MAIN API =================
  useEffect(() => {
    let cancelled = false;

    const loadHome = async () => {
      try {
        const [slider, banner] = await Promise.all([
          siteSlider(),
          siteBanner(),
        ]);

        if (cancelled) return;

        setSliderRes(slider);
        setBannerRes(banner);
      } catch (error) {
        console.error("Home page loading error:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadHome();

    return () => {
      cancelled = true;
    };
  }, []);

  // ================= NEW ARRIVALS =================
  const fetchNewArrivals = useCallback(async () => {
    try {
      const arrival = await newArrival();

      setArrivalRes(arrival);
    } catch (error) {
      console.error("New arrivals loading error:", error);
    }
  }, []);

  useEffect(() => {
    const node = newArrivalsRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowNewArrivals(true);

          fetchNewArrivals();

          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [fetchNewArrivals]);

  // ================= MAIN LOADER =================
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Hero topSlider={sliderRes?.data} />

      {bannerRes?.top_banner?.data && (
        <Suspense fallback={<div className="h-64" />}>
          <CategoryGrid topCategory={bannerRes.top_banner.data} />
        </Suspense>
      )}

      <div ref={newArrivalsRef} aria-hidden="true" />

      {showNewArrivals && arrivalRes?.data && (
        <Suspense fallback={<div className="h-64" />}>
          <NewArrivals data={arrivalRes?.data.new_product} />
        </Suspense>
      )}

      {bannerRes?.featured_products?.data && (
        <Suspense fallback={<div className="h-64" />}>
          <FeaturedProducts
            featuredProducts={bannerRes.featured_products.data}
          />
        </Suspense>
      )}

      {bannerRes?.top_products?.data && (
        <Suspense fallback={<div className="h-64" />}>
          <SaleSection topProducts={bannerRes.top_products.data} />
        </Suspense>
      )}

      <Suspense fallback={<div className="h-64" />}>
        <Editorial />
      </Suspense>
    </>
  );
}
