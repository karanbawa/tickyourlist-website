"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";
import Link from "next/link";
import { Route } from "next";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Get Help 24/7",
    menus: [
      { href: "#", label: "Help Center" },
      { href: "#", label: "Chat with Us" },
      { href: "#", label: "Call +91 ..." },
      { href: "#", label: "support@tickyourlist.com" },
    ],
  },
  {
    id: "1",
    title: "Top Places",
    menus: [
      { href: "#", label: "Dubai" },
      { href: "#", label: "Abu Dhabi" },
      { href: "#", label: "Singapore" },
      { href: "#", label: "Thailand" },
      { href: "#", label: "Riyad" },
      { href: "#", label: "Maldives" },
      { href: "#", label: "Bali" },
      { href: "#", label: "India" },
      { href: "#", label: "+ 148 more" },
    ],
  },
  {
    id: "2",
    title: "Tickyoulist",
    menus: [
      { href: "/about", label: "Our Story" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Newsroom" },
      { href: "#", label: "Company blog" },
      { href: "#", label: "Travel Blog" },
    ],
  },
  {
    id: "4",
    title: "We Accept",
    menus: [
      { href: "#", label: "Visa" },
      { href: "#", label: "Master Card" },
      { href: "#", label: "Amex" },
      { href: "#", label: "Google Pay" },
      { href: "#", label: "Apply Pay" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
      <footer className="container d-flex flex-row justify-between mb-4">
        <div className="flex flex-row space-x-2 text-xs">
          <div><span className="font-bold">
          <Link
              href={"" as Route<string>}
              >© Tickyourlist Inc</Link></span>, 203-68, Bena Complex C, Oud Metha, Dubai-UAE</div>
          <div className="font-bold">.</div>
          <div>
          <Link
              href={"/privacypolicy" as Route<string>}
              >
             Privacy Policy
            </Link>
            </div>
            <div className="font-bold">.</div>
            <div>
          <Link
              href={"/cancellationpolicy" as Route<string>}
              >
             Cancellation & Refund Policy
            </Link>
            </div>
          
        </div>
        <div></div>
      </footer>
    </>
  );
};

export default Footer;
