"use client";

import React, { FC, useEffect, useState } from "react";
import { StaySearchFormFields } from "../type";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import ExperiencesSearchForm from "./(experiences-search-form)/ExperiencesSearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";

export type SearchTab = "Experiences" | "Stays" | "Cars" | "Flights";

export interface HeroSearchFormSmallProps {
  className?: string;
  defaultTab?: SearchTab;
  onTabChange?: (tab: SearchTab) => void;
  defaultFieldFocus?: StaySearchFormFields;
}

// const TABS: SearchTab[] = ["Stays", "Experiences", "Cars", "Flights"];
const TABS: SearchTab[] = ["Experiences"];

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
  defaultTab = "Experiences",
  onTabChange,
  defaultFieldFocus,
}) => {
  const [tabActive, setTabActive] = useState<SearchTab>(defaultTab);

  useEffect(() => {
    setTabActive(defaultTab);
  }, [defaultTab]);

  const handleTabChange = (tab: SearchTab) => {
    setTabActive(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const renderTab = () => (
    <ul className="h-[88px] flex justify-center space-x-5 sm:space-x-9" aria-label="Search categories">
      {TABS.map((tab) => {
        const isActive = tab === tabActive;
        return (
          <li
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`relative flex-shrink-0 flex items-center cursor-pointer text-base ${
              isActive
                ? "text-neutral-900 dark:text-neutral-200 font-medium"
                : "text-neutral-500 dark:text-neutral-300"
            }`}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Select ${tab} search`}
          >
            <div className="relative select-none">
              <span>{tab}</span>
              {isActive && (
                <span className="absolute top-full mt-1 block w-full h-0.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );

  const renderForm = () => {
    console.log(tabActive);
    switch (tabActive) {
      // case "Stays":
      //   return <StaySearchForm defaultFieldFocus={defaultFieldFocus} />;
      case "Experiences":
        return <ExperiencesSearchForm defaultFieldFocus={defaultFieldFocus} />;
      // case "Cars":
      //   return <RentalCarSearchForm />;
      // case "Flights":
      //   return <FlightSearchForm />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchFormSmall ${className}`}
      data-nc-id="HeroSearchFormSmall"
      aria-label="Hero search form small"
    >
      {renderTab()}
      <div className="mt-2">{renderForm()}</div>
    </div>
  );
};

export default HeroSearchFormSmall;
