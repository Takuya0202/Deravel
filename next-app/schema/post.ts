import { z } from "zod";
import { langType } from "@/utils/language";

// エラーメッセージ定義
const messages = {
  "ja-JP": {
    title: {
      required: "タイトルは必須です。",
      max: "タイトルは255文字以内で入力してください。",
    },
    content: {
      required: "内容は必須です。",
    },
    thumbnail: {
      required: "画像は必須です。",
      max: "画像は255文字以内で入力してください。",
    },
    category: {
      required: "カテゴリーは必須です。",
    },
  },
  "en-US": {
    title: {
      required: "Title is required.",
      max: "Title must be within 255 characters.",
    },
    content: {
      required: "Content is required.",
    },
    thumbnail: {
      required: "Image is required.",
      max: "Image must be within 255 characters.",
    },
    category: {
      required: "Category is required.",
    },
  },
  "ko-KR": {
    title: {
      required: "제목을 입력해주세요.",
      max: "제목은 255자 이내로 입력해주세요.",
    },
    content: {
      required: "내용을 입력해주세요.",
    },
    thumbnail: {
      required: "이미지를 입력해주세요.",
      max: "이미지는 255자 이내로 입력해주세요.",
    },
    category: {
      required: "카테고리를 입력해주세요.",
    },
  },
  "zh-CN": {
    title: {
      required: "请输入标题。",
      max: "标题请在255个字符以内输入。",
    },
    content: {
      required: "请输入内容。",
    },
    thumbnail: {
      required: "请输入图片。",
      max: "图片请在255个字符以内输入。",
    },
    category: {
      required: "请输入类别。",
    },
  },
  "zh-TW": {
    title: {
      required: "請輸入標題。",
      max: "標題請在255個字元以內輸入。",
    },
    content: {
      required: "請輸入內容。",
    },
    thumbnail: {
      required: "請輸入圖片。",
      max: "圖片請在255個字元以內輸入。",
    },
    category: {
      required: "請輸入類別。",
    },
  },
};

// 投稿作成のスキーマを生成する関数
export function createAndUpdatePostSchema(locale: langType = "en-US") {
  const msg = messages[locale];

  return z.object({
    title: z.string().min(1, { message: msg.title.required }).max(255, { message: msg.title.max }),
    content: z.string().min(1, { message: msg.content.required }),
    thumbnail: z
      .string()
      .min(1, { message: msg.thumbnail.required })
      .max(255, { message: msg.thumbnail.max }),
    category: z.number().min(1, { message: msg.category.required }),
  });
}
