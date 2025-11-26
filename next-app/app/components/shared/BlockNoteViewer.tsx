"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMemo } from "react";

interface BlockNoteViewerProps {
  content: string;
}

export default function BlockNoteViewer({ content }: BlockNoteViewerProps) {
  // JSON文字列をパースしてBlockNoteの形式に変換
  const blocks = useMemo(() => {
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [content]);

  // 読み取り専用のエディタを作成
  const editor = useCreateBlockNote({
    initialContent: blocks,
    editable: false, // 読み取り専用
  });

  return (
    <div className="prose max-w-none">
      <BlockNoteView editor={editor} editable={false} />
    </div>
  );
}
