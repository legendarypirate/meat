import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "type">;

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-foreground text-white hover:bg-foreground/90",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary-light",
  ghost: "bg-surface text-foreground hover:bg-border",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  fullWidth = false,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {icon}
      {children}
    </button>
  );
}
