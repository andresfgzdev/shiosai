import { Booking } from "@/components/sections/booking/booking";
import { Countersigned } from "@/components/sections/countersigned/countersigned";
import { Footer } from "@/components/sections/footer/footer";
import { Hero } from "@/components/sections/hero/hero";
import { KitchenRule } from "@/components/sections/kitchen-rule/kitchen-rule";
import { Nav } from "@/components/sections/nav/nav";
import { Questions } from "@/components/sections/questions/questions";
import { Storm } from "@/components/sections/storm/storm";
import { TideMenu } from "@/components/sections/tide-menu/tide-menu";
import { TideStrip } from "@/components/sections/tide-strip/tide-strip";
import { Viewfinder } from "@/components/sections/viewfinder/viewfinder";
import { Voyage } from "@/components/sections/voyage/voyage";
import { JsonLd } from "@/components/seo/json-ld";
import { listBookableDays } from "@/server/availability";

export default async function Home() {
  const days = await listBookableDays();
  return (
    <>
      <JsonLd />
      <Viewfinder />
      <Nav />
      <main id="main">
        <Hero />
        <TideStrip />
        <KitchenRule />
        <Voyage />
        <TideMenu />
        <Storm />
        <Countersigned />
        <Booking days={days} />
        <Questions />
      </main>
      <Footer />
    </>
  );
}
