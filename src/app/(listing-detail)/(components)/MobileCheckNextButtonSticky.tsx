'use client'

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from 'lucide-react';

interface MobileCheckNextButtonStickyProps {
  tourGroup: any;
  selectedVariantIndex?: any;
  getFormattedDate?: any;
  getFormatedData?: any;
}

const MobileCheckNextButtonSticky: FC<MobileCheckNextButtonStickyProps> = ({
  tourGroup,
  selectedVariantIndex,
  getFormattedDate,
  getFormatedData
}) => {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = useState(false);
  const [adultTickets, setAdultTickets] = useState(1);
  const [childTickets, setChildTickets] = useState(0);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleClose = () => {
    setIsRevealed(false);
  };

  const handleBookNow = () => {
    router.push(`/book?tourId=${tourGroup?._id}&date=${getFormatedData()}&tour=${tourGroup?.variants?.[selectedVariantIndex]?.tours?.[0]?._id}&variantId=${tourGroup?.variants?.[selectedVariantIndex]?._id}`);
  };

  const totalPrice = (adultTickets * 78.10 + childTickets * 48.35).toFixed(2);

  return (
    <>
      <div className="block lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-neutral-800 z-40">
        <div className="container py-3 sm:py-3 border-t border-neutral-200 dark:border-neutral-6000">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-neutral-6000 dark:text-neutral-400 font-semibold">
                {tourGroup?.variants?.[selectedVariantIndex]?.name}
              </span>
              <div className="flex items-baseline">
                <span className="ml-1 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                  {getFormattedDate()}
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
        style={{ height: '65%', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Select number of tickets</h3>
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-md mb-4 text-sm">
            Infants aged 2 and under can enter for free. Simply show their ID at the venue and enter.
          </div>
          
          <div className="text-sm mb-4">
            ⚡ Likely to sell out
          </div>
          
          <div className="space-y-4 mb-6">
            {/* Adult Ticket Selector */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Adult</p>
                <p className="text-sm text-gray-500">Above 12 yrs</p>
              </div>
              <div className="flex items-center">
                <button className="p-2 rounded-full border hover:bg-gray-100" onClick={() => setAdultTickets(Math.max(0, adultTickets - 1))}>-</button>
                <span className="mx-4">{adultTickets}</span>
                <button className="p-2 rounded-full border hover:bg-gray-100" onClick={() => setAdultTickets(adultTickets + 1)}>+</button>
                <span className="ml-4 font-semibold">€78.10</span>
              </div>
            </div>
            
            {/* Child Ticket Selector */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Child</p>
                <p className="text-sm text-gray-500">3 to 11 yrs</p>
              </div>
              <div className="flex items-center">
                <button className="p-2 rounded-full border hover:bg-gray-100" onClick={() => setChildTickets(Math.max(0, childTickets - 1))}>-</button>
                <span className="mx-4">{childTickets}</span>
                <button className="p-2 rounded-full border hover:bg-gray-100" onClick={() => setChildTickets(childTickets + 1)}>+</button>
                <span className="ml-4 font-semibold">€48.35</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between font-semibold mb-6">
            <span>Total payable</span>
            <span>€{totalPrice}</span>
          </div>
          
          <button
            className="w-full text-white py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300"
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