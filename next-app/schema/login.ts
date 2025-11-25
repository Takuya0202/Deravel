import { z } from "zod";
import { langType } from "@/utils/language";

// エラーメッセージ定義
const messages = {
  "ja-JP": {
    email: {
      required: "メールアドレスが未入力です",
      invalid: "メールアドレスが不正です",
      max: "メールアドレスは255文字以内で入力してください",
    },
    password: {
      required: "パスワードが未入力です",
      min: "パスワードは8文字以上で入力してください",
      max: "パスワードは255文字以内で入力してください",
    },
  },
  "en-US": {
    email: {
      required: "Email is required",
      invalid: "Invalid email address",
      max: "Email must be within 255 characters",
    },
    password: {
      required: "Password is required",
      min: "Password must be at least 8 characters",
      max: "Password must be within 255 characters",
    },
  },
  "ko-KR": {
    email: {
      required: "이메일을 입력해주세요",
      invalid: "올바른 이메일 주소를 입력해주세요",
      max: "이메일은 255자 이내로 입력해주세요",
    },
    password: {
      required: "비밀번호를 입력해주세요",
      min: "비밀번호는 8자 이상 입력해주세요",
      max: "비밀번호는 255자 이내로 입력해주세요",
    },
  },
  "zh-CN": {
    email: {
      required: "请输入邮箱地址",
      invalid: "邮箱地址格式不正确",
      max: "邮箱地址请在255个字符以内输入",
    },
    password: {
      required: "请输入密码",
      min: "密码请输入8个字符以上",
      max: "密码请在255个字符以内输入",
    },
  },
  "zh-TW": {
    email: {
      required: "請輸入電子郵件地址",
      invalid: "電子郵件地址格式不正確",
      max: "電子郵件地址請在255個字元以內輸入",
    },
    password: {
      required: "請輸入密碼",
      min: "密碼請輸入8個字元以上",
      max: "密碼請在255個字元以內輸入",
    },
  },
};

// ログインのスキーマを生成する関数
export function createLoginSchema(locale: langType = "en-US") {
  const msg = messages[locale];

  return z.object({
    email: z
      .string()
      .min(1, { message: msg.email.required })
      .email({ message: msg.email.invalid })
      .max(255, { message: msg.email.max }),
    password: z
      .string()
      .min(1, { message: msg.password.required })
      .min(8, { message: msg.password.min })
      .max(255, { message: msg.password.max }),
  });
}
