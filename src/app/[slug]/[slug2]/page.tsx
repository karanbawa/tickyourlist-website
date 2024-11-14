import React, { FC } from "react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Input from "@/shared/Input";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
import { Metadata } from 'next';
import HandleImageClick from "@/components/tourgroupproductpage/HandleImageClick";
import './Highlights.css';
import parse, { domToReact } from "html-react-parser";
import SidebarBooking from "@/components/tour-group-booking/SideBarBooking";
import MobileFooterSticky from "@/app/(listing-detail)/(components)/MobileFooterSticky";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { History, Info, Shuffle, Smartphone, User, Utensils, Zap } from "lucide-react";
import WhatsappButton from "@/components/whatsappButton/WhatsappButton";


interface Params {
  slug: string;
  slug2: string
}

// Function to map country codes to currencies
function mapCountryToCurrency(countryCode: string) {
  switch (countryCode) {
    case 'US':
      return 'USD';
    case 'GB':
      return 'GBP';
    case 'JP':
      return 'JPY';
    case 'EU':
      return 'EUR';
    case 'IN':
      return 'INR';
    case 'AE':
      return 'AED';
    case 'SG':
      return 'SGD';
    default:
      return 'AED'; // Default currency if the country is unknown
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cookieStore = cookies();
  let currency = cookieStore.get('currency')?.value || 'USD';

  // Dynamically fetch currency if no cookie is present
  if (!currency) {
    const headersList = headers();
    const country = headersList.get('x-vercel-ip-country') ?? 'AE';
    currency = mapCountryToCurrency(country);
  }

  const data = await fetchTourGroupData(params?.slug, params?.slug2, currency);
  const tourGroup = data?.data?.tourgroup;

  return {
    title: tourGroup?.metaTitle,
    description: tourGroup?.metaDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      }
    },
    alternates: {
      canonical: `https://tickyourlist.com/${tourGroup?.urlSlugs?.EN}`, // Use dynamic URL
    },
    openGraph: {
      title: tourGroup?.metaTitle,
      description: tourGroup?.metaDescription,
      url: `https://tickyourlist.com/${tourGroup?.urlSlugs?.EN}`, // Using same canonical URL here
      siteName: 'TickYourList',
      images: tourGroup?.imageUploads?.[0]?.url ? [
        {
          url: tourGroup.imageUploads[0].url,
          width: 1200,
          height: 630,
          alt: tourGroup.metaTitle
        }
      ] : [],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: tourGroup?.metaTitle,
      description: tourGroup?.metaDescription,
      images: tourGroup?.imageUploads?.[0]?.url ? [tourGroup.imageUploads[0].url] : []
    }
  };
}


