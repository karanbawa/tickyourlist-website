import React, { useState, useRef, useEffect, FC } from "react";
import { ClockIcon, MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "../(HeroSearchForm)/ClearDataButton";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  onLocationSelect?: (location: string) => void;
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  onLocationSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const recentSearches = [
    "Hamptons, Suffolk County, NY",
    "Las Vegas, NV, United States",
    "Ueno, Taito, Tokyo",
    "Ikebukuro, Toshima, Tokyo",
  ];

  const allLocations = [
    "Ha Noi, Viet Nam",
    "San Diego, CA",
    "Humboldt Park, Chicago, IL",
    "Bangor, Northern Ireland",
    ...recentSearches
  ];

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setShowPopover(false);
      }
    };

    if (showPopover) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showPopover]);

  const handleSearch = (searchTerm: string) => {
    setValue(searchTerm);
    if (searchTerm.trim()) {
      const filtered = allLocations.filter(location =>
        location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (item: string) => {
    setValue(item);
    setShowPopover(false);
    onLocationSelect?.(item);
  };

  const renderSearchResults = () => {
    const resultsToShow = searchResults.length > 0 ? searchResults : allLocations;
    return (
      <div className="mt-2">
        {resultsToShow.map((item) => (
          <span
            onClick={() => handleSelectLocation(item)}
            key={item}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {item}
            </span>
          </span>
        ))}
      </div>
    );
  };

  const renderRecentSearches = () => (
    <>
      <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
        Recent searches
      </h3>
      <div className="mt-2">
        {recentSearches.map((item) => (
          <span
            onClick={() => handleSelectLocation(item)}
            key={item}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {item}
            </span>
          </span>
        ))}
      </div>
    </>
  );

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MagnifyingGlassIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => handleSearch(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setValue("");
                setSearchResults([]);
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value ? renderSearchResults() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;