import { PostsResponse } from "@/lib/types/post";
import { FetchUserPostsParams } from "@/lib/types/post";

export async function getUserPosts({ profileId, offset = 0 }: FetchUserPostsParams) {
  try {
    const params = new URLSearchParams({
      offset: offset.toString(),
    });
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/posts/${profileId}/user?${params.toString()}`;
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user posts");
    }
    const data: PostsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return {
      success: false,
      posts: [],
      totalCount: 0,
    };
  }
}
