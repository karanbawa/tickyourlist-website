"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Logo from "@/shared/Logo";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import MenuBar from "@/shared/MenuBar";
import { SearchTab } from "../(HeroSearchForm)/HeroSearchForm";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeroSearchFormSmall from "../(HeroSearchFormSmall)/HeroSearchFormSmall";
import { StaySearchFormFields } from "../type";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LangDropdown from "./LangDropdown";

interface Header3Props {
  className?: string;
}

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const [showHeroSearch, setShowHeroSearch] = useState<StaySearchFormFields | null>(null);
  const [currentTab, setCurrentTab] = useState<SearchTab>("Stays");

  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null);
    setCurrentTab("Stays");
  });

  const pathname = usePathname();

  useEffect(() => {
    setShowHeroSearch(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(handleHideSearchForm);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHideSearchForm = () => {
    if (!document.querySelector("#nc-Header-3-anchor")) {
      return;
    }
    const currentScrollPos = window.pageYOffset;
    if (Math.abs(WIN_PREV_POSITION - currentScrollPos) > 100) {
      setShowHeroSearch(null);
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderHeroSearch = () => (
    <div
      className={`absolute inset-x-0 top-0 transition-all will-change-[transform,opacity] ${showHeroSearch ? "visible" : "-translate-y-[90px] scale-50 opacity-0 invisible pointer-events-none"}`}
      aria-label="Hero Search Form"
    >
      <div className="w-full max-w-4xl mx-auto pb-6">
        <HeroSearchFormSmall
          defaultFieldFocus={showHeroSearch || undefined}
          onTabChange={setCurrentTab}
          defaultTab={currentTab}
        />
      </div>
    </div>
  );

  const renderButtonOpenHeroSearch = () => (
    <div
      className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-600 rounded-full shadow hover:shadow-md transition-all ${showHeroSearch ? "translate-y-20 scale-[2.55] opacity-0 pointer-events-none invisible" : "visible"}`}
    >
      <div className="flex items-center font-medium text-sm">
        <span onClick={() => setShowHeroSearch("location")} className="block pl-5 pr-4 cursor-pointer py-3" aria-label="Search Location">
          Location
        </span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span onClick={() => setShowHeroSearch("dates")} className="block px-4 cursor-pointer py-3" aria-label="Search Check In Dates">
          Check In
        </span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span onClick={() => setShowHeroSearch("guests")} className="block px-4 cursor-pointer font-normal py-3" aria-label="Add Guests">
          Add guests
        </span>
      </div>
      <div className="flex-shrink-0 ml-auto pr-2 cursor-pointer" onClick={() => setShowHeroSearch("location")} aria-label="Open Search">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#7c25e9] text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] ${showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"}`} aria-hidden={!showHeroSearch}></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 ${className}`}>
        <div
          className={`bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity] ${showHeroSearch ? "duration-75" : ""} ${showHeroSearch ? currentTab === "Cars" || currentTab === "Flights" ? "scale-y-[4.4]" : "scale-y-[3.4]" : ""}`}
        ></div>
        <div className="relative px-4 lg:container h-[88px] flex">
          <div className="flex-1 flex justify-between">
            {/* Logo (lg+) */}
            <div className="relative z-10 hidden md:flex flex-1 items-center">
              <Logo />
            </div>

            <div className="flex flex-[2] lg:flex-none mx-auto">
              <div className="flex-1 hidden lg:flex self-center">
                {renderButtonOpenHeroSearch()}
              </div>
              <div className="self-center flex-1 lg:hidden w-full max-w-lg mx-auto">
                <HeroSearchForm2MobileFactory />
              </div>
              {renderHeroSearch()}
            </div>

            {/* NAV */}
            <div className="hidden md:flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
              <div className="hidden lg:flex space-x-1">
                <LangDropdown />
                <div className="flex space-x-1">
                  <Link
                    href="/add-listing/1"
                    className="self-center hidden xl:inline-flex px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    aria-label="List your property"
                  >
                    List your property
                  </Link>

                  <NotifyDropdown />
                  <AvatarDropdown />
                  <MenuBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
