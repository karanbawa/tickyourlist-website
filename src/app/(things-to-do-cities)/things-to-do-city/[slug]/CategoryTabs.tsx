'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Home, Landmark, Search, User, Globe, Waves, Compass } from 'lucide-react';
import StayCard2 from '@/components/tourrgroupsectionpage/StayCard2';
import Heading from '@/shared/Heading';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const noScrollbarClass = `
  scrollbar-hide overflow-x-auto
  [&::-webkit-scrollbar]:hidden
  [-ms-overflow-style:'none']
  [scrollbar-width:'none']
`;

interface CategoryTabsProps {
  travelSections: any;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ travelSections }) => {
  const [activeTab, setActiveTab] = useState<string>('');
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
    if (travelSections && travelSections.data && travelSections.data.length > 0) {
      setActiveTab(travelSections.data?.[0].category.id.name);
    }
  }, [travelSections]);

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

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'theme parks': return <Home size={24} />;
      case 'landmarks': return <Landmark size={24} />;
      case 'combos': return <Search size={24} />;
      case 'zoos': return <User size={24} />;
      case 'cruises': return <Globe size={24} />;
      case 'water parks': return <Waves size={24} />;
      case 'skydiving': return <Waves size={24} />;
      case 'desert safari': return <Compass size={24} />;
      default: return <Home size={24} />;
    }
  };

  if (!travelSections || !travelSections.data || travelSections.data.length === 0) {
    return <div>No travel sections available</div>;
  }

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
              {travelSections.data.map((section: any) => (
                <button
                  key={section.category.id.name}
                  ref={el => buttonRefs.current[section.category.id.name] = el}
                  onClick={() => handleTabClick(section.category.id.name)}
                  className={`
                    flex space-x-2 items-center justify-center
                    p-2 rounded-lg transition-colors duration-200
                    min-w-[80px] sm:min-w-[100px]
                    ${activeTab === section.category.id.name
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                >
                  <span className="mb-1">{getCategoryIcon(section.category.id.name)}</span>
                  <span className="text-xs sm:text-sm text-center whitespace-nowrap">{section.category.id.name}</span>
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
        {travelSections.data.map((section: any) => (
          <div
            className="nc-SectionGridFeaturePlaces relative pt-10 pb-10"
            key={section.category.id.name}
            id={section.category.id.name}
            ref={el => sectionRefs.current[section.category.id.name] = el}
          >
            <div className="flex items-center justify-between px-4 mb-4">
              <Heading desc={'Explore top experiences'}>{`Top Experiences in ${section.category.id.name}`}</Heading>
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
                {section.tourGroups?.map((tourgroup: any) => (
                  <StayCard2 key={tourgroup.id} data={tourgroup} className="min-w-[300px] max-w-[300px] flex-shrink-0" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;