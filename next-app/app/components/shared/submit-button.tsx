import { cn } from "@/lib/utiles";

interface props {
  text: string;
  isFetching: boolean;
}
export default function SubmitButton({ text, isFetching }: props) {
  return (
    <button
      type="submit"
      className={cn(
        "bg-yellow w-[400px] text-center text-black rounded-lg py-3 cursor-pointer",
        isFetching && "opacity-70 cursor-not-allowed"
      )}
      disabled={isFetching}
    >
      {text}
    </button>
  );
}