const getIconForDescriptor = (code: string) => {
  switch (code) {
    case 'MOBILE_TICKET':
      return { icon: Smartphone, color: 'text-blue-500', bgColor: 'bg-blue-100' };
    case 'MEALS_INCLUDED':
      return { icon: Utensils, color: 'text-green-500', bgColor: 'bg-green-100' };
    case 'INSTANT_CONFIRMATION':
      return { icon: Zap, color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
    case 'FREE_CANCELLATION':
      return { icon: History, color: 'text-purple-500', bgColor: 'bg-purple-100' };
    // Add more cases as needed
    default:
      return null;
  }
};


async function fetchTourGroupData(slug:string, slug2: string, currency: string) {

  if (!slug) {
    throw new Error("Invalid slug format. Could not extract slug.");
  }

  const response = await fetch(`${process.env.BASE_URL}/v1/customertravel/tour-groups/EN/${slug}/${slug2}?currency=${currency}&domainId=${process.env.WEBSITE_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
     'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 10 }, // Ensure Vercel does not cache this fetch
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const ListingTourGroupDetailPage: FC<{ params: { slug: string, slug2: string } }> = async ({ params }) => {
  // let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const cookieStore = cookies();
  let currency = cookieStore.get('currency')?.value; // Default to 'USD' if no cookie

  if (!currency) {
    // No currency cookie, get country from headers
    const headersList = headers();
    const country = headersList.get('x-vercel-ip-country') ?? 'AE'; // Fallback to 'AE' if not available
    currency = mapCountryToCurrency(country);

    // Optionally set the currency cookie for future requests
    // Note: Setting cookies in server components is not straightforward; you may need to adjust your approach
  }
  const data = await fetchTourGroupData(params.slug, params.slug2, currency);
  const tourGroup = data?.data?.tourgroup;
  

  const currencyCode = tourGroup?.listingPrice?.currencyCode;
  const originalPrice = tourGroup?.listingPrice?.prices?.[0]?.originalPrice;
  const finalPrice = tourGroup?.listingPrice?.prices?.[0]?.finalPrice;
  const savedAmount = originalPrice - finalPrice;
  const savedPercentage = Math.round((savedAmount / originalPrice) * 100);

  // const thisPathname = usePathname();
  // const router = useRouter();

  // function closeModalAmenities() {
  //   setIsOpenModalAmenities(false);
  // }

  // function openModalAmenities() {
  //   setIsOpenModalAmenities(true);
  // }

  // const handleOpenModalImageGallery = () => {
  //   router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  // };

  const abbreviateCountryName = (countryName: string) => {
    // Split the country name into words
    const words = countryName.split(' ');
  
    // Check if the name is long (more than one word) and abbreviate
    if (words.length > 1) {
      return words.map(word => word[0].toUpperCase()).join('');
    }
  
    // If the name is short, return it as it is
    return countryName;
  };

  const renderSection1 = () => (
    <div className="listingSection__wrap !space-y-4 md:!space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
        {tourGroup?.displayTags?.slice(0,2).map((tag: any,index: any) => <Badge name={tag} key={tag} className='bg-purple-100 text-purple-600' /> )}
        {/* <Badge name={tourGroup?.displayTags?.[1]} /> */}
        </div>
        <LikeSaveBtns data={tourGroup} />
      </div>
      <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold">
        {tourGroup?.name}
      </h1>
      <div className="flex items-center space-x-4">
        <StartRating point={tourGroup?.rating} reviewCount={tourGroup?.reviewCount} />
        <span>·</span>
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1 text-xs md:text-base">{tourGroup?.city?.name}, {tourGroup?.city?.country?.displayName ? abbreviateCountryName(tourGroup?.city?.country?.displayName) : ''}</span>
        </span>
      </div>
      <div className="flex items-center gap-6 flex-wrap">
        {/* <div className="flex gap-2"> */}
        {tourGroup.descriptors?.map((descriptor: { code: string; name: string }) => {
          const iconData = getIconForDescriptor(descriptor.code);
          if (iconData) {
            const { icon: Icon, color, bgColor } = iconData;
            return (
              <div key={descriptor.code} className="flex items-center space-x-2 text-gray-700">
                <div className={`p-2 rounded-full ${bgColor}`}>
                  <Icon size={20} className={color} />
                </div>
                <span className="text-sm font-medium">{descriptor.name}</span>
              </div>
            );
          }
          return null;
        })}
        {/* <Badge name={tourGroup?.descriptors?.[1]} />
        <Badge name={tourGroup?.displayTags?.[0]} /> */}
        {/* </div> */}
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-lg md:text-2xl font-semibold">Highlights</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 highlights-section" dangerouslySetInnerHTML={{ __html: tourGroup?.highlights }} />
    </div>
  );

  const renderSectionInclusion = () => (
    <div className="listingSection__wrap">
      <h2 className="text-lg md:text-2xl font-semibold">Inclusions</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="text-sm md:text-base text-neutral-6000 dark:text-neutral-300 highlights-section" dangerouslySetInnerHTML={{ __html: tourGroup?.inclusions }} />
    </div>
  );

  const renderSectionCancellationPolicy = () => (
    <div className="listingSection__wrap">
      <h2 className="text-lg md:text-2xl font-semibold">Cancellation Policy</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="text-sm md:text-base text-neutral-6000 dark:text-neutral-300 highlights-section">
        {!tourGroup?.cancellationPolicyV2?.cancellable ? `These tickets cannot be cancelled` : `Tickets can be cancelled up to 72 hours before the booking date.`}
        {!tourGroup?.reschedulePolicy?.reschedulable 
            ? ` Rescheduling is not allowed.` 
            : ` However, rescheduling is available.`}
      </div>
    </div>
  );

  const HighlightsSection = ({ summary }: { summary: string }) => {
    // Split the summary into sections based on <h2> tags
    const sections = summary?.split(/(?=<h2>)/g);
  
    const options = {
      replace: (domNode: any) => {
        if (domNode.name === "h2") {
          return (<><h2 className="text-lg md:text-2xl font-semibold">{domNode.children[0].data}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
          </>);
        }
        if (domNode.name === "h3") {
          return <h3 className="text-md md:text-xl font-semibold mt-4">{domNode.children[0].data}</h3>;
        }
        if (domNode.name === "p") {
          return <p className="text-sm md:text-base mt-2 text-neutral-6000 dark:text-neutral-300 anchor-color">{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === "img") {
          return (
            <img
              className="my-4 rounded-lg"
              src={domNode.attribs.src}
              alt={domNode.attribs.alt}
            />
          );
        }
        if (domNode.name === "ul") {
          return (
            <ul className="text-sm md:text-base list-disc pl-5 mt-2 text-neutral-6000 dark:text-neutral-300">
              {domToReact(domNode.children)}
            </ul>
          );
        }
        if (domNode.name === "li") {
          return <li className="text-sm md:text-base mt-1">{domToReact(domNode.children)}</li>;
        }
        if (domNode.name === "a") {
          return (
            <a
            className="anchor-color"
            href={domNode.attribs.href}
            rel="noopener noreferrer"
          >
            {domToReact(domNode.children)}
          </a>
          );
        }
      },
    };
  
    return (
      <>
        {sections?.map((section, index) => (
          <div className="listingSection__wrap" key={index}>
            {parse(section, options)}
          </div>
        ))}
        </>
    );
  };

  const renderSectionYourExperience = () => (

    <HighlightsSection summary={tourGroup?.summary} />

  );

  const renderSectionFaq = () => (

    <HighlightsSection summary={tourGroup?.faq} />
  );

  const renderSectionMyTickets = () => (
    <div className="listingSection__wrap">
      <h2 className="text-lg md:text-2xl font-semibold">My Tickets</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <HighlightsSection summary={tourGroup?.ticketDeliveryInfo} />
    </div>
  );

  const handleWhatsappRedirect = () => {
    const phoneNumber = "+971529061536"; // replace with the WhatsApp number you want to send the message to
    const message = `Hello, I'm interested in personalized itineraries and vacation planning. Here is the link: https://tickyourlist.com/${tourGroup?.urlSlugs?.EN}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
     // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };
  

  const renderSection4 = () => (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Room Rates</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Prices may increase on weekends or holidays
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="flow-root">
        <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
            <span>Monday - Thursday</span>
            <span>$199</span>
          </div>
          <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
            <span>Monday - Thursday</span>
            <span>$199</span>
          </div>
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
            <span>Friday - Sunday</span>
            <span>$219</span>
          </div>
          <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
            <span>Rent by month</span>
            <span>-8.34 %</span>
          </div>
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
            <span>Minimum number of nights</span>
            <span>1 night</span>
          </div>
          <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
            <span>Max number of nights</span>
            <span>90 nights</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-xl md:text-2xl font-semibold">Host Information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="flex items-center space-x-4">
        <Avatar
          hasChecked
          hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
          sizeClass="h-14 w-14"
          radius="rounded-full"
        />
        <div>
          <a className="block text-xl font-medium" href="##">
            Kevin Francis
          </a>
          <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <StartRating point={tourGroup?.rating} reviewCount={tourGroup?.reviewCount} />
            <span className="mx-2">·</span>
            <span>12 places</span>
          </div>
        </div>
      </div>
      <span className="block text-neutral-6000 dark:text-neutral-300">
        Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
        accommodation, an outdoor swimming pool, a bar, a shared lounge, a
        garden and barbecue facilities...
      </span>
      <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Joined in March 2016</span>
        </div>
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <span>Response rate - 100%</span>
        </div>
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Fast response - within a few hours</span>
        </div>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <ButtonSecondary href="/author">See host profile</ButtonSecondary>
      </div>
    </div>
  );

  const renderSection6 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="space-y-5">
        <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
        <div className="relative">
          <Input
            fontClass=""
            sizeClass="h-16 px-4 py-3"
            rounded="rounded-3xl"
            placeholder="Share your thoughts ..."
          />
          <ButtonCircle className="absolute right-2 top-1/2 transform -translate-y-1/2" size=" w-12 h-12 ">
            <ArrowRightIcon className="w-5 h-5" />
          </ButtonCircle>
        </div>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        <CommentListing className="py-8" />
        <CommentListing className="py-8" />
        <CommentListing className="py-8" />
        <CommentListing className="py-8" />
        <div className="pt-8">
          <ButtonSecondary>View more 20 reviews</ButtonSecondary>
        </div>
      </div>
    </div>
  );

  const renderSection7 = () => (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Location</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          San Diego, CA, United States of America (SAN-San Diego Intl.)
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="aspect-w-5 aspect-h-5 sm:aspect-w-6 sm:aspect-h-5 ring-1 ring-black/10 rounded-xl z-0">
        <div className="rounded-xl overflow-hidden z-0">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
          ></iframe>
        </div>
      </div>
    </div>
  );

  const renderSection8 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Things to know</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">Cancellation policy</h4>
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          Refund 50% of the booking value when customers cancel the room within
          48 hours after successful booking and 14 days before the check-in
          time. <br />
          Then, cancel the room 14 days before the check-in time, get a 50%
          refund of the total amount paid (minus the service fee).
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">Check-in time</h4>
        <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
          <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <span>Check-in</span>
            <span>08:00 am - 12:00 am</span>
          </div>
          <div className="flex space-x-10 justify-between p-3">
            <span>Check-out</span>
            <span>02:00 pm - 04:00 pm</span>
          </div>
        </div>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">Special Note</h4>
        <div className="prose sm:prose">
          <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
            <li>
              Ban and I will work together to keep the landscape and environment
              green and clean by not littering, not using stimulants and
              respecting people around.
            </li>
            <li>Do not sing karaoke past 11:30</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderSidebarDetail = () => (
    <div className="listingSection__wrap lg:shadow-xl">
      <span className="text-xl font-semibold block underline">
        How to Book on TickYourList 
      </span>
      <div className="mt-8 flex">
        <div className="flex-shrink-0 flex flex-col items-center py-2">
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
        </div>
        <div className="ml-4 space-y-6 text-sm">
          <div className="flex flex-col space-y-1">
            <span className="text-neutral-500 dark:text-neutral-400">1. Product Page</span>
            <span className="font-semibold">{`Choose a date & click "Book Now"`}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-neutral-500 dark:text-neutral-400">2. Checkout</span>
            <span className="font-semibold">{`Pick your preferences & hit "Next"`}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-neutral-500 dark:text-neutral-400">3. Booking Details</span>
            <span className="font-semibold">{`Enter guest info & number of guests`}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-neutral-500 dark:text-neutral-400">4. Confirm & Pay</span>
            <span className="font-semibold">{`Review & complete payment`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
      <div className="font-semibold underline mb-3">Need Help In Booking?</div>
      <WhatsappButton tourGroupUrl={tourGroup?.urlSlugs.EN} />

      </div>
    </div>
  );
  

  const formatPrice = (price: number) => {
    return price?.toLocaleString('en-IN');
  };

  const renderSidebar = () => (
    <div className="listingSectionSidebar__wrap shadow-xl p-4">
      <div className="flex flex-col mb-4">
        <div className="flex justify-between items-center">
          <span className="flex items-center">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">from</span>
          <span className="text-sm line-through text-neutral-500 dark:text-neutral-400 mr-2 ml-2">
          {currencyCode} {formatPrice(originalPrice)}
          </span>
          </span>
          {/* <StartRating reviewCount={tourGroup?.reviewCount || 0} point={tourGroup?.rating || 0} /> */}
        </div>
        <div className="flex justify-between items-end">
          <span className="text-xl font-semibold flex">
          {currencyCode} {formatPrice(finalPrice)}
            <span className="ml-1 text-xl font-normal text-neutral-500 dark:text-neutral-400">
              /ticket
            </span>
            <span className="flex items-center bg-green-800 text-white text-xs font-medium px-2 py-1 rounded-md ml-3">
            Save up to {savedPercentage}%
          </span>
          </span>
        </div>
      </div>
      <SidebarBooking tourGroup={tourGroup} />
    </div>
  );

  if(!tourGroup) {
      return notFound();
  }

  return (
    <div className="nc-ListingStayDetailPage">
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <HandleImageClick
            tag="div"
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden"
            data={tourGroup}
          >
            <Image
              fill
              className="object-cover rounded-md sm:rounded-xl"
              src={tourGroup?.imageUploads[0]?.url}
              alt="Beach House in Collingwood"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </HandleImageClick>
          {tourGroup?.imageUploads?.filter((_: any, i: number) => i >= 1 && i < 5).map((item: any, index: number) => (
            <HandleImageClick
              key={index}
              tag="div"
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""}`}
              data={tourGroup}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <Image
                  fill
                  className="object-cover rounded-md sm:rounded-xl"
                  src={item?.url || ""}
                  alt="Beach House in Collingwood"
                  sizes="400px"
                />
              </div>
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" />
            </HandleImageClick>
          ))}
          <HandleImageClick
            tag="button"
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            data={tourGroup}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </HandleImageClick>

        </div>
      </header>



      <main className="relative z-10 mt-6 md:mt-11 flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
            {renderSection1()}
             {renderSection2()}
             {renderSectionInclusion()}
             {renderSectionCancellationPolicy()}
             {renderSectionYourExperience()}
             {renderSectionFaq()}
             {renderSectionMyTickets()}
            {/*{renderSection3()}
            {renderSection4()}
            <SectionDateRange />
            {renderSection5()}
            {renderSection6()}
            {renderSection7()}
            {renderSection8()} */}
          </div>
          {/* <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
            <div className="sticky top-28">{renderSidebar()}</div>
          </div> */}
          <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          {renderSidebar()}
          <div className="hidden lg:block mt-10 sticky top-28">
          {/* {renderSidebar()} */}
            {renderSidebarDetail()}
          </div>
        </div>
        </main>
         {/* STICKY FOOTER MOBILE */}
         <MobileFooterSticky tourGroup={tourGroup} />
    </div>
  );
};

export default ListingTourGroupDetailPage;