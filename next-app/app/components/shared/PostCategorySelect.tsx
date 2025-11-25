"use client";

import { cn } from "@/lib/utiles";

export interface Category {
  id: number;
  name: string;
}

interface PostCategorySelectProps {
  categories: Category[];
  selectedCategory: number | null;
  setSelectedCategory: (category: number) => void;
  error?: string;
}

export const PostCategorySelect = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  error,
}: PostCategorySelectProps) => {
  return (
    <div className="mt-5">
      <label htmlFor="" className="block">
        Category
      </label>
      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className={cn(
          "w-full px-4 py-3 border border-black rounded-lg bg-main mt-2 focus:outline-main",
          error && "border-red-500"
        )}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
