"use client";

import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import visaPng from "@/images/vis.png";
import mastercardPng from "@/images/mastercard.svg";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import NcModal from "@/shared/NcModal";
import ModalSelectDate from "@/components/ModalSelectDate";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalSelectGuests from "@/components/ModalSelectGuests";
import Image from "next/image";
import { GuestsObject } from "../(client-components)/type";
import { useRouter } from "next/navigation";
import GuestsInput from "../(client-components)/(HeroSearchForm2Mobile)/GuestsInput";
import StayDatesRangeInput from "../(listing-detail)/listing-stay-detail/StayDatesRangeInput";
import { DEMO_AUTHORS } from "@/data/authors";
import CardAuthorBox2 from "@/components/CardAuthorBox2";
import CardAuthorBox from "@/components/CardAuthorBox";
import CardVariant from "@/components/tour-group-booking/CardVariants";

const demoVariants = [
  {
    title: "IMG Tickets",
    originalPrice: 8339,
    discountedPrice: 4912,
    discount: "Save up to 41%",
    features: [
      "Entry into IMG Worlds of Adventure",
      "Unlimited access to all rides",
    ],
  },
  {
    title: "IMG Tickets with Combo Meal",
    originalPrice: 9710,
    discountedPrice: 6511,
    discount: "Save up to 33%",
    features: [
      "Combo meal voucher",
      "Entry into IMG Worlds of Adventure",
      "Unlimited access to all rides",
    ],
  },
  {
    title: "IMG Fast Track Tickets",
    originalPrice: 12337,
    discountedPrice: 10281,
    discount: "Save up to 17%",
    features: [
      "Fast-track entry to all rides and attractions",
      "Unlimited access to all rides",
      "Tickets are valid for both UAE residents & tourists",
    ],
  },
];

export interface CheckOutPagePageMainProps {
  className?: string;
  tourGroup?: any;
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 4);

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  tourGroup
}) => {
  // const [startDate, setStartDate] = useState<Date | null>(
  //   new Date("2023/02/06")
  // );
  const [stayDate, setStayDate] = useState<Date | null>(null);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
   // Create a ref for the element to scroll to
   const scrollToElementRef = useRef<HTMLDivElement>(null);

    // const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
  const router = useRouter();

  const handleVariantSelect = (index: number | undefined) => {
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
        `/checkout?tourId=${tourGroup.id}&date=${formattedDate}`
      );
    }
  }, [stayDate, tourGroup?.id, router]);

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


  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt=""
                fill
                sizes="200px"
                src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Hotel room in Tokyo, Jappan
              </span>
              <span className="text-base font-medium mt-1 block">
                The Lounge & Bar
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              2 beds · 2 baths
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$57</span>
          </div>
        </div>
      </div>
    );
  };

  const renderViewBookings = () => {
    return (
      <div>
            <h3 className="text-2xl font-semibold mt-6">Your ticket</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
    )
  }

  function calculateDiscountPercentage(originalPrice: number, finalPrice: number): string {
    if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
      return "0";
    }
  
    const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
    return Math.round(discount).toString(); // Rounds to the nearest integer
  }

  const renderPreference = () => {

    return (
      <div className="flex flex-col">
      <h3 className="text-2xl font-semibold mb-4">Select a preference</h3>
      <div className="flex lg:justify-between gap-4 overflow-x-auto xl:overflow-x-visible">
        <div className="flex flex-grow-1 gap-4">
          {tourGroup?.variants.map((variant: any, index: any) => (
            <CardVariant
              key={index}
              title={variant?.name}
              originalPrice={variant?.listingPrice?.originalPrice}
              discountedPrice={variant?.listingPrice?.finalPrice}
              discount={`Save up to ${calculateDiscountPercentage(variant?.listingPrice?.originalPrice, variant?.listingPrice?.finalPrice)}%`}
              features={variant?.variantInfo?.split('\r\n')?.map((feature: any) => feature?.replace(/^-/, '')?.trim())}
              index={index}
              onVariantSelect={handleVariantSelect}
              isSelected={selectedVariantIndex === index} // Pass the selected state
            />
          ))}
        </div>
      </div>
    </div>
    );
  }

  const renderDateSelector = () => {
    return (<>
    <div>
    <h2 className="text-[#444444] text-base md:text-lg font-medium mb-1.5">
          Select a date
        </h2>
        <p className="text-[#444444] text-xs md:text-sm font-light">
          All prices are in INR (₹)
        </p>
        <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 z-10">
        <StayDatesRangeInput className="flex-1 z-[11]" onChangeDate={setStayDate} />
        </div>
    </div>
    </>)
  }
  
  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

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
                    <ButtonPrimary href={`/book?tourId=${tourGroup?.id}&date=${getFormatedData()}&tour=${tourGroup?.variants?.[selectedVariantIndex]?.tours?.[0]?._id}&variantId=${tourGroup?.variants?.[selectedVariantIndex]?._id}`} className="w-full h-12 active:scale-95 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2" style={{ backgroundColor: '#7C25E9' }}>Next</ButtonPrimary>
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
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-4/5 xl:w-4/5 lg:pr-10 ">{renderMain()}</div>
        {/* <div className="hidden lg:block flex-grow">{renderSidebar1()}</div> */}
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
