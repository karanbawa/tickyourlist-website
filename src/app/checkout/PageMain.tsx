"use client";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import NcModal from "@/shared/NcModal";
import Image from "next/image";
import { GuestsObject } from "../(client-components)/type";
import { useRouter } from "next/navigation";
import StayDatesRangeInput from "../(listing-detail)/listing-stay-detail/StayDatesRangeInput";
import { DEMO_AUTHORS } from "@/data/authors";
import CardVariant from "@/components/tour-group-booking/CardVariants";
import { ArrowLeft, HelpCircle } from "lucide-react";
import MobileFooterSticky from "../(listing-detail)/(components)/MobileFooterSticky";
import MobileCheckNextButtonSticky from "../(listing-detail)/(components)/MobileCheckNextButtonSticky";

export interface CheckOutPagePageMainProps {
  className?: string;
  tourGroup?: any;
  currencyCode?: string
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 4);

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  tourGroup,
  currencyCode
}) => {
  // const [startDate, setStartDate] = useState<Date | null>(
  //   new Date("2023/02/06")
  // );
  const [stayDate, setStayDate] = useState<Date | null>(null);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
   // Create a ref for the element to scroll to
   const scrollToElementRef = useRef<HTMLDivElement>(null);

   const [showNextBookButtonAtFooter, setShowNextBookButtonAtFooter] = useState(false);

    // const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
  const router = useRouter();

  const handleVariantSelect = (index: number | undefined) => {
    setShowNextBookButtonAtFooter(true);
    setSelectedVariantIndex(index !== undefined ? index : null);
  };  

  useEffect(() => {
    if (selectedVariantIndex !== null && scrollToElementRef.current) {
      const elementTop = scrollToElementRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight * 0.5;
      const targetPosition = elementTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }, [selectedVariantIndex]);


  useEffect(() => {
    if (stayDate && tourGroup?.id) {
      const formattedDate = encodeURIComponent(
        stayDate?.toLocaleDateString("en-CA")
      );
      router.push(
        `/checkout?tourId=${tourGroup._id}&date=${formattedDate}`
      );
    }
  }, [stayDate, tourGroup?._id, router]);

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 1,
    guestInfants: 1,
  });


  const getFormattedDate = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = searchParams.get("date");
    if(dateParam) {
    const parsedDate = new Date(dateParam);
    return  parsedDate.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }else {
      return undefined;
    }
  }

  const getFormatedData= () => {
    if (tourGroup?.id && stayDate) {
      const formattedDate = encodeURIComponent(
        stayDate?.toLocaleDateString("en-CA")
      );
      // router.push(`/checkout?tourId=${tourGroup.id}&date=${formattedDate}`);
      return formattedDate;
    }

    return;
  }

  // Update the calculateDiscountPercentage function to handle string inputs
function calculateDiscountPercentage(originalPrice: string | number, finalPrice: string | number): string {
  const original = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice;
  const final = typeof finalPrice === 'string' ? parseFloat(finalPrice) : finalPrice;

  if (!original || !final || original <= final) {
    return "0";
  }

  const discount = ((original - final) / original) * 100;
  return Math.round(discount).toString(); // Rounds to the nearest integer
}

 const renderPreference = () => {
  return (
    <div className="flex flex-col">
      <div className="text-sm md:text-2xl font-semibold mt-2 md:mt-0 mb-4 sm:max-md:text-[#444444]">Select a preference</div>
      {/* <span className="text-xs text-gray-500">Select a Preference to proceed</span> */}
      <div className="flex lg:justify-between gap-4 overflow-x-auto xl:overflow-x-visible">
        <div className="flex flex-grow-1 gap-4">
          {tourGroup?.variants.map((variant: any, index: number) => {
            const listingPrices = variant.listingPricesInAllCurrencies?.find((currency: { currencyCode: any; }) => currency?.currencyCode === currencyCode);
            const guestPrice = listingPrices?.prices.find((p: any) => p.type === 'GUEST');
            const adultPrice = listingPrices?.prices.find((p: any) => p.type === 'ADULT');
            const selectedPrice = guestPrice || adultPrice;

            // if (!selectedPrice) return null; // Skip this variant if no valid price is found

            return (
              <CardVariant
                key={variant?._id}
                title={variant?.name}
                currencyCode={currencyCode}
                originalPrice={selectedPrice?.originalPrice}
                discountedPrice={selectedPrice?.finalPrice}
                discount={`Save up to ${calculateDiscountPercentage(selectedPrice?.originalPrice, selectedPrice?.finalPrice)}%`}
                features={variant?.variantInfo?.split('\r\n')?.map((feature: string) => feature?.replace(/^-/, '')?.trim())}
                index={index}
                onVariantSelect={handleVariantSelect}
                isSelected={selectedVariantIndex === index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const handleHelpCenter = () => {
  router.push('/contact')
}

const handleBackButton = () => {
  router.back();
}

  const renderDateSelector = () => {
    return (<>
    <div>
    <h2 className="text-[#444444] text-sm md:text-lg font-medium mb-1.5">
          Select a date
        </h2>
        <p className="text-[#444444] text-xs md:text-sm font-light">
          All prices are in {currencyCode}
          {/* All prices are in {currencyCode} (₹) */}
        </p>
        <div className="mt-3 md:mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 z-10">
        <StayDatesRangeInput className="flex-1 z-[11]" onChangeDate={setStayDate} />
        </div>
    </div>
    </>)
  }
  
  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-1 md:space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="hidden md:block sm:text-xl md:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="hidden md:block border-b border-neutral-200 dark:border-neutral-700"></div>

         {renderDateSelector()}

          {renderPreference()}

          {selectedVariantIndex !== null && selectedVariantIndex !== undefined && (
            <>
             <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                            <div ref={scrollToElementRef} className="flex justify-between items-center">
                  <div className="flex-1 max-w-[70%]">
                    <div className="font-semibold truncate">{tourGroup?.variants?.[selectedVariantIndex]?.name}</div>
                    <div>{getFormattedDate()}</div>
                  </div>
                  <div>
                    <ButtonPrimary href={`/book?tourId=${tourGroup?._id}&date=${getFormatedData()}&tour=${tourGroup?.variants?.[selectedVariantIndex]?.tours?.[0]?._id}&variantId=${tourGroup?.variants?.[selectedVariantIndex]?._id}`} className="w-full h-12 active:scale-95 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2" style={{ backgroundColor: '#7C25E9' }}>Next</ButtonPrimary>
                  </div>
                </div>

                    <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                    </>
                  )}
          {/* {renderViewBookings()} */}
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
     <nav className="fixed sm:hidden top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-white shadow-sm pt-3 pb-3">
      <button className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={handleBackButton}>
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-sm font-semibold text-gray-600 truncate max-w-[60%]">
        {tourGroup?.name}
      </h1>
      <button className="text-gray-600 hover:text-gray-800" onClick={handleHelpCenter}>
        <HelpCircle size={24} />
      </button>
    </nav>
      <main className="container mt-14 md:mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-4/5 xl:w-4/5 lg:pr-10 ">{renderMain()}</div>
        {/* <div className="hidden lg:block flex-grow">{renderSidebar1()}</div> */}
      </main>
       {/* STICKY FOOTER MOBILE */}
       {showNextBookButtonAtFooter && <MobileCheckNextButtonSticky tourGroup={tourGroup} selectedVariantIndex={selectedVariantIndex} getFormattedDate={getFormattedDate} getFormatedData={getFormatedData} />}
    </div>
  );
};

export default CheckOutPagePageMain;
