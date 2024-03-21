import rightImg from "@/images/about-hero-right.png";
import React, { FC } from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionHero from "../about/SectionHero";
import SectionStatistic from "../about/SectionStatistic";

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="TickYourList is your passport to unforgettable adventures and epic experiences. We're here to make discovering the world's hidden gems effortless and exhilarating. From thrilling escapades in your own backyard to epic journeys across the globe, we've got you covered. With TickYourList, the world is your playground, and the possibilities are endless. Join us as we redefine adventure and create memories that will last a lifetime."
        />

        {/* <SectionFounder /> */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div> */}

        <SectionStatistic />

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
