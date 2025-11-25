import { useTranslations } from "next-intl";

export default function InputTitle({ ...props }) {
  const t = useTranslations("post-create");
  return (
    <label htmlFor="title" className="w-full flex flex-col items-start space-y-2">
      <span className="text-black">{t("title")}</span>
      <input
        type="text"
        className="w-full py-3 pl-4 border border-black rounded-xl placeholder:text-gray bg-white"
        id="title"
        name="title"
        {...props}
        placeholder={t("titlePlaceholder")}
      />
    </label>
  );
}
