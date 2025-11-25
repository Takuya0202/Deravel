import { Footer } from "@/app/components/shared/Footer";
import { getPost } from "@/app/api-client/post";
import { RankingPostCard } from "@/app/components/shared/RankingPostCard";
import { getRankingPosts } from "@/app/api-client/posts/ranking";
import { formatDate } from "@/lib/date";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const t = await getTranslations("postPage");

  // 並列実行でパフォーマンスを改善
  const [rankingData, postData] = await Promise.all([getRankingPosts(7), getPost(id)]);

  const rankingPosts = rankingData.map((post) => ({
    id: post.id,
    thumbnail: post.thumbnail,
    title: post.title,
    date: formatDate(post.createdAt.toString()),
    author: post.profile.name,
  }));

  if (!postData) {
    notFound();
  }

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col mt-14">
            <h1 className="text-3xl font-bold text-center">{postData.title}</h1>
            <Image
              src={postData.thumbnail}
              alt={postData.title}
              width={1000}
              height={1000}
              className="w-full mt-4 rounded-xl border-2  border-black"
            />
            <div className="flex gap-4 text-sm mt-2">
              <p>{formatDate(postData.createdAt.toString())}</p>
              <p>{postData.category}</p>
              <p>{postData.author}</p>
            </div>
            <div>
              <ReactMarkdown>{postData.content}</ReactMarkdown>
            </div>
          </div>
          <div className="max-w-[300px] mx-auto my-15">
            <h2 className="text-2xl font-bold text-center">{t("ranking")}</h2>
            <div className="flex flex-col gap-9 mt-11">
              {rankingPosts.map((post, index) => (
                <RankingPostCard
                  key={post.id}
                  id={Number(post.id)}
                  thumbnail={post.thumbnail}
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
