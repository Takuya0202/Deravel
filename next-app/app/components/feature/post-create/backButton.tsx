"use client";

import { useRouter } from "@/i18n/routing";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// 戻るボタン
export default function BackButton() {
  const router = useRouter();
  const t = useTranslations("post-create");
  return (
    <button className="flex items-center space-x-4" onClick={() => router.back()}>
      <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center">
        <ChevronLeft className="w-6 h-6 text-black" />
      </div>
      <span className="text-xl text-black tracking-widest">{t("back")}</span>
    </button>
  );
}
