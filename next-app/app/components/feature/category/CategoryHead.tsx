import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface CategoryHeadProps {
  category: string;
}

const categoryImages: Record<string, string> = {
  food: "/category/category-food.png",
  cafe: "/category/category-cafe.png",
  culture: "/category/category-culture.png",
  guide: "/category/category-guide.png",
  shopping: "/category/category-shopping.png",
  stories: "/category/category-stories.png",
};

export const CategoryHead = async ({ category }: CategoryHeadProps) => {
  const t = await getTranslations("categoryHead");
  const tDesc = await getTranslations("categoryDescription");

  const categoryLabel = t(category);
  const categoryDescription = tDesc(category);
  const imageSrc = categoryImages[category];

  return (
    <section className="mt-25 mb-10 px-4">
      <div className="max-w-[240px] mx-auto flex flex-col items-center justify-center md:flex-row md:gap-22 md:max-w-[1020px]">
        {/*仮 */}
        <div className="max-w-full max-h-[240px] rounded-[50px] border-2 border-black p-7 md:rounded-[70px] md:max-w-[400px] md:max-h-[400px] ">
          <Image
            src={imageSrc}
            alt="category head"
            width={500}
            height={500}
            className="md:max-w-[320px] md:max-h-[320px] "
          />
        </div>
        <div className="md:items-start text-left">
          <h1 className="font-bold text-[32px] text-center mt-11 md:text-left md:text-[72px]">
            {categoryLabel}
          </h1>
          <p className="mt-7 md:text-[20px]">{categoryDescription}</p>
        </div>
      </div>
    </section>
  );
};
