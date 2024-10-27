import { getUnsplashList } from "@/unsplash";

// 缓存60s
export const revalidate = 120

export async function GET(request: Request) {
  const result = await getUnsplashList();
  // @ts-ignore
  return Response.json({ data: result }, { status: 200 });
}
