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

const MobileFooterSticky: FC<MobileFooterStickyProps>  = ({ tourGroup }) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/02/06")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
            <span className="text-xs line-through text-neutral-500 dark:text-neutral-400">
              Rs {tourGroup?.listingPrice?.originalPrice}
            </span>
          
          <div className="flex items-baseline">
          <span className="text-lg font-semibold ml-2">
              Rs {tourGroup?.listingPrice?.finalPrice}
            </span>
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /ticket
            </span>
            </div>
          {/* <span className="block text-xl font-semibold">
            Rs {data?.listingPrice?.finalPrice}
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /day
            </span>
          </span> */}
          {/* <ModalSelectDate
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {converSelectedDateToString([startDate, endDate])}
              </span>
            )}
          /> */}
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
  );
};

export default MobileFooterSticky;
