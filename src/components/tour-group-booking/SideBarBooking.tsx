"use client";

import React, { useState, FC } from "react";
import StayDatesRangeInput from "@/app/(listing-detail)/listing-stay-detail/StayDatesRangeInput";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { GuestsObject } from "@/app/(client-components)/type";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Route } from "next";

interface SidebarBookingProps {
  tourGroup: any;
}

const SidebarBooking: FC<SidebarBookingProps> = ({ tourGroup }) => {
  const [stayDate, setStayDate] = useState<Date | null>(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 1,
    guestChildren: 0,
    guestInfants: 0,
  });

  const router = useRouter();

  const totalGuests = () => {
    return (
      (guests?.guestAdults || 0) +
      (guests?.guestChildren || 0) +
      (guests?.guestInfants || 0)
    );
  };

  const handleBookNow = async () => {
    if (!stayDate) {
      setShowError(true);
      return;
    }

    setIsLoading(true);

    if (tourGroup?.id && stayDate) {
      const formattedDate = encodeURIComponent(
        stayDate.toLocaleDateString("en-CA")
      );
      const url = `/checkout?tourId=${tourGroup._id}&date=${formattedDate}`;
      router.prefetch(url as Route);
      router.push(url as Route);
    }

    setIsLoading(false);
  };

  const handleDateChange = (date: Date | null) => {
    setStayDate(date);
    setShowError(false);
  };

  return (
    <>
      <form>
        <StayDatesRangeInput 
          className="flex-1 z-[11] flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl" 
          onChangeDate={handleDateChange} 
        />
        {showError && (
          <span className="text-red-500 mt-0 ml-2">Please select a date</span>
        )}
      </form>
      <ButtonPrimary
        onClick={handleBookNow}
        style={{ backgroundColor: "#7C25E9" }}
        disabled={isLoading}
        className="relative flex"
        childrenClassname="flex"
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin mt-1" />
        )}
        {stayDate ? "Book Now" : "Select a Date"}
      </ButtonPrimary>
    </>
  );
};

export default SidebarBooking;