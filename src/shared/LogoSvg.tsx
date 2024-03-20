import Image from "next/image";
import React from "react";
import tyllogo from "@/images/logos/tyllogo.png";
import tyllogo2 from "@/images/logos/tyllogo2.png";

const LogoSvg = () => {
  return (
    <div className="w-full block dark:hidden">
      {/* Adjust the src to your image's path */}
      <Image
        src={tyllogo} // The path to your image
        alt="Tickyourlist logo" // A description for your image
        width={65} // Set the width to match your SVG's viewBox width
        height={25} // Set the height to match your SVG's viewBox height
        layout="responsive" // This will maintain the aspect ratio
      />
    </div>
  );
};

export default LogoSvg;
