import React, { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  displayName: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  displayName: string;
  medias: any;
  urlSlugs: { EN: string };
}

interface Collection {
  _id: string;
  id: number;
  name: string;
  displayName: string;
  cardImageUrl: string;
  startingPrice: {
    listingPrice: number;
    currency: string;
  };
  urlSlug: string;
}

interface CategoryTabProps {
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  categories: Category[];
  collections: Collection[];
  cityName: string;
}

const CategoryTab: FC<CategoryTabProps> = ({ showDropdown, setShowDropdown, categories, collections, cityName }) => {
  const [activeItem, setActiveItem] = useState<string | null>(`Things to do in ${cityName}`);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const router = useRouter();

  const allItems = [`Things to do in ${cityName}`, ...categories?.map(cat => cat.displayName) ?? []];

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [activeItem, showDropdown]);

  if (!showDropdown) return null;

  const handleClick = (urlSlug: string) => {
    router.push(urlSlug as any);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as Node;
    if (!e.currentTarget.contains(relatedTarget)) {
      setShowDropdown(false);
    }
  };

  const getActiveContent = () => {
    if (activeItem === `Things to do in ${cityName}`) {
      return (
        <div className="grid grid-cols-3 gap-6 pb-4">
          {collections?.map((collection) => (
            <div 
              key={collection._id}
              className="cursor-pointer group flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100"
              onClick={() => handleClick(collection.urlSlug)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(collection.urlSlug)}
              role="button"
              tabIndex={0}
            >
              <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                  src={collection.cardImageUrl}
                  alt={collection.displayName}
                  // width={100}
                  // height={100}
                  loading="eager"
                  layout="fill"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium group-hover:text-purple-600 transition-colors">{collection.displayName}</h4>
                <p className="text-sm text-gray-600">
                  from {collection.startingPrice?.currency} {collection?.startingPrice?.listingPrice?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      const category = categories?.find(cat => cat.displayName === activeItem);
      if (category) {
        return (
          <div className="grid grid-cols-3 gap-6 pb-4">
            {category?.subcategories?.map((subcategory) => (
              <div 
                key={subcategory.id}
                className="cursor-pointer group flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100"
                onClick={() => handleClick(subcategory.urlSlugs.EN)}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(subcategory.urlSlugs.EN)}
                role="button"
                tabIndex={0}
              >
                <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={subcategory.medias?.[0]?.url} 
                  alt={subcategory.medias?.[0]?.displayName} 
                  layout="fill"
                  // objectFit="cover"
                  loading="eager"
                  className="group-hover:scale-110 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                />
              </div>
                <div className="flex-grow">
                  <h4 className="font-medium group-hover:text-purple-600 transition-colors">{subcategory.displayName}</h4>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div 
      className="absolute left-0 top-full w-full bg-white shadow-lg z-50"
      style={{ height: `${contentHeight}px`, width: '100vw' }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="lg:container px-4" ref={contentRef}>
        <div className="flex">
          <div className="w-1/4 py-6 pr-4">
            {allItems.map((item) => (
              <div
                key={item}
                className={`py-2 px-4 cursor-pointer rounded-lg ${
                  activeItem === item 
                    ? 'text-purple-600 bg-gray-100 font-medium' 
                    : 'hover:text-purple-600'
                }`}
                onMouseEnter={() => setActiveItem(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="w-3/4 py-6 pl-6 border-l border-gray-200">
            {activeItem && (
              <div>
                <h3 className="font-bold text-xl mb-4">{activeItem}</h3>
                {getActiveContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTab;