'use client'

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from 'next/navigation';
import LocationInput from "@/app/(client-components)/(HeroSearchForm)/LocationInput";
import Header3 from "@/app/(client-components)/(Header)/Header3";

// Mock database remains the same as in the previous example
const mockDatabase = [
  {
    id: 2858,
    displayName: "Dubai Safari Park Tickets",
    cityName: "Dubai",
    cityCode: "DUBAI",
    countExperiences: 5,
    countryCode: "AE",
    countryName: "United Arab Emirates",
    imageUrl:
      "https://cdn-imgix.headout.com/media/images/828668498c0eea7e3a67155cf2c98918-dubai-safari-park-01.jpg",
    objectID: "2858",
    popularityScore: 653.12179834268,
    urlSlug: "/img-world-tickets/img-worlds-of-adventure-tickets-3/",
    description: "Experience wildlife up close at Dubai Safari Park",
    categories: ["Wildlife", "Family", "Nature"],
  },
  {
    id: 2857,
    displayName: "Dubai Garden Glow Tickets",
    cityName: "Dubai",
    cityCode: "DUBAI",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    countExperiences: 3,
    imageUrl:
      "https://cdn-imgix.headout.com/media/images/3c21fa0d864067854f89337c4f592e8c-Dubai%20Garden%20Glow%2001.jpg",
    objectID: "2857",
    popularityScore: 542.65432198765,
    urlSlug: "/dubai-garden-glow-tickets-c-2857/",
    description:
      "Immerse yourself in a world of light and color at Dubai Garden Glow",
    categories: ["Entertainment", "Family", "Night Activity"],
  },
  {
    id: 2856,
    displayName: "Burj Khalifa: At the Top Sky Tickets",
    cityName: "Dubai",
    cityCode: "DUBAI",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    countExperiences: 4,
    imageUrl:
      "https://cdn-imgix.headout.com/media/images/1a51a1d930983d0df8ca936da2a3d160-Burj%20Khalifa%20At%20the%20Top%20Sky%2001.jpg",
    objectID: "2856",
    popularityScore: 789.98765432101,
    urlSlug: "/burj-khalifa-at-the-top-sky-tickets-c-2856/",
    description:
      "Experience breathtaking views from the world's tallest building",
    categories: ["Sightseeing", "Landmark", "Observation Deck"],
  },
  {
    id: 2855,
    displayName: "Dubai Aquarium & Underwater Zoo Tickets",
    cityName: "Dubai",
    cityCode: "DUBAI",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    countExperiences: 2,
    imageUrl:
      "https://cdn-imgix.headout.com/media/images/c7b7f56b15c4c36a8b371526b926bd3f-Dubai%20Aquarium%20%26%20Underwater%20Zoo%2001.jpg",
    objectID: "2855",
    popularityScore: 456.78901234567,
    urlSlug: "/dubai-aquarium-underwater-zoo-tickets-c-2855/",
    description: "Discover marine life at one of the world's largest aquariums",
    categories: ["Aquarium", "Family", "Indoor Activity"],
  },
  {
    id: 2854,
    displayName: "Desert Safari Dubai",
    cityName: "Dubai",
    cityCode: "DUBAI",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    countExperiences: 6,
    imageUrl:
      "https://cdn-imgix.headout.com/media/images/9f3a8b95e47dadefd8bdb5ec9a8f0c1c-Desert%20Safari%20Dubai%2001.jpg",
    objectID: "2854",
    popularityScore: 678.90123456789,
    urlSlug: "/desert-safari-dubai-c-2854/",
    description:
      "Experience the thrill of dune bashing and traditional Bedouin hospitality",
    categories: ["Adventure", "Cultural", "Outdoor"],
  },
  {
    id: 3001,
    displayName: "Taj Mahal Tickets",
    cityName: "Agra",
    cityCode: "AGR",
    countryName: "India",
    countryCode: "IN",
    imageUrl: "https://cdn-imgix.headout.com/media/images/taj-mahal-01.jpg",
    description: "Visit one of the world's most beautiful monuments",
  },
  {
    id: 3002,
    displayName: "Red Fort Delhi Tickets",
    cityName: "Delhi",
    cityCode: "DEL",
    countryName: "India",
    countryCode: "IN",
    imageUrl: "https://cdn-imgix.headout.com/media/images/red-fort-01.jpg",
    description: "Explore the historic Red Fort in the heart of Delhi",
  },
  {
    id: 3003,
    displayName: "Gateway of India Tour",
    cityName: "Mumbai",
    cityCode: "BOM",
    countryCode: "IN",
    countryName: "India",
    imageUrl:
      "https://cdn-imgix.headout.com/media/images/gateway-of-india-01.jpg",
    description: "Discover the iconic Gateway of India in Mumbai",
  },
  {
    id: 3004,
    displayName: "Mysore Palace Tickets",
    cityName: "Mysore",
    cityCode: "MYS",
    countryCode: "IN",
    countryName: "India",
    imageUrl: "https://cdn-imgix.headout.com/media/images/mysore-palace-01.jpg",
    description: "Experience the grandeur of Mysore Palace",
  },
  {
    id: 3005,
    displayName: "Goa Beach Tour",
    cityName: "Goa",
    cityCode: "GOI",
    countryCode: "IN",
    countryName: "India",
    imageUrl: "https://cdn-imgix.headout.com/media/images/goa-beach-01.jpg",
    description: "Relax on the beautiful beaches of Goa",
  },
];

