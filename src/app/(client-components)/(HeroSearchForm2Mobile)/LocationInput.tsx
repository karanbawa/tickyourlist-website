"use client";

import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef, FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
}

const RECENT_SEARCHES_KEY = "recentSearchesMobile"; // Key to store recent searches in localStorage

const LocationInput: FC<Props> = ({
  onChange = () => {},
  onClick = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "Where to?",
}) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue(defaultValue);
    const savedRecentSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (savedRecentSearches) {
      setRecentSearches(JSON.parse(savedRecentSearches));
    }
  }, [defaultValue]);

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
          }
        }
      );
      const data = await response.json();
      const results = data.map((hit: any) => ({
        name: hit?._formatted?.name || hit?.name,
        location: `${hit?.cityName}${hit?.countryDisplayName ? `, ${hit?.countryDisplayName}` : ""}` || "Unknown Location",
        image: hit?.images?.[0] || "/default-image.png",
        urlSlug: hit?.urlSlugs?.EN
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
    const inputValue = e.currentTarget.value;
    setValue(inputValue);
    if (inputValue) {
      fetchSearchResults(inputValue);
    } else {
      setSearchResults([]);
    }
  };

  // Handle selecting a location and save to recent searches
  const handleSelectLocation = (item: any) => {
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";  // Clear the input field
    }

    // Redirect to the selected location's URL slug
    if (item.urlSlug) {
      router.prefetch(item.urlSlug);
      router.push(item.urlSlug);
    }

    // Optionally trigger onChange callback
    onChange && onChange(item.name);
    onClick();

    // Save the selected location to recent searches
    saveToRecentSearches(item);
    setSearchResults([]);
  };

  // Save to localStorage
  const saveToRecentSearches = (location: any) => {
    let updatedRecentSearches = [...recentSearches];

    // Prevent duplicate entries
    if (!updatedRecentSearches.some((search) => search.name === location.name)) {
      updatedRecentSearches = [location, ...updatedRecentSearches.slice(0, 4)];
    }

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
        <p className="block font-semibold text-base">Recent searches</p>
        <div className="mt-3">
          {recentSearches.map((item) => (
            <div
              className="py-2 mb-1 flex items-center space-x-3 text-sm cursor-pointer hover:bg-neutral-100"
              onClick={() => handleSelectLocation(item)}
              key={item.name}
            >
              <Image
                  src={item.image || "/default-image.png"} // Use default image if not available
                  alt={item.name}
                  layout="fill" // Ensures image fills the container
                  objectFit="cover" // Makes sure image maintains aspect ratio
                  className="rounded-md"
                  priority={true} // Optional: Load images eagerly for fast rendering
                />
              <div>
                <span className="block text-neutral-700 dark:text-neutral-200 font-medium">
                  {item.name}
                </span>
                <span className="block text-neutral-500 text-sm">
                  {item.location || "Unknown Location"} {/* Show location if available */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderSearchResults = () => {
    if (loading) {
      return <div className="px-4 py-4">Loading...</div>;
    }
    if (error) {
      return <div className="px-4 py-4 text-red-500">{error}</div>;
    }
    return (
      <>
        <p className="block font-semibold text-base">Locations</p>
        <div className="mt-3">
          {searchResults.map((item) => (
            <div
              className="py-2 mb-1 flex items-center space-x-3 text-sm cursor-pointer hover:bg-neutral-100"
              onClick={() => handleSelectLocation(item)}
              key={item.name}
            >
              <div className="relative h-10 w-10 rounded-md overflow-hidden">
                <Image
                  src={item.image || "/default-image.png"} // Use default image if not available
                  alt={item.name}
                  layout="fill" // Ensures image fills the container
                  objectFit="cover" // Makes sure image maintains aspect ratio
                  className="rounded-md"
                  priority={true} // Optional: Load images eagerly for fast rendering
                />
              </div>
              <div>
                <span
                  className="block text-neutral-700 dark:text-neutral-200 font-medium"
                  dangerouslySetInnerHTML={{ __html: item.name }}
                ></span>
                <span className="block text-neutral-500 text-sm">
                  {item.location || "Unknown Location"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className="block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold"
            placeholder="Search destinations"
            value={value}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
        <div className="mt-7">
          {value ? renderSearchResults() : renderRecentSearches()}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
