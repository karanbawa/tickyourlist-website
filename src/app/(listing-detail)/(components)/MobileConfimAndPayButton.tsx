'use client'

import React, { FC, useState } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";
import { useData } from "@/context/DataContext";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface MobileConfimAndPayButtonProps {
  tourGroup?: any;
  totalGuests?: string;
  totalAdults?: string;
  totalChilds?: string;
  totalInfants?: string;
  onClickConfirmAndPay?: any;
}

const MobileConfimAndPayButton: FC<MobileConfimAndPayButtonProps> = ({ tourGroup, totalGuests, totalAdults, totalChilds, totalInfants, onClickConfirmAndPay  }) => {
  const formatPrice = (price: number) => {
    return price?.toLocaleString('en-IN');
  };

  const calculatePricing = () => {
    const pricing = tourGroup?.listingPrice?.listingPrice;
    const prices = pricing?.prices || [];
    
    let totalOriginalPrice = 0;
    let totalFinalPrice = 0;

    if (totalGuests) {
      // If totalGuests is provided, use it for all guest types
      const guestCount = parseInt(totalGuests) || 0;
      const guestPrice = prices.find((p: any) => p.type.toLowerCase() === 'guest') || prices[0];
      
      totalOriginalPrice = guestCount * Math.ceil(guestPrice.originalPrice);
      totalFinalPrice = guestCount * Math.ceil(guestPrice.finalPrice);
    } else {
      // If individual counts are provided, calculate for each type
      prices.forEach((price: any) => {
        const guestType = price.type.toLowerCase();
        let guestCount = 0;

        if (guestType === 'adult') guestCount = parseInt(totalAdults || '0');
        else if (guestType === 'child') guestCount = parseInt(totalChilds || '0');
        else if (guestType === 'infant') guestCount = parseInt(totalInfants || '0');

        totalOriginalPrice += guestCount * Math.ceil(price.originalPrice);
        totalFinalPrice += guestCount * Math.ceil(price.finalPrice);
      });
    }

    const totalDiscount = totalOriginalPrice - totalFinalPrice;
    const savedPercentage = totalOriginalPrice > 0 
      ? Math.ceil((totalDiscount / totalOriginalPrice) * 100) 
      : 0;

    return { totalOriginalPrice, totalFinalPrice, totalDiscount, savedPercentage };
  };

  const { totalOriginalPrice, totalFinalPrice, totalDiscount, savedPercentage } = calculatePricing();
  const currencyCode = tourGroup?.listingPrice?.listingPrice?.currencyCode;
  const router = useRouter();

  const handleBookNow = () => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    router.push(`/checkout?tourId=${tourGroup?._id}&date=${today}`);
  }

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-neutral-800 z-40">
      <span className="absolute -top-[1.8rem] left-0 right-0 text-xs text-green-600 font-medium bg-green-100 pt-2 pb-2 pl-5">
      <span role="img" aria-label="money face" className="mr-1">🤑</span>
      Hurray, you saved {currencyCode} {totalDiscount}!
    </span>
      <div className="container py-2 sm:py-3 border-t border-neutral-200 dark:border-neutral-6000">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs line-through text-neutral-500 dark:text-neutral-400">
              {currencyCode} {formatPrice(totalOriginalPrice)}
            </span>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold">
                {currencyCode} {formatPrice(totalFinalPrice)}
              </span>
              {/* <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                /ticket
              </span> */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
          {/* <ModalReserveMobile
            renderChildren={({ openModal }) => ( */}
              <ButtonPrimary
                sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
                onClick={onClickConfirmAndPay}
                style={{ backgroundColor: '#7C25E9' }}
              >
                Confirm & Pay
              </ButtonPrimary>
            {/* )}
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileConfimAndPayButton;