export async function getPopularPosts(category: string, limit: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/posts/popular?category=${category}&limit=${limit}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
}
