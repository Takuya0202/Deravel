import "./globals.css";
import { Button } from "../components/shared/langButton";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-base min-h-screen flex flex-col">
      <div className="flex justify-end px-6 py-4">
        <Button />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="font-bold text-4xl flex items-center justify-center">
            <span className="font-medium">4</span>
            <Search strokeWidth={1} size={32} />
            <span className="font-medium">4</span>
          </div>

          <div className="font-medium text-xl mt-2">NOT FOUND</div>
          <div className="font-medium text-sm mt-2">
            The page you are looking for could not be found
          </div>
          <div className="py-8" />
          <div>
            <button className="bg-white border-2 border-black px-6 py-3 rounded-xl hover:bg-[#e5e5e5]">
              Return to top page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
