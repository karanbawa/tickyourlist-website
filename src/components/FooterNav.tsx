"use client";

import {
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { PathName } from "@/routers/types";
import MenuBar from "@/shared/MenuBar";
import isInViewport from "@/utils/isInViewport";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Popover } from "@headlessui/react";
import Avatar from "@/shared/Avatar";


let WIN_PREV_POSITION = 0;

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
  component?: React.ReactNode;
}

const NAV: NavItem[] = [
  {
    name: "Explore",
    link: "/",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Wishlists",
    link: "/account-wishlist",
    icon: HeartIcon,
  },
  {
    name: "Log in",
    link: "/account",
    icon: UserCircleIcon,
  },
  {
    name: "Menu",
    icon: MenuBar,
  },
];

const FooterNav: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  console.log("usertest ", user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = () => {
    window.requestAnimationFrame(showHideHeaderMenu);
  };

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }
      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  const handleAccountPage = () => {
    router.push('/account');
  }

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link;

     // Conditionally render avatar if the user is logged in
     if (item.name === "Log in" && user) {
      return (
        <>
        <div onClick={handleAccountPage} className="cursor-pointer">
        <Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" imgUrl={user?.imageUrl ?? ''} userName={user?.data?.data?.data?.customer?.firstName} />
        <div className={`text-[11px] leading-none mt-1 ${isActive ? "text-red-600" : ""}`}>
          Account
        </div>
        </div> 
        </>
      );
    }

    return item.link ? (
      <Link
        key={index}
        href={item.link}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : ""
        }`}
        aria-label={item.name}
      >
        <item.icon className={`w-6 h-6 ${isActive ? "text-red-600" : ""}`} />
        <span className={`text-[11px] leading-none mt-1 ${isActive ? "text-red-600" : ""}`}>
          {item.name}
        </span>
      </Link>
    ) : (
      <div
        key={index}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : ""
        }`}
        aria-label={item.name}
      >
        <item.icon className="w-6 h-6" />
        <span className="text-[11px] leading-none mt-1">{item.name}</span>
      </div>
    );
  };

  return (
    <nav
      ref={containerRef}
      className="FooterNav block md:hidden p-2 bg-white dark:bg-neutral-800 fixed bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
      role="navigation"
      aria-label="Footer navigation" 
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center">
        {NAV.map(renderItem)}
      </div>
    </nav>
  );
};

export default FooterNav;
