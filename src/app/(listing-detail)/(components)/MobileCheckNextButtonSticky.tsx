'use client'

import React, { FC, useState } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";

interface MobileCheckNextButtonStickyProps {
  tourGroup?: any
  selectedVariantIndex?: any
  getFormattedDate: any
  getFormatedData: any
}

const MobileCheckNextButtonSticky: FC<MobileCheckNextButtonStickyProps> = ({ tourGroup, selectedVariantIndex, getFormattedDate, getFormatedData }) => {
  const formatPrice = (price: number) => {
    return price?.toLocaleString('en-IN');
  };

  const originalPrice = Math.ceil(tourGroup?.listingPrice?.prices?.[0]?.originalPrice);
  const finalPrice =  Math.ceil(tourGroup?.listingPrice?.prices?.[0]?.finalPrice);
  const currencyCode = tourGroup?.listingPrice?.currencyCode;
  const savedAmount = originalPrice - finalPrice;
  const savedPercentage = Math.ceil((savedAmount / originalPrice) * 100);
  const router = useRouter();

  const handleBookNow = () => {
    router.push(`/book?tourId=${tourGroup?._id}&date=${getFormatedData()}&tour=${tourGroup?.variants?.[selectedVariantIndex]?.tours?.[0]?._id}&variantId=${tourGroup?.variants?.[selectedVariantIndex]?._id}`);
  }

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-neutral-800 z-40">
      <div className="container py-3 sm:py-3 border-t border-neutral-200 dark:border-neutral-6000">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-neutral-6000 dark:text-neutral-400 font-semibold">
              {tourGroup?.variants?.[selectedVariantIndex]?.name}
            </span>
            <div className="flex items-baseline">
              <span className="ml-1 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                {getFormattedDate()}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">

          {/* <ModalReserveMobile
            renderChildren={({ openModal }) => ( */}
              <ButtonPrimary
                sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
                onClick={handleBookNow}
                style={{ backgroundColor: '#7C25E9' }}
              >
                Next
              </ButtonPrimary>
            {/* )}
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCheckNextButtonSticky;