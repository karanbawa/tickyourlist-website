"use client";

import BackgroundSection from "@/components/BackgroundSection";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { usePathname } from "next/navigation";
import React, { ReactNode, Suspense, useEffect } from "react";
import MobileFooterSticky from "../../(listing-detail)/(components)/MobileFooterSticky";
import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";
import { useData } from "@/context/DataContext";

const DetailLayout = ({ children }: { children: ReactNode }) => {
  const thisPathname = usePathname();
  const { data } = useData();

  const transformImageUploads = (imageUploads: any[]): ListingGalleryImage[] => {
    return imageUploads?.map((image, index) => ({
      id: index, // Auto-incremented ID starting from 1
      url: image?.url,
    }));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="ListingDetailPage">
        <Suspense fallback={<div>Loading Listing Image Gallery...</div>}>
          <ListingImageGallery images={transformImageUploads(data?.imageUploads)} data={data} />
        </Suspense>
        <div className="container ListingDetailPage__content">{children}</div>

        {/* OTHER SECTION */}
        {/* <div className="container py-24 lg:py-32">
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewCategories
              heading="Explore by types of stays"
              subHeading="Explore houses based on 10 types of stays"
              categoryCardType="card5"
              itemPerRow={5}
              sliderStyle="style2"
            />
          </div>
          <SectionSubscribe2 className="pt-24 lg:pt-32" />
        </div> */}

        {/* STICKY FOOTER MOBILE */}
        {/* <MobileFooterSticky /> */}
      </div>
    </Suspense>
  );
};

export default DetailLayout;
