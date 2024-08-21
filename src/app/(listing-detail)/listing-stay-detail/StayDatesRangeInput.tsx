"use client";

import React, { useState, FC, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";

export interface StayDatesRangeInputProps {
  className?: string;
  onChangeDate: (date: Date | null) => void;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  onChangeDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Parse the date from the URL query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = searchParams.get("date");

    if (dateParam) {
      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        onChangeDate(parsedDate); // Update the parent component with the parsed date
      }
    }
  }, [onChangeDate]);

  const handleDateChange = (date: Date | null, closePopover: () => void) => {
    setSelectedDate(date);
    onChangeDate(date);
    closePopover(); // Close the Popover when the date is selected
  };

  const renderInput = () => {
    const formattedDate = selectedDate
      ? selectedDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Select a date";

    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {formattedDate}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {selectedDate ? "Selected date" : "Select a date"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none rounded-3xl ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput()}
            {selectedDate && open && (
              <ClearDataButton onClick={() => handleDateChange(null, close)} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-auto xl:-right-[1.2rem] right-0 z-10 mt-3 top-full w-screen max-w-sm p sm:px-0 pl-[2rem]">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => handleDateChange(date, close)}
                  minDate={new Date()} // Disables past dates
                  monthsShown={1} // Shows only one month
                  showPopperArrow={false}
                  inline
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;
