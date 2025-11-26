"use client";

import { use } from "react";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import fetcher from "@/lib/fetcher";
import EditForm from "@/app/components/feature/post-create/edit-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: PageProps) {
  const { id } = use(params);
  const t = useTranslations("post-create");

  const { data, error, isLoading } = useSWR(`/api/post/${id}/edit`, fetcher);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-yellow rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red">
        {data?.message || t("error")}
      </div>
    );
  }

  return (
    <div className="h-screen">
      <EditForm post={data.post} />
    </div>
  );
}
