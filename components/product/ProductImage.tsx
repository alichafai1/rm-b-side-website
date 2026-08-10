import Image, { type ImageProps } from "next/image";

type ProductImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function ProductImage({ src, alt, ...props }: ProductImageProps) {
  // Always skip the optimizer: Vercel Image Optimization is unavailable on
  // this project (402), so load image URLs directly.
  return <Image src={src} alt={alt} unoptimized {...props} />;
}
