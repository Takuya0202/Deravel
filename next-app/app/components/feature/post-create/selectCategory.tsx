"use client";
import { CategoriesResponse } from "@/app/api-client/categories/category";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useTranslations } from "next-intl";

interface props {
  setValue: (name: "category", value: number) => void;
  defaultValue?: number;
}
export default function SelectCategory({ setValue, defaultValue }: props) {
  const t = useTranslations("post-create");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(
    null
  );
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoading } = useSWR<CategoriesResponse>(`/api/category`, fetcher, {
    onSuccess: (data) => {
      setCategories(data.categories);
      if (defaultValue) {
        const category = data.categories.find((c) => c.id === defaultValue);
        if (category) {
          setSelectedCategory(category);
          setValue("category", category.id);
        }
      }
    },
  });

  const handleClick = () => {
    if (!isLoading && categories.length > 0) {
      setIsClicked(!isClicked);
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const handleCategoryChange = (category: { id: number; name: string }) => {
    setSelectedCategory(category);
    setValue("category", category.id);
    setIsClicked(false);
    setIsMenuOpen(false);
  };

  const shadowClasses = `
    absolute inset-0 bg-main rounded-xl border border-black transform
    ${isClicked ? "translate-y-0 translate-x-0 opacity-0" : "translate-y-2 translate-x-2 opacity-100"}
    transition duration-100
  `;

  const buttonClasses = `
    relative bg-yellow w-full py-3 pl-4 text-left border border-black rounded-xl z-10
    ${isClicked ? "translate-y-2 translate-x-2" : ""}
    transition hover:bg-[#FFD933] duration-100
    ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
  `;

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-start space-y-2">
        <span className="text-black">{t("category")}</span>
        <div className="relative w-full">
          <div className={shadowClasses} />
          <div className={buttonClasses}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start space-y-2">
      <span className="text-black">{t("category")}</span>
      <div className="relative w-full">
        <div className="relative inline-block w-full">
          <div className={shadowClasses} />
          <button type="button" className={buttonClasses} onClick={handleClick}>
            {selectedCategory ? selectedCategory.name : "Select a category"}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-full left-2 mt-4 w-full bg-main border border-black rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
            <ul className="py-1">
              {categories.map((category, index) => {
                const isFirst = index === 0;
                const isLast = index === categories.length - 1;
                const isActive = selectedCategory?.id === category.id;

                return (
                  <li
                    key={category.id}
                    className={`
                      px-4 py-2 cursor-pointer
                      ${isFirst ? "rounded-t-xl" : ""}
                      ${isLast ? "rounded-b-xl" : ""}
                      ${!isLast ? "border-b border-black" : ""}
                      ${isActive ? "bg-[#FFD933]" : "hover:bg-[#FFD933]"}
                    `}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {/* フォーム送信用のhidden input */}
        <input type="hidden" id="category" value={selectedCategory?.id || ""} />
      </div>
    </div>
  );
}
