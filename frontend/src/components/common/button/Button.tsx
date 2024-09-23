import { ButtonProps } from "../../../types/types";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  variant = "primary",
  type,
  disabled,
}) => {
  const buttonStyle =
    variant === "primary"
      ? "bg-default hover:bg-default-hover active:bg-default-pressed"
      : variant === "secondary"
      ? "bg-secondary hover:bg-secondary-hover active:bg-secondary-pressed"
      : "bg-special hover:bg-special-hover active:bg-special-pressed";

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-2 py-2 rounded-lg text-white focus:outline-none transition-all ${buttonStyle}`}
      type={type}
      disabled={disabled}
    >
      {icon && <span className={`${label ? "mr-2" : ""}`}>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
