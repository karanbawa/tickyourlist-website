import React from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import CategoryTabs from "./CategoryTabs";
// import AlgoliaLikeSearch from './AlgoliaLikeSearch';
// import SectionGridFeaturePlaces from "@/components/tourrgroupsectionpage/SectionGridFeaturePlaces";

interface PageHome3Props {
  travelSections: any;
}

function PageHome3({ travelSections }: PageHome3Props) {
  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      {/* SECTION HERO */}
      <div className="container px-1 sm:px-4 mb-8 ">
        <SectionHero3 className="" />
      </div>

      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION 1 */}
        {travelSections.data && travelSections.data.length > 0 ? (
          <CategoryTabs travelSections={travelSections} />
        ) : (
          <div>No travel sections available</div>
        )}
        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome3;
