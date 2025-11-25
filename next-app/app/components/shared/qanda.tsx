"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useId, useRef, useEffect } from "react";

type Props = {
  question: string;
  answer: string;
};

export default function Qanda({ question, answer }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const OpenA = () => setIsOpen((v) => !v);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      const sh = el.scrollHeight;
      el.style.maxHeight = sh + "px";
    } else {
      el.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
    <div className="py-4">
      <div className="relative max-w-[960px] rounded-lg p-3">
        <div className="absolute inset-0 -z-10 rounded-lg bg-main/60 transform translate-x-3 translate-y-2" />
        <div className="rounded-lg border-2 border-black overflow-visible bg-white">
          <button
            className="relative w-full flex items-center justify-between px-6 py-4 rounded-lg bg-transparent"
            onClick={OpenA}
            aria-expanded={isOpen}
            aria-controls={id}
          >
            <div className="flex items-center">
              <span className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-black text-white font-medium mr-4">
                Q
              </span>
              <span className="text-left text-black leading-6">{question}</span>
            </div>
            {isOpen ? (
              <ChevronUp className="w-6 h-6 text-black shrink-0 flex" />
            ) : (
              <ChevronDown className="w-6 h-6 text-black shrink-0 flex" />
            )}
          </button>

          <div
            id={id}
            ref={contentRef}
            className="px-6 rounded-b-lg overflow-hidden bg-transparent"
            style={{ maxHeight: 0, transition: "max-height 300ms ease" }}
            aria-hidden={!isOpen}
          >
            <div className="py-3 text-left text-black leading-6">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
