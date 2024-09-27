'use client'

import React, { FC, useState } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";
import { useData } from "@/context/DataContext";

interface MobileFooterStickyProps {
  tourGroup?: any
}

const MobileFooterSticky: FC<MobileFooterStickyProps> = ({ tourGroup }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const originalPrice = tourGroup?.listingPrice?.originalPrice;
  const finalPrice = tourGroup?.listingPrice?.finalPrice;
  const savedAmount = originalPrice - finalPrice;
  const savedPercentage = Math.round((savedAmount / originalPrice) * 100);

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-neutral-800 z-40">
      <span className="absolute -top-[1.8rem] left-0 right-0 text-xs text-green-600 font-medium bg-green-100 pt-2 pb-2 pl-8">
      <span role="img" aria-label="money face" className="mr-1">🤑</span>
      Save up to {savedPercentage}%
    </span>
      <div className="container py-2 sm:py-3 border-t border-neutral-200 dark:border-neutral-6000">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs line-through text-neutral-500 dark:text-neutral-400">
              ₹ {formatPrice(originalPrice)}
            </span>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold">
                ₹ {formatPrice(finalPrice)}
              </span>
              <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                /ticket
              </span>
            </div>
          </div>
          <ModalReserveMobile
            renderChildren={({ openModal }) => (
              <ButtonPrimary
                sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
                onClick={openModal}
                style={{ backgroundColor: '#7C25E9' }}
              >
                Book Now
              </ButtonPrimary>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileFooterSticky;