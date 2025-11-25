"use client";
import { ChevronRight, LockIcon, MailIcon } from "lucide-react";
import InputLabel from "../../shared/input-label";
import { useLocale, useTranslations } from "next-intl";
import SubmitButton from "../../shared/submit-button";
import { Link, useRouter } from "@/i18n/routing";
import { useState } from "react";
import { createLoginSchema } from "@/schema/login";
import { checkLang } from "@/utils/language";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../shared/validation-error";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [isFetching, setIsFetching] = useState(false);
  const t = useTranslations("login");
  const router = useRouter();
  const locale = useLocale();
  const lang = checkLang(locale);
  const schema = createLoginSchema(lang);
  type schemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onsubmit = async (data: schemaType) => {
    try {
      setIsFetching(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        toast.error(t("fetchFail"));
        return;
      }
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        router.push(`/profile/${result.user.id}`);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(t("fetchError"));
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <form
      className="flex flex-col items-start space-y-4 w-full max-w-[400px]"
      onSubmit={handleSubmit(onsubmit)}
    >
      {/*  メールアドレス */}
      <div className="flex flex-col items-start space-y-1">
        <InputLabel
          id="email"
          label={t("email")}
          icon={<MailIcon />}
          placeholder={t("emailPlaceholder")}
          {...register("email")}
        />
        {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
      </div>
      {/*  パスワード */}
      <div className="flex flex-col items-start space-y-1">
        <InputLabel
          id="password"
          label={t("password")}
          icon={<LockIcon />}
          type="password"
          placeholder={t("passwordPlaceholder")}
          {...register("password")}
        />
        {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
      </div>
      {/* 新規登録の人 */}
      <div className="w-full flex justify-end">
        <Link href="/auth/register" className="flex items-center">
          <p className="text-black ">{t("signIn")}</p>
          <ChevronRight className="text-black w-6 h-6" />
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <SubmitButton text={t("signIn")} isFetching={isFetching} />
      </div>
    </form>
  );
}
