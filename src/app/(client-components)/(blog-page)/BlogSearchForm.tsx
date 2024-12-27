"use client";

import React, { FC, useState } from "react";
import RealEstateSearchForm from "./BlogSearchFormFields";

export type SearchRealEstateTab = "Buy" | "Rent" | "Sell";

export interface BlogSearchFormProps {
  className?: string;
  currentTab?: SearchRealEstateTab;
}

const BlogSearchForm: FC<BlogSearchFormProps> = ({
  className = "",
}) => {

  return (
    <div
      className={`nc-HeroRealEstateSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      <RealEstateSearchForm />
    </div>
  );
};

export default BlogSearchForm;
