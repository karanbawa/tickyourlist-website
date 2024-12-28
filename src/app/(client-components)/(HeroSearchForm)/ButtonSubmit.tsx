import { PathName } from "@/routers/types";
import { Route } from "next";
import Link from "next/link";
import React, { CSSProperties, FC } from "react";

interface Props {
  href?: PathName;
  className?: string;
  style?: CSSProperties;
}

const ButtonSubmit: FC<Props> = ({ href = "", className, style = "" }) => {
  return (
    <Link
      href={href as Route}
      type="button"
      className={`h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none ${className}`}
      style={style ?? ""}
    >
      <span className="mr-3 md:hidden">Search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </Link>
  );
};

export default ButtonSubmit;
