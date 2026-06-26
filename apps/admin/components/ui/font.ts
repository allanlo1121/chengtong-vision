// components/ui/font.ts
import localFont from "next/font/local";

export const notoSansSC = localFont({
  src: [
    {
      path: "../../public/fonts/noto-sans-sc/noto-sans-sc-v38-chinese-simplified_latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/noto-sans-sc/noto-sans-sc-v38-chinese-simplified_latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-noto-sans-sc",
});
