import React, { FC } from 'react';
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface BookingCardProps {
    booking?: any;
  }

const BookingCard: FC<BookingCardProps> = ({ booking }) => {

  const router = useRouter();

  const handleBookNow = (booking: any) => {

    let paxQuery = '';
  if (booking.type !== 'GUEST') {
    const paxParams = [];
    if (booking.guestAdults && booking.adultsCount > 0) paxParams.push(`adult=${booking?.adultsCount}`);
    if (booking.childCount && booking.childCount > 0) paxParams.push(`child=${booking?.childCount}`);
    if (booking.infantCount && booking.infantCount > 0) paxParams.push(`infant=${booking?.infantCount}`);
    paxQuery = paxParams.length > 0 ? `&${paxParams.join('&')}` : '';
  } else {
      paxQuery = `&guests=${booking?.guestsCount}`;
  }
    // Implement download logic here
    router.push(`/book?tourId=${booking?.tourGroupId?._id}&date=${booking?.bookingDate}&tour=${booking?.tourId?._id}&variantId=${booking?.variandId?._id}&${paxQuery}`);
  };

  const handleDownload = (bookingId: any) => {
    // Implement download logic here
    console.log(`Downloading booking ${bookingId}`);
  };
  
  const handleViewTourGroup = (slug: any) => {
    // Implement download logic here
    router.push(`/${slug}`)
  };

  return (
        <div className="w-full mb-6 bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{booking.tourGroupId.name}</h3>
              <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-medium">
                {booking.status}
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image
                  fill
                  alt={booking.tourId.name}
                  className="object-cover rounded-lg"
                  src={booking.tourGroupId.imageUploads?.[0]?.url || '/placeholder-image.jpg'}
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-md font-semibold">{booking.tourId.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{booking.variandId.name}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className='text-xs'>{booking.bookingDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4 mr-1" />
                    <span className='text-xs'>{booking.guestsCount} {booking.guestsCount > 1 ? 'Guests' : 'Guest'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{booking.nonCustomerFirstName} {booking.nonCustomerLastName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{booking.email}</p>
              </div>
              <div className="text-right">
                <p className="text-md font-bold">{booking.currency} {booking.amount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Booking ID: {booking._id.slice(-6)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-neutral-700 p-4 flex justify-between items-center">
            <ButtonPrimary className='' onClick={() => handleViewTourGroup(booking?.urlSlugs?.EN)}>View Details</ButtonPrimary>
            {booking?.status === 'PENDING' ? <ButtonPrimary onClick={() => handleBookNow(booking)}>Book Now</ButtonPrimary> : 
             <ButtonPrimary onClick={() => handleDownload(booking._id)}>Download</ButtonPrimary> }
          </div>
        </div>
      );
};

export default BookingCard;