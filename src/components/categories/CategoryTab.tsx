import React, { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Collection {
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
  categories: Collection[];
  cityName: string;
}

const CategoryTab: FC<CategoryTabProps> = ({ showDropdown, setShowDropdown, categories, cityName }) => {
  const [activeCategory, setActiveCategory] = useState<string>(`Things to do in ${cityName}`);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [activeCategory, showDropdown]);

  if (!showDropdown) return null;

  const staticCategories = [
    'Tickets',
    'Tours',
    'Transportation',
    'Cruises',
    'Activities',
    'Attractions'
  ];

  const allCategories = [`Things to do in ${cityName}`, ...staticCategories];

  const handleClick = (urlSlug: string) => {
    console.log('Navigating to:', urlSlug);
    router.push(urlSlug as any);  // No need for additional type casting
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as Node;
    if (!e.currentTarget.contains(relatedTarget)) {
      setShowDropdown(false);
    }
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
            {allCategories?.map((category) => (
              <div
                key={category}
                className={`py-2 px-4 cursor-pointer rounded-lg ${
                  activeCategory === category 
                    ? 'text-purple-600 bg-gray-100 font-medium' 
                    : 'hover:text-purple-600'
                }`}
                onMouseEnter={() => setActiveCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="w-3/4 py-6 pl-6 border-l border-gray-200">
            {activeCategory && (
              <div>
                <h3 className="font-bold text-xl mb-4">{activeCategory}</h3>
                <div className="grid grid-cols-3 gap-6 pb-4">
                  {activeCategory === `Things to do in ${cityName}` ? (
                    categories?.map((collection) => (
                      <div 
                        key={collection.id}
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
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-110 transition-transform duration-300"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                          />
                        </div>
                        <div className="flex-grow" onClick={() => handleClick(collection.urlSlug)}>
                          <h4 className="font-medium group-hover:text-purple-600 transition-colors">{collection.displayName}</h4>
                          <p className="text-sm text-gray-600">
                            from {collection.startingPrice.currency}{collection.startingPrice.listingPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Content for {activeCategory} will be populated from other APIs.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTab;