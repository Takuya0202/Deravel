"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@/app/components/shared/lucide";

import { PostTitleEditor } from "@/app/components/shared/PostTitleEditor";
import { PostCategorySelect } from "@/app/components/shared/PostCategorySelect";
import { PostThumbnailUpload } from "@/app/components/shared/PostThumbnailUpload";

const CATEGORIES = [
  { id: 1, name: "food" },
  { id: 2, name: "shopping" },
  { id: 3, name: "culture" },
  { id: 4, name: "guide" },
  { id: 5, name: "cafe" },
  { id: 6, name: "stories" },
];

export const Editer = () => {
  const router = useRouter();
  const t = useTranslations("post-create");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    if (selectedCategory === null) {
      alert("カテゴリーを選択してください");
      return;
    }

    setIsSubmitting(true);

    // try{}
  };

  return (
    <section className="px-4">
      <div className="max-w-[1200px]">
        <div className="flex justify-between">
          <Link href="/" className="flex justify-between items-center gap-6">
            <div className="border-white bg-main rounded-full w-10 h-10 flex items-center justify-center">
              <Icon.ArrowLeft className="w-9 h-9 text-[#777777]" />
            </div>
            <p className="text-xl">{t("back")}</p>
          </Link>
          <div className="h-12 relative w-[180px]">
            <button className="h-[45px] w-[175px] bg-white border-2 border-black rounded-sm text-black font-bold text-xl">
              upload
            </button>
            <div className="absolute top-[5px] left-[5px] w-[175px] h-[45px] bg-main rounded-sm border-2 border-black z-[-1]" />
          </div>
        </div>
        <div className="md:flex md:flex-row-reverse md:gap-6 md:mt-10">
          <div className="md:max-w-[324px]">
            <div className="mt-8">
              <PostThumbnailUpload
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                error={error || undefined}
              />
              <PostTitleEditor title={title} setTitle={setTitle} error={error || undefined} />
              <PostCategorySelect
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                error={error || undefined}
              />
            </div>
          </div>
          <div className="w-full border-r-2 border-black pr-6">
            <textarea className="w-full h-[500px] border-2 border-black rounded-lg bg-main p-4"></textarea>
          </div>
        </div>
      </div>
    </section>
  );
};
