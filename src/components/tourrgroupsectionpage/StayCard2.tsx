import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { ArrowDown, History, Smartphone, X, Zap } from "lucide-react";

export interface StayCard2Props {
  className?: string;
  data: any;
  size?: "default" | "small";
}

const StayCard2: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  data,
}) => {
  const {
    id,
    name,
    imageUploads,
    urlSlugs,
    cityCode,
    tourType,
  } = data;

  // Helper function to format price with commas
  const formatPrice = (price: number) => {
    return price?.toLocaleString('en-IN');
  };

  const renderSliderGallery = () => {
    const hasFreeCancellationDescriptor = data?.descriptors?.some((descriptor: any) => descriptor.code === "FREE_CANCELLATION");
    return (
      <div className="relative w-full">
        <GallerySlider
          hasFreeCancellationDescriptor={hasFreeCancellationDescriptor}
          uniqueID={`StayCard2_${id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={imageUploads?.map((img: any) => img.url)}
          imageClass="rounded-lg"
          href={urlSlugs?.EN}
        />
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
        {/* Add SaleOffBadge conditionally if there's a promotion */}
      </div>
    );
  };

  const renderContent = () => {
    const originalPrice = data?.listingPrice?.prices?.[0]?.originalPrice;
    const finalPrice = data?.listingPrice?.prices?.[0]?.finalPrice;
    const savedAmount = originalPrice - finalPrice;
    const savedPercentage = Math.round((savedAmount / originalPrice) * 100);

    const hasInstantConfirmation = data?.descriptors?.some((descriptor: any) => descriptor.code === "INSTANT_CONFIRMATION");
    const hasFreeCancellationDescriptor = data?.descriptors?.some((descriptor: any) => descriptor.code === "FREE_CANCELLATION");


    return (
      <div className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {/* <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {data?.descriptors?.[0]?.name}
            </span> */}
            {hasInstantConfirmation && (
            <div className="flex text-sm text-neutral-500 dark:text-neutral-400">
              <Zap size={16} />
              <span className="text-xs ml-1">Instant Confirmation</span>
            </div>
          )}
          {!hasInstantConfirmation && hasFreeCancellationDescriptor && (
            <div className="flex text-sm text-neutral-500 dark:text-neutral-400">
              <History size={16} />
              <span className="text-xs ml-1">Free Cancellation</span>
            </div>
          )}
          {!hasInstantConfirmation && !hasFreeCancellationDescriptor && data?.descriptors?.[0] && (
            <div className="flex text-sm text-neutral-500 dark:text-neutral-4000">
              <Smartphone size={16}/>
              <span className="text-xs">{data?.descriptors[0].name}</span>
            </div>
          )}
            <StartRating reviewCount={data.reviewCount || 0} point={data?.rating || 0} />
          </div>
          <div className="flex items-center space-x-2">
            <h2 className={`font-semibold capitalize text-neutral-900 dark:text-white ${
              size === "default" ? "text-base" : "text-base"
            }`}>
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === "default" && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{cityCode}</span>
          </div>
        </div>
        
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex items-end">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                from
              </span> 
              <span className="text-sm ml-2 line-through text-neutral-500 dark:text-neutral-400">
                ₹ {formatPrice(originalPrice)}
              </span>
            </div>
            <span className="text-base font-semibold">
              ₹ {formatPrice(finalPrice)}
              {size === "default" && (
                <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                  {` `}/ticket
                </span>
              )}
            </span>
          </div>
          <span className="flex items-center bg-green-800 text-white text-xs font-medium px-2 py-1 rounded-md ml-2">
            Save up to {savedPercentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={urlSlugs?.EN}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard2;