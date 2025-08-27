import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // import both fonts
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // your needed weights
  variable: "--font-poppins", // defines CSS variable
});

export const metadata: Metadata = {
  title: "DECIPHER",
  description:
    "Join us for the 8th edition of LNMHACKS - an immersive hackathon experience bringing together brilliant minds and innovative ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
