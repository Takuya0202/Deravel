"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utiles";
import Image from "next/image";
import { Icon } from "./lucide";

interface PostThumbnailUploadProps {
  thumbnail: File | null;
  setThumbnail: (file: File | null) => void;
  error?: string;
}

export const PostThumbnailUpload = ({
  thumbnail,
  setThumbnail,
  error,
}: PostThumbnailUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (file: File) => {
    // 画像ファイルかチェック
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください");
      return;
    }

    // ファイルサイズチェック（例: 5MB以下）
    if (file.size > 5 * 1024 * 1024) {
      alert("ファイルサイズは5MB以下にしてください");
      return;
    }

    setThumbnail(file);

    // プレビュー用のURLを作成
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    setThumbnail(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label htmlFor="thumbnail" className="block">
        サムネイル
      </label>
      <div className="mt-2">
        <input
          ref={fileInputRef}
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          aria-invalid={!!error}
          aria-describedby={error ? "thumbnail-error" : undefined}
        />

        {/* アップロードエリア */}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative w-full border-2 rounded-lg cursor-pointer transition-colors",
            "bg-[#C4C4C4] min-h-[200px] flex items-center justify-center",
            isDragging ? "border-main bg-main/20" : "border-black",
            error && "border-red-500",
            previewUrl && "border-black"
          )}
        >
          {previewUrl ? (
            <div className="relative w-full h-full min-h-[200px]">
              <Image
                src={previewUrl}
                alt="サムネイルプレビュー"
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
              {/* 削除ボタン */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 right-2 px-3 py-1 bg-black/70 text-white rounded hover:bg-black/90 transition-colors"
              >
                削除
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="flex flex-col items-center gap-3">
                <Icon.ImageDown className="text-white w-25 h-25" strokeWidth={0.5} />
              </div>
            </div>
          )}
        </div>

        {error && (
          <p id="thumbnail-error" className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
