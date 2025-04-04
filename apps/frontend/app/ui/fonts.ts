import { Inter, Noto_Sans_SC } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});
