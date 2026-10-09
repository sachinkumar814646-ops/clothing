import MenHero from "components/men/MenHero";
import MenCategoryGrid from "components/men/MenCategoryGrid";
import MenPromoBanner from "components/men/MenPromoBanner";
import MenCollections from "components/men/MenCollections";
import MenArrivals from "components/men/MenArrivals";
import MenEditorialBanners from "components/men/MenEditorialBanners";
import MenBestsellers from "components/men/MenBestsellers";
import MenNewsletter from "components/men/MenNewsletter";
export const metadata = { title: "Menswear — COOMBB" };
export default function MenPage() {
    return (<>
      <MenHero />
      <MenCategoryGrid />
      <MenPromoBanner />
      <MenCollections />
      <MenArrivals />
      <MenEditorialBanners />
      <MenBestsellers />
      <MenNewsletter />
    </>);
}
