import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";

// 記事を取得。詳細。ただし、ユーザー認証をしてる。
export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ postId: string }>;
  }
) {
  const { postId } = await params;
  const t = await getTranslations("api-post-edit");

  try {
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

    // 記事を取得（所有者チェック付き）
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        profile: {
          userId: user.id,
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        thumbnail: true,
        categoryId: true,
      },
    });

    // 記事が見つからない、または所有者でない場合
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: t("success"),
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
          thumbnail: post.thumbnail,
          category: post.categoryId,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: t("error"),
      },
      { status: 500 }
    );
  }
}
