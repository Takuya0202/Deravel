import { z } from "zod";
import { langType } from "@/utils/language";

// 画像設定
const ALLOWED_IMAGE_TYPE = ["image/jpeg", "image/png", "image/jpg"]; // jpeg,png,jpgのみ
const ALLOWED_IMAGE_SIZE = 6 * 1024 * 1024; // 6MBまで

// エラーメッセージ定義
const messages = {
  "ja-JP": {
    file: {
      notSelected: "ファイルが選択されていません。",
      invalidFormat: "画像形式が不正です。",
      tooLarge: "画像サイズが大きすぎます。",
    },
  },
  "en-US": {
    file: {
      notSelected: "File is not selected.",
      invalidFormat: "Invalid image format.",
      tooLarge: "Image size is too large.",
    },
  },
  "ko-KR": {
    file: {
      notSelected: "파일이 선택되지 않았습니다.",
      invalidFormat: "이미지 형식이 올바르지 않습니다.",
      tooLarge: "이미지 크기가 너무 큽니다.",
    },
  },
  "zh-CN": {
    file: {
      notSelected: "未选择文件。",
      invalidFormat: "图片格式不正确。",
      tooLarge: "图片大小过大。",
    },
  },
  "zh-TW": {
    file: {
      notSelected: "未選擇檔案。",
      invalidFormat: "圖片格式不正確。",
      tooLarge: "圖片大小過大。",
    },
  },
};

// アップロードスキーマを生成する関数
export function createUploadSchema(locale: langType = "en-US") {
  const msg = messages[locale];

  return z.object({
    file: z
      .custom<File>()
      .refine((file) => file.size > 0, { message: msg.file.notSelected })
      .refine((file) => ALLOWED_IMAGE_TYPE.includes(file.type), {
        message: msg.file.invalidFormat,
      })
      .refine((file) => file.size <= ALLOWED_IMAGE_SIZE, {
        message: msg.file.tooLarge,
      }),
  });
}
