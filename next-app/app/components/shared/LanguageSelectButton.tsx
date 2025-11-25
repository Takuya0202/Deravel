"use client";
import { useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

const languages = [
  { code: "zh-TW", label: "中文（繁體）" },
  { code: "zh-CN", label: "中文（简体）" },
  { code: "ko-KR", label: "한국어" },
  { code: "ja-JP", label: "日本語" },
  { code: "en-US", label: "English" },
];

export const LanguageSelectButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (code: string) => {
    router.push(pathname, { locale: code });
    setIsClicked(false);
    setIsMenuOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const shadowClasses = `
    absolute inset-0 bg-main rounded-full border border-black transform
    ${isClicked ? "translate-y-0 translate-x-0 opacity-0" : "translate-y-2 translate-x-2 opacity-100"}
    transition duration-100
  `;

  const buttonClasses = `
    relative bg-white rounded-full px-10 py-1 border border-black z-10
    ${isClicked ? "translate-y-2 translate-x-2" : ""}
    transition hover:bg-[#e5e5e5] duration-100
  `;

  return (
    <div className="relative inline-block cursor-pointer">
      <div className="relative inline-block">
        <div className={shadowClasses} />
        <button className={buttonClasses} onClick={handleClick}>
          {currentLanguage.label}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-2 mt-4 w-40 bg-main border border-black rounded-xl shadow-lg z-20">
          <ul className="py-1">
            {languages.map((lang, index) => {
              const isFirst = index === 0;
              const isLast = index === languages.length - 1;
              const isActive = lang.code === locale;

              return (
                <li
                  key={lang.code}
                  className={`
                    px-4 py-2 cursor-pointer
                    ${isFirst ? "rounded-t-xl" : ""}
                    ${isLast ? "rounded-b-xl" : ""}
                    ${!isLast ? "border-b border-black" : ""}
                    ${isActive ? "bg-[#FFD933]" : "hover:bg-[#FFD933]"}
                  `}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
