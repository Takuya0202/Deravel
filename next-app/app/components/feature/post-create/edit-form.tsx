"use client";
import { getUser } from "@/app/api-client/user";
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

interface EditFormProps {
  post: {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    category: number;
  };
}

export default function EditForm({ post }: EditFormProps) {
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
    defaultValues: {
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail,
      category: post.category,
    },
  });

  const onsubmit = async (data: FormData) => {
    try {
      const res = await fetch(`/api/post/${post.id}/update`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        const user = await getUser();
        router.push(`/profile/${user.id}`);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("error");
    }
  };
  return (
    <form className="w-[80%] mx-auto h-screen flex flex-col pb-10" onSubmit={handleSubmit(onsubmit)}>
      <div className="flex items-center justify-between mb-5 shrink-0">
        <BackButton />
        <UploadButton />
      </div>
      <div className="flex items-start justify-between flex-1 h-[calc(100vh-100px)]">
        <div className="w-[70%] h-screen pr-8 border-r-2 border-r-black">
          <Article
            setValue={setValue}
            error={errors.content?.message}
            defaultValue={post.content}
          />
        </div>
        <div className="w-[30%] flex flex-col space-y-4 pl-8">
          <div className="w-full flex flex-col items-start space-y-1">
            <InputTitle {...register("title")} />
            {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <SelectCategory setValue={setValue} defaultValue={post.category} />
            {errors.category && <ValidationError>{errors.category.message}</ValidationError>}
          </div>
          <div className="w-full flex flex-col items-start space-y-1">
            <Thumbnail setValue={setValue} defaultValue={post.thumbnail} />
            {errors.thumbnail && <ValidationError>{errors.thumbnail.message}</ValidationError>}
          </div>
        </div>
      </div>
    </form>
  );
}
