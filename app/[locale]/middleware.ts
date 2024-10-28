import createMiddleware from "next-intl/middleware";
// import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_LOCALES = ['en', 'zh']; // 语言列表
const DEFAULT_LOCALE = 'zh'; // 默认语言

export default async function middleware(request: NextRequest) {
  const [, locale] = request.nextUrl.pathname.split("/");

  if (!NEXT_PUBLIC_LOCALES.includes(locale)) {
    // return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${request.nextUrl.pathname}`, request.url));
    request.nextUrl.pathname = `/${DEFAULT_LOCALE}${request.nextUrl.pathname}`;
  }

  const handleI18nRouting = createMiddleware({
    locales: NEXT_PUBLIC_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(zh|en)/:path*"],
};
