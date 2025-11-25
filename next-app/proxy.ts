import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
export async function proxy(request: NextRequest) {
  // supabaseのセッションを更新
  const supabaseResponse = await updateSession(request);

  // supabaseミドルウェアでリダイレクトされた場合、そのまま返却させる
  if (supabaseResponse.headers.get("location")) {
    return supabaseResponse;
  }

  // next-intlミドルウェアを適応
  const intlResponse = intlMiddleware(request);

  // supabaseでレスポンスされたcookieをintlResponseにもセット
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
