import { FetchPostsParams } from "@/lib/types/post";
import { PostsResponse } from "@/lib/types/post";

export async function getPosts({ category, offset = 0, pageType = false }: FetchPostsParams) {
  try {
    const params = new URLSearchParams({
      category,
      offset: offset.toString(),
      pageType: pageType.toString(),
    });
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/posts?${params.toString()}`;
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data: PostsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      posts: [],
      totalCount: 0,
    };
  }
}
