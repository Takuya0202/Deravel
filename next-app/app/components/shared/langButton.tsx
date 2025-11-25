"use client";
import React, { useState } from "react";

export const Button = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsMenuOpen(!isMenuOpen);
  };

  const shadowClasses = `
    absolute inset-0 bg-main rounded-full border border-black transform
    ${isClicked ? "translate-y-0 translate-x-0 opacity-0" : "translate-y-2 translate-x-2 opacity-100"}
    transition duration-100
  `;

  const buttonClasses = `
    relative bg-white rounded-full px-10 py-1 border border-black z-10
    ${isClicked ? "translate-y-2 translate-x-2" : ""}
    transition hover:bg-[#e5e5e5] duration-100
  `;

  return (
    <div className="relative inline-block">
      <div className="relative inline-block">
        <div className={shadowClasses} />
        <button className={buttonClasses} onClick={handleClick}>
          English
        </button>
      </div>
      <div className="py-1" />
      {isMenuOpen && (
        <div className="absolute top-full left-2 mt-2 p-1 w-40 bg-main border border-black rounded-xl shadow-lg z-20">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-[#FFD933] border-b border-black last:border-b-0">
              中文（繁體）
            </li>
            <li className="px-4 py-2 hover:bg-[#FFD933] border-b border-black last:border-b-0">
              中文（简体）
            </li>
            <li className="px-4 py-2 hover:bg-[#FFD933] border-b border-black last:border-b-0">
              한국어
            </li>
            <li className="px-4 py-2 hover:bg-[#FFD933] border-b border-black last:border-b-0">
              日本語
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
