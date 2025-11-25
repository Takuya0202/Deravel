import prisma from "@/lib/db";
import { createRegisterSchema } from "@/schema/register";
import { checkLang } from "@/utils/language";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookie = await cookies();
  const languCode = checkLang(cookie.get("locale")?.value ?? null);
  // 送られた言語のスキーマ作成
  const schema = createRegisterSchema(languCode);
  type schemaType = z.infer<typeof schema>;
  const t = await getTranslations("api-register");
  try {
    const validatedData = schema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: t("validationError"),
        },
        {
          status: 400,
        }
      );
    }
    // ユーザー登録
    const { name, email, password }: schemaType = validatedData.data;
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    // supabaseで失敗
    if (!user || !user.id || error) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        {
          status: 400,
        }
      );
    } else {
      await prisma.profile.create({
        data: {
          name,
          userId: user.id,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: t("success"),
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: t("error"),
      },
      {
        status: 500,
      }
    );
  }
}
