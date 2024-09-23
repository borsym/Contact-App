import { FieldValidators, FormApi, ReactFormApi } from "@tanstack/react-form";

export type ButtonVariant = "default" | "secondary" | "special";
export type ButtonTypes = "submit" | "reset" | "button" | undefined;

export interface ButtonProps {
  label?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  type?: ButtonTypes;
  disabled?: boolean | undefined;
}

export interface IconsProps {
  fill?: string;
  className?: string;
}

export interface ContactProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  imgUrl: string;
  hoverButtons?: Array<{
    label?: string;
    icon: JSX.Element;
    action: () => void;
  }>;
  menuOptions?: Array<{
    label?: string;
    icon: JSX.Element;
    action: () => void;
  }>;
}

export interface GridItemProps {
  children: React.ReactNode;
}

export interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface UserProps {
  name: string;
  email: string;
  phoneNumber: string;
  imgUrl: File | null;
}

export interface InputFieldProps {
  form: FormApi<any, undefined> & ReactFormApi<any, undefined>;
  handleFieldChange: (fieldName: string, value: string) => void;
  label: string;
  placeholder: string;
  name: string;
  type: string;
  validators?: FieldValidators<any, string, undefined, undefined, any>;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}
