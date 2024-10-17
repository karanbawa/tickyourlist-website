import React, { FC, useState } from 'react';
import { ChevronLeft, ChevronDown, HelpCircle, Calendar, Users, Ticket, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Route } from 'next';

export interface MobileViewReviewPaybookingdetails {
  className?: string;
  tourGroup?: any;
  date?: any;
  tour?: any;
  variantId?: any;
  currencyCode?: string;
  getFormattedDate?: any;
  totalGuests?: string;
  totalAdults?: string;
  totalChilds?: string;
  totalInfants?: string;
}

interface GuestsObject {
  guestAdults: number;
  guestChilds: number;
  guestInfants: number;
}

const MobileViewReviewPaybookingdetails: FC<MobileViewReviewPaybookingdetails> = ({
  className = "",
  tourGroup,
  tour,
  date,
  variantId,
  currencyCode,
  getFormattedDate,
  totalGuests,
  totalAdults,
  totalChilds,
  totalInfants
}) => {
  const pricing = tourGroup?.listingPrice?.listingPrice;
  const hasSpecificTypes = pricing?.prices?.some((p: { type: string; }) =>
    ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
  );
  const [isRevealed, setIsRevealed] = useState(false);
  const router = useRouter();

  const handleReveal = () => setIsRevealed(true);
  const handleClose = () => setIsRevealed(false);

  const formatGuestType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };


  const handleHelpCenter = () => {
    router.push('/contact')
  }

  const handleBackButton = () => {
    // router.back();
    const tourId = tourGroup?._id;
    const selectedDate = date;

    const targetUrl = `${window.location.origin}/checkout?tourId=${tourId}&date=${selectedDate}`;
    router.replace(targetUrl as Route);
  }

  const renderGuestInfo = () => {
    if (totalGuests) {
      return `${totalGuests} Guests`;
    } else if (hasSpecificTypes) {
      const guestTypes = [];
      if (totalAdults) guestTypes.push(`${totalAdults} Adults`);
      if (totalChilds) guestTypes.push(`${totalChilds} Children`);
      if (totalInfants) guestTypes.push(`${totalInfants} Infants`);
      return guestTypes.join(', ');
    } else {
      const total = parseInt(totalAdults || '0') + parseInt(totalChilds || '0') + parseInt(totalInfants || '0');
      return `${total} Guests`;
    }
  }

  // Pricing calculation logic
  // Updated pricing calculation logic
  const calculatePricing = () => {
    const pricing = tourGroup?.listingPrice?.listingPrice;
    const hasSpecificTypes = pricing?.prices?.some((p: { type: string; }) =>
      ['adult', 'child', 'infant'].includes(p.type.toLowerCase())
    );

    let totalOriginalPrice = 0;
    let totalFinalPrice = 0;
    let guestDetails: { type: string; count: number; price: number; perTicketPrice: number }[] = [];

    if (hasSpecificTypes) {
      pricing?.prices.forEach((price: any) => {
        const guestType = price.type.toLowerCase();
        const guestCount = parseInt(guestType === 'adult' ? (totalAdults || '1') : guestType === 'child' ? (totalChilds || '0') : (totalInfants || '0')) || 0;
        const originalPriceForType = guestCount * Math.ceil(price.originalPrice);
        const finalPriceForType = guestCount * Math.ceil(price.finalPrice);
        const perTicketPrice = Math.ceil(price.finalPrice);

        totalOriginalPrice += originalPriceForType;
        totalFinalPrice += finalPriceForType;

        if (guestCount > 0) {
          guestDetails.push({
            type: price.type,
            count: guestCount,
            price: finalPriceForType,
            perTicketPrice: perTicketPrice
          });
        }
      });
    } else {
      const guestPrice = pricing?.prices?.find((p: { type: string; }) => p.type.toLowerCase() === 'guest');
      const guestCount = parseInt((totalGuests || '1')) || 0;
      totalOriginalPrice = guestCount * (Math.ceil(guestPrice?.originalPrice) || 0);
      totalFinalPrice = guestCount * (Math.ceil(guestPrice?.finalPrice) || 0);
      const perTicketPrice = Math.ceil(guestPrice?.finalPrice) || 0;
      guestDetails.push({
        type: 'Guest',
        count: guestCount,
        price: totalFinalPrice,
        perTicketPrice: perTicketPrice
      });
    }
    const totalDiscount = totalOriginalPrice - totalFinalPrice;

    return { totalFinalPrice, totalDiscount, guestDetails };
  }


  const { totalFinalPrice, totalDiscount, guestDetails } = calculatePricing();

  return (
    <div className="font-sans h-[17rem] flex flex-col">
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-48">
          {/* Next.js Image Component */}
          <Image
            src={tourGroup?.imageUploads?.[0]?.url || '/api/placeholder/400/320'}
            alt={tourGroup?.name || 'Tour image'}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute top-0 left-0 right-0 z-10 text-white p-4">
          <div className="flex justify-between items-center">
            <button onClick={handleBackButton}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Review & pay</h1>
            <button onClick={handleHelpCenter}>
              <HelpCircle size={24} />
            </button>
          </div>
        </div>

        {/* White Card with Details */}
        <div className="bg-white rounded-2xl absolute left-4 right-4 bottom-0 translate-y-20 z-20 p-4 sm:p-6 shadow-lg" onClick={handleReveal}>
          <h2 className="text-md font-semibold mb-3">{tourGroup?.name}</h2>

          <ul className="list-none p-0 m-0 space-y-2">
            <li className="flex items-center">
              <Calendar className="w-4 h-4 mr-3 text-gray-500" aria-hidden="true" />
              <time dateTime="2024-10-08" className="text-gray-700 text-xs">{getFormattedDate()}</time>
            </li>

            <li className="flex items-center">
              <Users className="w-4 h-4 mr-3 text-gray-500" aria-hidden="true" />
              <p className="text-gray-700  text-xs">{renderGuestInfo()}</p>
            </li>

            <li className="flex items-center">
              <Ticket className="w-4 h-4 mr-3 text-gray-500" aria-hidden="true" />
              <p className="text-gray-700 text-xs">{tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.name}</p>
            </li>
          </ul>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
            <p className="font-semibold text-md">Total payable</p>
            <div className="flex items-center">
              <span className="font-semibold text-md mr-1">{currencyCode} {totalFinalPrice.toLocaleString('en-IN')}</span>
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Revealed Section */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${isRevealed ? 'translate-y-0' : 'translate-y-full'
          }`}
        style={{ height: '80%', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Order details</h2>
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center mb-4">
            <Image src={tourGroup?.imageUploads?.[0]?.url || '/api/placeholder/400/320'}
              alt={tourGroup?.name || 'Tour image'}
              width={70}
              height={70}
              className="brightness-50 rounded-md" />
            <h3 className="text-sm font-semibold ml-2">{tourGroup?.name}</h3>
          </div>

          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" />
            <time dateTime="2024-10-08" className="text-gray-700 text-sm">{getFormattedDate()}</time>
          </div>

          <div className="flex items-center mb-4">
            <Ticket className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" />
            <p className="text-gray-700 text-sm">{tourGroup?.variants?.find((variant: any) => variant?._id === variantId)?.name}</p>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="space-y-4 mb-4">
              {guestDetails.map((detail, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{detail.count} {formatGuestType(detail.type)}{detail.count > 1 ? 's' : ''} ({currencyCode} {detail.perTicketPrice.toLocaleString('en-IN')} each)</span>
                  <span className="font-semibold">{currencyCode} {detail.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total payable</span>
            <span className="text-xl font-bold">{currencyCode} {totalFinalPrice.toLocaleString('en-IN')}</span>
          </div>

          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-600">
            <p>
              <span className="inline-block mr-2">ℹ️</span>
              {`You are paying in INR and the total is INR 1,530. The total you pay could differ slightly depending on your bank's exchange rates.`}
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isRevealed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        ></div>
      )}
    </div>
  );
};

export default MobileViewReviewPaybookingdetails;