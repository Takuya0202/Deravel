import { createUploadSchema } from "@/schema/upload";
import { checkLang } from "@/utils/language";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  const cookie = await cookies();
  const lang = checkLang(cookie.get("lang")?.value || "en-US");
  const schema = createUploadSchema(lang);
  const t = await getTranslations("api-post-upload");
  try {
    const validatedData = schema.safeParse({ file });
    // バリデーションエラーまたはファイルが存在しない場合
    if (!validatedData.success || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: t("validationError"),
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        { status: 401 }
      );
    }
    const userId = user.id;
    // ファイルの拡張子を取得
    const ext = file.name.split(".").pop();
    // パスの作成
    const path = `${userId}/${Date.now()}.${ext}`;
    // uplaod
    const { data, error: uploadError } = await supabase.storage.from("post").upload(path, file, {
      upsert: false,
      cacheControl: "3600",
    });
    if (uploadError) {
      return NextResponse.json(
        {
          success: false,
          message: t("error"),
        },
        { status: 500 }
      );
    }
    // 公開urlの取得
    const {
      data: { publicUrl },
    } = supabase.storage.from("post").getPublicUrl(path);
    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
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
      { status: 500 }
    );
  }
}
