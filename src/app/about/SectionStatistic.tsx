import React, { FC } from "react";
import Heading from "@/shared/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "Explore Experiences",
    subHeading:
      "Browse A Variety Of Unique Travel Experiences, Tailored For Every Preference.",
  },
  {
    id: "2",
    heading: "Secure & Reliable Booking",
    subHeading: "Experience Hassle-Free Booking With Our Trusted And Secured Platform.",
  },
  {
    id: "3",
    heading: "Instant Confirmation",
    subHeading:
      "Get Immediate Booking Confirmations For Swift And Efficient Travel Planning.",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <section className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc="Discover the world with TickYourList, your ultimate gateway to unforgettable adventures and experiences. Let us turn your travel dreams into reality, one tick at a time."
      >
        🚀 Book your Experience
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <p className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionStatistic;
