import type { FAQPage, Restaurant, WithContext } from "schema-dts";
import { faq, menu, site } from "@/content/site";

function serialize(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const restaurant: WithContext<Restaurant> = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  alternateName: site.kanji,
  url: site.url,
  description: site.description,
  image: `${site.url}/opengraph-image`,
  servesCuisine: ["Japanese", "Seafood"],
  priceRange: menu.price,
  acceptsReservations: `${site.url}/#book`,
  menu: `${site.url}/#menu`,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "17:30",
    closes: "22:30",
  },
};

const questions: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline, and serialize escapes "<" so the payload cannot close the script
      dangerouslySetInnerHTML={{ __html: serialize([restaurant, questions]) }}
    />
  );
}
