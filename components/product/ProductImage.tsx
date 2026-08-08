import Image, { type ImageProps } from "next/image";

type ProductImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

function isSupabaseStorageUrl(src: string) {
  return (
    src.includes(".supabase.co/storage/") ||
    src.includes(".supabase.in/storage/")
  );
}

export function ProductImage({ src, alt, ...props }: ProductImageProps) {
  // Load Supabase Storage images directly. The Next.js optimizer can fail
  // locally (VPN/private DNS) and with SVG uploads, which hides product photos.
  const unoptimized =
    isSupabaseStorageUrl(src) ||
    src.endsWith(".svg") ||
    src.startsWith("blob:");

  return <Image src={src} alt={alt} unoptimized={unoptimized} {...props} />;
}
