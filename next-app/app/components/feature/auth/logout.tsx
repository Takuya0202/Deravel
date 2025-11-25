"use client";
import { useRouter } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/client";
import { useTranslations } from "next-intl";

import { useState } from "react";

export default function Logout() {
  const t = useTranslations("Logout");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative pr-2 h-[59px] cursor-pointer ">
      <button
        onClick={handleLogout}
        disabled={isSubmitting}
        className="flex items-center justify-center bg-white border-2 border-black rounded-full w-full h-[51px] hover:bg-[#E5E5E5] transition-colors duration-300 ease-in-out"
      >
        <span>{t("logout")}</span>
      </button>
      <div className="absolute border-2 border-black top-2 left-2 w-[calc(100%-8px)] h-[51px] bg-main rounded-full z-[-1]" />
    </div>
  );
}
