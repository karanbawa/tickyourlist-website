import React, { useState, useEffect, useRef, FC } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { countries } from '@/shared/countries';

interface CountryCodeSelectorProps {
  phoneError?: string;
  setPhoneError?: (error: string) => void;
  phoneNumber?: string;
  phoneCode?: string;
  setPhoneNumber?: (number: string) => void;
  setPhoneCode?: (code: string) => void;
}

const CountryCodeSelector: FC<CountryCodeSelectorProps> = ({
  phoneError,
  setPhoneError,
  phoneNumber,
  phoneCode,
  setPhoneNumber,
  setPhoneCode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isWebView, setIsWebView] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const validateCountryCode = (code: string) => {
    return countries.some(country => country.code === code);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWebView(window.innerWidth >= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
      )
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Set default country based on location cookie
    const allCookies = document.cookie.split("; ");
    const countryCookie = allCookies.find((cookie) => cookie.startsWith("country="));
    if (countryCookie) {
      const countryCode = countryCookie.split("=")[1];
      const defaultCountry = countries.find(country => country.countryCode === countryCode);
      if (defaultCountry && validateCountryCode(defaultCountry.code)) {
        setSelectedCountry(defaultCountry);
        if (setPhoneCode) {
          setPhoneCode(defaultCountry.code);
        }
      }
    }
  }, [setPhoneCode]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleCountrySelect = (country: typeof countries[0]) => {
    if (validateCountryCode(country.code)) {
      setSelectedCountry(country);
      if (setPhoneCode) {
        setPhoneCode(country.code);
      }
      handleClose();
    } else {
      console.error(`Invalid country code: ${country.code}`);
      // Optionally, you could set an error state here to display to the user
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    
    if (setPhoneNumber) {
      setPhoneNumber(numericValue);
    }
    if (setPhoneError) {
      setPhoneError('');
    }
  };

  const handlePhoneNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode >= 35 && e.keyCode <= 40)) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  const renderCountryList = () => (
    <div className="overflow-y-auto max-h-[50vh]">
      {filteredCountries.map((country) => (
        <div
          key={country.code}
          className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-100"
          onClick={() => handleCountrySelect(country)}
        >
          <span className="mr-2">{country.flag}</span>
          <span className="flex-grow truncate">
            {country.name} {country.nativeName && `(${country.nativeName})`}
          </span>
          <span className="text-gray-500 ml-2">{country.code}</span>
          {country.code === selectedCountry.code && (
            <span className="ml-2 text-green-500">✓</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex rounded-2xl overflow-hidden">
        <div 
          className="flex items-center px-4 cursor-pointer bg-gray-100 border-r border-neutral-200"
          onClick={handleOpen}
        >
          <span className="mr-2">{selectedCountry.flag}</span>
          <span className="mr-2">{selectedCountry.code}</span>
          <ChevronDown size={20} />
        </div>
        <input 
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onKeyDown={handlePhoneNumberKeyDown}
          placeholder="Phone number"
          // className="flex-grow rounded-l-none !border-l-0 text-base sm:text-lg"
          className="w-full p-[0.9rem] md:p-3 rounded-r-2xl block border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
          // rounded="rounded-r-2xl"
        />
      </div>
      {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
      
      {isOpen && (
         <>
         {isWebView ? (
           <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
             <div className="sticky top-0 z-10 bg-white px-2 py-2">
               <div className="relative">
                 {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> */}
                 <input
                   type="text"
                   placeholder="Search countries"
                   className="w-full p-[0.9rem] md:p-3 rounded-r-2xl block border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
             </div>
             {renderCountryList()}
           </div>
         ) : (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={handleClose}
          ></div>
          <div
            className="fixed inset-x-0 bottom-0 bg-white z-50 transition-all duration-300 ease-out"
            style={{ 
              height: '65vh',
              borderTopLeftRadius: '16px', 
              borderTopRightRadius: '16px',
              boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(0)',
              animation: 'slideUp 300ms ease-out'
            }}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-semibold">Select Country</h3>
                  <X 
                    className="cursor-pointer" 
                    size={24} 
                    onClick={handleClose} 
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search country or code"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-primary-200 focus:border-primary-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {renderCountryList()}
            </div>
          </div>
          </>
         )}
        </>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CountryCodeSelector;