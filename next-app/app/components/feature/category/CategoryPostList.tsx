"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  author: string;
}

interface CategoryPostListProps {
  category: string;
}

interface PostResponse {
  posts: Post[];
  totalCount: number;
}

export const CategoryPostList = ({ category }: CategoryPostListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // api fetch
        // const data = await fetchPosts();
        // setPosts(data.posts);
        // setTotalCount(data.totalCount);

        // 仮
        const mockData: PostResponse = {
          posts: [
            {
              id: 1,
              title: "がっつり・こってり・名古屋めし！",
              image: "/dummy.png",
              createdAt: "2025.11.28",
              author: "味噌ガール0号",
            },
            {
              id: 2,
              title: "名古屋の隠れたカフェ巡り",
              image: "/dummy.png",
              createdAt: "2025.11.27",
              author: "カフェハンター",
            },
            {
              id: 3,
              title: "ショッピングモール完全ガイド",
              image: "/dummy.png",
              createdAt: "2025.11.26",
              author: "ショッピングマスター",
            },
            {
              id: 1,
              title: "がっつり・こってり・名古屋めし！",
              image: "/dummy.png",
              createdAt: "2025.11.28",
              author: "味噌ガール0号",
            },
            {
              id: 2,
              title: "名古屋の隠れたカフェ巡り",
              image: "/dummy.png",
              createdAt: "2025.11.27",
              author: "カフェハンター",
            },
            {
              id: 3,
              title: "ショッピングモール完全ガイド",
              image: "/dummy.png",
              createdAt: "2025.11.26",
              author: "ショッピングマスター",
            },
            {
              id: 1,
              title: "がっつり・こってり・名古屋めし！",
              image: "/dummy.png",
              createdAt: "2025.11.28",
              author: "味噌ガール0号",
            },
            {
              id: 2,
              title: "名古屋の隠れたカフェ巡り",
              image: "/dummy.png",
              createdAt: "2025.11.27",
              author: "カフェハンター",
            },
            {
              id: 3,
              title: "ショッピングモール完全ガイド",
              image: "/dummy.png",
              createdAt: "2025.11.26",
              author: "ショッピングマスター",
            },
            {
              id: 1,
              title: "がっつり・こってり・名古屋めし！",
              image: "/dummy.png",
              createdAt: "2025.11.28",
              author: "味噌ガール0号",
            },
            {
              id: 2,
              title: "名古屋の隠れたカフェ巡り",
              image: "/dummy.png",
              createdAt: "2025.11.27",
              author: "カフェハンター",
            },
            {
              id: 3,
              title: "ショッピングモール完全ガイド",
              image: "/dummy.png",
              createdAt: "2025.11.26",
              author: "ショッピングマスター",
            },
          ],
          totalCount: 100,
        };

        setPosts(mockData.posts);
        setTotalCount(mockData.totalCount);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [category]);
  return (
    <section>
      <div className="max-w-[312px] mx-auto md:max-w-[1200px] md:px-4">
        <p className="text-[24px] font-bold text-center">{totalCount}件</p>
        <div className="py-8 flex flex-col gap-8 items-center justify-center md:grid md:grid-cols-2 md:">
          {posts.map((post) => (
            <Link href="/" className="flex gap-4 items-center justify-center group">
              <div className="border-2 overflow-hidden group-hover:[bg-main] rounded-[14px] flex-1">
                <Image
                  className="group-hover:scale-105"
                  alt={post.title}
                  width={300}
                  height={200}
                  src={post.image}
                />
              </div>
              <div className="flex flex-col gap-2 line-clamp-2 flex-1">
                <h3 className="font-bold md:text-[24px] ">{post.title}</h3>
                <div className="flex gap-2 text-[8px] md:text-[14px]">
                  <p>{post.createdAt}</p>
                  <p>{post.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* pagenation */}
      </div>
    </section>
  );
};
