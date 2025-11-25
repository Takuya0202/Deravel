import { RankingPostCard } from "../../shared/RankingPostCard";
import { getRankingPosts } from "@/app/api-client/posts/ranking";
import { formatDate } from "@/lib/date";

export const Ranking = async () => {
  const data = await getRankingPosts(7);
  const rankingPosts = data.map((post) => ({
    id: post.id,
    thumbnail: post.thumbnail,
    title: post.title,
    date: post.createdAt.toString(),
    author: post.profile?.name,
  }));

  return (
    <div className="overflow-x-scroll flex gap-5 pt-10 pb-2 px-4 relative h-fit md:gap-6">
      {rankingPosts.map((ranking, index) => (
        <RankingPostCard
          key={ranking.id}
          id={Number(ranking.id)}
          thumbnail={ranking.thumbnail}
          title={ranking.title}
          date={formatDate(ranking.date)}
          author={ranking.author}
          index={index}
        />
      ))}
    </div>
  );
};
