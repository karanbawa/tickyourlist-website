import React, { FC } from "react";
import imagePng from "@/images/hero-right-3.png";
import Image from "next/image";
import BlogSearchForm from "../(client-components)/(blog-page)/BlogSearchForm";

export interface BlogHeroProps {
  className?: string;
  children?: React.ReactNode;
  travelCities?: any;
}

const BlogHero: FC<BlogHeroProps> = ({ className = "", children, travelCities }) => {
  return (
    <div className={`nc-SectionHero2 relative ${className}`}>
      <div className="absolute inset-y-0 w-5/6 xl:w-full right-0 flex-grow">
        <Image fill className="object-cover" src={imagePng} alt="hero" />
      </div>
      <div className="relative py-14 lg:py-20">
        <div className="lg:mt-20 w-full flex justify-center">
          <BlogSearchForm travelCities={travelCities} />
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
