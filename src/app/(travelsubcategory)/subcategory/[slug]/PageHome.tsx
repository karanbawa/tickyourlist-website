import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import CategoryTabs from "./CategoryTabs";
import { ChevronRight, Clock, ShoppingBag, Star } from "lucide-react";
import ScrollableCategoryTabs from "./ScrollableCategoryTabs";

interface PageHome3Props {
   category?: any;
   currentSubcategory?: any;
   relatedSubcategories?: any;
    tourGroups: any;
}

function PageHome3({ category, currentSubcategory,  relatedSubcategories, tourGroups }: PageHome3Props) {

  if (!relatedSubcategories) {
    return <div>No collection data available</div>;
  }

  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      <div className="max-w-7xl mx-auto p-4 font-sans">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:text-gray-700 underline text-xs sm:text-sm">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
            </li>
            <li className="flex items-center">
              <Link href={`/things-to-do-in-${currentSubcategory?.cityCode?.toLowerCase()}`} className="hover:text-gray-700 underline text-xs sm:text-sm">
                Things to do in {currentSubcategory?.cityCode?.charAt(0)?.toUpperCase() + currentSubcategory?.cityCode?.slice(1)?.toLowerCase()}
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
            </li>
            <li className="flex items-center">
              <Link href={`/category/${category?.urlSlugs?.EN}`} className="hover:text-gray-700 underline text-xs sm:text-sm">
                {category?.name?.charAt(0)?.toUpperCase() + category?.name?.slice(1)?.toLowerCase()}
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
            </li>
            <li className="text-gray-700 text-xs sm:text-sm">{currentSubcategory.displayName}</li>
          </ol>
        </nav>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Rating */}
            <div className="flex items-center mb-3">
              <Star className="w-6 h-6 text-pink-500 fill-current" />
              <span className="text-pink-500 font-bold text-md ml-1">{currentSubcategory?.ratingsInfo?.averageRating.toFixed(1) ?? '4.5'}</span>
              <span className="text-gray-500 text-sm ml-2">({currentSubcategory?.ratingsInfo?.ratingsCount.toLocaleString() ?? '11.5k'} ratings)</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl font-semibold mb-6">{currentSubcategory?.heading}</h1>
            
            {/* Description */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              {currentSubcategory.metaDescription}
            </p>
          </div>
          
          {/* Video */}
          <div className="lg:w-1/2">
            <div className="relative h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-xl">
              {currentSubcategory.collectionVideo ? (
                <video 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={currentSubcategory?.collectionVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image 
                  src={currentSubcategory?.medias?.[0]?.url || "/placeholder.jpg"}
                  alt={currentSubcategory?.medias?.[0]?.altText || "Burj Khalifa"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container relative space-y-2 mb-24">
      <div className="mt-8">
          <ScrollableCategoryTabs categories={relatedSubcategories} initialActiveCategory={currentSubcategory?.name} />
        </div>
        <CategoryTabs tourGroups={tourGroups} />
        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome3;