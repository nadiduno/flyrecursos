import React from "react";
import { IconType } from "react-icons";

interface ButtonFlyProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
}

export const ButtonFly: React.FC<ButtonFlyProps> = ({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  icon: Icon,
  iconPosition = "left",
}) => {
  const baseClasses = "flex justify-center rounded-b-md w-full items-center";
  const buttonFlyClasses = `
    w-[9rem] md:w-[15rem] h-[1.5rem] md:h-[2.5rem] rounded-[50px] 
    text-white bg-primary2 gap-2
    flex justify-center items-center
    hover:bg-secondary4 hover:text-black
    shadow-[0px_4px_4px_rgba(0,0,0,0.25)] 
    text-center font-bold text-[1rem]
    transition-colors duration-200
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      <button
        type={type}
        onClick={onClick}
        className={buttonFlyClasses}
        disabled={disabled}
      >
        {Icon && iconPosition === "left" && <Icon size={18} />}
        {text}
        {Icon && iconPosition === "right" && <Icon size={18} />}
      </button>
    </div>
  );
};
