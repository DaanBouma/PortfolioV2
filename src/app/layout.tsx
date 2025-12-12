import type { Metadata } from "next";
import "@/styles/colors.scss"
import "@/styles/global.scss"

export const metadata: Metadata = {
  title: "Daan Bouma - Web Developer Portfolio",
  description: "Gepassioneerde webdeveloper uit Appingedam, Groningen. Gespecialiseerd in React, Next.js, WordPress en moderne web development. Bekijk mijn projecten en meer op mijn website",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
