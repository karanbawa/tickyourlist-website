import React, { useState, useRef, useEffect, FC } from "react";
import { ClockIcon, MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "../(HeroSearchForm)/ClearDataButton";
import ButtonSubmit from "../(HeroSearchForm)/ButtonSubmit";
import _ from 'lodash';
import { usePathname, useRouter } from "next/navigation";
import { Route } from "next";
import Link from "next/link";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  onLocationSelect?: (location: string) => void;
  travelCities?: any[];
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  travelCities = [],
  onLocationSelect,
}) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const thisPathname = usePathname();

  const groupedCities = _.groupBy(travelCities, city => 
    city.country?.displayName || 'Other Destinations'
  );
  
    const handleNavigation = (item: any, isCountry: boolean = false) => {
      console.log("Navigation item:", item);
      
      if (isCountry) {
        // Handle country navigation
        const countryPath = `${thisPathname}/country/${item.toLowerCase().replace(/\s+/g, '-')}`;
        console.log("Country path:", countryPath);
        router.push(countryPath as Route);
      } else {
        // Handle city navigation
        if (!item?.cityCode) {
          console.error("City code is missing:", item);
          return;
        }
        const cityPath = `${thisPathname}/city/${item.cityCode.toLowerCase()}`;
        console.log("City path:", cityPath);
        router.push(cityPath as Route);
      }
    };

  const renderSearchResults = () => {
    const resultsToShow = searchResults.length > 0 ? searchResults : [];
    return (
      <div className="mt-2">
        {resultsToShow.map((city) => (
          <span
            onClick={() => handleNavigation(city)}
            key={city.cityCode}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {city.displayName}
              <span className="text-sm text-neutral-500 ml-2">
                {city.country?.displayName}
              </span>
            </span>
          </span>
        ))}
      </div>
    );
  };

  const renderDestinations = () => (
    <div className="px-4 sm:px-8">
      {Object.entries(groupedCities).map(([country, cities]) => (
        <div key={country} className="mb-6">
          <Link
            href={`${thisPathname}/country/${country.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-3 cursor-pointer hover:text-purple-600"
          >
            <h3>{country}</h3>
          </Link>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {cities?.map((city, index) => (
              <Link
                key={index}
                href={`${thisPathname}/city/${city.cityCode.toLowerCase()}`}
                className="text-left px-3 py-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                {city.displayName}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const handleSearch = (searchTerm: string) => {
    setValue(searchTerm);
    if (searchTerm.trim()) {
      const filtered = travelCities.filter(city =>
        city.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country?.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative pt-4 pb-4 pr-5 pl-5 flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
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
        <ButtonSubmit style={{ backgroundColor: '#7C25E9' }} />
      </div>

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value ? renderSearchResults() : renderDestinations()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;