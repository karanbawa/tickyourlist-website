import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: "Twitter", icon: "lab la-twitter", href: "https://x.com/tick_your_list?s=11" },
  { name: "YouTube", icon: "lab la-youtube", href: "https://youtube.com/@TickYourList?si=1NCuQgq21vA7t3LL" },
  { name: "Instagram", icon: "lab la-instagram", href: "https://www.instagram.com/tyl.tickyourlist?igsh=cnN6M2g3NjczMnVo&utm_source=qr" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-2.5" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
        aria-label={`Follow us on ${item.name}`}
      >
        <i className={item.icon}></i>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
