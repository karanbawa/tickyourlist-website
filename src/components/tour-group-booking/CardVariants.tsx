import React, { FC } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface CardVariantProps {
  className?: string;
  title: string;
  currencyCode?: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  features: string[];
  index?: number;
  onVariantSelect: (index: number | undefined) => void;
  isSelected: boolean;
}

const CardVariant: FC<CardVariantProps> = ({
  className = "",
  title,
  currencyCode,
  originalPrice,
  discountedPrice,
  discount,
  features,
  index,
  onVariantSelect,
  isSelected,
}) => {
  const handleSelect = () => {
    onVariantSelect(index);
  };

  return (
    <div
      className={`nc-CardVariant relative flex flex-col w-full min-w-[13rem] max-w-[30rem] px-4 py-6 sm:px-8 sm:py-10 border border-neutral-200 dark:border-neutral-700 rounded-2xl ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="title-container mb-2">
          <h2 className="text-sm md:text-lg font-semibold h-[3rem] md:h-[5rem]">{title}</h2>
        </div>
        <div className="mb-4">
          <span className="line-through text-xs md:text-cs text-neutral-500 dark:text-neutral-400">
            {currencyCode} {originalPrice?.toLocaleString("en-IN")}
          </span>
          <div className="flex items-baseline">
            <span className="text-xs md:text-lg font-normal">
              {currencyCode} {discountedPrice?.toLocaleString("en-IN")}
            </span>
            <Badge className="ml-3 text-xs md:text-md" color="green" name={discount} />
          </div>
        </div>
        <div>
          <ButtonPrimary
            className="w-full mb-6"
            style={{ backgroundColor: "#7C25E9" }}
            onClick={handleSelect}
          >
            {isSelected ? (
              <>
                <CheckIcon className="w-5 h-5 inline-block mr-2" />
                Selected
              </>
            ) : (
              "Select"
            )}
          </ButtonPrimary>
        </div>
        <div className="flex-grow overflow-auto mb-6">
          <ul className="space-y-2 text-xs text-left text-neutral-600 dark:text-neutral-400">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardVariant;