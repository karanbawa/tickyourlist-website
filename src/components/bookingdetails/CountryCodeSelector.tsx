import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import Input from '@/shared/Input';

const countries = [
  { name: 'India', nativeName: 'भारत', code: '+91', flag: '🇮🇳' },
  { name: 'United Arab Emirates', nativeName: 'الإمارات العربية المتحدة', code: '+971', flag: '🇦🇪' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Afghanistan', nativeName: 'افغانستان', code: '+93', flag: '🇦🇫' },
  { name: 'Åland Islands', code: '+358', flag: '🇦🇽' },
  { name: 'Albania', nativeName: 'Shqipëri', code: '+355', flag: '🇦🇱' },
  { name: 'Algeria', nativeName: 'الجزائر', code: '+213', flag: '🇩🇿' },
  { name: 'American Samoa', code: '+1684', flag: '🇦🇸' },
];

const CountryCodeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
      )
    );
  }, [searchQuery]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex rounded-2xl overflow-hidden">
        <div 
          className="flex items-center px-4 cursor-pointer bg-gray-100 border-r border-neutral-200"
          onClick={handleOpen}
        >
          <span className="mr-2">{selectedCountry.flag}</span>
          <span className="mr-2">{selectedCountry.code}</span>
          <ChevronDown size={20} />
        </div>
        <Input 
          type="tel"
        //   value={phoneNumber}
        //   onChange={handlePhoneChange}
          placeholder="Phone number"
          className="flex-grow rounded-l-none !border-l-0"
          rounded="rounded-r-2xl"
        />
        {/* {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>} */}
      </div>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={handleClose}
          ></div>

          <div
            className="fixed inset-x-0 bottom-0 bg-white z-50 transition-all duration-300 ease-out"
            style={{ 
              height: '80vh',
              borderTopLeftRadius: '16px', 
              borderTopRightRadius: '16px',
              boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(0)',
              animation: 'slideUp 300ms ease-out'
            }}
          >
            <div className="flex flex-col h-full">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Search country code</h3>
                  <X 
                    className="cursor-pointer" 
                    size={24} 
                    onClick={handleClose} 
                  />
                </div>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Type country name or country code"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-primary-200 focus:border-primary-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-grow overflow-y-auto px-4 pb-4">
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedCountry(country);
                      handleClose();
                    }}
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span className="flex-grow">
                      {country.name} {country.nativeName && `(${country.nativeName})`}
                    </span>
                    <span className="text-gray-500">{country.code}</span>
                    {country.code === selectedCountry.code && (
                      <span className="ml-2 text-green-500">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CountryCodeSelector;