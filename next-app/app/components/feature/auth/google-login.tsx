"use client";
import { createClient } from "@/utils/supabase/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

// googleログインボタン
export default function GoogleLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("login");
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // nextのクエリがログイン後のリダイレクト先になる
          redirectTo: `${window.location.origin}/api/auth/callback?next=/`,
        },
      });
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isSubmitting}
      className="text-black w-[400px] rounded-lg py-3 border border-black flex items-center justify-center space-x-4"
    >
      <div className="relative w-4 h-4">
        <Image src={"/google-icon.svg"} alt={t("signInWithGoogle")} fill className="object-cover" />
      </div>
      <span>{t("signInWithGoogle")}</span>
    </button>
  );
}
