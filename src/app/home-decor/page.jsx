import HomeHero from "components/home-decor/HomeHero";
import HomePromoStrip from "components/home-decor/HomePromoStrip";
import HomeCategoryGrid from "components/home-decor/HomeCategoryGrid";
import HomeNewIn from "components/home-decor/HomeNewIn";
import HomeCollectionBanners from "components/home-decor/HomeCollectionBanners";
import HomeTrending from "components/home-decor/HomeTrending";
import HomeSale from "components/home-decor/HomeSale";
import HomeNewsletter from "components/home-decor/HomeNewsletter";
export const metadata = { title: "Home Decor — COOMBB" };
export default function HomeDecorPage() {
    return (<>
      <HomeHero />
      <HomePromoStrip />
      <HomeCategoryGrid />
      <HomeNewIn />
      <HomeCollectionBanners />
      <HomeTrending />
      <HomeSale />
      <HomeNewsletter />
    </>);
}
