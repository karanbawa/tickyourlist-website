import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {
  icon?: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  icon,
  style = {}, // Initialize style as an empty object or use it as passed
  children,
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 flex items-center justify-center space-x-2 ${className}`} // Flexbox and spacing for icon and text
      style={style}
      {...args}
    >
      {icon && <span>{icon}</span>} {/* Render icon if it exists */}
      <span>{children}</span> {/* Button content */}
    </Button>
  );
};

export default ButtonPrimary;
