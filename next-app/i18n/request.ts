import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { cookies } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  // まずcookieからlocaleを取得
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  // cookieがあればそれを使用、なければrequestLocaleを使用
  const requested = cookieLocale || (await requestLocale);

  // サポートされている言語かチェックし、未対応の場合はデフォルト言語を使用
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
