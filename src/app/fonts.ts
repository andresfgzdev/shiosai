import { Geist_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";

export const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const jp = localFont({
  src: "./fonts/noto-serif-jp-subset.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-jp",
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "serif"],
});
