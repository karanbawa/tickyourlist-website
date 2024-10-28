import React, { useState, useEffect, useRef } from "react";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { useRouter } from "next/navigation";
import ButtonSubmit from "./ButtonSubmit";
import Image from "next/image";

export interface LocationInputProps {
  onInputDone?: (value: string) => void;
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
}

const RECENT_SEARCHES_KEY = "recentSearches"; // Key to store in localStorage

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  onInputDone,
  placeHolder = "Search Destination",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [searchResults, setSearchResults] = useState<any[]>([]); // To store formatted result objects
  const [recentSearches, setRecentSearches] = useState<any[]>([]); // To store recent searches
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShowPopover(autoFocus);
    if (autoFocus && inputRef?.current) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 200);
    }
  }, [autoFocus]);

  useOutsideAlerter(containerRef, () => {
    setShowPopover(false);
  });

  useEffect(() => {
    if (showPopover && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [showPopover]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedRecentSearches = localStorage?.getItem(RECENT_SEARCHES_KEY);
    if (savedRecentSearches) {
      setRecentSearches(JSON.parse(savedRecentSearches));
    }
  }, []);

  // Fetch search results from the API
  const fetchSearchResults = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.univolenitsolutions.com/v1/tourgroupsearch/search-highlight?q=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj",
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          }
        }
      );
      const data = await response?.json();
      const results = data?.map((hit: any) => ({
        name: hit?._formatted?.name || hit?.name,
        location: `${hit?.cityName}${hit?.countryDisplayName ? `, ${hit?.countryDisplayName}` : ''}` || "Unknown Location",
        image: hit?.images?.[0] || "/default-image.png", // Get the first image or a default image
        urlSlug: hit?.urlSlugs?.EN,
        filterName: hit?.name
      }));
      setSearchResults(results);
    } catch (err) {
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and fetch search results
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget?.value;
    setValue(inputValue);
    if (inputValue) {
      fetchSearchResults(inputValue); // Trigger API call on input
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  };

  // Handle selecting a location and save to recent searches
  // Handle selecting a location and redirect to the URL slug
  const handleSelectLocation = (item: any) => {

    setValue("");  // Clear the state which controls the input field
    if (inputRef?.current) {
      inputRef.current.value = "";  // Clear the actual input field
    }

    // setValue(item?.name);
    setShowPopover(false);

    // Redirect to the selected location's URL slug
    if (item?.urlSlug) {
      router.prefetch(item.urlSlug);
      router.push(item.urlSlug);  // Programmatic navigation using the slug
    }

    // Optionally call the callback with the selected location name
    onInputDone && onInputDone(item?.name);

    // Save the selected location to recent searches
    saveToRecentSearches(item);
    setSearchResults([]);
  };

  // Save to localStorage
  const saveToRecentSearches = (location: any) => {
    // Remove any existing entries with the same name
    const filteredSearches = recentSearches.filter(
      (search) => search.filterName !== location.filterName
    );
    
    // Add the new search at the beginning and limit to 5 items
    const updatedRecentSearches = [location, ...filteredSearches].slice(0, 5);
    
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecentSearches));
  };

  const renderRecentSearches = () => {
    if (recentSearches.length === 0) {
      return (
        <div className="flex items-center justify-center py-4">
          <span className="text-neutral-500">No recent searches</span>
        </div>
      );
    }
    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-sm text-gray-600 text-neutral-800 dark:text-neutral-100">
          Recent searches
        </h3>
        <div className="mt-2">
          {recentSearches?.map((item) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item?.name}
              className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <Image
                src={item?.image || "/default-image.png"} // Default image if no image is available
                alt={item?.name}
                className="rounded-md object-cover"
                width={60}
                height={60}
                quality={80}
                onError={(e) => {
                  e.currentTarget.src = "/default-image.png";
                }}
              />
              <div>
                <span className="block text-neutral-700 dark:text-neutral-200 font-medium" dangerouslySetInnerHTML={{ __html: item?.name }}>
                </span>
                <span className="block text-neutral-500 text-sm">
                  {item?.location || "Unknown Location"} {/* Show location if available */}
                </span>
              </div>
            </span>
          ))}
        </div>
      </>
    );
  };

  const renderSearchResults = () => {
    if (loading) {
      return <div className="px-4 sm:px-6 py-4">Loading...</div>;
    }
    if (error) {
      return <div className="px-4 sm:px-6 py-4 text-red-500">{error}</div>;
    }
    return (
      <>
        {searchResults?.map((item) => (
          <span
            onClick={() => handleSelectLocation(item)}
            key={item?.name}
            className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <Image
                src={item?.image || "/default-image.png"} // Default image if no image is available
                alt={item?.name}
                className="rounded-md object-cover"
                width={60}
                height={60}
                quality={80}
                onError={(e) => {
                  e.currentTarget.src = "/default-image.png";
                }}
              />
            <div>
              <span className="block text-neutral-700 dark:text-neutral-200 font-medium" dangerouslySetInnerHTML={{ __html: item?.name }}>
              </span>
              <span className="block text-neutral-500 text-sm">
                {item?.location || "Unknown Location"}
              </span>
            </div>
          </span>
        ))}
      </>
    );
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex flex-1 relative z-10 nc-hero-field-padding--small flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? "nc-hero-field-focused--2" : ""
        }`}
      >
        <div className="flex flex-1">
          <div className="flex-1">
          <input
            className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-400 xl:text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={handleInputChange} // Updated to handle input change
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          </div>
           <div>
            <ButtonSubmit href="/"  />
           </div> 
          {value && showPopover && (
            <ClearDataButton onClick={() => setValue("")} />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[400px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-5 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value ? renderSearchResults() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
