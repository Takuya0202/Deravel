"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import { cn } from "@/lib/utiles";
import { useTranslations } from "next-intl";
import { Icon } from "@/app/components/shared/lucide";
import { UserProfile } from "@/app/components/feature/UserProfile";
import { LanguageSelectButton } from "@/app/components/shared/LanguageSelectButton";

export const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();

  const navigationItems = useMemo(
    () => [
      {
        id: 1,
        href: "/posts/food",
        label: t("categories.food"),
        icon: "/category/category-food.png",
      },
      {
        id: 2,
        href: "/posts/shopping",
        label: t("categories.shopping"),
        icon: "/category/category-shopping.png",
      },
      {
        id: 3,
        href: "/posts/culture",
        label: t("categories.culture"),
        icon: "/category/category-culture.png",
      },
      {
        id: 4,
        href: "/posts/guide",
        label: t("categories.guide"),
        icon: "/category/category-guide.png",
      },
      {
        id: 5,
        href: "/posts/cafe",
        label: t("categories.cafe"),
        icon: "/category/category-cafe.png",
      },
      {
        id: 6,
        href: "/posts/stories",
        label: t("categories.stories"),
        icon: "/category/category-stories.png",
      },
    ],
    [t]
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <>
      <header className="flex sticky top-0 left-0 w-full py-2 px-4 z-50 shrink-0 bg-base">
        <div className="flex items-center justify-between gap-4 w-full">
          <Link href="/" className="cursor-pointer w-30 md:w-[200px] h-auto">
            <Image src="/logo.png" alt="logo" width={550} height={550} />
          </Link>
          <div className="flex items-center gap-8">
            <LanguageSelectButton />
            <button
              className="bg-main border-2 border-black rounded-sm w-16 h-16 flex items-center justify-center cursor-pointer focus:outline-none"
              onClick={toggleMenu}
            >
              <Icon.Menu
                className={cn(
                  "w-12 h-12 absolute transition-opacity duration-300 ease-in-out",
                  isOpen ? "opacity-0" : "opacity-100"
                )}
                strokeWidth={1}
              />
              <Icon.Bad
                className={cn(
                  "w-12 h-12 absolute transition-opacity duration-300 ease-in-out rotate-45",
                  isOpen ? "opacity-100" : "opacity-0"
                )}
                strokeWidth={1}
              />
            </button>
          </div>
        </div>
      </header>
      <div
        className={cn(
          "fixed z-40 top-0 right-0 w-full h-screen bg-base transition-all transform duration-300 ease-in-out px-4 md:max-w-[380px] md:px-8 md:rounded-bl-[40px] overflow-y-scroll",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col justify-between gap-10 pt-40 h-full">
          <div>
            <p className="font-bold text-xl ">{t("articlesByCategory")}</p>
            <nav className="pt-[10px]">
              <ul className="flex flex-col">
                {navigationItems.map((item) => (
                  <li className="text-black py-4 border-b  border-black" key={item.id}>
                    <Link href={item.href} className="flex items-center gap-[26px]">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10"
                      />
                      <span className="text-xl font-bold">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="relative pr-2 h-[59px] cursor-pointer">
            <Link
              href="/post/create"
              className="flex items-center justify-center bg-white border-2 border-black rounded-full w-full h-[51px] hover:bg-[#E5E5E5] transition-colors duration-300 ease-in-out"
            >
              <span className="font-bold">{t("newPosts")}</span>
            </Link>
            <div className="absolute border-2 border-black top-2 left-2 w-[calc(100%-8px)] h-[51px] bg-main rounded-full z-[-1]" />
          </div>
          <UserProfile />
        </div>
      </div>
    </>
  );
};
