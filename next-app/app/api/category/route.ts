import prisma from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server";
// カテゴリーを取得するapi
export async function GET() {
  const t = await getTranslations("api-category");
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // nameを翻訳済みの値に置き換え
    const formattedCategories = categories.map((category) => ({
      id: category.id,
      name: t(category.name),
    }));

    return NextResponse.json(
      {
        success: true,
        categories: formattedCategories,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
