"use client";

import React, { useState, FC } from "react";
import StayDatesRangeInput from "@/app/(listing-detail)/listing-stay-detail/StayDatesRangeInput";
import GuestsInput from "@/app/(listing-detail)/listing-stay-detail/GuestsInput";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { GuestsObject } from "@/app/(client-components)/type";

interface SidebarBookingProps {
  tourGroup: any;
}

const SidebarBooking: FC<SidebarBookingProps> = ({ tourGroup }) => {
  const [stayDate, setStayDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 1,
    guestChildren: 0,
    guestInfants: 0,
  });

  const totalGuests = () => {
    return (
      (guests?.guestAdults || 0) +
      (guests?.guestChildren || 0) +
      (guests?.guestInfants || 0)
    );
  };

  return (
    <>
      <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl">
        <StayDatesRangeInput
          className="flex-1 z-[11]"
          onChangeDate={setStayDate} // Pass the setStayDate function to update the date
        />
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        <GuestsInput className="flex-1" onChangeGuests={setGuests} />
      </form>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>$119 x {totalGuests()} tickets</span>
          <span>${119 * totalGuests()}</span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>Service charge</span>
          <span>$0</span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${119 * totalGuests()}</span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>Adults</span>
          <span>{guests.guestAdults}</span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>Children</span>
          <span>{guests.guestChildren}</span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>Infants</span>
          <span>{guests.guestInfants}</span>
        </div>
      </div>
      <ButtonPrimary href="/checkout" style={{ backgroundColor: '#7C25E9' }}>Book Now</ButtonPrimary>
    </>
  );
};

export default SidebarBooking;
