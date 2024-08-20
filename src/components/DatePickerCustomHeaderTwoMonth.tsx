import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

const DatePickerCustomHeaderTwoMonth = ({
  monthDate,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        aria-label="Previous Month"
        className="react-datepicker__navigation react-datepicker__navigation--previous flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        type="button"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <span className="react-datepicker__current-month text-lg font-semibold">
        {monthDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <button
        aria-label="Next Month"
        className="react-datepicker__navigation react-datepicker__navigation--next flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        type="button"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DatePickerCustomHeaderTwoMonth;
