// langu_codeが正しいかどうか確認し、正しくない場合はen-USを返す関数
export type langType = "en-US" | "ko-KR" | "zh-CN" | "zh-TW" | "ja-JP";
export const lang: langType[] = ["en-US", "ko-KR", "zh-CN", "zh-TW", "ja-JP"];

export function checkLang(langCode: string | null): langType {
  if (!langCode) {
    return "en-US";
  }

  switch (langCode) {
    case "en-US":
    case "ko-KR":
    case "zh-CN":
    case "zh-TW":
    case "ja-JP":
      return langCode;
    default:
      return "en-US";
  }
}
