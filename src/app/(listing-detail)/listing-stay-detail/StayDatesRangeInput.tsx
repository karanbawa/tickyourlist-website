"use client";

import React, { useState, FC, Fragment, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
const { DateTime } = require('luxon');

export interface StayDatesRangeInputProps {
  className?: string;
  onChangeDate: (date: Date | null) => void;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  onChangeDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const prevDateRef = useRef<Date | null>(null)

  function formatDateToYYYYMMDD(date: any) {
    // Ensure the date is formatted as 'YYYY-MM-DD'
    return date.toFormat('yyyy-MM-dd');
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = searchParams.get("date");

    console.log("searchParams and dateParam: ", searchParams, dateParam);

    if (dateParam) {
      const parsedDate = DateTime.fromISO(dateParam, { zone: "local" });

      console.log("parsedDateparsedDate ", parsedDate);


      console.log("parsedDateparsedDatetest ", parsedDate.isValid);

      if (parsedDate.isValid) {
        const newDate = parsedDate.toJSDate();
        const formattedDate = formatDateToYYYYMMDD(parsedDate);
        console.log("Formatted Date:", formattedDate);

        // Check if the new date is different from the previous one
        if (prevDateRef.current?.getTime() !== newDate.getTime()) {
          prevDateRef.current = newDate; // Update the previous date
          setSelectedDate(newDate);
          onChangeDate(newDate); // Only call if the date is different
        }
      } else {
        console.error("Invalid date format:", dateParam);
      }
    }
  }, [onChangeDate]);

  const handleDateChange = (date: Date | null, closePopover: () => void) => {
    if (date && prevDateRef.current?.getTime() !== date.getTime()) {
      setSelectedDate(date);
      onChangeDate(date); // Trigger only if the date is different
      prevDateRef.current = date; // Store the new date
    }
    closePopover();
  };

  const renderInput = () => {
    const formattedDate = selectedDate
      ? selectedDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Add a date";

    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {formattedDate}
          </span>
          <span className="block mt-1 text-xs md:text-sm text-neutral-400 leading-none font-light">
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
            className={`text-sm md:text-base flex-1 flex relative p-3 items-center space-x-3 focus:outline-none rounded-3xl ${
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
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-4 md:p-8">
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
