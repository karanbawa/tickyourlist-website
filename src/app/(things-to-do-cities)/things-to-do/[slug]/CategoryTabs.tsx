'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Home, Landmark, Search, User, Globe, Waves, Compass } from 'lucide-react';
import { StayDataType } from '@/data/types';
import StayCard2 from '@/components/tourrgroupsectionpage/StayCard2';
import { DEMO_STAY_LISTINGS } from '@/data/listings';
import Heading from '@/shared/Heading';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const categories = [
  { icon: <Home size={24} />, label: "Theme Parks" },
  { icon: <Landmark size={24} />, label: "Landmarks" },
  { icon: <Search size={24} />, label: "Combos" },
  { icon: <User size={24} />, label: "Zoos" },
  { icon: <Globe size={24} />, label: "Cruises" },
  { icon: <Waves size={24} />, label: "Water Parks" },
  { icon: <Waves size={24} />, label: "Skydiving" },
  { icon: <Compass size={24} />, label: "Desert Safari" },
];

const noScrollbarClass = `
  scrollbar-hide overflow-x-auto
  [&::-webkit-scrollbar]:hidden
  [-ms-overflow-style:'none']
  [scrollbar-width:'none']
`;

const CategoryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(categories[0].label);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [tabsOriginalTop, setTabsOriginalTop] = useState<number>(0);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const isManualScrollRef = useRef<boolean>(false);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    const setInitialTabsPosition = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setTabsOriginalTop(rect.top + window.pageYOffset);
      }
    };

    calculateHeaderHeight();
    setInitialTabsPosition();

    window.addEventListener('resize', calculateHeaderHeight);
    window.addEventListener('resize', setInitialTabsPosition);

    return () => {
      window.removeEventListener('resize', calculateHeaderHeight);
      window.removeEventListener('resize', setInitialTabsPosition);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    if (tabsRef.current) {
      setIsSticky(scrollPosition > tabsOriginalTop - headerHeight);
    }

    if (!isManualScrollRef.current) {
      const viewportHeight = window.innerHeight;
      let maxVisibleHeight = 0;
      let mostVisibleSection = '';

      Object.entries(sectionRefs.current).forEach(([label, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            mostVisibleSection = label;
          }
        }
      });

      if (mostVisibleSection && mostVisibleSection !== activeTab) {
        setActiveTab(mostVisibleSection);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight, tabsOriginalTop, activeTab]);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
    isManualScrollRef.current = true;
    const element = sectionRefs.current[category];
    if (element && tabsRef.current) {
      const tabsHeight = tabsRef.current.offsetHeight;
      const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - tabsHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      setTimeout(() => {
        isManualScrollRef.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    if (isSticky && scrollContainerRef.current && buttonRefs.current[activeTab]) {
      const container = scrollContainerRef.current;
      const button = buttonRefs.current[activeTab];
      
      if (button) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = button.offsetLeft;
        const buttonWidth = button.offsetWidth;
        
        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab, isSticky]);

  const renderExperienceCard = (stay: StayDataType) => {
    return <StayCard2 key={stay.id} data={stay} className="min-w-[300px] max-w-[300px] flex-shrink-0" />;
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Category Tabs */}
      <div
        ref={tabsRef}
        className={`bg-white z-10 transition-all duration-300 ${
          isSticky ? 'fixed left-0 right-0' : ''
        }`}
        style={{ 
          top: isSticky ? `${headerHeight}px` : 'auto',
          boxShadow: isSticky ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <div className="max-w-screen-xl mx-auto relative">
          <div 
            ref={scrollContainerRef}
            className={`whitespace-nowrap px-4 py-2 ${noScrollbarClass}`}
          >
            <div className="inline-flex space-x-4">
              {categories.map((category) => (
                <button
                  key={category.label}
                  ref={el => buttonRefs.current[category.label] = el}
                  onClick={() => handleTabClick(category.label)}
                  className={`
                    flex space-x-2 items-center justify-center
                    p-2 rounded-lg transition-colors duration-200
                    min-w-[80px] sm:min-w-[100px]
                    ${activeTab === category.label
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                >
                  <span className="mb-1">{category.icon}</span>
                  <span className="text-xs sm:text-sm text-center whitespace-nowrap">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experiences */}
      <div 
        ref={contentRef} 
        className="flex-1" 
        style={{ paddingTop: isSticky ? `${tabsRef.current?.offsetHeight || 0}px` : '0' }}
      >
        {categories.map((category) => (
          <div
            className="nc-SectionGridFeaturePlaces relative pt-10 pb-10"
            key={category.label}
            id={category.label}
            ref={el => sectionRefs.current[category.label] = el}
          >
            <div className="flex items-center justify-between px-4 mb-4">
              <Heading desc={'Explore top experiences'}>{'Top Experiences in'} {category.label}</Heading>
              <span className="hidden sm:block flex-shrink-0">
                <ButtonSecondary href="/listing-stay" className="!leading-none">
                  <div className="flex items-center justify-center">
                    <span>View all</span>
                    <ArrowRightIcon className="w-5 h-5 ml-3" />
                  </div>
                </ButtonSecondary>
              </span>
            </div>
            <div className={noScrollbarClass}>
              <div className="flex space-x-4 px-4 min-w-max">
                {DEMO_DATA.map((stay) => renderExperienceCard(stay))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;