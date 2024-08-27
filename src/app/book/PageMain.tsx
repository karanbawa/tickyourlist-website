"use client";

import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState } from "react";
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

export interface CheckOutPagePageMainProps {
  className?: string;
  tourGroup?: any;
  date?: any;
  tour?: any;
  variantId?: any;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  tourGroup,
  date,
  tour,
  variantId
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/02/06")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
  const router = useRouter();

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 1,
    guestInfants: 1,
  });

  const getFormattedDate = () => {
    if(date) {
    const parsedDate = new Date(date);
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

  const handleEditDetails = () => {
    router.push(
      `/checkout?tourId=${tourGroup.id}&date=${date}`
    );
  }

  const getDiscountedPrice = () => {
    const variant = tourGroup?.variants?.find((variant: any) => variant?._id === variantId);
    return variant?.listingPrice?.originalPrice - variant?.listingPrice?.finalPrice;
  }

  const renderSidebar = () => {
    return (
      <div className="flex flex-col lg:flex-row justify-between lg:my-0 lg:max-w-sm">
        <div className="relative bg-white border border-gray-200 rounded-lg">
          {/* Banner Section */}
          <div className="relative mb-5">
            <div className="relative w-full h-40 bg-center bg-cover bg-no-repeat rounded-t-lg" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn-imgix.headout.com/media/images/6c6519b8db7ddab3f5381d54ee30032a-Frame-banner.jpg')" }}>
              <h2 className="text-white text-xl font-medium tracking-wide p-5">{tourGroup?.name}</h2>
            </div>
            <div className="absolute bottom-[-12px] right-0 flex items-center bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="mr-1">
                {/* SVG paths */}
              </svg>
              ₹{getDiscountedPrice()} Saved
            </div>
          </div>

          {/* Selection Details */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                {/* <svg className="w-5 h-5 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="date and time"> */}
                  {/* SVG paths */}
                {/* </svg> */}
                <span className="text-gray-700">{getFormattedDate()}</span>
              </div>
              <button className="text-sm font-medium text-blue-600 uppercase" onClick={handleEditDetails}>Edit</button>
            </div>

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                {/* <svg className="w-5 h-5 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="tour preference"> */}
                  {/* SVG paths */}
                {/* </svg> */}
                <span className="text-gray-700">{tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.name}</span>
              </div>
              <button className="text-sm font-medium text-blue-600 uppercase" onClick={handleEditDetails}>Edit</button>
            </div>

            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-1">
                {/* <svg className="w-5 h-5 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
                  {/* SVG paths */}
                {/* </svg> */}
                <span className="text-gray-700">Valid until: 14 Nov, 2024</span>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">1 Adult</span>
              <span className="text-gray-700 font-medium">₹{tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.listingPrice?.originalPrice}</span>
            </div>

            {/* <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">VAT</span>
              <span className="text-gray-700 font-medium">₹86</span>
            </div> */}

            <div className="flex justify-between items-center bg-green-50 p-3 border-t border-gray-200 border-dashed">
              <span className="text-green-700">TickYourList discount</span>
              <span className="text-green-700 font-medium">- ₹{getDiscountedPrice()}</span>
            </div>
          </div>

          {/* Total Payable and Payment Button */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-medium text-gray-700">Total payable</span>
              <span className="text-xl font-medium text-gray-700">₹{tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.listingPrice?.finalPrice}</span>
            </div>
            <span className="text-sm text-gray-500 block mb-4">Your card will be charged in INR</span>
            <ButtonPrimary
              className="w-full h-12 active:scale-95 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: "#7C25E9" }}
            // style={{ backgroundColor: stayDate ? "#7C25E9" : 'gray' }}
            // disabled={!stayDate} // Disable the button if stayDate is null
            >
              Confirm & Pay
            </ButtonPrimary>
            <p className="text-sm text-gray-600 mt-4">
              By continuing, you agree to the <a href="/termsandconditions/" target="_blank" className="underline">general terms</a> and the <a href="/privacypolicy/" target="_blank" className="underline">privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    )
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-semibold">
            Confirm and payment
          </h2>
          <NcModal
            renderTrigger={(openModal) => (
              <span
                onClick={() => openModal()}
                className="block lg:hidden underline mt-2 cursor-pointer"
              >
                View booking details
              </span>
            )}
            renderContent={renderSidebar}
            modalTitle="Booking details"
          />
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Guests</h3>
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
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
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
            />

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
                        {`${(guests.guestAdults || 0) +
                          (guests.guestChildren || 0)
                          } Guests, ${guests.guestInfants || 0} Infants`}
                      </span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${selected
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
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${selected
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
              <ButtonPrimary style={{ backgroundColor: "#7C25E9" }} href={"/pay-done"}>Confirm and pay</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
