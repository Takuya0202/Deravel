import React from "react";

interface props {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: "text" | "password";
  placeholder: string;
  className?: string;
}

export default function InputLabel({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  ...props
}: props) {
  return (
    <div className="flex flex-col items-start space-y-1">
      <label htmlFor={id} className="flex items-center space-x-2 px-2">
        <span className="text-gray w-6 h-6">{icon}</span>
        <span className="text-black">{label}</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="border border-black rounded-xl w-[400px] py-3 pl-[18px] placeholder:text-gray text-gray"
        {...props}
      />
    </div>
  );
}
