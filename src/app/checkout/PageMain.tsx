"use client";

import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
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



export interface CheckOutPagePageMainProps {
  className?: string;
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 4);

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  // const [startDate, setStartDate] = useState<Date | null>(
  //   new Date("2023/02/06")
  // );
  const [stayDate, setStayDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
  const router = useRouter();

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 1,
    guestInfants: 1,
  });

  useEffect(() => {
    // Access query parameters from URL
    const searchParams = new URLSearchParams(window.location.search);
    const tourid = searchParams.get("tourId");
    const date = searchParams.get("date");

    // Now you can use `tourid` and `date` to fetch or initialize state
    console.log("Tour ID:", tourid);
    console.log("Date:", date);
  }, []);


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

  const renderPreference = () => {
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
  
    return (
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold mb-4">Select a preference</h3>
        <div className="flex lg:justify-between gap-4 overflow-x-auto xl:overflow-x-visible">
          <div className="flex flex-grow-1 gap-4">
            {demoVariants.map((variant, index) => (
              <CardVariant
                key={index}
                title={variant.title}
                originalPrice={variant.originalPrice}
                discountedPrice={variant.discountedPrice}
                discount={variant.discount}
                features={variant.features}
                className="flex-shrink-0 xl:flex-grow-1"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  
  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          {renderPreference()}

          {renderViewBookings()}



          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 z-10">
          {/* <form className="mt-6 flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl z-10"> */}
            <StayDatesRangeInput className="flex-1 z-[11]" onChangeDate={setStayDate} />
            <ModalSelectGuests
              renderChildren={({ openModal }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Guests</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      <span className="line-clamp-1">
                        {`${
                          (guests.guestAdults || 0) +
                          (guests.guestChildren || 0)
                        } Guests, ${guests.guestInfants || 0} Infants`}
                      </span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
            {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
            <GuestsInput className="flex-1" onChangeGuests={setGuests} /> */}
          {/* </form> */}
          </div>
            {/* <ModalSelectDate
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString([startDate, endDate])}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            /> */}

        {/* <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10"> */}
          {/* </div> */}
        
        {/* <GuestsInput /> */}

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <Image className="w-8" src={visaPng} alt="visa" />
                      <Image
                        className="w-8"
                        src={mastercardPng}
                        alt="mastercard"
                      />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" defaultValue="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" defaultValue="***" />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary href={"/pay-done"} style={{ backgroundColor: '#7C25E9' }}>Confirm and pay</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-4/5 xl:w-4/5 lg:pr-10 ">{renderMain()}</div>
        {/* <div className="hidden lg:block flex-grow">{renderSidebar()}</div> */}
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
