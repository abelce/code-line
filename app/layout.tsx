import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import variables from "./variables.module.scss";
import { Toaster } from "@/components/ui/toaster";
import { isDev, SITE_DESC, SITE_NAME } from "./config";
import { GoogleAnalytics } from "@next/third-parties/google";

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

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESC,
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    {
      name: "文钦,wxabelce@gmail.com",
    },
  ],
  alternates: {
    canonical: canonical,
  },
  creator: "文钦",
  publisher: "文钦",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {isDev ? null : (
          <>
            <meta
              name="google-site-verification"
              content="QNgsHzNBqTCrK75m-fCBXU2ZyISQotf5SxYmHPKMZ80"
            />
            <GoogleAnalytics gaId="G-E8TJS0CFGQ" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
          var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?87a3ab412b5c6b8bba008262d7ca42e8";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })()
          `,
              }}
            ></script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased h-screen w-screen overflow-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
