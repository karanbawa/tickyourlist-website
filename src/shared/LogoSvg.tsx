import Image from "next/image";
import React from "react";
import tyllogo from "@/images/logos/tyllogo-1.png";

const LogoSvg = () => {
  return (
    <div className="w-full block dark:hidden">
      <Image
        src={tyllogo} // The path to your image
        alt="TickYourList logo" // A description for your image
        width={88} // Set the width to match your SVG's viewBox width
        height={25} // Set the height to match your SVG's viewBox height
        layout="intrinsic" // Use intrinsic layout for fixed dimensions
        objectFit="contain" // Ensure the image fits within the container
        className="h-full"
        priority // Prioritize loading of this image
      />
    </div>
  );
};

export default LogoSvg;
