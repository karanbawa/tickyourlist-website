import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";

export interface StartRatingProps {
  className?: string;
  point?: number;
  reviewCount?: number;
}

const StartRating: FC<StartRatingProps> = ({
  className = "",
  point = 4.5,
  reviewCount = 112,
}) => {

  const formatReviewCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'm';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    } else {
      return count.toString();
    }
  };

  const formattedCount = formatReviewCount(reviewCount);

  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <div className="pb-[2px]">
        <StarIcon className="w-[18px] h-[18px] text-orange-500" />
      </div>
      <span className="font-medium ">{point}</span>
      <span className="text-neutral-500 dark:text-neutral-400">
      ({formattedCount})
      </span>
    </div>
  );
};

export default StartRating;
