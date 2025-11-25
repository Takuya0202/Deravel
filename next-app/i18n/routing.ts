import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "ko-KR", "zh-CN", "zh-TW", "ja-JP"], // ルーティングに対応する言語
  defaultLocale: "en-US",
  localePrefix: "always",
  localeCookie: {
    name: "locale",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  },
});

// next製のコンポーネントはやめて、next-intl製のコンポーネントを使用すること。
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
