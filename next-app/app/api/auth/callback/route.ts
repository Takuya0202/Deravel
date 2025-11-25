import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }
  // エラー時のリダイレクトURL
  const errorUrl = `${origin}/auth/auth-error`;

  if (code) {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    // エラーチェックを先に行う
    if (error) {
      console.error("Exchange code error:", error);
      return NextResponse.redirect(errorUrl);
    }

    if (user && user.id) {
      try {
        const isExistUser = await prisma.profile.findFirst({
          where: {
            userId: user.id,
          },
        });
        // ユーザーが存在しない場合はprofileテーブルにデータを追加
        if (!isExistUser) {
          // Google認証の場合、full_name、name、emailの順でフォールバック
          const name = user.user_metadata.name || "user";

          await prisma.profile.create({
            data: {
              userId: user.id,
              name: name,
            },
          });
        }
      } catch (error) {
        console.error("Prisma error:", error);
        return NextResponse.redirect(errorUrl);
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(errorUrl);
}
