import {
  Tiro_Bangla,
  Hind_Siliguri,
  Baloo_Da_2,
  Cormorant_Garamond,
  Inter,
  Marcellus,
} from "next/font/google";

import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import MobileBottomNav from "@/components/shared/MobileBottomNav";

// বাংলা - Heading
const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
  variable: "--font-bn-heading",
});

// বাংলা - Body
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-bn-body",
});

// বাংলা - Accent
const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  weight: ["500", "600"],
  variable: "--font-bn-accent",
});

// English - Heading
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-en-heading",
});

// English - Body
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-en-body",
});

// English - Accent
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-en-accent",
});


export const metadata = {
  title: {
    default: "Monohor — আতর, বাখুর, শোপিস ও হাতের কাজ",
    template: "%s | Monohor",
  },
  description:
    "Authentic আতর, বাখুর, শোপিস এবং হাতের কাজের পণ্য — সারা বাংলাদেশে হোম ডেলিভারি।",
  keywords: ["আতর", "বাখুর", "শোপিস", "হাতের কাজ", "Monohor", "attar"],
  authors: [{ name: "Monohor" }],
  openGraph: {
    title: "Monohor",
    description: "Authentic Bengali traditional products",
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${tiroBangla.variable}
        ${hindSiliguri.variable}
        ${balooDa2.variable}
        ${cormorant.variable}
        ${inter.variable}
        ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col mt-0">
        <NavBar />
        <main className="pt-17 md:pt-31 pb-18 md:pb-0 overflow-x-hidden w-full">
          {children}
        </main>
        <MobileBottomNav />

      </body>
    </html>
  );
}
