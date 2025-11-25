"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/app/components/shared/lucide";
import { getRankingPosts } from "@/app/api-client/posts/ranking";
import { PostCard } from "@/app/components/shared/PostCard";
import { formatDate } from "@/lib/date";
import { FeaturedPost } from "@/lib/types/post";

const SCROLL_AMOUNT = 328;

export const FeaturedPosts = () => {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const res = await getRankingPosts(3);
        const data = res.map((post) => ({
          id: post.id,
          thumbnail: post.thumbnail,
          title: post.title,
          date: post.createdAt.toString(),
          author: post.profile?.name,
        }));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []); // 言語が変更されたら再取得になる

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="relative md:max-w-[1200px] mx-auto">
        <section className="bg-main py-8 relative md:hidden">
          <h2 className="absolute top-0 left-4 translate-y-[-50%] border-2 border-black bg-white rounded-full px-8 py-2 text-black font-bold w-fit">
            Featured Posts
          </h2>
          <div className="flex justify-center items-center py-20">
            <p>投稿がありません</p>
          </div>
        </section>
        <div className="hidden md:block absolute bottom-13 right-0 w-[440px] bg-black rounded-[30px] p-[2px] mr-3">
          <div className="bg-main pt-10 pb-3 rounded-[30px] relative">
            <h2 className="bg-white px-8 py-2 text-black font-bold border-2 border-black w-fit absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full whitespace-nowrap">
              Featured Posts
            </h2>
            <div className="flex justify-center items-center py-20">
              <p>投稿がありません</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className="relative md:max-w-[1200px] mx-auto">
      <section className="bg-main py-8 relative md:hidden">
        <h2 className="absolute top-0 left-4 translate-y-[-50%] border-2 border-black bg-white rounded-full px-8 py-2 text-black font-bold w-fit">
          Featured Posts
        </h2>
        <div className="flex px-4 gap-5 overflow-x-scroll pb-4">
          {posts.map((post) => (
            <div className="max-w-[200px]" key={post.id}>
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={500}
                height={500}
                className="max-w-[200px] object-cover rounded-[20px] border-2 border-black"
              />
              <h4 className="mt-4 font-bold line-clamp-2">{post.title}</h4>
              <div className="flex gap-6 items-center mt-3">
                <span className="text-xs">{post.date}</span>
                <span className="text-xs">{post.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="hidden md:block  absolute bottom-13 right-0 w-[440px] bg-black rounded-[30px] p-[2px] mr-3">
        <div className="bg-main pt-10 pb-3 rounded-[30px] relative">
          <h2 className=" bg-white px-8 py-2 text-black font-bold border-2 border-black w-fit absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full  whitespace-nowrap">
            Featured Posts
          </h2>
          <div className="relative overflow-hidden">
            <button
              onClick={scrollLeft}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-5 bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-main transition-colors"
            >
              <Icon.ArrowLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            {/* 右矢印ボタン */}
            <button
              onClick={scrollRight}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-5 bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-main transition-colors"
            >
              <Icon.ArrowRight className="w-6 h-6" strokeWidth={2} />
            </button>
            {/* スクロール可能なコンテナ */}
            <div ref={scrollContainerRef} className="flex gap-12 px-20 overflow-x-hidden">
              {posts.map((post) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};
