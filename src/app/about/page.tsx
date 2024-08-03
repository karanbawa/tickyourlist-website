import rightImg from "@/images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import Head from "next/head";

export interface PageAboutProps {}

export const metadata = {
  title: 'About Us | TickYourList',
  description: 'TickYourList is your passport to unforgettable adventures and epic experiences. Join us as we redefine adventure and create lasting memories.',
  keywords: 'About TickYourList, adventures, experiences, travel, epic journeys, hidden gems',
  robots: 'index, follow',
  canonical: 'https://www.tickyourlist.com/about'
};

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <link rel="canonical" href={metadata.canonical} />
      </Head>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="TickYourList is your passport to unforgettable adventures and epic experiences. We're here to make discovering the world's hidden gems effortless and exhilarating. From thrilling escapades in your own backyard to epic journeys across the globe, we've got you covered. With TickYourList, the world is your playground, and the possibilities are endless. Join us as we redefine adventure and create memories that will last a lifetime."
        />

        <SectionStatistic />

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
