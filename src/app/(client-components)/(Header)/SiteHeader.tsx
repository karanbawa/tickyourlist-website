"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { PathName } from "@/routers/types";
import Header from "./Header";
import Header3 from "./Header3";
import { useParams, usePathname } from "next/navigation";
import { useThemeMode } from "@/utils/useThemeMode";

export type SiteHeaders = "Header 1" | "Header 2" | "Header 3";

interface HomePageItem {
  name: string;
  slug: PathName;
}

interface SiteHeaderProps {
  initialCollectionData: any;
  initialCityCode: string;
  initialCategoriesData: any;
  currencyCode: string;
}

let OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
let OBSERVER: IntersectionObserver | null = null;
const PAGES_HIDE_HEADER_BORDER: PathName[] = [
  "/home-3",
  "/listing-car-detail",
  "/listing-experiences-detail",
  "/listing-stay-detail",
];

const CACHE_EXPIRY = 60 * 60 * 1000;

const getCollectionData = async (cityCode: string) => {
  const timestamp = Date.now();
  const res = await fetch(`/api/collection-data?cityCode=${cityCode}&_t=${timestamp}`);
  if (!res.ok) {
    throw new Error('Failed to fetch collection data');
  }
  return res.json();
};

const getCategoriesData = async (cityCode: string) => {
  const timestamp = Date.now();
  const res = await fetch(`/api/category-data?cityCode=${cityCode}&_t=${timestamp}`);
  if (!res.ok) {
    throw new Error('Failed to fetch category data');
  }
  return res.json();
};

const getCachedData = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    const { value, expiry } = JSON.parse(item);
    if (expiry > Date.now()) {
      return value;
    }
    localStorage.removeItem(key);
  }
  return null;
};

const setCachedData = (key: string, value: any) => {
  const item = {
    value: value,
    expiry: Date.now() + CACHE_EXPIRY
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const SiteHeader : React.FC<SiteHeaderProps> = ({ initialCollectionData, initialCityCode, initialCategoriesData, currencyCode }) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [collectionData, setCollectionData] = useState(initialCollectionData);
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);

  useEffect(() => {
    const cityMatch = pathname.match(/\/things-to-do-in-(.+)/);
    if (cityMatch) {
      const cityCode = cityMatch[1].toUpperCase();
      const cacheKey = `collection-data-things-to-do-in-${cityCode}`;
      const categoriesCacheKey = `categories-data-things-to-do-in-${cityCode}`;

      if (cityCode !== initialCityCode) {
        // Check localStorage first
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
          setCollectionData(cachedData);
        } else {
          getCollectionData(cityCode)
            .then(data => {
              setCollectionData(data.data?.collections);
              setCachedData(cacheKey, data.data?.collections);
            })
            .catch(error => {
              console.error('Error fetching collection data:', error);
              setCollectionData(null);
            });
        }

        // Fetch categories data
        const cachedCategoriesData = getCachedData(categoriesCacheKey);
        if (cachedCategoriesData) {
          setCategoriesData(cachedCategoriesData);
        } else {
          getCategoriesData(cityCode)
            .then(data => {
              setCategoriesData(data);
              setCachedData(categoriesCacheKey, data);
            })
            .catch(error => {
              console.error('Error fetching categories data:', error);
              setCategoriesData(null);
            });
        }
      }
    } else {
      setCollectionData(null);
      setCategoriesData(null);

    }
  }, [pathname, initialCityCode]);

  let [headers] = useState<SiteHeaders[]>(["Header 1", "Header 2", "Header 3"]);

  let [homePages] = useState<HomePageItem[]>([
    { name: "Home Main", slug: "/" },
    { name: "Real Estate", slug: "/home-2" },
    { name: "Home 3", slug: "/home-3" },
  ]);
  const [headerSelected, setHeaderSelected] = useState<SiteHeaders>("Header 3");

  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    setIsTopOfPage(window.pageYOffset < 5);
  }, []);
  //
  useThemeMode();

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting);
    });
  };

  useEffect(() => {
    // disconnect the observer
    // observer for show the LINE bellow header
    if (!PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      OBSERVER && OBSERVER.disconnect();
      OBSERVER = null;
      return;
    }
    if (!OBSERVER) {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
      anchorRef.current && OBSERVER.observe(anchorRef.current);
    }
  }, [pathname]);

  const renderHeader = () => {
    let headerClassName = "shadow-sm dark:border-b dark:border-neutral-700";
    if (PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      headerClassName = isTopOfPage
        ? ""
        : "shadow-sm dark:border-b dark:border-neutral-700";
    }
    switch (headerSelected) {
      case "Header 1":
        return <Header className={headerClassName} navType="MainNav1" />;
      case "Header 2":
        return <Header className={headerClassName} navType="MainNav2" />;
      case "Header 3":
        return <Header3 className={headerClassName} collectionData={collectionData} initialCityCode={initialCityCode} categoriesData={categoriesData} currencyCode={currencyCode} />;

      default:
        return <Header3 className={headerClassName} collectionData={collectionData} initialCityCode={initialCityCode} categoriesData={categoriesData} currencyCode={currencyCode} />;
    }
  };

  return (
    <>
      {/* {renderControlSelections()} */}
      {renderHeader()}
      <div ref={anchorRef} className="h-1 absolute invisible"></div>
    </>
  );
};

export default SiteHeader;
