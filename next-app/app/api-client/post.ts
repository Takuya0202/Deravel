import { PostResponse } from "@/lib/types/post";

// APIレスポンスの実際の型
interface PostAPIResponse {
  success: boolean;
  message: string;
  post: PostResponse;
}

export async function getPost(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/post/${id}/detail`);

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    const data: PostAPIResponse = await res.json();

    // APIレスポンスが { success: true, post: {...} } の形式なので、postを返す
    if (data.success && data.post) {
      return data.post;
    }

    console.error("Unexpected API response format:", data);
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
