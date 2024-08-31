'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Home, Landmark, Search, User, Globe, Waves, Compass } from 'lucide-react';
import { ScrollArea } from './scrollbarAndArea';
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

const CategoryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(categories[0].label);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [tabsOriginalTop, setTabsOriginalTop] = useState<number>(0);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (tabsRef.current) {
        if (scrollPosition > tabsOriginalTop - headerHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight, tabsOriginalTop]);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${headerHeight + 50}px 0px -50% 0px`,
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [headerHeight]);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
    const element = sectionRefs.current[category];
    if (element && tabsRef.current) {
      const tabsHeight = tabsRef.current.offsetHeight;
      const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - tabsHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
        <ScrollArea className="w-full whitespace-nowrap px-4 py-2" orientation="horizontal">
          <div className="flex space-x-4 px-4 min-w-max">
            {categories.map((category) => (
              <button
                key={category.label}
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
        </ScrollArea>
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
            <ScrollArea className="flex space-x-4 px-4 overflow-x-auto" orientation="horizontal">
              <div className="flex space-x-4">
                {DEMO_DATA.map((stay) => renderExperienceCard(stay))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;