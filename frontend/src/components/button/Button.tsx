import React from "react";
import { ButtonProps } from "../../types/types";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  variant = "default",
}) => {
  const buttonStyle =
    variant === "default"
      ? "bg-default hover:bg-default-hover active:bg-default-pressed"
      : variant === "secondary"
      ? "bg-secondary hover:bg-secondary-hover active:bg-secondary-pressed"
      : "bg-special hover:bg-special-hover active:bg-special-pressed";

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg text-white focus:outline-none transition-all ${buttonStyle}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
