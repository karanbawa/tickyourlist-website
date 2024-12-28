"use client";

import React, { FC, useState } from "react";
import RealEstateSearchForm from "./BlogSearchFormFields";

export type SearchRealEstateTab = "Buy" | "Rent" | "Sell";

export interface BlogSearchFormProps {
  className?: string;
  currentTab?: SearchRealEstateTab;
  travelCities?: any;
}

const BlogSearchForm: FC<BlogSearchFormProps> = ({
  className = "",
  travelCities
}) => {

  return (
    <div
      className={`flex justify-center nc-HeroRealEstateSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      <RealEstateSearchForm travelCities={travelCities} />
    </div>
  );
};

export default BlogSearchForm;
