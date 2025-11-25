import { PostCard } from "@/app/components/shared/PostCard";
// ここ変更
import { getPopularPosts } from "@/app/api-client/posts/popular";
import { formatDate } from "@/lib/date";
import { FeaturedPost } from "@/lib/types/post";

export const FeaturedList = async () => {
  let featuredPosts: FeaturedPost[] = [];

  try {
    // getRankingPostsではなくて、category別のranking
    const res = await getPopularPosts("food", 4);
    if (res.success) {
      featuredPosts = res.posts;
    }
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    featuredPosts = [];
  }

  return (
    <div className="overflow-x-scroll flex gap-5 mt-4 px-4 pb-4 md:mt-12 md:grid md:grid-cols-4 md:gap-10">
      {featuredPosts.map((post) => (
        <PostCard
          key={post.id.toString()}
          id={post.id}
          title={post.title}
          thumbnail={post.thumbnail}
          date={formatDate(post.date)}
          author={post.author}
          layout="column"
        />
      ))}
    </div>
  );
};
