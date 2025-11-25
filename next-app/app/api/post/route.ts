// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/db"; // ← あなたの prisma クライアント
import { createClient } from "@/utils/supabase/server";
import { checkLang } from "@/utils/language";
import { createAndUpdatePostSchema } from "@/schema/post";
import { getTranslations } from "next-intl/server";

export async function POST(request: Request) {
  const t = await getTranslations("api-post"); //messagesフォルダの各言語jsonのapi-postを探し、userが使っている言語(cookieから取得)を取ってこれる。
  try {
    // ① Supabase からログイン中のユーザー取得
    const supabase = await createClient();
    // ユーザー情報取得
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error)
      return NextResponse.json(
        {
          success: false,
          messages: t("error"),
        },
        { status: 401 }
      );

    // -------------------------
    // ② リクエスト取得
    // -------------------------
    const body = await request.json();

    // -------------------------
    // ③ Zod バリデーション
    // -------------------------
    const cookie = await cookies();
    const lang = checkLang(cookie.get("locale")?.value || "en-US");
    const schema = createAndUpdatePostSchema(lang);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        { status: 400 }
      );
    }
    // ここは正確なデータ
    const { thumbnail, title, content, category } = parsed.data;

    // ④ supabase.user.id から Profile を特定
    const profile = await prisma.profile.findFirst({
      select: {
        id: true,
      },
      where: { userId: user.id },
    });
    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          messages: t("error"),
        },
        { status: 400 }
      );
    }

    // language取得
    const language = await prisma.language.findFirst({
      select: {
        id: true,
      },
      where: {
        name: lang,
      },
    });

    if (!language) {
      return NextResponse.json(
        {
          success: false,
          messages: t("error"),
        },
        { status: 400 }
      );
    }

    // ⑤ Post を作成
    const newPost = await prisma.post.create({
      data: {
        thumbnail,
        title,
        content,
        profileId: profile.id,
        categoryId: category,
        languageId: language.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: t("success"),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        messages: t("error"),
      },
      { status: 500 }
    );
  }
}
