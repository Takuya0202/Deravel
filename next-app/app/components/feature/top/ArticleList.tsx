"use client";

import { cn } from "@/lib/utiles";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/app/components/shared/lucide";
import { PostCard } from "@/app/components/shared/PostCard";
import { getPosts } from "@/app/api-client/posts/posts";
import { formatDate } from "@/lib/date";
import { Post } from "@/lib/types/post";

const tags = ["food", "shopping", "cafe", "culture", "guide", "stories"];

export const ArticleList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("food");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getPosts({ category: selectedCategory, offset: 0, pageType: false });
        if (data.success) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  return (
    <>
      <div className="flex gap-4 mx-3 px-[10px] py-2 overflow-x-scroll mt-4 bg-base rounded-full md:justify-between md:mt-12">
        {tags.map((tag, index) => (
          <button
            key={index}
            className={cn(
              "rounded-full py-3 px-[62px] text-center text-black md:hover:bg-main transition-all duration-300 ease-in-out",
              selectedCategory === tag ? "bg-main border-2 border-black" : "border-2 border-base"
            )}
            onClick={() => setSelectedCategory(tag)}
          >
            <span className="font-bold">{tag}</span>
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="">
          <p>Loading...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="">
          <p>生地がありません</p>
        </div>
      ) : (
        <div className="overflow-x-scroll flex gap-5 mt-10 px-4 relative pb-4 md:grid md:grid-cols-3 md:grid-rows-2 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              thumbnail={post.thumbnail}
              date={formatDate(post.date)}
              author={post.author}
              layout="column"
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-center mt-10 mb-15 md:justify-end">
        <Link
          href={`/posts/${selectedCategory}`}
          className="relative border-2 border-black rounded-full w-[184px] h-12 flex items-center justify-center bg-base hover:bg-main transition-all duration-300 ease-in-out"
        >
          <span>More</span>
          <Icon.ArrowDown strokeWidth={1} className="absolute right-8 top-1/2 -translate-y-1/2" />
        </Link>
      </div>
    </>
  );
};
