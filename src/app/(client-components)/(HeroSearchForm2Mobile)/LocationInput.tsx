"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

const RECENT_SEARCHES_KEY = "recentSearchesMobile";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setValue(inputValue);
    if (inputValue) {
      fetchSearchResults(inputValue);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (item: any) => {
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (item.urlSlug) {
      router.prefetch(item.urlSlug);
      router.push(item.urlSlug);
    }

    onChange && onChange(item.name);
    onClick();

    saveToRecentSearches(item);
    setSearchResults([]);
  };

  const saveToRecentSearches = (location: any) => {
    let updatedRecentSearches = [...recentSearches];

    if (!updatedRecentSearches.some((search) => search.name === location.name)) {
      updatedRecentSearches = [location, ...updatedRecentSearches.slice(0, 4)];
    }

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecentSearches));
  };

  const renderLocationItem = (item: any) => (
    <div
      className="py-2 mb-1 flex items-center space-x-3 text-sm cursor-pointer hover:bg-neutral-100"
      onClick={() => handleSelectLocation(item)}
      key={item.name}
    >
      <div className="flex-shrink-0">
        <Image
          src={item.image || "/default-image.png"}
          alt={item.name}
          width={48}
          height={48}
          className="rounded-md object-cover"
          quality={80}
          onError={(e) => {
            e.currentTarget.src = "/default-image.png";
          }}
        />
      </div>
      <div className="flex-grow min-w-0">
        <span className="block text-neutral-700 dark:text-neutral-200 font-medium truncate" dangerouslySetInnerHTML={{ __html: item.name }}>
        </span>
        <span className="block text-neutral-500 text-sm truncate">
          {item.location || "Unknown Location"}
        </span>
      </div>
    </div>
  );

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
        <p className="block font-semibold text-base mb-3">Recent searches</p>
        <div className="space-y-2">
          {recentSearches.map(renderLocationItem)}
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
        <p className="block font-semibold text-base mb-3">Locations</p>
        <div className="space-y-2">
          {searchResults.map(renderLocationItem)}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl mb-5">
          {headingText}
        </span>
        <div className="relative">
          <input
            className="block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold"
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