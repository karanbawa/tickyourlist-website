'use client'

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
  urlSlugs: {
    EN: string;
  };
}

interface ScrollableCategoryTabsProps {
  categories: Category[];
  initialActiveCategory: string;
}

const ScrollableCategoryTabs: React.FC<ScrollableCategoryTabsProps> = ({ 
  categories, 
  initialActiveCategory
}) => {
  const [activeCategory, setActiveCategory] = useState(initialActiveCategory);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    // Prefetch all category pages
    categories.forEach(category => {
      router.prefetch(`/subcategory/${category.urlSlugs.EN}`);
    });
  }, [categories, router])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
      }, 300);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.name);
    router.push(`/subcategory/${category.urlSlugs.EN}`);
  };

  // Function to get icon based on category name
  const getIcon = (name: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'Theme Parks': <span className="text-2xl">🎡</span>,
      'Museums': <span className="text-2xl">🏛️</span>,
      'Zoos': <span className="text-2xl">🦁</span>,
      'Parks': <span className="text-2xl">🌳</span>,
      'Water Parks': <span className="text-2xl">🌊</span>,
      'Religious Sites': <span className="text-2xl">⛪</span>,
      'Landmarks': <span className="text-2xl">🗽</span>,
      'City Cards': <span className="text-2xl">🎫</span>,
      'Observation Decks': <span className="text-2xl">🔭</span>,
    };
    return iconMap[name] || <span className="text-2xl">📍</span>;
  };

  return (
    <div className="relative">
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 px-8"
        onScroll={() => {
          if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
          }
        }}
      >
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className={`
              flex items-center justify-center
              py-2 px-4 rounded-lg transition-colors duration-200
              ${activeCategory === category.name
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
          >
            <span className="mb-1 mr-2">{getIcon(category.name)}</span>
            <span className="text-xs sm:text-sm text-center whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
      {showRightArrow && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ScrollableCategoryTabs;