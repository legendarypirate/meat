type BadgeProps = {
  children: React.ReactNode;
  variant?: "green" | "dark" | "olive" | "outline";
  className?: string;
};

const variants = {
  green: "bg-primary text-white",
  dark: "bg-foreground text-white",
  olive: "bg-[#5a6b3a] text-white",
  outline: "border border-primary text-primary bg-white",
};

export function Badge({
  children,
  variant = "green",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
