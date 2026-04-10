import type { Metadata } from "next";
import { cookies } from "next/headers";
import AccessGate from "@/components/AccessGate";
import {
  ACCESS_COOKIE_NAME,
  ACCESS_SECRET_ENV_NAME,
  ACCESS_SLUG_ENV_NAME,
  hasValidAccessConfig,
  verifyAccessToken,
} from "@/lib/access";
import "@/styles/colors.scss"
import "@/styles/global.scss"

export const metadata: Metadata = {
  title: "Clausum Application",
  description: "Protected by Clausum",
  icons: {
    icon: "/7f3a9c1e4b2d8a6f.png",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
      noarchive: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessSlug = process.env[ACCESS_SLUG_ENV_NAME];
  const accessSecret = process.env[ACCESS_SECRET_ENV_NAME];
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  const hasAccess =
    hasValidAccessConfig(accessSlug, accessSecret) &&
    verifyAccessToken(accessCookie, accessSlug, accessSecret);

  return (
    <html lang="en">
      <body>
        {hasAccess ? children : <AccessGate />}
      </body>
    </html>
  );
}
