import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonClose from "@/shared/ButtonClose";
import Input from "@/shared/Input";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
import { Amenities_demos, PHOTOS } from "@/app/(listing-detail)/listing-stay-detail/constant";
import StayDatesRangeInput from "@/app/(listing-detail)/listing-stay-detail/StayDatesRangeInput";
import GuestsInput from "@/app/(listing-detail)/listing-stay-detail/GuestsInput";
import SectionDateRange from "@/app/(listing-detail)/SectionDateRange";
import { Route } from "next";
import { Metadata } from 'next';
import HandleImageClick from "@/components/tourgroupproductpage/HandleImageClick";
import './Highlights.css';
import parse, { domToReact } from "html-react-parser";
import SidebarBooking from "@/components/tour-group-booking/SideBarBooking";
import MobileFooterSticky from "@/app/(listing-detail)/(components)/MobileFooterSticky";

interface Params {
  slug: string;
  slug2: string
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await fetchTourGroupData(params.slug2);
  const tourGroup = data.data.tourgroup;

  return {
    title: tourGroup.metaTitle,
    description: tourGroup.metaDescription,
    alternates: {
      canonical: `https://tickyourlist.com${tourGroup.url}`,
    },
    openGraph: {
      title: tourGroup.metaTitle,
      description: tourGroup.metaDescription,
      images: [
        {
          url: tourGroup.imageUploads[0]?.url || '',
        },
      ],
    },
  };
}

