"use client";

import { Tab } from "@headlessui/react";
import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import NcModal from "@/shared/NcModal";
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
  tour,
  date,
  variantId
}) => {
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loadingConfirmPay, setLoadingConfirmPay] = useState(false);
  const [confirmPayError, setConfirmPayError] = useState('');

  const router = useRouter();

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 1, // Ensure there's always at least 1 adult
    guestChildren: 0,
    guestInfants: 0,
  });

  const handleGuestChange = (change: number) => {
    setGuests(prevGuests => {
      const newGuestAdults = (prevGuests.guestAdults ?? 1) + change;
      return {
        ...prevGuests,
        guestAdults: newGuestAdults < 1 ? 1 : newGuestAdults, // Ensure at least 1 adult
      };
    });
  };

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

  const handleEditDetails = () => {
    router.push(
      `/checkout?tourId=${tourGroup.id}&date=${date}`
    );
  };

  const getDiscountedPrice = () => {
    const variant = tourGroup?.variants?.find((variant: any) => variant?._id === variantId);
    return variant?.listingPrice?.originalPrice - variant?.listingPrice?.finalPrice;
  };

  const validateFields = () => {
    let valid = true;
    if (!firstName) {
      setFirstNameError("First Name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last Name is required");
      valid = false;
    } else {
      setLastNameError("");
    }


    if (!phoneNumber) {
      setPhoneError("Phone number is required");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!email) {
      setEmailError("Email address is required");
      valid = false;
    } else {
      setEmailError("");
    }

    return valid;
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
  
  const handleRazorpayPayment = async (amount: any, orderId: any, booking: { nonCustomerFirstName: any; nonCustomerLastName: any; phoneNumber: any; }) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }
  
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount,
        currency: 'INR',
        name: "TickYourList",
        description: "Test Transaction",
        image: "https://tickyourlist-images.s3.ap-south-1.amazonaws.com/tyllogo.png",
        order_id: orderId,
        prefill: {
          name: `${booking?.nonCustomerFirstName} ${booking?.nonCustomerLastName}`,
          email: "karanbawab1@gmail.com",
          contact: booking?.phoneNumber
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        },
        handler: function(response: any) {
          // This function will be called after the payment is successful
          console.log("Payment successful:", response);
          // Route to the desired page after successful payment
          router.push(`/pay-done?razorpayOrderId=${response?.razorpay_order_id}&razorpayPaymentId=${response?.razorpay_payment_id}&razorpaySignature=${response?.razorpay_signature}`);
        },
        modal: {
          ondismiss: function() {
            console.log("Payment popup closed");
            // Optional: You can also route to another page if the user closes the payment popup
          }
        }
      };
  
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      console.error("Payment initialization failed:", error?.message);
      alert(error?.message || "Something went wrong during payment initialization.");
    }
  };
  

  // const handleRazorpayPayment = async (amount: any, orderId: any, booking: any) => {
  //   try {
  //     const scriptLoaded = await loadRazorpayScript();
  //     if (!scriptLoaded) {
  //       throw new Error("Razorpay SDK failed to load. Are you online?");
  //     }
  
  //     const options = {
  //       key: process.env.RAZORPAY_KEY_ID,
  //       amount,
  //       currency: 'INR',
  //       name: "TickYourList",
  //       description: "Test Transaction",
  //       image: "https://tickyourlist-images.s3.ap-south-1.amazonaws.com/tyllogo.png",
  //       order_id: orderId,
  //       callback_url: `https://www.tickyourlist.com/pay-done/`,
  //       prefill: {
  //         name: `${booking?.nonCustomerFirstName} ${booking?.nonCustomerLastName}`,
  //         email: "karanbawab1@gmail.com",
  //         contact: booking?.phoneNumber
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office"
  //       },
  //       theme: {
  //         color: "#3399cc"
  //       }
  //     };
  
  //     const rzp1 = new (window as any).Razorpay(options);
  //     rzp1.open();
  //   } catch (error: any) {
  //     console.error("Payment initialization failed:", error?.message);
  //     alert(error?.message || "Something went wrong during payment initialization.");
  //   }
  // };
  

    const handleConfirmAndPay = async () => {
      if (!validateFields()) {
        return;
      }
    
      setLoadingConfirmPay(true);
      setConfirmPayError('');

      const data = {
        domainId: "66cacba1eeca9633c29172b9",
        nonCustomerFirstName: firstName,
        nonCustomerLastName: lastName,
        email: email,
        phoneCode: "+91",
        phoneNumber: phoneNumber,
        content: "Booking content",
        tourId: variantId,
        customerUserId: "66c36e709006a19edd547e22",
        adultsCount: guests.guestAdults,
        childCount: guests.guestChildren,
        amount: ((guests.guestAdults || 1) * tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.listingPrice?.finalPrice).toString(),
        currency: "INR",
        title: tourGroup?.name,
        source: "website",
        active: true,
      };
    
      try {
        const response = await fetch("https://api.univolenitsolutions.com/v1/tyltourcustomerbooking/add/travel-booking", {
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
        console.log("Booking successful:", result);
      } catch (error: any) {
        console.error("An error occurred during booking:", error);
        setConfirmPayError(error?.message || 'Failed to Save the Record. Please try again!');
      } finally {
        setLoadingConfirmPay(false);
      }
    };
    

  const renderSidebar = () => {
    return (
      <div className="flex flex-col lg:flex-row justify-between lg:my-0 lg:max-w-sm">
        <div className="relative bg-white border border-gray-200 rounded-lg">
          {/* Banner Section */}
          <div className="relative mb-5">
            <div className="relative w-full h-40 bg-center bg-cover bg-no-repeat rounded-t-lg" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${tourGroup?.imageUploads?.[0]?.url}')` }}>
              <h2 className="text-white text-xl font-medium tracking-wide p-5">{tourGroup?.name}</h2>
            </div>
            <div className="absolute bottom-[-12px] right-0 flex items-center bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-md">
              ₹{(guests.guestAdults ?? 1) * getDiscountedPrice()} Saved
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

            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-1">
                <span className="text-gray-700">Valid until: 14 Nov, 2024</span>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">
                {(guests.guestAdults ?? 1)} Guest{(guests.guestAdults ?? 1) > 1 ? 's' : ''}
              </span>
              <span className="text-gray-700 font-medium">
                ₹{(guests.guestAdults ?? 1) * tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.listingPrice?.originalPrice}
              </span>
            </div>

            <div className="flex justify-between items-center bg-green-50 p-3 border-t border-gray-200 border-dashed">
              <span className="text-green-700">TickYourList discount</span>
              <span className="text-green-700 font-medium">- ₹{(guests.guestAdults ?? 1) * getDiscountedPrice()}</span>
            </div>
          </div>

          {/* Total Payable and Payment Button */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-medium text-gray-700">Total payable</span>
              <span className="text-xl font-medium text-gray-700">₹{(guests.guestAdults ?? 1) * tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.listingPrice?.finalPrice}</span>
            </div>
            <span className="text-sm text-gray-500 block mb-4">Your card will be charged in INR</span>
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
            <span className="font-light text-sm">Likely to sell out</span>

            <div className="w-full max-w-5xl mt-3 mx-auto">
              <div className="p-4 md:p-5 rounded-lg max-w-5xl" style={{ backgroundColor: "#fff8e5" }}>
                <ul className="list-none ml-0">
                  <li className="ml-1 text-sm font-light leading-5">Children shorter than 1.05 meters can enter for free with a valid ID.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-row mt-5 font-normal">
              <div className="w-full flex flex-col font-normal">
                <div className="flex flex-row justify-between mb-3 w-full">
                  <div className="flex w-1/2">
                    <div className="flex flex-col justify-center">
                      <div className="flex">
                        <p>Guest</p>
                      </div>
                      <div className="flex mt-1">
                        <p className="font-light text-xs">Above 1.05m height</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-1/6 ml-3">
                    <div className="flex flex-row w-full justify-end" style={{ alignItems: 'center' }}>
                      <button onClick={() => handleGuestChange(-1)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="disabled-icon">
                          <circle cx="16" cy="16" r="16" fill="#F8F8F8"></circle>
                          <line x1="24" y1="15.5" x2="9" y2="15.5" stroke="#BDBDBD"></line>
                        </svg>
                      </button>

                      <p className="value ml-4 mr-4">{guests.guestAdults}</p>

                      <button onClick={() => handleGuestChange(1)}>
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
                        {/* Calculate the final price based on the number of guests */}
                        <p>₹{(guests.guestAdults ?? 1) * tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.listingPrice?.finalPrice}</p>
                      </div>
                      <div>
                        {/* Calculate the original price based on the number of guests */}
                        <p className="text-xs line-through font-light">
                          ₹{(guests.guestAdults ?? 1) * tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.listingPrice?.originalPrice}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Lead Guest Details</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:space-x-5">
                    <div className="flex-1 space-y-1">
                      <Label>First Name</Label>
                      <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      {firstNameError && <p className="text-red-500 text-sm">{firstNameError}</p>}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>Last Name</Label>
                      <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      {lastNameError && <p className="text-red-500 text-sm">{lastNameError}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-5">
                  <div className="flex-1 space-y-1">
                      <Label>Email</Label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="flex-1 space-y-1 mt-4 sm:mt-0">
                      <Label>Phone Number</Label>
                      <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                    </div>
                  </div>

                  <div className="space-y-5 mt-5">
                    {!showPromoCode && (
                      <span
                        onClick={handleTogglePromoCode}
                        className="text-green-800 underline cursor-pointer"
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
              <ButtonPrimary className="w-2/5 h-12 active:scale-95 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: "#7C25E9" }} onClick={handleConfirmAndPay} loading={loadingConfirmPay}>Confirm & pay</ButtonPrimary>
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
      {confirmPayError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded">
          {confirmPayError}
        </div>
      )}
    </div>
  );
};

export default CheckOutPagePageMain;
