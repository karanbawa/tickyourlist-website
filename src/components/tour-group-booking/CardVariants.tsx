import React, { FC } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface CardVariantProps {
  className?: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  features: string[];
  index?: number;
  onVariantSelect: (index: number | undefined) => void; // Callback to pass selected variant to parent
  isSelected: boolean; // Prop to determine if the card is selected
}

const CardVariant: FC<CardVariantProps> = ({
  className = "",
  title,
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
      style={{ width: "18rem" }}
      className={`nc-CardVariant relative flex flex-col items-center justify-center text-center px-4 py-6 sm:px-8 sm:py-10 border border-neutral-200 dark:border-neutral-700 rounded-2xl ${className}`}
    >
      <div className="text-left w-full h-full">
        <h2 className="text-lg font-semibold mb-2 h-[3.4rem]">{title}</h2>
        <span className="line-through ml-2 text-neutral-500 dark:text-neutral-400">
          ₹{originalPrice.toLocaleString("en-IN")}
        </span>
        <div className="flex items-baseline">
          <span className="text-xl font-normal">
            ₹{discountedPrice.toLocaleString("en-IN")}
          </span>
          <Badge className="ml-3" color="green" name={discount} />
        </div>
        <div className="mt-6">
          <ButtonPrimary
            className="w-full"
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
        <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardVariant;
