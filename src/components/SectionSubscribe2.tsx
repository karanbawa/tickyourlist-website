import React, { FC } from "react";
import ButtonCircle from "@/shared/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/shared/Badge";
import Input from "@/shared/Input";
import Image from "next/image";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <section
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our newsletter 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone’s welcome.
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm" aria-label="Subscribe to our newsletter">
          <Input
            required
            aria-required="true"
            placeholder="Enter your email"
            type="email"
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3"
            aria-label="Email address"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1.5"
            size="w-10 h-10"
            aria-label="Submit"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <Image alt="Newsletter subscription illustration" src={rightImg} priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
    </section>
  );
};

export default SectionSubscribe2;