async function fetchTourGroupData(slug: string) {
  const id = slug.match(/\d+$/)?.[0];

  if (!id) {
    throw new Error("Invalid slug2 format. Could not extract ID.");
  }

  const response = await fetch(`${process.env.BASE_URL}/v1/customertravel/tour-groups/${id}?currency=INR&domainId=${process.env.WEBSITE_ID}`, {
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
  const data = await fetchTourGroupData(params.slug2);
  console.log("ListingTourGroupDetailPage ", data);
  const tourGroup = data.data.tourgroup;

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
    <div className="listingSection__wrap !space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
        {tourGroup?.displayTags?.slice(0,2).map((tag: any,index: any) => <Badge name={tag} key={tag} /> )}
        {/* <Badge name={tourGroup?.displayTags?.[1]} /> */}
        </div>
        <LikeSaveBtns data={tourGroup} />
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {tourGroup?.name}
      </h2>
      <div className="flex items-center space-x-4">
        <StartRating />
        <span>·</span>
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">{tourGroup?.city?.name}, {tourGroup?.city?.country?.displayName ? abbreviateCountryName(tourGroup?.city?.country?.displayName) : ''}</span>
        </span>
      </div>
      <div className="flex items-center">
        <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Hosted by{" "}
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">
            Kevin Francis
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {/* <div className="flex gap-2"> */}
        {tourGroup?.descriptors?.map((tag: any,index: any) => (
          <div className="flex items-center space-x-3" key={tag}>
          <i className="las la-user text-2xl"></i>
          {/* <span> */}
            <span className="sm:inline-block text-neutral-900 dark:text-neutral-200 font-medium">{tag?.name}</span>
            {/* <Badge name={tag?.name} key={tag} />  */}
          {/* </span> */}
        </div>
          ))}
        {/* <Badge name={tourGroup?.descriptors?.[1]} />
        <Badge name={tourGroup?.displayTags?.[0]} /> */}
        {/* </div> */}
      </div>
      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center space-x-3">
          <i className="las la-user text-2xl"></i>
          <span>
            6 <span className="hidden sm:inline-block">guests</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-bed text-2xl"></i>
          <span>
            6 <span className="hidden sm:inline-block">beds</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-bath text-2xl"></i>
          <span>
            3 <span className="hidden sm:inline-block">baths</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-door-open text-2xl"></i>
          <span>
            2 <span className="hidden sm:inline-block">bedrooms</span>
          </span>
        </div>
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Highlights</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="text-neutral-6000 dark:text-neutral-300 highlights-section" dangerouslySetInnerHTML={{ __html: tourGroup?.highlights }} />
    </div>
  );

  const renderSectionInclusion = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Inclusions</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="text-neutral-6000 dark:text-neutral-300 highlights-section" dangerouslySetInnerHTML={{ __html: tourGroup?.inclusions }} />
    </div>
  );

  const renderSectionCancellationPolicy = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Cancellation Policy</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="text-neutral-6000 dark:text-neutral-300 highlights-section">
        {!tourGroup?.cancellationPolicyV2?.cancellable ? `These tickets can't be cancelled ` : `These tickets can be cancelled `} 
        {!tourGroup?.reschedulePolicy?.reschedulable ? `or rescheduled` : `but can be rescheduled`}
      </div>
    </div>
  );

  // const HighlightsSection = ({ summary }: { summary: string }) => {
  //   const options = {
  //     replace: (domNode: any) => {
  //       if (domNode.name === "h2") {
  //         return <h2 className="text-2xl font-semibold">{domNode.children[0].data}</h2>;
  //       }
  //       if (domNode.name === "h3") {
  //         return <h3 className="text-xl font-semibold mt-4">{domNode.children[0].data}</h3>;
  //       }
  //       if (domNode.name === "p") {
  //         return <p className="mt-2 text-neutral-6000 dark:text-neutral-300">{domToReact(domNode.children)}</p>;
  //       }
  //       if (domNode.name === "img") {
  //         return (
  //           <img
  //             className="my-4 rounded-lg"
  //             src={domNode.attribs.src}
  //             alt={domNode.attribs.alt}
  //           />
  //         );
  //       }
  //       if (domNode.name === "ul") {
  //         return (
  //           <ul className="list-disc pl-5 mt-2 text-neutral-6000 dark:text-neutral-300">
  //             {domToReact(domNode.children)}
  //           </ul>
  //         );
  //       }
  //       if (domNode.name === "li") {
  //         return <li className="mt-1">{domToReact(domNode.children)}</li>;
  //       }
  //     },
  //   };
  
  //   return (
  //     <div className="listingSection__wrap">
  //       {parse(summary, options)}
  //     </div>
  //   );
  // };

  const HighlightsSection = ({ summary }: { summary: string }) => {
    // Split the summary into sections based on <h2> tags
    const sections = summary.split(/(?=<h2>)/g);
  
    const options = {
      replace: (domNode: any) => {
        if (domNode.name === "h2") {
          return (<><h2 className="text-2xl font-semibold">{domNode.children[0].data}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
          </>);
        }
        if (domNode.name === "h3") {
          return <h3 className="text-xl font-semibold mt-4">{domNode.children[0].data}</h3>;
        }
        if (domNode.name === "p") {
          return <p className="mt-2 text-neutral-6000 dark:text-neutral-300 anchor-color">{domToReact(domNode.children)}</p>;
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
            <ul className="list-disc pl-5 mt-2 text-neutral-6000 dark:text-neutral-300">
              {domToReact(domNode.children)}
            </ul>
          );
        }
        if (domNode.name === "li") {
          return <li className="mt-1">{domToReact(domNode.children)}</li>;
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

    <HighlightsSection summary={tourGroup.summary} />

    // <div className="listingSection__wrap">
    //   <h2 className="text-2xl font-semibold">Your Experience</h2>
    //   <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
    //   <div className="text-neutral-6000 dark:text-neutral-300 highlights-section">
    //     {!tourGroup?.cancellationPolicyV2?.cancellable ? `These tickets can't be cancelled ` : `These tickets can be cancelled `} 
    //     {!tourGroup?.reschedulePolicy?.reschedulable ? `or rescheduled` : `but can be rescheduled`}
    //   </div>
    // </div>
  );

  const renderSectionFaq = () => (

    <HighlightsSection summary={tourGroup.faq} />
  );

  const renderSectionMyTickets = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">My Tickets</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <HighlightsSection summary={tourGroup.ticketDeliveryInfo} />
      {/* <div className="text-neutral-6000 dark:text-neutral-300 highlights-section" dangerouslySetInnerHTML={{ __html: tourGroup?.ticketDeliveryInfo }} /> */}
    </div>
  );

  // const renderSection3 = () => (
  //   <div className="listingSection__wrap">
  //     <div>
  //       <h2 className="text-2xl font-semibold">Amenities</h2>
  //       <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  //         {`About the property's amenities and services`}
  //       </span>
  //     </div>
  //     <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
  //     <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300">
  //       {Amenities_demos.filter((_, i) => i < 12).map((item) => (
  //         <div key={item.name} className="flex items-center space-x-3">
  //           <i className={`text-3xl las ${item.icon}`}></i>
  //           <span>{item.name}</span>
  //         </div>
  //       ))}
  //     </div>
  //     <div className="w-14 border-b border-neutral-200" />
  //     <div>
  //       <ButtonSecondary onClick={openModalAmenities}>
  //         View more 20 amenities
  //       </ButtonSecondary>
  //     </div>
  //     {renderModalAmenities()}
  //   </div>
  // );

  // const renderModalAmenities = () => (
  //   <Transition appear show={isOpenModalAmenities} as={Fragment}>
  //     <Dialog
  //       as="div"
  //       className="fixed inset-0 z-50 overflow-y-auto"
  //       onClose={closeModalAmenities}
  //     >
  //       <div className="min-h-screen px-4 text-center">
  //         <Transition.Child
  //           as={Fragment}
  //           enter="ease-out duration-300"
  //           enterFrom="opacity-0"
  //           enterTo="opacity-100"
  //           leave="ease-in duration-200"
  //           leaveFrom="opacity-100"
  //           leaveTo="opacity-0"
  //         >
  //           <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
  //         </Transition.Child>
  //         <span className="inline-block h-screen align-middle" aria-hidden="true">
  //           &#8203;
  //         </span>
  //         <Transition.Child
  //           as={Fragment}
  //           enter="ease-out duration-300"
  //           enterFrom="opacity-0 scale-95"
  //           enterTo="opacity-100 scale-100"
  //           leave="ease-in duration-200"
  //           leaveFrom="opacity-100 scale-100"
  //           leaveTo="opacity-0 scale-95"
  //         >
  //           <div className="inline-block py-8 h-screen w-full max-w-4xl">
  //             <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
  //               <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
  //                 <h3 className="text-lg font-medium leading-6 text-gray-900">
  //                   Amenities
  //                 </h3>
  //                 <span className="absolute left-3 top-3">
  //                   <ButtonClose onClick={closeModalAmenities} />
  //                 </span>
  //               </div>
  //               <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
  //                 {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
  //                   <div
  //                     key={item.name}
  //                     className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
  //                   >
  //                     <i className={`text-4xl text-neutral-6000 las ${item.icon}`}></i>
  //                     <span>{item.name}</span>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         </Transition.Child>
  //       </div>
  //     </Dialog>
  //   </Transition>
  // );

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
      <h2 className="text-2xl font-semibold">Host Information</h2>
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
            <StartRating />
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
      <span className="text-2xl font-semibold block">
        Pick up and drop off
      </span>
      <div className="mt-8 flex">
        <div className="flex-shrink-0 flex flex-col items-center py-2">
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
        </div>
        <div className="ml-4 space-y-14 text-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-neutral-500 dark:text-neutral-400">
              Monday, August 12 · 10:00
            </span>
            <span className="font-semibold">
              Saint Petersburg City Center
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-neutral-500 dark:text-neutral-400">
              Monday, August 16 · 10:00
            </span>
            <span className="font-semibold">
              Saint Petersburg City Center
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className="listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          Rs {tourGroup?.listingPrice?.finalPrice}
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
            /ticket
          </span>
        </span>
        <StartRating />
      </div>
   <SidebarBooking tourGroup={tourGroup} />
   </div>
  );

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



      <main className="relative z-10 mt-11 flex flex-col lg:flex-row">
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