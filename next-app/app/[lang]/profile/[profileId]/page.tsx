import Logout from "../../../components/feature/auth/logout";
import { getUserPosts } from "@/app/api-client/posts/userPosts";
import { PostCard } from "@/app/components/shared/PostCard";
import { Pagenation } from "@/app/components/shared/Pagenation";
import { getTranslations } from "next-intl/server";

const POSTS_PER_PAGE = 20;

type PostCardData = {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  author: string;
};

interface ProfilePageProps {
  params: Promise<{
    lang: string;
    profileId: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const t = await getTranslations("ProfilePage");
  const { lang, profileId } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const offset = currentPage - 1;
  let totalCount: number | null = null;

  const res = await getUserPosts({ profileId, offset });
  const posts: PostCardData[] = res.success
    ? res.posts.map((post) => ({
      id: post.id,
      title: post.title,
      thumbnail: post.thumbnail,
      date: post.date,
      author: post.author,
    }))
    : [];
  totalCount = res.totalCount;

  const totalPages = totalCount ? Math.ceil(totalCount / POSTS_PER_PAGE) : 1;

  return (
    <>
      <section>
        <div className="max-w-[1200px] mx-auto py-20 px-4 mt-20">
          <h1 className="w-full text-2xl font-bold bg-white py-2 rounded-full text-center">
            {totalCount}
            {t("article")}
          </h1>
          <div className="overflow-x-scroll flex flex-col mx-auto gap-5 mt-10 relative pb-4 max-w-[314px] h-full md:grid md:grid-cols-2 md:max-w-full md:gap-24 md:mt-20">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                thumbnail={post.thumbnail}
                date={post.date}
                author={post.author}
                layout="row"
              />
            ))}
          </div>
          {/* ページネーション */}
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/${lang}/profile/${profileId}`}
          />
        </div>
        <div className="mb-20 px-4 max-w-[600px] mx-auto">
          <Logout />
        </div>
      </section>
    </>
  );
}
