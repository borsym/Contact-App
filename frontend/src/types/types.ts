export type ButtonVariant = "default" | "secondary" | "special";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

export interface IconsProps {
  fill?: string;
}
