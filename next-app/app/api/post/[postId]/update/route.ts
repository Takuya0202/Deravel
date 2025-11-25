import prisma from "@/lib/db";
import { createAndUpdatePostSchema } from "@/schema/post";
import { checkLang } from "@/utils/language";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ postId: string }>;
  }
) {
  const { postId } = await params;
  const t = await getTranslations("api-post-update");
  const body = await req.json();
  const cookie = await cookies();
  const lang = checkLang(cookie.get("lang")?.value || "en-US");
  try {
    const schema = createAndUpdatePostSchema(lang);
    const validatedData = schema.safeParse(body);
    // バリデーションエラー
    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: t("validationError"),
        },
        { status: 400 }
      );
    }
    const { title, content, thumbnail, category } = validatedData.data;
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    // ユーザー取得に失敗
    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        { status: 401 }
      );
    }

    console.log("ここまでおけ");
    // 更新
    await prisma.post.update({
      where: {
        id: postId,
        profile: {
          userId: user.id,
        },
      },
      data: {
        title,
        content,
        thumbnail,
        categoryId: category,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: t("success"),
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: t("error"),
      },
      { status: 400 }
    );
  }
}
