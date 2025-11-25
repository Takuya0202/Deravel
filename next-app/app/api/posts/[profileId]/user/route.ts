import prisma from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// ユーザー別の記事取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ profileId: string }> }
) {
  const { profileId } = await params;
  const { searchParams } = new URL(request.url);
  const offsetParam = searchParams.get("offset") || "0";
  const t = await getTranslations("api-posts-user");
  // 数値に変換してバリデーション。0以上の整数
  const validatedOffset = z.coerce.number().int().nonnegative().safeParse(offsetParam);
  if (!validatedOffset.success) {
    return NextResponse.json(
      {
        success: false,
        message: t("error"),
      },
      { status: 400 }
    );
  }
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        profile: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
      where: {
        profileId: profileId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: validatedOffset.data * 20,
      take: 20,
    });
    const count = await prisma.post.count({
      where: {
        profileId: profileId,
      },
    });
    const res = posts.map((post) => ({
      id: post.id,
      title: post.title,
      thumbnail: post.thumbnail,
      createdAt: post.createdAt,
      author: post.profile.name,
    }));
    return NextResponse.json(
      {
        success: true,
        posts: res,
        totalCount: count,
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
