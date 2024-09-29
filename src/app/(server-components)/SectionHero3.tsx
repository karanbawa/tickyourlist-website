'use client'

import React, { FC } from "react";
import imagePng from "@/images/travelhero2.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import ButtonPrimary from "@/shared/ButtonPrimary";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export interface SectionHero3Props {
  className?: string;
}

// Dummy data for slides
const slidesData = [
  {
    type: "image",
    src: "/images/slide1.jpg",
    title: "Discover New Places",
    subtitle: "Book Tickets from TickYourList platform",
    buttonText: "Explore Now",
  },
  {
    type: "video",
    src: "/videos/slide2.mp4",
    title: "Experience Adventure",
    subtitle: "Your journey begins here",
    buttonText: "Get Started",
  },
  {
    type: "image",
    src: "/images/slide3.jpg",
    title: "Travel the World",
    subtitle: "Unforgettable experiences await",
    buttonText: "Book Now",
  },
];

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="relative"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8">
              {slide.type === "image" ? (
                <Image
                  src={imagePng}
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                />
              ) : (
                <video
                  src={slide.src}
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
              {/* Removed the overlay div */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
              <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
                <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
                  {slide.subtitle}
                </span>
                <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  {slide.title}
                </h2>
                <ButtonPrimary
                  sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
                  fontSize="text-sm sm:text-base lg:text-lg font-medium"
                  style={{ backgroundColor: "#7C25E9" }}
                >
                  {slide.buttonText}
                </ButtonPrimary>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionHero3;
