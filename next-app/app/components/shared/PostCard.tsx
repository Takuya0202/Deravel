"use client";

import { cn } from "@/lib/utiles";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { PostCardProps } from "@/lib/types/post";
import { useState } from "react";

export function PostCard({ title, thumbnail, date, author, layout, id }: PostCardProps) {
  const [imageSrc, setImageSrc] = useState(thumbnail);
  const [imageError, setImageError] = useState(false);

  useState(() => {
    if (thumbnail) {
      setImageSrc(thumbnail);
      setImageError(false);
    } else {
      setImageSrc("/dummy.png");
    }
  });

  return (
    <Link
      href={`/post/${id}`}
      className={cn(
        "min-w-[200px] md:min-w-none flex",
        layout === "row"
          ? "max-w-[314px] md:max-w-full h-[180px] gap-4 md:gap-6 "
          : "max-w-[218px] md:max-w-[280px] w-full flex-col md:min-w-[280px]"
      )}
    >
      <div
        className={cn(
          "flex overflow-hidden duration-200 rounded-xl border-2 border-black hover:border-main w-fit ",
          layout === "row" && "flex-1"
        )}
      >
        <Image
          src={imageSrc}
          alt="thumbnail"
          width={400}
          height={400}
          className="transition-transform ease-in-out object-cover hover:scale-105 max-h-[130px] md:max-h-[180px]"
          unoptimized={imageSrc.startsWith("http")}
        />
      </div>
      <div
        className={cn(
          "flex flex-col gap-3 flex-1",
          layout === "row" && "items-start justify-center text-left"
        )}
      >
        <h4
          className={cn(
            "flex line-clamp-2 text-[14px] mt-4 font-bold h- md:text-[16px]",
            layout === "row" && "mt-0"
          )}
        >
          {title}
        </h4>
        <div className="flex gap-6 text-xs items-center md:text-[14px]">
          <span>{date}</span>
          <span>{author}</span>
        </div>
      </div>
    </Link>
  );
}
