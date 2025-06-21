//https://dev.to/frontenddeveli/configure-fallback-images-in-react-and-nextjs-54ej
"use client";
import Image from "next/image";
import { useState } from "react";
import fallback from "../../../public/monkey.png";

interface ImageWithFallbackProps {
  className?: string;
  src: string;
  alt: string;
  fallBackSrc?: string;
}

export function ImageWithFallback({ className, src, alt, fallBackSrc = fallback.src }: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{
        position: "relative",
      }}
      className={className}
    >
      <Image
        fill
        alt={alt}
        style={{ objectFit: "cover" }}
        onError={() => setImageError(true)}
        src={imageError ? fallBackSrc : src}
        unoptimized
      />
    </div>
  );
}
