import { createLoginSchema } from "@/schema/login";
import { checkLang } from "@/utils/language";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookie = await cookies();
  const languCode = checkLang(cookie.get("locale")?.value ?? null);
  const schema = createLoginSchema(languCode);
  type schemaType = z.infer<typeof schema>;
  const t = await getTranslations("api-login");
  try {
    const validatedData = schema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: t("validationError"),
        },
        { status: 400 }
      );
    }
    const { email, password }: schemaType = validatedData.data;
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!user || error) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: t("success"),
        },
        {
          status: 200,
        }
      );
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: t("error"),
      },
      {
        status: 500,
      }
    );
  }
}
