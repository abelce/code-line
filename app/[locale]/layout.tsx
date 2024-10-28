import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import variables from "./variables.module.scss";
import { Toaster } from "@/components/ui/toaster";
import { isDev, SITE_DESC, SITE_NAME } from "./config";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound, redirect, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const logoUrl = "/images/logo.png";
const canonical = "/";

type Props = {
  params: { locale: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: SITE_NAME,
    description: SITE_DESC[params.locale],
    icons: {
      icon: "/favicon.ico",
    },
    authors: [
      {
        name: "Abelce,wxabelce@gmail.com",
      },
    ],
    alternates: {
      canonical: canonical,
    },
    creator: "Abelce",
    publisher: "Abelce",
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      url: canonical,
      title: SITE_NAME,
      images: [logoUrl],
    },
    twitter: {
      site: "@site",
      title: SITE_NAME,
      images: [logoUrl],
    },
  };
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
  }>
) {
  const {
    children,
    params: { locale },
  } = props;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        {isDev ? null : (
          <>
            <GoogleAnalytics gaId="G-E8TJS0CFGQ" />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased h-screen w-screen overflow-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