// Levenshtein distance function for typo tolerance
const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Improved search function with partial word matching and typo tolerance
const searchDatabase = (query, options = {}) => {
  const {
    hitsPerPage = 10,
    restrictSearchableAttributes = [
      "displayName",
      "description",
      "categories",
      "countryName",
      "cityName",
    ],
    typoTolerance = "min",
    preferenceOrder = [],
  } = options;

  console.log("Searching for:", query); // Debugging log

  const queryWords = query.toLowerCase().split(/\s+/);

  const results = mockDatabase
    .map((item) => {
      let score = 0;
      restrictSearchableAttributes.forEach((attr) => {
        if (Array.isArray(item[attr])) {
          item[attr].forEach((value) => {
            queryWords.forEach((queryWord) => {
              if (value.toLowerCase().includes(queryWord)) {
                score += 10;
              } else if (
                levenshteinDistance(queryWord, value.toLowerCase()) <=
                (typoTolerance === "min" ? 2 : 3)
              ) {
                score += 5;
              }
            });
          });
        } else if (typeof item[attr] === "string") {
          const words = item[attr].toLowerCase().split(/\s+/);
          queryWords.forEach((queryWord) => {
            words.forEach((word) => {
              if (word.startsWith(queryWord)) {
                // Increase score for city and country matches
                if (attr === "cityName" || attr === "countryName") {
                  score += 20;
                } else {
                  score += 10;
                }
              } else if (
                levenshteinDistance(queryWord, word) <=
                (typoTolerance === "min" ? 2 : 3)
              ) {
                // Increase score for close matches on city and country
                if (attr === "cityName" || attr === "countryName") {
                  score += 10;
                } else {
                  score += 5;
                }
              }
            });
          });
        }
      });

      // Boost score for exact matches on city or country
      if (item.cityName.toLowerCase() === query.toLowerCase()) {
        score += 50;
      }
      if (item.countryName.toLowerCase() === query.toLowerCase()) {
        score += 50;
      }

      return { ...item, score };
    })
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      const aIndex = preferenceOrder.indexOf(a.id);
      const bIndex = preferenceOrder.indexOf(b.id);
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      } else if (aIndex !== -1) {
        return -1;
      } else if (bIndex !== -1) {
        return 1;
      }
      return 0;
    })
    .slice(0, hitsPerPage);

  console.log("Search results:", results); // Debugging log
  return results;
};

const getLocationFromIP = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate random location
      const locations = [
        { city: "New York", country: "US" },
        { city: "London", country: "UK" },
        { city: "Tokyo", country: "JP" },
        { city: "Dubai", country: "UAE" },
        { city: "Paris", country: "FR" },
      ];
      resolve(locations[Math.floor(Math.random() * locations.length)]);
    }, 500);
  });
};

const getUserPreferences = () => {
  const preferences = localStorage.getItem("userPreferences");
  return preferences
    ? JSON.parse(preferences)
    : { categories: {}, locations: {} };
};

const updateUserPreferences = (item) => {
  const preferences = getUserPreferences();

  // Update category preference
  item?.categories?.forEach((category) => {
    preferences.categories[category] =
      (preferences.categories[category] || 0) + 1;
  });

  // Update location preference
  preferences.locations[item.cityName] =
    (preferences.locations[item.cityName] || 0) + 1;

  localStorage.setItem("userPreferences", JSON.stringify(preferences));
};

const getClickHistory = () => {
  const clickHistory = localStorage.getItem("clickHistory");
  return clickHistory ? JSON.parse(clickHistory) : [];
};

const updateClickHistory = (itemId) => {
  const clickHistory = getClickHistory();
  const updatedClickHistory = [
    itemId,
    ...clickHistory.filter((id) => id !== itemId),
  ].slice(0, 5);
  localStorage.setItem("clickHistory", JSON.stringify(updatedClickHistory));
};

const getRecentSearches = () => {
  const recentSearches = localStorage.getItem("recentSearches");
  return recentSearches ? JSON.parse(recentSearches) : [];
};

const updateRecentSearches = (searchTerm, item) => {
  const recentSearches = getRecentSearches();
  const existingSearch = recentSearches.find(
    (search) => search.term === searchTerm
  );

  if (!existingSearch) {
    const updatedRecentSearches = [
      { term: searchTerm, item },
      ...recentSearches,
    ].slice(0, 5);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );
  }
};

