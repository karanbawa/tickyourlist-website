'use client'

import React from 'react';
import StayCard2 from '@/components/tourrgroupsectionpage/StayCard2';
import Heading from '@/shared/Heading';

interface CategoryTabsProps {
  tourGroups: any[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ tourGroups }) => {
  if (!tourGroups || tourGroups.length === 0) {
    return <div className='text-md font-semibold text-center mt-6'>No Tours available !!</div>;
  }

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <div className="relative py-12">
        <div className="flex items-center justify-between px-6 mb-8">
          <Heading desc={'Explore top experiences'}>Top Experiences in Dubai</Heading>
        </div>
        <div className="px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tourGroups.map((tourGroup) => (
              <div key={tourGroup.id} className="flex justify-center">
                <StayCard2 
                  data={tourGroup} 
                  className="w-full max-w-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;