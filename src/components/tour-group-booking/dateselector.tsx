"use client";

import React, { useState, useEffect } from "react";

const DateSelection = () => {
  const [selectedDate, setSelectedDate] = useState("Sep 11"); // Example of selected date
  const [displayedDates, setDisplayedDates] = useState([]);

  const dates = [
    { day: "Mon", date: "Sep 9", price: "₹4.9K" },
    { day: "Tue", date: "Sep 10", price: "₹4.9K" },
    { day: "Wed", date: "Sep 11", price: "₹4.9K" },
    { day: "Thu", date: "Sep 12", price: "₹4.9K" },
    { day: "Fri", date: "Sep 13", price: "₹4.9K" },
    { day: "Sat", date: "Sep 14", price: "₹4.9K" },
    { day: "Sun", date: "Sep 15", price: "₹4.9K" },
  ];

  // Function to determine how many dates to show based on screen size
  const updateDisplayedDates = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      // Small screens (phones)
      setDisplayedDates(dates.slice(0, 5));
    } else {
      // Larger screens (tablets and up)
      setDisplayedDates(dates);
    }
  };

  useEffect(() => {
    // Set displayed dates on initial render
    updateDisplayedDates();

    // Update displayed dates on window resize
    window.addEventListener("resize", updateDisplayedDates);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateDisplayedDates);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[#444444] text-base md:text-lg font-medium mb-1.5">
          Select a date
        </h2>
        <p className="text-[#444444] text-xs md:text-sm font-light">
          All prices are in INR (₹)
        </p>
      </div>

      <div className="relative overflow-x-auto no-scrollbar">
        <div className="flex gap-2 items-center justify-start md:justify-between">
          {displayedDates.map((dateItem) => (
            <button
              key={dateItem.date}
              onClick={() => setSelectedDate(dateItem.date)}
              className={`flex flex-col justify-around items-center w-16 sm:w-20 md:w-24 p-2 sm:p-3 md:p-3.5 rounded-lg cursor-pointer border ${
                selectedDate === dateItem.date
                  ? "bg-[#F3E9FF] border-[#8000FF] hover:bg-[#E6D1FF] hover:border-[#8000FF]"
                  : "bg-white border-white hover:bg-[#F8F8F8] hover:border-[#9F9F9F]"
              }`}
            >
              <span
                className={`uppercase text-[10px] sm:text-xs font-medium leading-none ${
                  selectedDate === dateItem.date
                    ? "text-[#6600CC]"
                    : "text-[#666666]"
                }`}
              >
                {dateItem.day}
              </span>
              <span
                className={`text-center text-[0.6rem] md:text-base font-normal leading-none mt-1 sm:mt-2 ${
                  selectedDate === dateItem.date
                    ? "text-[#6600CC]"
                    : "text-[#444444]"
                }`}
              >
                {dateItem.date}
              </span>
              <span
                className={`text-center text-[10px] sm:text-xs font-light leading-none mt-1 ${
                  selectedDate === dateItem.date
                    ? "text-[#6600CC]"
                    : "text-[#666666]"
                }`}
              >
                {dateItem.price}
              </span>
            </button>
          ))}

          <button
            role="button"
            aria-label="More Dates"
            className="flex flex-col justify-center items-center w-16 sm:w-20 md:w-24 h-20 sm:h-24 sm:p-2.5 rounded-lg cursor-pointer border bg-white hover:bg-[#F8F8F8] hover:border-[#9F9F9F]"
          >
            <div className="flex flex-col items-center">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                role="img"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  d="M12.6667 2.66675H3.33333C2.59695 2.66675 2 3.2637 2 4.00008V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V4.00008C14 3.2637 13.403 2.66675 12.6667 2.66675Z"
                  stroke="#23a1b2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 1.33337V4.00004"
                  stroke="#23a1b2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.33334 1.33337V4.00004"
                  stroke="#23a1b2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 6.66675H14"
                  stroke="#23a1b2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-1 text-[10px] sm:text-xs md:text-sm font-medium leading-none">
                <span className="underline">More Dates</span>
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
