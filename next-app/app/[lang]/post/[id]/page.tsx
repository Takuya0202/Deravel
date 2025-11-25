
import { getPost } from "@/app/api-client/post";
import { RankingPostCard } from "@/app/components/shared/RankingPostCard";
import { getRankingPosts } from "@/app/api-client/posts/ranking";
import { formatDate } from "@/lib/date";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import "@blocknote/mantine/style.css";

const BlockNoteViewer = dynamic(
    () => import("@/app/components/shared/BlockNoteViewer")
);

interface PostPageProps {
    params: {
        id: string;
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params;
    const t = await getTranslations("PostPage");

    // 並列実行でパフォーマンスを改善
    const [rankingData, postData] = await Promise.all([getRankingPosts(7), getPost(id)]);

    const rankingPosts = rankingData.map((post) => ({
        id: post.id,
        thumbnail: post.thumbnail,
        title: post.title,
        date: post.createdAt.toString(),
        createdAt: post.createdAt,
        author: post.profile?.name,
    }));

    if (!postData) {
        notFound();
    }

    return (
        <>
            <section>
                <div className="mx-auto max-w-[1200px] px-4">
                    <div className="flex flex-col mt-14 md:hidden">
                        <h1 className="text-3xl font-bold text-center">{postData.title}</h1>
                        <Image
                            src={postData.thumbnail}
                            alt={postData.title}
                            width={1000}
                            height={1000}
                            className="w-full mt-4 rounded-xl border-2  border-black"
                        />
                        <div className="flex gap-4 text-sm mt-2">
                            <p>{formatDate(postData.createdAt)}</p>
                            <p>{postData.author}</p>
                        </div>
                        <div className="md:hidden">
                            <BlockNoteViewer content={postData.content} />
                        </div>
                    </div>
                    <div className="hiddeen md:flex md:gap-16 md:items-center md:justify-center">
                        <Image
                            src={postData.thumbnail}
                            alt={postData.title}
                            width={1000}
                            height={1000}
                            className="w-full mt-4 rounded-xl border-2  border-black max-w-[600px]"
                        />
                        <div className="flex flex-col gap-4 text-left">
                            <h1 className="text-3xl font-bold">{postData.title}</h1>
                            <div className="flex gap-4 text-sm mt-2">
                                <p>{formatDate(postData.createdAt)}</p>
                                <p>{postData.author}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex md:gap-16 md:mt-16">
                        <div className="md:block md:min-w-[60%]">
                            <BlockNoteViewer content={postData.content} />
                        </div>
                        <div className="max-w-[300px] mx-auto mb-9">
                            <h2 className="text-2xl font-bold text-center">{t("ranking")}</h2>
                            <div className="flex flex-col gap-9 md:pt-6">
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
                </div>
            </section>
        </>
    );
}
