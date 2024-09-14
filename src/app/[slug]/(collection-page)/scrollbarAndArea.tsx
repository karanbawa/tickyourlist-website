'use client'

import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface ScrollBarProps {
  orientation?: 'horizontal' | 'vertical';
}

export const ScrollBar: React.FC<ScrollBarProps> = ({ orientation = 'horizontal' }) => {
  return (
    <div 
      className={`absolute ${orientation === 'horizontal' ? 'bottom-0 left-0 right-0 h-2' : 'top-0 right-0 bottom-0 w-2'}`}
    >
      <div 
        className={`bg-gray-300 rounded ${orientation === 'horizontal' ? 'h-full' : 'w-full'}`}
        style={{ width: orientation === 'horizontal' ? '100%' : '4px', height: orientation === 'horizontal' ? '4px' : '100%' }}
      />
    </div>
  );
};



interface ScrollAreaProps {
    children: ReactNode;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
  }
  
  export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className = '', orientation = 'horizontal' }) => {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div 
          className={`overflow-auto ${orientation === 'horizontal' ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden'}`}
          style={{ 
            scrollbarWidth: 'none',  // Firefox
            msOverflowStyle: 'none', // IE and Edge
          }}
        >
          {children}
        </div>
        <style jsx>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
  
          /* Hide scrollbar for IE, Edge and Firefox */
          div {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </div>
    );
  };
