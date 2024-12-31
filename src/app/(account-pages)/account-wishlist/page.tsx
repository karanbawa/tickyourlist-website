"use client";

import { Tab } from "@headlessui/react";
import CarCard from "@/components/CarCard";
import ExperiencesCard from "@/components/ExperiencesCard";
import StayCard from "@/components/StayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "@/data/listings";
import React, { Fragment, useEffect, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ProtectedRoute from "@/components/ProtectedRoute";
import StayCard2 from "@/components/tourrgroupsectionpage/StayCard2";
import { useAuth } from "@/context/AuthContext";

const AccountSavelists = () => {
  let [categories] = useState(["Experiences"]);
  const { user } = useAuth();
  const [tourGroups, setTourGroups] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user?.data?.data?.data?.tokens?.accessToken) {
        try {
          const response = await fetch('/api/userwishlist', {
            headers: {
              'Authorization': `Bearer ${user.data.data.data.tokens.accessToken}`
            }
          });
          const data = await response.json();
          if (data.tourGroup) {
            setTourGroups(data.tourGroup);
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const renderSection1 = () => {
    return (
      <ProtectedRoute>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Save lists</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {tourGroups?.filter((_, i) => i < 8).map(
                    (tourgroup: any) => (
                      // <></>
                      <StayCard2 key={tourgroup._id} data={tourgroup} isLiked={true} className="min-w-[300px] max-w-[300px] flex-shrink-0" onLikeChange={(newStatus) => {
                        if (!newStatus) {
                          setTourGroups(prev => prev.filter((data: any) => data?._id !== tourgroup._id));
                        }
                      }} />
                    )
                  )}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      </ProtectedRoute>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
