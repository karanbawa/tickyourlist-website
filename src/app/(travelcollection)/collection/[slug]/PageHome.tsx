import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import CategoryTabs from "./CategoryTabs";
import { ChevronRight, Clock, ShoppingBag, Star } from "lucide-react";

interface PageHome3Props {
    collectionData: any;
    tourGroups: any;
}

function PageHome3({ collectionData, tourGroups }: PageHome3Props) {
  const collection = collectionData;

  if (!collection) {
    return <div>No collection data available</div>;
  }

  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      <div className="max-w-7xl mx-auto p-4 font-sans">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:text-gray-700 underline">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
            </li>
            <li className="flex items-center">
              <Link href={`/things-to-do-in-${collection?.cityCode?.toLowerCase()}`} className="hover:text-gray-700 underline">
                Things to do in {collection?.cityCode?.charAt(0)?.toUpperCase() + collection?.cityCode?.slice(1)?.toLowerCase()}
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
            </li>
            <li className="text-gray-700">{collection.displayName}</li>
          </ol>
        </nav>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Rating */}
            <div className="flex items-center mb-3">
              <Star className="w-6 h-6 text-pink-500 fill-current" />
              <span className="text-pink-500 font-bold text-xl ml-1">{collection.ratingsInfo.averageRating.toFixed(1)}</span>
              <span className="text-gray-500 ml-2">({collection.ratingsInfo.ratingsCount.toLocaleString()} ratings)</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl font-bold mb-6">{collection.displayName}</h1>
            
            {/* Description */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {collection.subtext}
            </p>
            
            {/* Open hours and Duration */}
            {/* <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span className="font-medium mr-2">Open today</span>
                <ChevronRight className="w-4 h-4 mr-1" />
                <span>12:00 AM - 11:59 PM</span>
              </div>
              <div className="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium mr-2">Recommended Duration</span>
                <span>2 hours</span>
              </div>
            </div> */}
            
          </div>
          
          {/* Video */}
          <div className="lg:w-1/2">
            <div className="relative h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-xl">
              {collection.collectionVideo ? (
                <video 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={collection.collectionVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image 
                  src={collection.heroMedia.url || "/placeholder.jpg"}
                  alt={collection.heroMedia.altText || "Burj Khalifa"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container relative space-y-24 mb-24">
        <CategoryTabs tourGroups={tourGroups} />
        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome3;