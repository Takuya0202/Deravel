"use client";

import { cn } from "@/lib/utiles";

interface PostTitleEditorProps {
  title: string;
  setTitle: (title: string) => void;
  error?: string;
}

export const PostTitleEditor = ({ title, setTitle, error }: PostTitleEditorProps) => {
  return (
    <div>
      <label htmlFor="title" className="block ">
        タイトル
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={cn(
          "w-full px-4 py-3 border border-black rounded-lg bg-white mt-2 focus:outline-main",
          error && "border-red-500"
        )}
      />
    </div>
  );
};
