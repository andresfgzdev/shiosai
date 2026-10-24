import Image from "next/image";
import type { CSSProperties } from "react";

export type EngravingName = "rosette" | "seal-ring" | "watermark";

export function Engraving({
  name,
  className,
  style,
  eager = false,
}: {
  name: EngravingName;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
}) {
  return (
    <Image
      className={className}
      style={style}
      src={`/engraving/${name}.svg`}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      unoptimized
      loading={eager ? "eager" : "lazy"}
    />
  );
}
