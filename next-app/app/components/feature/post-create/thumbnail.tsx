"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface ThumbnailProps {
  setValue: (name: "thumbnail", value: string) => void;
  defaultValue?: string;
}

export default function Thumbnail({ setValue, defaultValue }: ThumbnailProps) {
  const t = useTranslations("post-create");
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || "/default-image.svg");
  const [isFetching, setIsFetching] = useState(false);
  // 画像アップロードのurl入れる
  const [publicUrl, setPublicUrl] = useState<string | null>(defaultValue || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ローカルプレビュー用の一時URLを作成
    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);
    setIsFetching(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/post/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        // publicUrlを保存
        toast.success(result.message);
        setPublicUrl(result.url);
        setValue("thumbnail", result.url);
        console.log(result.url);
      } else {
        toast.error(result.message);
        // エラーの場合はデフォルト画像に戻す
        setImageUrl("/default-image.svg");
        setPublicUrl(null);
        setValue("thumbnail", "");
      }
    } catch {
      toast.error("Upload error");
      setImageUrl("/default-image.svg");
      setPublicUrl(null);
      setValue("thumbnail", "");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <label
      htmlFor="thumbnail-file"
      className="w-full flex flex-col items-start space-y-2 cursor-pointer"
    >
      <span className="text-black">{t("thumbnail")}</span>
      <div className="w-full h-48 relative border border-black rounded-xl overflow-hidden">
        <Image src={imageUrl} alt="thumbnail" fill className="object-cover" />
        {isFetching && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white">{t("uploading")}</span>
          </div>
        )}
      </div>
      <input
        type="file"
        id="thumbnail-file"
        name="thumbnail-file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input type="hidden" id="thumbnail" name="thumbnail" value={publicUrl ?? ""} />
    </label>
  );
}
