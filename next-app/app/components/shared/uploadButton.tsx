"use client";

export function UploadButton() {
  return (
    <div className="relative w-[235px] h-12 sm:h-16">
      <div className="absolute inset-0 bg-main rounded-lg border border-black transform translate-x-2 sm:translate-x-3 translate-y-2" />
      <button
        className="absolute inset-0 bg-white rounded-lg border border-black flex items-center justify-center text-lg sm:text-2xl font-medium hover:bg-[#e5e5e5]"
        type="submit"
      >
        upload
      </button>
    </div>
  );
}
