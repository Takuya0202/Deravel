"use client";

import { getUser } from "@/app/api-client/user"
import BackButton from "./backButton";
import { UploadButton } from "@/app/components/shared/uploadButton";
import InputTitle from "./input-title";
import SelectCategory from "./selectCategory";
import Thumbnail from "./thumbnail";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useLocale } from "next-intl";
import { checkLang } from "@/utils/language";
import { createAndUpdatePostSchema } from "@/schema/post";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ValidationError from "@/app/components/shared/validation-error";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";

// Articleコンポーネントだけをクライアントサイドでのみロード
const Article = dynamic(() => import("./article"), {
  ssr: false,
});

export default function CreateForm() {
  const router = useRouter();
  const locale = useLocale();
  const lang = checkLang(locale);
  const schema = createAndUpdatePostSchema(lang);
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onsubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        const user = await getUser();
        toast.success(result.message);
        router.push(`/profile/${user.id}`);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("error");
    }
  };
  return (
    <form className="w-[80%] mx-auto h-full flex flex-col pb-10" onSubmit={handleSubmit(onsubmit)}>
      <div className="flex items-center justify-between mb-5 shrink-0">
        <BackButton />
        <UploadButton />
      </div>
      <div className="flex items-start justify-between flex-1">
        <div className="w-[70%] h-full pr-8 border-r-2 border-r-black">
          <Article setValue={setValue} error={errors.content?.message} />
        </div>
        <div className="w-[30%] flex flex-col space-y-4 pl-8">
          <div className="w-full flex flex-col items-start space-y-1">
            <InputTitle {...register("title")} />
            {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <SelectCategory setValue={setValue} />
            {errors.category && <ValidationError>{errors.category.message}</ValidationError>}
          </div>
          <div className="w-full flex flex-col items-start space-y-1">
            <Thumbnail setValue={setValue} />
            {errors.thumbnail && <ValidationError>{errors.thumbnail.message}</ValidationError>}
          </div>
        </div>
      </div>
    </form>
  );
}
