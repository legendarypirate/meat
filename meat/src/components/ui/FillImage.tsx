import Image, { type ImageProps } from "next/image";
import { imageSizes } from "@/data/images";

type FillImageProps = Omit<ImageProps, "fill"> & {
  fill?: true;
  size?: keyof typeof imageSizes;
  sizes?: string;
};

export function FillImage({
  size = "card",
  sizes,
  className,
  alt,
  src,
  ...props
}: FillImageProps) {
  if (!src || (typeof src === "string" && !src.trim())) {
    return (
      <div
        className={`absolute inset-0 bg-surface ${className ?? ""}`}
        aria-label={typeof alt === "string" ? alt : "Зураг байхгүй"}
      />
    );
  }

  return (
    <Image
      fill
      src={src}
      sizes={sizes ?? imageSizes[size]}
      className={className}
      alt={alt}
      {...props}
    />
  );
}
