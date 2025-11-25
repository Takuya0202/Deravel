"use client";
import { ChevronRight, LockIcon, MailIcon, UserIcon } from "lucide-react";
import InputLabel from "../../shared/input-label";
import { useLocale, useTranslations } from "next-intl";
import SubmitButton from "../../shared/submit-button";
import { Link, useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { createRegisterSchema, createRegisterFormSchema } from "@/schema/register";
import { checkLang } from "@/utils/language";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ValidationError from "../../shared/validation-error";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const t = useTranslations("register");
  const locale = useLocale();
  const lang = checkLang(locale);
  const [isFetching, setIsFetching] = useState(false);

  // フロントエンド用スキーマ（confirmPasswordを含む）
  const formSchema = createRegisterFormSchema(lang);
  type FormSchemaType = z.infer<typeof formSchema>;

  // サーバー用スキーマ
  const serverSchema = createRegisterSchema(lang);
  type ServerSchemaType = z.infer<typeof serverSchema>;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    // サーバー用データのみを抽出（confirmPasswordを除外）
    const serverData: ServerSchemaType = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      setIsFetching(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serverData),
        credentials: "include",
      });
      if (!response.ok) {
        toast.error(t("fetchFail"));
        return;
      }
      const result = await response.json();
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
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* ユーザー名 */}
      <div className="flex flex-col items-start space-y-1">
        <InputLabel
          id="name"
          label={t("userName")}
          icon={<UserIcon />}
          placeholder={t("userNamePlaceholder")}
          {...register("name")}
        />
        {errors.name && <ValidationError>{errors.name.message}</ValidationError>}
      </div>
      {/* メールアドレス */}
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
      {/* パスワード */}
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
      {/* 確認 */}
      <div className="flex flex-col items-start space-y-1">
        <InputLabel
          id="confirm-password"
          label={t("confirmPassword")}
          icon={<LockIcon />}
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <ValidationError>{errors.confirmPassword.message}</ValidationError>
        )}
      </div>
      {/* ログイン済みの人 */}
      <div className="w-full flex justify-end">
        <Link href="/auth/login" className="flex items-center">
          <p className="text-black ">{t("signIn")}</p>
          <ChevronRight className="text-black w-6 h-6" />
        </Link>
      </div>
      <SubmitButton text={t("signUp")} isFetching={isFetching} />
    </form>
  );
}
