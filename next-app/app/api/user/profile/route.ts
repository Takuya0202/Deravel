import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";

export async function GET() {
  const supabase = await createClient();
  const t = await getTranslations("api-profile"); //messagesフォルダの各言語jsonのapi-postを探し、userが使っている言語(cookieから取得)を取ってこれる。

  // Supabaseのログインユーザーを取得
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return Response.json({ success: false, message: t("error") }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id, //user.idがsupabaseから取ってきたuserのid
      },
      select: {
        id: true,
        name: true,
        message: true,
      },
    });

    // レスポンス
    return Response.json({
      success: true,
      id: profile?.id,
      name: profile?.name ?? null, // プロフィールが無い時は null
      message: profile?.message ?? null,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: t("error"),
      },
      { status: 500 }
    );
  }
}
