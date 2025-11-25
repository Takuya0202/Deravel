import { z } from "zod";
import { langType } from "@/utils/language";
// エラーメッセージ定義
const messages = {
  "ja-JP": {
    name: {
      required: "名前が未入力です",
      max: "名前は20文字以内で入力してください",
    },
    email: {
      required: "メールアドレスが未入力です",
      invalid: "メールアドレスが不正です",
      max: "メールアドレスは255文字以内で入力してください",
    },
    password: {
      min: "パスワードは8文字以上で入力してください",
      max: "パスワードは255文字以内で入力してください",
    },
    confirmPassword: {
      required: "確認パスワードが未入力です",
      mismatch: "パスワードが一致しません",
    },
  },
  "en-US": {
    name: {
      required: "Name is required",
      max: "Name must be within 20 characters",
    },
    email: {
      required: "Email is required",
      invalid: "Invalid email address",
      max: "Email must be within 255 characters",
    },
    password: {
      min: "Password must be at least 8 characters",
      max: "Password must be within 255 characters",
    },
    confirmPassword: {
      required: "Confirm password is required",
      mismatch: "Passwords do not match",
    },
  },
  "ko-KR": {
    name: {
      required: "이름을 입력해주세요",
      max: "이름은 20자 이내로 입력해주세요",
    },
    email: {
      required: "이메일을 입력해주세요",
      invalid: "올바른 이메일 주소를 입력해주세요",
      max: "이메일은 255자 이내로 입력해주세요",
    },
    password: {
      min: "비밀번호는 8자 이상 입력해주세요",
      max: "비밀번호는 255자 이내로 입력해주세요",
    },
    confirmPassword: {
      required: "확인 비밀번호를 입력해주세요",
      mismatch: "비밀번호가 일치하지 않습니다",
    },
  },
  "zh-CN": {
    name: {
      required: "请输入姓名",
      max: "姓名请在20个字符以内输入",
    },
    email: {
      required: "请输入邮箱地址",
      invalid: "邮箱地址格式不正确",
      max: "邮箱地址请在255个字符以内输入",
    },
    password: {
      min: "密码请输入8个字符以上",
      max: "密码请在255个字符以内输入",
    },
    confirmPassword: {
      required: "请输入确认密码",
      mismatch: "密码不匹配",
    },
  },
  "zh-TW": {
    name: {
      required: "請輸入姓名",
      max: "姓名請在20個字元以內輸入",
    },
    email: {
      required: "請輸入電子郵件地址",
      invalid: "電子郵件地址格式不正確",
      max: "電子郵件地址請在255個字元以內輸入",
    },
    password: {
      min: "密碼請輸入8個字元以上",
      max: "密碼請在255個字元以內輸入",
    },
    confirmPassword: {
      required: "請輸入確認密碼",
      mismatch: "密碼不匹配",
    },
  },
};

// ユーザー登録のスキーマを生成する関数
export function createRegisterSchema(locale: langType = "en-US") {
  const msg = messages[locale];

  return z.object({
    name: z.string().min(1, { message: msg.name.required }).max(20, { message: msg.name.max }),
    email: z
      .string()
      .min(1, { message: msg.email.required })
      .email({ message: msg.email.invalid })
      .max(255, { message: msg.email.max }),
    password: z
      .string()
      .min(8, { message: msg.password.min })
      .max(255, { message: msg.password.max }),
  });
}

// フロントエンド用のスキーマ(パスワード確認付き)
export function createRegisterFormSchema(locale: langType = "en-US") {
  const msg = messages[locale];
  const serverSchema = createRegisterSchema(locale);

  return serverSchema
    .extend({
      confirmPassword: z.string().min(1, {
        message: msg.confirmPassword.required,
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: msg.confirmPassword.mismatch,
      path: ["confirmPassword"],
    });
}
