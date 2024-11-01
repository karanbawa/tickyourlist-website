'use client'

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from 'lucide-react';

interface Price {
  finalPrice: number;
  originalPrice: number;
  type: string;
  ageRange?: {
    min: number;
    max: number;
  };
}

interface Pricing {
  prices: Price[];
  currencyCode: string;
}

interface MobileCheckNextButtonStickyProps {
  tourGroup: {
    _id: string;
    variants: Array<{
      _id: string;
      name: string;
      listingPricesInAllCurrencies: Pricing[];
      tours: Array<{ _id: string }>;
    }>;
  };
  selectedVariantIndex?: any;
  getFormattedDate?: any;
  getFormatedData?: any;
  currencyCode?: any;
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

export interface GuestsObject {
  guestAdults?: number;
  guestChilds?: number;
  guestInfants?: number;
}

const MobileCheckNextButtonSticky: FC<MobileCheckNextButtonStickyProps> = ({
  tourGroup,
  selectedVariantIndex,
  getFormattedDate,
  getFormatedData,
  currencyCode
}) => {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = useState(false);
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 1,
    guestChilds: 0,
    guestInfants: 0,
  });

  const pricing = tourGroup.variants[selectedVariantIndex]?.listingPricesInAllCurrencies.find(
    (currency) => currency.currencyCode === currencyCode
  );

  const handleReveal = () => setIsRevealed(true);
  const handleClose = () => setIsRevealed(false);

  const handleBookNow = () => {
    const variant = tourGroup.variants[selectedVariantIndex];
    const hasSpecificTypes = pricing?.prices?.some((p: { type: string; }) =>
      ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
    );

    let paxQuery = '';
    if (hasSpecificTypes) {
      const paxParams = [];
      if (guests.guestAdults && guests.guestAdults > 0) paxParams.push(`adult=${guests.guestAdults}`);
      if (guests.guestChilds && guests.guestChilds > 0) paxParams.push(`child=${guests.guestChilds}`);
      if (guests.guestInfants && guests.guestInfants > 0) paxParams.push(`infant=${guests.guestInfants}`);
      paxQuery = paxParams.length > 0 ? `&${paxParams.join('&')}` : '';
    } else {
      const totalGuests = (guests.guestAdults || 0) + (guests.guestChilds || 0) + (guests.guestInfants || 0);
      if (totalGuests > 0) {
        paxQuery = `&guests=${totalGuests}`;
      }
    }

    router.push(`/book?tourId=${tourGroup._id}&date=${getFormatedData()}&tour=${variant.tours[0]._id}&variantId=${variant._id}${paxQuery}`);
  };

  const handleGuestChange = (change: number, type: 'guest' | 'adult' | 'child' | 'infant') => {
    setGuests(prevGuests => {
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

  const hasSpecificTypes = pricing?.prices.some(p => ['adult', 'child', 'infant'].includes(p.type.toLowerCase()));

  const calculateTotalPrice = (): string => {
    if (!pricing) return '0.00';
    
    if (!hasSpecificTypes) {
      const guestPrice = pricing.prices.find(p => p.type.toLowerCase() === 'guest');
      return (((guests.guestAdults || 0) + (guests.guestChilds || 0)) * (Math.ceil(guestPrice?.finalPrice || 0))).toFixed(2);
    }
    
    return pricing.prices.reduce((total, price) => {
      const guestType = `guest${price.type.charAt(0).toUpperCase() + price.type.slice(1).toLowerCase()}s` as keyof GuestsObject;
      const guestCount = guests[guestType] || 0;
      return total + (guestCount * Math.ceil(price.finalPrice));
    }, 0).toFixed(2);
  };

  const PriceRow: React.FC<PriceRowProps> = ({ label, subLabel, price, guests, type }) => {
    const totalPrice = guests * (Math.ceil(price.finalPrice) || 0);

    const totalOriginalPrice = guests * (Math.ceil(price.originalPrice) || 0);
    const isDecrementDisabled = (type === 'adult' && guests <= 1) || 
                                (!hasSpecificTypes && type === 'guest' && guests <= 1);

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
          <div className="flex flex-row w-full justify-end items-center">
            <button 
              onClick={() => handleGuestChange(-1, type)}
              disabled={isDecrementDisabled}
              className={isDecrementDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
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
              <p className="text-sm md:text-base">{currencyCode} {totalPrice.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-xs md:text-base line-through font-light">
                {currencyCode} {totalOriginalPrice.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Main button */}
      <div className="block lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-neutral-800 z-40">
        <div className="container py-3 sm:py-3 border-t border-neutral-200 dark:border-neutral-6000">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-neutral-6000 dark:text-neutral-400 font-semibold">
                {tourGroup.variants[selectedVariantIndex]?.name}
              </span>
              <div className="flex items-baseline">
                <span className="ml-1 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                  {getFormattedDate}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="px-5 sm:px-7 py-3 rounded-2xl text-white font-medium"
                onClick={handleReveal}
                style={{ backgroundColor: '#7C25E9' }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Revealed Section */}
      <div 
        className={`fixed inset-x-0 bottom-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          isRevealed ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '60%', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Select number of tickets</h2>
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mb-4 flex items-center text-xs">
            ⚡ Likely to sell out
          </div>

          {pricing?.prices.some(p => p.type.toLowerCase() === 'adult') &&
           pricing.prices.some(p => p.type.toLowerCase() === 'child') &&
           !pricing.prices.some(p => p.type.toLowerCase() === 'infant') && (
            <div className="w-full mt-3 mb-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: "#fff8e5" }}>
                <p className="text-xs font-light">Infants aged 2 and under can enter for free. Simply show their ID at the venue and enter.</p>
              </div>
            </div>
          )}

          {pricing?.prices.some(p => p.type.toLowerCase() === 'adult') &&
           !pricing.prices.some(p => p.type.toLowerCase() === 'child') &&
           !pricing.prices.some(p => p.type.toLowerCase() === 'infant') && (
            <div className="w-full mt-3 mb-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: "#fff8e5" }}>
                <p className="text-xs font-light">Children shorter than 1.05 meters can enter for free with a valid ID.</p>
              </div>
            </div>
          )}

      {pricing?.prices?.some((p: { type: string; }) => p.type.toLowerCase() === 'guest') && (
                    <div className="w-full max-w-5xl mt-3 mx-auto mb-3">
                      <div className="p-4 md:p-5 rounded-lg max-w-5xl" style={{ backgroundColor: "#fff8e5" }}>
                        <ul className="list-none ml-0">
                          <li className="ml-1 text-xs md:text-sm font-light leading-5">{pricing?.prices?.[0]?.description}</li>
                        </ul>
                      </div>
                    </div>
                  )}

          
          {!hasSpecificTypes && pricing ? (
          <PriceRow
            label="Guests"
            subLabel=""
            price={pricing.prices.find(p => p.type.toLowerCase() === 'guest') || pricing.prices[0]}
            guests={(guests.guestAdults || 0) + (guests.guestChilds || 0)}
            type="guest"
          />
        ) : (
          pricing?.prices.map((price) => {
            const guestType = price.type.toLowerCase() as 'adult' | 'child' | 'infant';
            const guestKey = `guest${price.type.charAt(0).toUpperCase() + price.type.slice(1)?.toLowerCase()}s` as keyof GuestsObject;
            return (
              <PriceRow
                key={price.type} 
                label={price.type.charAt(0).toUpperCase() + price.type.slice(1)}
                subLabel={price.ageRange ? `${price.ageRange.max ? `${price.ageRange.min}-${price.ageRange.max} years` : `Above ${price.ageRange.min} years`}`: ''}
                price={price}
                guests={guests[guestKey] || 0}
                type={guestType}
              />
            );
          })
        )}
          
          <div className="flex justify-between font-medium text-md mt-6 mb-6">
            <span>Total payable</span>
            <span>{currencyCode} {calculateTotalPrice()}</span>
          </div>
          
          <button
            className="w-full text-white py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-lg font-bold"
            style={{ backgroundColor: "#7C25E9" }}
            onClick={handleBookNow}
          >
            Next
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isRevealed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default MobileCheckNextButtonSticky;