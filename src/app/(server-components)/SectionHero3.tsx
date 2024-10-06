'use client'

import React, { FC } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import ButtonPrimary from "@/shared/ButtonPrimary";
import "swiper/css";
import "swiper/css/pagination";

export interface SectionHero3Props {
  className?: string;
  travelSectionBanners?: any;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "", travelSectionBanners }) => {
  const router = useRouter(); // Initialize useRouter

  const handleButtonClick = (url: any) => {
    router.push(url); // Navigate to the provided URL
  };

  return (
    <div className={`nc-SectionHero3 relative ${className}`} data-nc-id="SectionHero3">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="relative"
      >
        {travelSectionBanners?.slides.map((slide: any, index: number) => (
          <SwiperSlide key={slide?._id}>
            <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-6 xl:aspect-h-6 cursor-pointer" onClick={() => handleButtonClick(slide?.urlSlug)}>
              {slide.type === "image" ? (
                <>
                  {/* Desktop Image */}
                  <div className="hidden sm:block"> {/* Visible on desktop */}
                    <Image
                      src={slide?.media?.url}
                      alt={`Slide ${slide?._id + 1}`}
                      layout="fill"
                      objectFit="cover"
                      priority={index === 0}
                      className="rounded-2xl"
                    />
                  </div>

                  {/* Phone View Media */}
                  <div className="block sm:hidden"> {/* Visible on mobile */}
                    <Image
                      src={slide?.phoneViewMedia?.url || slide?.media?.url} // Fallback to desktop image if phoneViewMedia is missing
                      alt={`Slide ${slide?._id + 1}`}
                      layout="fill"
                      objectFit="cover"
                      priority={index === 0}
                      className="rounded-lg"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Desktop Video */}
                  <div className="hidden sm:block"> {/* Visible on desktop */}
                    <video
                      src={slide.media?.url}
                      className="object-cover w-full h-full"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>

                  {/* Phone View Media */}
                  <div className="block sm:hidden"> {/* Visible on mobile */}
                    <video
                      src={slide?.phoneViewMedia?.url || slide?.media?.url} // Fallback to desktop video if phoneViewMedia is missing
                      className="object-cover w-full h-full"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </>
              )}

              <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
                {slide.subtitle && (
                  <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
                    {slide.subtitle}
                  </span>
                )}

                {slide.title && (
                  <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                    {slide.title}
                  </h2>
                )}

                {slide.buttonText && (
                  <ButtonPrimary
                    sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
                    fontSize="text-sm sm:text-base lg:text-lg font-medium"
                    style={{ backgroundColor: "#7C25E9" }}
                    onClick={() => handleButtonClick(slide?.urlSlug)} // Handle button click
                  >
                    {slide.buttonText}
                  </ButtonPrimary>
                )}
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionHero3;
