import { getUnsplashTopicList } from "@/unsplash";
import dayjs from "dayjs";

export const revalidate = 120

let cacheData: any = null;
let cacheTime: number;

export async function GET(request: Request) {
  if (cacheData && cacheTime && dayjs(cacheTime).add(10, "m").isAfter(dayjs())) {
    // 缓存十分钟
    return Response.json({ data: cacheData }, { status: 200 });
  }
  const result = await getUnsplashTopicList();
  cacheData = result;
  cacheData = +new Date();
  // @ts-ignore
  return Response.json({ data: result }, { status: 200 });
}
