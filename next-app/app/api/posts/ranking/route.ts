import prisma from "@/lib/db";
import { checkLang } from "@/utils/language";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const daysParams = searchParams.get("days"); //3日間か、7日間かどちらかのランキングが入る。
    const cookie = await cookies();
    const languCode = checkLang(cookie.get("locale")?.value ?? null);
    const days = Number(daysParams);

    // 今日から7日前
    const DaysAgo = new Date(); //現在日の取得
    DaysAgo.setDate(DaysAgo.getDate() - days);

    const rankingPosts = await prisma.post.findMany({
      where: {
        views: {
          some: {
            createdAt: {
              gte: DaysAgo,
            },
          },
        },
        language: {
          name: languCode,
        },
      },
      select: {
        id: true,
        thumbnail: true,
        title: true,
        createdAt: true,
        profile: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          views: {
            _count: "desc",
          },
        },
      ],
      take: 10,
    });
    const res = rankingPosts.map((post) => ({
      id: post.id,
      thumbnail: post.thumbnail,
      title: post.title,
      createdAt: post.createdAt,
      author: post.profile.name,
    }));
    return Response.json(
      {
        success: true,
        posts: res,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    console.error("Error in ranking API:", e);
    const message = e instanceof Error ? e.message : "エラーが発生しました";
    return Response.json({ success: false, message }, { status: 500 });
  }
}
