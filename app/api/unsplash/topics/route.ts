import { getUnsplashTopicList } from "@/unsplash";

export const revalidate = 120

export async function GET(request: Request) {
  const result = await getUnsplashTopicList();
  return Response.json({ data: result }, { status: 200 });
}
