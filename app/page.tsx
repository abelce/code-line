import { usePathname } from "@/i18n/routing";
import { redirect, useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage(props: any) {
  // console.log("props:", props);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // const pathnameArr = pathname.split("/")
  // console.log(pathname)
  //   if (pathnameArr.length && routing.locales.includes(pathnameArr[0] as any)) {

  //   }
  // console.log(`/en/${pathname}?${searchParams.toString()}`)
  // redirect(`/en/${pathname}?${searchParams.toString()}`);
  redirect("/en");
}
