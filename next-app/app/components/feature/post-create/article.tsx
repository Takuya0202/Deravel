"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTranslations } from "next-intl";
import ValidationError from "@/app/components/shared/validation-error";
import { useEffect } from "react";

interface props {
  setValue: (name: "content", value: string) => void; // または具体的な型を指定
  error?: string;
  defaultValue?: string;
}

export default function Article({ setValue, error, defaultValue }: props) {
  const t = useTranslations("post-create");
  const editor = useCreateBlockNote({
    initialContent: defaultValue ? JSON.parse(defaultValue) : undefined,
    uploadFile: async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/post/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }
      return data.url;
    },
  });

  // マウント時に初期値
  useEffect(() => {
    if (editor) {
      setValue("content", JSON.stringify(editor.document));
    }
  }, [editor, setValue]);

  return (
    <div className="h-full w-full flex flex-col space-y-4 ">
      <div className="flex items-center space-x-2 shrink-0">
        <span className="text-black">{t("articleContent")}</span>
        {error && <ValidationError>{error}</ValidationError>}
      </div>
      <div className="h-full">
        <BlockNoteView
          editor={editor}
          className="h-full [&_.bn-editor]:h-full [&_.bn-editor]:py-4 [&_.bn-editor]:px-2 [&_.bn-editor]:overflow-y-scroll [&_.bn-editor]:max-h-[calc(100vh-200px)]"
          onChange={() => {
            // 内容がからであるかどうかのチェック。からの場合は空文字列を設定。
            const hasContent = editor.document.some(
              (b) =>
                !Array.isArray(b.content) ||
                b.content.some((c) => c.type !== "text" || c.text.trim() !== "")
            );
            setValue("content", hasContent ? JSON.stringify(editor.document) : "");
          }}
        />
      </div>
    </div>
  );
}
