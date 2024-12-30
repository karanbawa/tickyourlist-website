'use client';

import React, { FC, useState } from 'react';
import styles from './newsTicker.module.css';

export interface NewsTickerProps {
    posts?: any[];
}

const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return '';
    
    // Format date as "DD Month YYYY"
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  

const BlinkingDot = () => (
  <div className="animate-pulse w-2 h-2 bg-white rounded-full mr-2" />
);

const NewsTickerItem = ({ title, date, imageUrl }: {
  title: string;
  date: string;
  imageUrl?: boolean;
}) => (
  <div className={`${styles.newsItem} flex items-center space-x-3 min-w-max px-4 cursor-pointer`}>
    {imageUrl && (
      <div className="w-12 h-12 flex-shrink-0">
        <img
          src="/api/placeholder/48/48"
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </div>
    )}
    <div className="flex flex-col">
      <h6 className={`${styles.newsTitle} text-sm font-medium text-gray-800`}>
        {title}
      </h6>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
  </div>
);

const NewsTicker: FC<NewsTickerProps> = ({ posts }) => {
  const [isPaused, setIsPaused] = useState(false);

//   const newsData = posts?.

  const news = [
    {
      title: "First Test Post",
      date: "December 24, 2024",
      imageUrl: true
    },
    {
      title: "test title – dubai blog",
      date: "December 14, 2024"
    },
    {
      title: "Discover Dubai's Top Indoor Attractions",
      date: "December 13, 2024",
      imageUrl: true
    },
    {
      title: "Hello world!",
      date: "November 26, 2024"
    }
  ];

  return (
    <div className="w-full bg-white shadow-md rounded-2xl overflow-hidden mt-10">
      <div className="flex items-center">
        <div className="bg-purple-600 px-6 py-3 flex-shrink-0 flex items-center">
          <BlinkingDot />
          <h4 className="text-white font-semibold whitespace-nowrap">
            Top Stories
          </h4>
        </div>
        <div className={`${styles.tickerWrapper} relative flex-1 overflow-hidden`}>
          <div 
            className={`${styles.tickerContent} flex whitespace-nowrap ${
              isPaused ? styles.paused : ''
            }`}
          >
            {[...news, ...news].map((item, index) => (
              <NewsTickerItem key={`${item.title}-${index}`} {...item} />
            ))}
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {isPaused ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;