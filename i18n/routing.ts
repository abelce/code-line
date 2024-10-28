import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

const NEXT_PUBLIC_LOCALES = ["en", "zh"]; // 语言列表
const DEFAULT_LOCALE = "en"; // 默认语言

export const routing = defineRouting({
  //  localePrefix: 'as-needed',
  // A list of all locales that are supported
  locales: NEXT_PUBLIC_LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
