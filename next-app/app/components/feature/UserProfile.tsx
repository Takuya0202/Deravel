"use client";

import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { getUser } from "@/app/api-client/user";
import { useTranslations } from "next-intl";

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserProfile = () => {
  const t = useTranslations("UseUserProfile");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="pb-10">
        <p className="font-bold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="relative pr-2 h-[59px] cursor-pointer ">
        <Link
          href={`/profile/${user?.id}`}
          className="flex items-center justify-center bg-white border-2 border-black rounded-full w-full h-[51px] hover:bg-[#E5E5E5] transition-colors duration-300 ease-in-out"
        >
          <span className="font-bold">{t("userProfile")}</span>
        </Link>
        <div className="absolute border-2 border-black top-2 left-2 w-[calc(100%-8px)] h-[51px] bg-main rounded-full z-[-1]" />
      </div>
      <div className="pb-10">
        <p className="font-bold">{user.name}</p>
        <p className="text-[#B0B0B0] text-xs">{user.email}</p>
      </div>
    </>
  );
};
