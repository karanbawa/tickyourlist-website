import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionHeroProps {
  className?: string;
  rightImg: StaticImageData;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  return (
    <div className={`nc-SectionHero relative ${className}`}>
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
          <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h2>
          <span className="block text-base xl:text-lg text-neutral-600 dark:text-neutral-400">
            {subHeading}
          </span>
          {!!btnText && <ButtonPrimary href="/login" style={{ backgroundColor: '#7C25E9' }}>{btnText}</ButtonPrimary>}
        </div>
        <div className="flex-grow">
          <Image
            className="w-full"
            src={rightImg}
            alt="Hero Image"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
