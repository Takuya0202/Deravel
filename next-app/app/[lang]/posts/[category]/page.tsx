import { notFound } from "next/navigation";
import { Footer } from "@/app/components/shared/Footer";
import { CategoryHead } from "@/app/components/feature/category/CategoryHead";
import { PostCard } from "@/app/components/shared/PostCard";
import { formatDate } from "@/lib/date";
import { getPosts } from "@/app/api-client/posts/posts";
import { QandA } from "@/app/components/feature/category/QandA";
import { getTranslations } from "next-intl/server";
import { Pagenation } from "@/app/components/shared/Pagenation";

// 有効なカテゴリーの定義
const VALID_CATEGORIES = ["food", "shopping", "culture", "guide", "cafe", "stories"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

const POSTS_PER_PAGE = 20;

// カテゴリー名のマッピング
// const categoryLabels: Record<Category, string> = {
//   food: "Food",
//   shopping: "Shopping",
//   culture: "Culture",
//   guide: "Guide",
//   cafe: "Cafe",
//   stories: "Stories",
// };

interface CategoryPageProps {
  params: Promise<{
    category: string;
    lang: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const t = await getTranslations("CategoryPage");
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const offset = currentPage - 1;

  // カテゴリーのバリデーション
  if (!VALID_CATEGORIES.includes(category as Category)) {
    notFound();
  }

  let posts: Array<{
    id: string;
    title: string;
    thumbnail: string;
    date: string;
    author: string;
  }> = [];
  let totalCount: number | null = null;

  try {
    const res = await getPosts({
      category: category,
      offset: offset,
      pageType: true,
    });

    if (res.success) {
      // APIレスポンスをPostCard用の形式に変換
      posts = res.posts.map((post) => ({
        id: post.id,
        title: post.title,
        thumbnail: post.thumbnail,
        date: post.date,
        author: post.author,
      }));
      totalCount = res.totalCount;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    // エラー時は空配列のまま（既に初期化済み）
  }
  // ページネーション計算
  const totalPages = totalCount ? Math.ceil(totalCount / POSTS_PER_PAGE) : 1;

  return (
    <>
      <section className="md:pt-12 md:pb-12">
        <div className="md:max-w-[1200px] mx-auto px-4">
          {/* カテゴリー名の表示 */}
          <CategoryHead category={category} />
          {/* 投稿一覧 */}
          <div className="flex items-center justify-center text-center font-bold md:text-2xl">
            {totalCount}
            {t("article")}
          </div>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg">{t("noPosts")}</p>
            </div>
          ) : (
            <div className="overflow-x-scroll flex flex-col mx-auto gap-5 mt-10 relative pb-4 max-w-[314px]  md:grid md:grid-cols-2 md:max-w-full md:gap-24 md:mt-20">
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
          )}
        </div>
        {/* ページネーション */}
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/posts/${category}`}
        />
      </section>
      <section className="mt-8 mb-20">
        <div className="max-w-[960px] mx-auto px-4 flex flex-col gap-6">
          <QandA question={t(`${category}.q1`)} answer={t(`${category}.a1`)} />
          <QandA question={t(`${category}.q2`)} answer={t(`${category}.a2`)} />
          <QandA question={t(`${category}.q3`)} answer={t(`${category}.a3`)} />
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category: category,
  }));
}
