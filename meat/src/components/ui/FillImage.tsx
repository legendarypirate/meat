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
  ...props
}: FillImageProps) {
  return (
    <Image
      fill
      sizes={sizes ?? imageSizes[size]}
      className={className}
      alt={alt}
      {...props}
    />
  );
}
