import { RankingPostResponse } from "@/lib/types/post";

export async function getRankingPosts(days: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/posts/ranking?days=${days}`);
    const data = await res.json();

    if (data.success && Array.isArray(data.posts)) {
      return data.posts as RankingPostResponse[];
    }

    console.error("Unexpected API response format:", data);
    return [];
  } catch (error) {
    console.error("Error fetching ranking posts:", error);
    return [];
  }
}
