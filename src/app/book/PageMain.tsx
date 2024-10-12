'use client'

import { Tab } from "@headlessui/react";
import React, { FC, useEffect, useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import NcModal from "@/shared/NcModal";
import { GuestsObject } from "../(client-components)/type";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import MobileViewReviewPaybookingdetails from "@/components/bookingdetails/MobileViewReviewPaybookingdetails";
import MobileConfimAndPayButton from "../(listing-detail)/(components)/MobileConfimAndPayButton";
import CountryCodeSelector from "@/components/bookingdetails/CountryCodeSelector";
import Head from "next/head";

export interface CheckOutPagePageMainProps {
  className?: string;
  tourGroup?: any;
  date?: any;
  tour?: any;
  variantId?: any;
  currencyCode?: string;
  totalGuests?: string;
  totalAdults?: string;
  totalChilds?: string;
  totalInfants?: string;
}

interface PriceRowProps {
  label: string;
  subLabel: string;
  price: {
    finalPrice: number;
    originalPrice: number;
  };
  guests: number;
  type: 'guest' | 'adult' | 'child' | 'infant';
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  tourGroup,
  tour,
  date,
  variantId,
  currencyCode,
  totalGuests,
  totalAdults,
  totalChilds,
  totalInfants
}) => {
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  // const [phoneCodeError, setPhoneCodeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loadingConfirmPay, setLoadingConfirmPay] = useState(false);
  const [confirmPayError, setConfirmPayError] = useState('');
  const { user } = useAuth();

  const router = useRouter();

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: parseInt(totalGuests || totalAdults || '1'),
    guestChilds: parseInt(totalChilds || '0'),
    guestInfants: parseInt(totalInfants || '0')
  });

  const handleGuestChange = (change: number, type: 'guest' | 'adult' | 'child' | 'infant' = 'guest') => {
    setGuests(prevGuests => {
      const pricing = tourGroup?.listingPrice?.listingPrice;
      const hasSpecificTypes = pricing?.prices?.some((p: { type: string; }) =>
        ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
      );

      if (!hasSpecificTypes) {
        // If only guest type is available
        const newGuestAdults = Math.max(1, (prevGuests.guestAdults || 0) + change);
        return {
          ...prevGuests,
          guestAdults: newGuestAdults,
        };
      } else {
        // If specific types (adult, child, infant) are available
        const key = `guest${type.charAt(0).toUpperCase() + type.slice(1)}s` as keyof GuestsObject;
        const newValue = Math.max(0, (prevGuests[key] || 0) + change);

        // Ensure at least 1 adult
        if (key === 'guestAdults' && newValue < 1) {
          return prevGuests;
        }

        return {
          ...prevGuests,
          [key]: newValue,
        };
      }
    });
  };

  const calculateTotalAmount = () => {
    const pricing = tourGroup?.listingPrice?.listingPrice;
    if (!pricing) return { totalPrice: 0, guestPrice: 0, adultPrice: 0, childPrice: 0, infantPrice: 0 };
  
    const hasSpecificTypes = pricing?.prices?.some((p: { type: string }) =>
      ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
    );
  
    if (!hasSpecificTypes) {
      // If only guest type is available
      const guestPrice = pricing?.prices?.find((p: { type: string }) => p.type.toLowerCase() === 'guest');
      const finalGuestPrice = Math.ceil(guestPrice?.finalPrice) ?? 0;
      const totalPrice = (guests.guestAdults ?? 1) * finalGuestPrice;
      return {
        totalPrice,
        guestPrice: finalGuestPrice,
        adultPrice: null,
        childPrice: null,
        infantPrice: null,
        type: 'GUEST'
      };
    } else {
      // If specific types are available
      let adultPrice = 0;
      let childPrice = 0;
      let infantPrice = 0;
      let totalPrice = 0;
  
      pricing.prices.forEach((price: any) => {
        const type = price.type.toLowerCase();
        const finalPrice = Math.ceil(price.finalPrice);
        const guestCount = guests[`guest${type.charAt(0).toUpperCase() + type.slice(1)}s` as keyof GuestsObject] ?? 0;
  
        totalPrice += guestCount * finalPrice;
  
        switch (type) {
          case 'adult':
            adultPrice = finalPrice;
            break;
          case 'child':
            childPrice = finalPrice;
            break;
          case 'infant':
            infantPrice = finalPrice;
            break;
        }
      });
  
      return {
        totalPrice,
        guestPrice: null, // Set to 0 when specific types are available
        adultPrice,
        childPrice,
        infantPrice,
        type: 'AGEGROUP'
      };
    }
  };

  const getDiscountedPrice = () => {
    const pricing = tourGroup?.listingPrice?.listingPrice;
    if (!pricing) return 0;

    const hasSpecificTypes = pricing?.prices?.some((p: { type: string; }) =>
      ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
    );

    if (!hasSpecificTypes) {
      const guestPrice = pricing?.prices?.find((p: { type: string; }) => p.type.toLowerCase() === 'guest');
      return (guests?.guestAdults ?? 1) * ((Math.ceil(guestPrice?.originalPrice) ?? 0) - (Math.ceil(guestPrice?.finalPrice) ?? 0));
    } else {
      return pricing?.prices?.reduce((total: number, price: any) => {
        const guestCount = guests[`guest${price.type.charAt(0).toUpperCase() + price.type.slice(1)}s` as keyof GuestsObject] ?? 0;
        return total + (guestCount * (Math.ceil(price.originalPrice) - Math.ceil(price.finalPrice)));
      }, 0);
    }
  };

  useEffect(() => {
    // This effect will run only on the client-side
    if (typeof window !== 'undefined') {
      // Prevent zoom on focus for iOS devices
      const preventZoom = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };
      document.addEventListener('touchmove', preventZoom, { passive: false });
      
      return () => {
        document.removeEventListener('touchmove', preventZoom);
      };
    }
  }, []);

  const handleTogglePromoCode = () => {
    setShowPromoCode(!showPromoCode);
  };

  const getFormattedDate = () => {
    if (date) {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } else {
      return undefined;
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(new Error("Razorpay SDK failed to load"));
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (amount: any, orderId: any, booking: { nonCustomerFirstName: any; nonCustomerLastName: any; phoneCode: any; phoneNumber: any; _id: string, email: string }) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount,
        currency: currencyCode,
        name: "TickYourList",
        description: "Test Transaction",
        image: "https://tickyourlist-images.s3.ap-south-1.amazonaws.com/tyllogo.png",
        order_id: orderId,
        prefill: {
          name: `${booking?.nonCustomerFirstName} ${booking?.nonCustomerLastName}`,
          email: booking?.email,
          contact: `${booking?.phoneCode}${booking?.phoneNumber}`
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        },
        handler: function (response: any) {
          // This function will be called after the payment is successful
          // Route to the desired page after successful payment
          router.push(`/pay-done?razorpayOrderId=${response?.razorpay_order_id}&razorpayPaymentId=${response?.razorpay_payment_id}&razorpaySignature=${response?.razorpay_signature}&bookingId=${booking?._id}`);
        },
        modal: {
          ondismiss: function () {
            // Optional: You can also route to another page if the user closes the payment popup
          }
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      alert(error?.message || "Something went wrong during payment initialization.");
    }
  };

  const handleEditDetails = () => {
    router.push(
      `/checkout?tourId=${tourGroup._id}&date=${date}`
    );
  };

  const validateFields = () => {
    let valid = true;
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!email.trim()) {
      setEmailError("Email address is required");
      valid = false;
    } else if(!email.includes('@')) {
      setEmailError("Email address is not correct");
    } else {
      setEmailError('');
    }

    return valid;
  };

  // ... (keep the existing Razorpay and payment handling functions)

  const handleConfirmAndPay = async () => {
    if (!validateFields()) {
      return;
    }

    setLoadingConfirmPay(true);
    setConfirmPayError('');

    const priceInfo = calculateTotalAmount();
    const { totalPrice, guestPrice, adultPrice, childPrice, infantPrice, type } = priceInfo;

    const data = {
      domainId: "66cacba1eeca9633c29172b9",
      type: type,
      nonCustomerFirstName: firstName,
      nonCustomerLastName: lastName,
      email: email,
      phoneCode: phoneCode,
      phoneNumber: phoneNumber,
      content: "Booking content",
      tourId: tour,
      customerUserId: user?.data?.data?.data?.customer?._id,
      guestsCount: type === 'GUEST' ? guests.guestAdults : null,
      adultsCount: type !== 'GUEST' ? guests.guestAdults : null,
      childCount: guests.guestChilds,
      infantCount: guests?.guestInfants,
      childPrice: childPrice?.toString(),
      infantPrice: infantPrice?.toString(),
      guestPrice: guestPrice?.toString(),
      adultPrice: adultPrice?.toString(),
      amount: totalPrice?.toString(),
      currency: currencyCode,
      title: tourGroup?.name,
      source: "TickYourList",
      bookingDate: date,
      variantId,
      tourGroupId: tourGroup?._id,
      active: true,
    };

    try {
      const response = await fetch(`${process.env.BASE_URL}/v1/tyltourcustomerbooking/add/travel-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to Save the Record');
      }

      const result = await response.json();
      await handleRazorpayPayment(result?.data?.booking?.amount, result.data.razorpayOrderId, result?.data?.booking);
    } catch (error: any) {
      setConfirmPayError(error?.message || 'Failed to Save the Record. Please try again!');
    } finally {
      setLoadingConfirmPay(false);
    }
  };

  const renderSidebar = () => {
    const pricing = tourGroup?.listingPrice?.listingPrice;
    const hasSpecificTypes = pricing?.prices?.some((p: { type: string; }) =>
      ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
    );

    let totalOriginalPrice = 0;
    let totalFinalPrice = 0;
    let guestDetails: { type: string; count: number; price: number }[] = [];

    if (hasSpecificTypes) {
      pricing?.prices.forEach((price: any) => {
        const guestType = price.type.toLowerCase();
        const guestCount = guests[`guest${guestType.charAt(0).toUpperCase() + guestType.slice(1)}s` as keyof GuestsObject] || 0;
        const originalPriceForType = guestCount * Math.ceil(price.originalPrice);
        const finalPriceForType = guestCount * Math.ceil(price.finalPrice);

        totalOriginalPrice += originalPriceForType;
        totalFinalPrice += finalPriceForType;

        if (guestCount > 0) {
          guestDetails.push({
            type: price.type,
            count: guestCount,
            price: finalPriceForType
          });
        }
      });
    } else {
      const guestPrice = pricing?.prices?.find((p: { type: string; }) => p.type.toLowerCase() === 'guest');
      const guestCount = guests.guestAdults || 0;
      totalOriginalPrice = guestCount * (Math.ceil(guestPrice?.originalPrice) || 0);
      totalFinalPrice = guestCount * (Math.ceil(guestPrice?.finalPrice) || 0);
      guestDetails.push({
        type: 'Guest',
        count: guestCount,
        price: totalFinalPrice
      });
    }

    const totalDiscount = totalOriginalPrice - totalFinalPrice;

    return (
      <div className="flex flex-col lg:flex-row justify-between lg:my-0 lg:max-w-sm">
        <div className="relative bg-white border border-gray-200 rounded-lg">
          {/* Banner Section */}
          <div className="relative mb-5">
            <div className="relative w-full h-40 rounded-t-lg">
              <Image
                src={tourGroup?.imageUploads?.[0]?.url || 'https://via.placeholder.com/400'}
                alt="Tour Group Image"
                layout="fill" // Ensures the image takes up the full container size
                objectFit="cover" // Makes sure the image covers the entire container
                className="rounded-t-lg"
              />
              {/* Overlay with a lower z-index */}
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>

              {/* Text with a higher z-index to appear on top of the overlay */}
              <h2 className="absolute top-0 left-0 text-white text-xl font-medium tracking-wide p-5 z-20">
                {tourGroup?.name}
              </h2>
            </div>

            <div className="absolute bottom-[-12px] right-0 flex items-center bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-md z-30">
              {currencyCode} {totalDiscount.toLocaleString('en-IN')} Saved
            </div>
          </div>

          {/* Selection Details */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                <span className="text-gray-700">{getFormattedDate()}</span>
              </div>
              <button className="text-sm font-medium text-blue-600 uppercase" onClick={handleEditDetails}>Edit</button>
            </div>

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                <span className="text-gray-700">{tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.name}</span>
              </div>
              <button className="text-sm font-medium text-blue-600 uppercase" onClick={handleEditDetails}>Edit</button>
            </div>

            {/* <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-1">
                <span className="text-gray-700">Valid until: {tourGroup?.ticketValidity?.ticketValidityUntilDate}</span>
              </div>
            </div> */}
          </div>

          {/* Price Details */}
          <div className="px-4 py-4 border-t border-gray-200">
            {guestDetails.map((detail, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span className="text-gray-700">
                  {detail.count} {detail.type}{detail.count > 1 ? 's' : ''}
                </span>
                <span className="text-gray-700 font-medium">
                  {currencyCode} {detail.price.toLocaleString('en-IN')}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center bg-green-50 p-3 border-t border-gray-200 border-dashed">
              <span className="text-green-700">TickYourList discount</span>
              <span className="text-green-700 font-medium">- {currencyCode} {totalDiscount?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Total Payable and Payment Button */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-medium text-gray-700">Total payable</span>
              <span className="text-xl font-medium text-gray-700">{currencyCode} {totalFinalPrice?.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-sm text-gray-500 block mb-4">Your card will be charged in {currencyCode}</span>
            <ButtonPrimary
              className="w-full h-12 active:scale-95 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: "#7C25E9" }}
              onClick={handleConfirmAndPay}
              loading={loadingConfirmPay}
            >
              Confirm & Pay
            </ButtonPrimary>
            <p className="text-sm text-gray-600 mt-4">
              By continuing, you agree to the <a href="/termsandconditions/" target="_blank" className="underline">general terms</a> and the <a href="/privacypolicy/" target="_blank" className="underline">privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const PriceRow: React.FC<PriceRowProps> = ({ label, subLabel, price, guests, type }) => {
    const totalPrice = guests * (Math.ceil(price?.finalPrice) || 0);
    const totalOriginalPrice = guests * (Math.ceil(price?.originalPrice) || 0);

    return (
      <div className="flex flex-row justify-between mb-3 w-full">
        <div className="flex w-1/2">
          <div className="flex flex-col justify-center">
            <div className="flex">
              <p className="text-sm md:text-base">{label}</p>
            </div>
            <div className="flex mt-1">
              <p className="font-light text-xs md:text-base">{subLabel}</p>
            </div>
          </div>
        </div>
        <div className="flex w-1/6 ml-3">
          <div className="flex flex-row w-full justify-end" style={{ alignItems: 'center' }}>
            <button onClick={() => handleGuestChange(-1, type)}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="disabled-icon">
                <circle cx="16" cy="16" r="16" fill="#F8F8F8"></circle>
                <line x1="24" y1="15.5" x2="9" y2="15.5" stroke="#BDBDBD"></line>
              </svg>
            </button>

            <p className="value ml-4 mr-4">{guests}</p>

            <button onClick={() => handleGuestChange(1, type)}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <circle cx="16" cy="16" r="16" fill="#F3E9FF"></circle>
                <line x1="16.5" y1="23" x2="16.5" y2="8" stroke="#8000ff"></line>
                <line x1="24" y1="15.5" x2="9" y2="15.5" stroke="#8000ff"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex w-1/4 ml-3 justify-end relative">
          <div>
            <div>
              <p className="text-sm md:text-base">{currencyCode} {totalPrice?.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-xs md:text-base line-through font-light">
                {currencyCode} {totalOriginalPrice?.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    const pricing = tourGroup?.listingPrice?.listingPrice;
    const hasSpecificTypes = pricing?.prices?.some((p: { type: string; }) =>
      ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
    );

    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-3 md:space-y-8 px-0 p-0 sm:p-6 xl:p-8">
        <div className="hidden sm:block">
          <h2 className="text-md md:text-3xl lg:text-4xl font-semibold mt-2">
            Confirm and payment
          </h2>
          <NcModal
            renderTrigger={(openModal) => (
              <span
                onClick={() => openModal()}
                className="block lg:hidden underline mt-2 cursor-pointer text-xs"
              >
                View booking details
              </span>
            )}
            renderContent={renderSidebar}
            modalTitle="Booking details"
          />
        </div>
        <div className="hidden sm:block border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="hidden sm:block">
          <h3 className="text-sm md:text-2xl font-semibold">Guests</h3>
          <span className="font-light text-xs md:text-sm">Likely to sell out</span>

          {pricing?.prices?.some((p: { type: string; }) => p.type.toLowerCase() === 'adult') &&
            pricing?.prices?.some((p: { type: string; }) => p.type.toLowerCase() === 'child') &&
            !pricing?.prices?.some((p: { type: string; }) => p.type.toLowerCase() === 'infant') && (
              <div className="w-full max-w-5xl mt-3 mx-auto">
                <div className="p-4 md:p-5 rounded-lg max-w-5xl" style={{ backgroundColor: "#fff8e5" }}>
                  <ul className="list-none ml-0">
                    <li className="ml-1 text-xs md:text-sm font-light leading-5">Infants aged 2 and under can enter for free. Simply show their ID at the venue and enter.</li>
                  </ul>
                </div>
              </div>
            )}

          {pricing?.prices?.some((p: { type: string; }) => p.type.toLowerCase() === 'adult') &&
            !pricing?.prices?.some((p: { type: string; }) => p.type.toLowerCase() === 'child') &&
            !pricing?.prices?.some((p: { type: string; }) => p.type.toLowerCase() === 'infant') && (
              <div className="w-full max-w-5xl mt-3 mx-auto">
                <div className="p-4 md:p-5 rounded-lg max-w-5xl" style={{ backgroundColor: "#fff8e5" }}>
                  <ul className="list-none ml-0">
                    <li className="ml-1 text-xs md:text-sm font-light leading-5">Children shorter than 1.05 meters can enter for free with a valid ID.</li>
                  </ul>
                </div>
              </div>
            )}

          <div className="flex flex-row mt-5 font-normal">
            <div className="w-full flex flex-col font-normal">
              {!hasSpecificTypes ? (
                <PriceRow
                  label="Guests"
                  subLabel=""
                  price={pricing?.prices?.find((p: { type: string; }) => p.type.toLowerCase() === 'guest')}
                  guests={guests.guestAdults || 0}
                  type="guest"
                />
              ) : (
                <>
                  {pricing?.prices.map((price: any) => {
                    const guestType = price.type.toLowerCase();
                    const guestCount = guests[`guest${guestType.charAt(0).toUpperCase() + guestType.slice(1)}s` as keyof GuestsObject] || 0;
                    return (
                      <PriceRow
                        key={price.type}
                        label={price.type.charAt(0).toUpperCase() + price.type.slice(1)}
                        subLabel={price.ageRange ? `${price.ageRange.max ? `${price.ageRange.min}-${price.ageRange.max} years` : `Above ${price.ageRange.min} years`}`: ''}
                        price={price}
                        guests={guestCount}
                        type={guestType as 'adult' | 'child' | 'infant'}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md md:text-2xl font-semibold mt-2 sm:mt-0">Lead Guest Details</h3>
          <div className="hidden sm:block w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-3 sm:mt-6">
            <Tab.Group>
              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:space-x-5">
                    <div className="flex-1 space-y-1">
                      <Label className="text-sm md:text-base">First Name</Label>
                      <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        className="rounded-2xl w-full p-[0.9rem] md:p-3 block border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
                      />
                      {firstNameError && <p className="text-red-500 text-sm">{firstNameError}</p>}
                    </div>
                    <div className="flex-1 space-y-1 mt-2 sm:mt-0">
                      <Label className="text-sm md:text-base">Last Name</Label>
                      <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        className="rounded-2xl w-full p-[0.9rem] md:p-3 block border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
                      />
                      {lastNameError && <p className="text-red-500 text-sm">{lastNameError}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-5">
                  <div className="w-full sm:w-1/2 space-y-1 sm:mt-0 sm:mb-0">
                    <Label className="text-sm md:text-base">Phone Number</Label>
                    <CountryCodeSelector phoneError={phoneError} setPhoneError={setPhoneError} setPhoneNumber={setPhoneNumber} phoneCode={phoneCode} phoneNumber={phoneNumber} setPhoneCode={setPhoneCode}   />
                    </div>
                  <div className="w-full sm:w-1/2 space-y-1  mt-2 sm:mt-0 sm:mb-0">
                      <Label className="text-sm md:text-base">Email</Label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl w-full p-[0.9rem] md:p-3 block border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900" />
                      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                  </div>

                  <div className="space-y-5 mt-5">
                    {!showPromoCode && (
                      <span
                        onClick={handleTogglePromoCode}
                        className="text-sm md:text-base text-green-800 underline cursor-pointer"
                      >
                        Have a Promo Code?
                      </span>
                    )}

                    {showPromoCode && (
                      <div className="space-y-3">
                        <Label>Enter a Promo Code</Label>
                        <div className="flex space-x-3">
                          <input
                            type="text"
                            placeholder="Enter promo code"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <ButtonPrimary
                            className="h-12 active:scale-95 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2"
                            style={{ backgroundColor: "#7C25E9" }}
                            onClick={() => {
                              /* Handle promo code application logic here */
                            }}
                          >
                            Apply
                          </ButtonPrimary>
                        </div>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary
                className="w-2/5 h-12 active:scale-95 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: "#7C25E9" }}
                onClick={handleConfirmAndPay}
                loading={loadingConfirmPay}
              >
                Confirm & pay
              </ButtonPrimary>
              <div className="w-4/5 text-xs mt-4 pl-1"><span className="font-semibold">Please note:</span> The Razorpay payment gateway will open to securely process your transaction.</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      {/* <div className="relative px-4 lg:container h-[20px] flex flex-col border-b-q">
        <div className="flex-1 flex justify-between">
        </div>
      </div> */}
      <div className="block sm:hidden">
            <MobileViewReviewPaybookingdetails tourGroup={tourGroup} date={date} tour={tour} variantId={variantId} currencyCode={currencyCode} getFormattedDate={getFormattedDate} totalGuests={totalGuests} totalAdults={totalAdults} totalChilds={totalChilds} totalInfants={totalInfants} />
          </div>
      <main className="container mt-0 sm:mt-5 md:mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
      <MobileConfimAndPayButton tourGroup={tourGroup} totalGuests={totalGuests} totalAdults={totalAdults} totalChilds={totalChilds} totalInfants={totalInfants} onClickConfirmAndPay={handleConfirmAndPay} />
      {confirmPayError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded">
          {confirmPayError}
        </div>
      )}
    </div>
    </>
  );
};

export default CheckOutPagePageMain;