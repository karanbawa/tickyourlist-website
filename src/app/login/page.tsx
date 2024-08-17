import React, { FC } from "react";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Login from "@/components/auth/login";
import GoogleLoginComponent from "@/components/auth/googleLoginComponent";

export interface PageLoginProps {}

export const metadata: Metadata = {
  title: "Tickyourlist: Login to Your Account",
  description: "Login to your Tickyourlist account to explore things to do, attractions, tours, events, and experiences.",
  keywords: "Login, Tickyourlist, Things To Do, Attractions, Tours, Events, Experiences, Booking Online"
};

export const viewport = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

const PageLogin: FC<PageLoginProps> = ({}) => {
  const loginSocials = [
    {
      name: "Continue with Google",
      href: "#",
      icon: googleSvg,
      component: <GoogleLoginComponent />,
    },
  ];

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <div key={index} className="flex w-full justify-center">
                {/* <div key={index} className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"> */}
                {/* <Image className="flex-shrink-0" src={item.icon} alt={item.name} />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3> */}
                {item.component}
              </div>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <Login />

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href="/signup" className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
