"use client";

import { Popover, Tab, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FC, Fragment, useState, useEffect } from "react";
import { headerCurrency } from "./CurrencyDropdown";

interface LanguageItem {
  id: string;
  name: string;
  description: string;
  href: string;
  active?: boolean;
}

export const headerLanguage: LanguageItem[] = [
  {
    id: "English",
    name: "English",
    description: "United States",
    href: "##",
    active: true,
  }
  // {
  //   id: "Vietnamese",
  //   name: "Vietnamese",
  //   description: "Vietnam",
  //   href: "##",
  // },
  // {
  //   id: "Francais-Belgique",
  //   name: "Francais",
  //   description: "Belgique",
  //   href: "##",
  // },
  // {
  //   id: "Francais-Canada",
  //   name: "Francais",
  //   description: "Canada",
  //   href: "##",
  // },
];

interface LangDropdownProps {
  panelClassName?: string;
  className?: string;
  currencyCode?: string;
  cityCode?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = "top-full right-0 max-w-sm w-96",
  className = "hidden md:flex",
  currencyCode
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyCode);


  useEffect(() => {
    // Access cookies in the client using document.cookie
    const allCookies = document.cookie.split("; ");
    
    // Find the cookie that starts with 'currency='
    const currencyCookie = allCookies.find((cookie) => cookie.startsWith("currency="));
    
    // Log the currency cookie if found
    if (currencyCookie) {
      // Set the selected currency from the cookie value
      const cookieValue = currencyCookie.split("=")[1];
      setSelectedCurrency(cookieValue);
    } else {
    }
  }, []);
  
  // Handle currency change and set the cookie
  const handleCurrencyChange = (currencyId: string) => {
    setSelectedCurrency(currencyId);
    document.cookie = `currency=${currencyId}; path=/; max-age=3600`; // Set cookie with 1 hour expiry
    window.location.reload();
  };

   // Effect to watch for changes in the currency cookie and update state accordingly
   useEffect(() => {
    const checkCurrencyCookie = () => {
      const allCookies = document.cookie.split("; ");
      const currencyCookie = allCookies.find((cookie) =>
        cookie.startsWith("currency=")
      );
      if (currencyCookie) {
        const cookieValue = currencyCookie.split("=")[1];
        if (cookieValue !== selectedCurrency) {
          setSelectedCurrency(cookieValue); // Update the state if cookie changes
        }
      }
    };

    // Check for cookie changes initially and every time the component renders
    checkCurrencyCookie();

    // Optional: Set up an interval to keep checking for cookie changes
    const intervalId = setInterval(checkCurrencyCookie, 1000); // Check every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [selectedCurrency]); // Rerun the effect whenever selectedCurrency changes

  // useEffect(() => {
  //   const initializeCurrency = async () => {
  //     const storedCurrency = localStorage.getItem('selectedCurrency');
  //     if (storedCurrency) {
  //       setSelectedCurrency(storedCurrency);
  //     } else {
  //       setSelectedCurrency(currencyCode);
  //       localStorage.setItem('selectedCurrency', currencyCode);
  //     }
  //   };

  //   initializeCurrency();
  // }, [currencyCode]);

  const renderLang = (close: () => void) => {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        {headerLanguage.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => close()}
            className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
              item.active ? "bg-gray-100 dark:bg-gray-700" : "opacity-80"
            }`}
          >
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    );
  };

  const renderCurr = (close: () => void) => {
    return (
      <div className="grid gap-7 lg:grid-cols-2">
        {headerCurrency.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              handleCurrencyChange(item.id);
              close();
            }}
            className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
              item.id === selectedCurrency ? "bg-gray-100 dark:bg-gray-700" : "opacity-80"
            }`}
            aria-current={item.id === selectedCurrency ? "page" : undefined}
          >
            <item.icon className="w-[18px] h-[18px]" />
            <p className="ml-2 text-sm font-medium">{item.name}</p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <Popover className={`LangDropdown relative ${className}`}>
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
              ${open ? "" : "text-opacity-80"}
              group self-center h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200 font-medium hover:text-opacity-100 focus:outline-none`}
            aria-label="Select language or currency"
          >
            
            <div>{'EN'}</div>
            <span className="mx-1">/</span>
            <div>{selectedCurrency}</div>
            <ChevronDownIcon
              className={`${open ? "-rotate-180" : "text-opacity-70"}
                ml-1 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className={`absolute z-20 ${panelClassName}`}>
              <div className="p-3 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-full bg-gray-100 dark:bg-slate-700 p-1">
                    {["Language", "Currency"].map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-full py-2 text-sm font-medium leading-5 text-gray-700",
                            "focus:outline-none focus:ring-0",
                            selected
                              ? "bg-white shadow"
                              : "text-gray-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-900/40"
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-5">
                  <Tab.Panel
                      className={classNames(
                        "rounded-xl p-3",
                        "focus:outline-none focus:ring-0"
                      )}
                    >
                      {renderLang(close)}
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panel
                      className={classNames(
                        "rounded-xl p-3",
                        "focus:outline-none focus:ring-0"
                      )}
                    >
                      {renderCurr(close)}
                    </Tab.Panel>
                </Tab.Group>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default LangDropdown;