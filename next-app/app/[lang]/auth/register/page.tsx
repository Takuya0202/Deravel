import GoogleLogin from "@/app/components/feature/auth/google-login";
import RegisterForm from "@/app/components/feature/auth/register-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function RegisterPage() {
  const t = await getTranslations("register");
  return (
    <main className="bg-base w-full h-screen flex items-center justify-center">
      <div className="w-[80%] max-w-[1200px] mx-auto flex justify-between max-h-[800px]">
        <div className="w-1/2 relative">
          <Image src={"/register-icon.svg"} alt={t("signUp")} fill className="object-contain" />
        </div>
        <div className="bg-[#fafafa] rounded-[60px] py-[30px] px-21 w-1/2">
          <h1 className="text-[32px] text-center">{t("signUp")}</h1>
          <RegisterForm />
          {/* border */}
          <div className="h-px w-[400px] text-center bg-gray my-4"></div>
          <GoogleLogin />
        </div>
      </div>
    </main>
  );
}