const AlgoliaLikeSearch = () => {
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userPreferences, setUserPreferences] = useState(getUserPreferences());
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce((term) => {
      performSearch(term);
    }, 300),
    []
  );

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocationFromIP();
        setUserLocation(location);
      } catch (error) {
        console.log("Location not available");
      }
    };

    fetchLocation();
    setUserPreferences(getUserPreferences());
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchFocused(false);
      setSearchTerm("");
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const performSearch = useCallback(
    (term, isInitialSearch = false) => {
      setIsLoading(true);
      setTimeout(() => {
        let results;
        if (isInitialSearch) {
          // Combine location-based, preference-based, click history, and popular results
          const locationResults = userLocation
            ? mockDatabase.filter(
                (item) => item.countryCode === userLocation.country
              )
            : [];

          const preferenceResults = mockDatabase.sort((a, b) => {
            const aScore = a?.categories?.reduce(
              (sum, cat) => sum + (userPreferences.categories[cat] || 0),
              0
            );
            const bScore = b?.categories?.reduce(
              (sum, cat) => sum + (userPreferences.categories[cat] || 0),
              0
            );
            return bScore - aScore;
          });

          const clickHistoryResults = getClickHistory()
            .map((itemId) => mockDatabase.find((item) => item.id === itemId))
            .filter(Boolean);

          const popularResults = mockDatabase.sort(
            (a, b) => b.popularityScore - a.popularityScore
          );

          results = [
            ...new Set([
              ...clickHistoryResults,
              ...locationResults,
              ...preferenceResults,
              ...popularResults,
            ]),
          ].slice(0, 5);
        } else {
          const preferenceOrder = Object.entries(userPreferences.categories)
            .sort((a, b) => b[1] - a[1])
            .map(
              ([category]) =>
                mockDatabase.find((item) => item.categories.includes(category))
                  ?.id
            )
            .filter(Boolean);

          results = searchDatabase(term, {
            hitsPerPage: 5,
            restrictSearchableAttributes: [
              "displayName",
              "description",
              "cityName",
              "countryName",
            ],
            typoTolerance: "min",
            preferenceOrder,
          });

          if (term && results.length > 0) {
            updateRecentSearches(term, results[0]);
            setRecentSearches(getRecentSearches());
          }
        }
        setSearchResults(results);
        setIsLoading(false);
      }, 300);
    },
    [userLocation, userPreferences]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setRecentSearches(getRecentSearches().filter(({ item }) => item));
    }
  }, [searchTerm, debouncedSearch]);

  // useEffect(() => {
  //   if (searchTerm) {
  //     performSearch(searchTerm);
  //   } else {
  //     setRecentSearches(getRecentSearches().filter(({ item }) => item));
  //   }
  // }, [searchTerm, performSearch]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm(item.displayName);
    setIsSearchFocused(false);
    updateUserPreferences(item);
    updateClickHistory(item.id); // Update click history
    setUserPreferences(getUserPreferences());
    router.push(item.urlSlug);
  };

  // const handleSearchClear = () => {
  //   setSearchTerm("");
  //   setSearchResults([]);
  //   setRecentSearches(getRecentSearches().filter(({ item }) => item));
  // };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (!searchTerm) {
      performSearch("", true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4" ref={searchRef}>
        {/* <Header3 /> */}
      <div className="relative bg-white rounded-full shadow-lg overflow-hidden">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          {!isSearchFocused && !searchTerm && "Search for"}
        </div>
        <input
          type="text"
          className="w-full pl-24 pr-12 py-3 bg-transparent focus:outline-none"
          placeholder={
            isSearchFocused || searchTerm ? "" : "Search for attractions, tours, etc."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
        <Search
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {(isSearchFocused || searchTerm) && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-4 absolute z-30">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            {searchTerm
              ? "Search Results"
              : recentSearches.length > 0
              ? "Recent Searches"
              : "Recommended for You"}
          </h3>
          {/* {isLoading && <p>Loading...</p>} */}
          {!isLoading &&
            searchResults.length === 0 &&
            !searchTerm &&
            recentSearches.length > 0 && (
              <div>
                {recentSearches.map(({ term, item }) => (
                  <div
                    key={term}
                    className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => handleSelectItem(term)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.displayName}
                      className="w-10 h-10 object-cover rounded-lg mr-3"
                    />
                    <div>
                      <p className="font-semibold text-sm">{term}</p>
                      <p className="text-xs text-gray-600">
                        {item.cityName}, {item.countryName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          {!isLoading &&
            searchResults.length === 0 &&
            !searchTerm &&
            recentSearches.length === 0 && (
              <p className="text-sm text-gray-600">No recent searches</p>
            )}
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleSelectItem(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.displayName}
                className="w-10 h-10 object-cover rounded-lg mr-3"
              />
              <div>
                <p className="font-semibold text-sm">{item.displayName}</p>
                <p className="text-xs text-gray-600">
                  {item.cityName}, {item.countryName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            Selected Item:
          </h3>
          <p className="text-sm text-blue-700">{selectedItem.displayName}</p>
          <p className="text-xs text-blue-600">{selectedItem.description}</p>
        </div>
      )}
    </div>
  );
};

export default AlgoliaLikeSearch;
