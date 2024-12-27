import Image from "next/image";
import React from "react";
// import tyllogo from "@/images/logos/tyllogo-1.png";
import tyllogo from "@/images/logos/tyl-logo-xmas.png";

const LogoSvg = () => {
  return (
    <div className="w-full block dark:hidden"> 
      <Image
        src={tyllogo} // The path to your image
        alt="TickYourList logo" // A description for your image
        width={60} // Set the actual width of the image
        height={25} // Set the actual height of the image
        layout="fixed" // Use fixed layout for fixed dimensions
        objectFit="contain" // Ensure the image fits within the container
        className="h-full"
        priority // Prioritize loading of this image
      />
    </div>
  );
};

// const LogoSvg = () => {
//   return (
//     <div className="w-full block dark:hidden"> 
//       <Image
//         src={tyllogo} // The path to your image
//         alt="TickYourList logo" // A description for your image
//         width={88} // Set the actual width of the image
//         height={25} // Set the actual height of the image
//         layout="fixed" // Use fixed layout for fixed dimensions
//         objectFit="contain" // Ensure the image fits within the container
//         className="h-full"
//         priority // Prioritize loading of this image
//       />
//     </div>
//   );
// };

export default LogoSvg;