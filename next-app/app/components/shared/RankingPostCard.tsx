import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utiles";

interface RankingPostCardProps {
  id: number;
  thumbnail: string;
  title: string;
  date: string;
  author: string;
  minW?: "short" | "long";
  index: number;
}

const RankingImage: Record<number, string> = {
  1: "/ranking/ranking-1.png",
  2: "/ranking/ranking-2.png",
  3: "/ranking/ranking-3.png",
  4: "/ranking/ranking-4.png",
  5: "/ranking/ranking-5.png",
  6: "/ranking/ranking-6.png",
  7: "/ranking/ranking-7.png",
  8: "/ranking/ranking-8.png",
  9: "/ranking/ranking-9.png",
  10: "/ranking/ranking-10.png",
};

export const RankingPostCard = ({
  id,
  thumbnail,
  title,
  date,
  author,
  minW = "short",
  index,
}: RankingPostCardProps) => {
  const rankingNumber = index + 1;
  const rankingImageSrc = RankingImage[rankingNumber];

  return (
    <article className={cn("w-full", minW === "short" && "min-w-[272px] h-full")}>
      <Link href={`/post/${id}`}>
        <div className="rounded-[20px] overflow-hidden border-2 border-black group hover:border-main">
          <Image
            src={thumbnail}
            alt={title}
            width={250}
            height={250}
            className="object-cover rounded-[20px] w-full  h-auto group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mt-1 flex gap-4 items-center justify-start h-full">
          <Image
            src={rankingImageSrc}
            alt={`Ranking ${rankingNumber}`}
            width={50}
            height={50}
            className="max-h-[90px] w-auto items-baseline"
          />
          <div>
            <h4 className="font-bold line-clamp-2 h-12">{title}</h4>
            <div className="flex gap-4 items-center mt-3">
              <span className="text-xs">{date}</span>
              <span className="text-xs">{author}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};
