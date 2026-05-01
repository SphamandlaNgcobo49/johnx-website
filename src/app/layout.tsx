import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./Providers";

import { Cormorant_Garamond, Playfair_Display, Syncopate, Poppins, Inter, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-cormorant" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-syncopate" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-poppins" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "John X | Dystopian Luxury",
  description: "The Genesis of John X a.k.a The GMO Man. A cinematic, editorial exploration of Broken City.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", cormorant.variable, playfair.variable, syncopate.variable, poppins.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F8F5F0] overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
