import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  // 投稿削除
  const { postId } = await params;
  const t = await getTranslations("api-post-delete");
  try {
    const supabase = await createClient();
    // ユーザー情報取得
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    // ユーザー情報が取得できない場合
    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        { status: 401 }
      );
    }

    // 投稿削除
    await prisma.post.delete({
      where: {
        id: postId,
        profile: {
          userId: user.id,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: t("success"),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: t("error"),
      },
      { status: 400 }
    );
  }
}
