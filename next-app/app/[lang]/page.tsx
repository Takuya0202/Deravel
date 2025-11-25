import Image from "next/image";

import { getTranslations } from "next-intl/server";
import { ArticleList } from "@/app/components/feature/top/ArticleList";
import { FeaturedList } from "@/app/components/feature/top/FeaturedList";
import { FeaturedPosts } from "@/app/components/feature/top/FeaturedPost";
import { Ranking } from "@/app/components/feature/top/RankingSection";
import { Footer } from "@/app/components/shared/Footer";

export default async function Home() {
  const t = await getTranslations("home");
  return (
    <>
      <div className="hidden fixed top-0 left-0 w-screen h-screen md:block -z-10">
        <Image
          src="/bg.png"
          alt="background image"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
      {/* FV */}
      <section className="h-screen w-full relative">
        <Image
          src="/fv-illust.png"
          alt="FV"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="relative max-w-[1200px] mx-auto">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={550}
            height={550}
            className="absolute bottom-20 left-0 w-40vw max-w-[450px] h-auto z-10"
          />
        </div>
      </section>
      {/* FeaturedPosts */}

      <FeaturedPosts />
      {/* ArticleList*/}
      <section className="mt-15 md:pt-15 md:pb-12 relative">
        <div className="md:max-w-[1200px] mx-auto">
          <h2 className="text-[52px] px-4 font-bold">
            <span className="text-[72px]">{t("articleFirst")}</span>
            {t("articleSubTitle")}
          </h2>
          <ArticleList />
          <div className="absolute top-[25px] right-[3vw] md:top-10  md:right-[68vw]">
            <Image
              src={"/article-illust.png"}
              alt="article-illust"
              width={500}
              height={500}
              className="w-20 h-20 object-cover md:h-30 md:w-30"
            />
          </div>
        </div>
      </section>
      {/* FeaturedList*/}
      <section className="rounded-[26px] bg-main/60 backdrop-blur-md py-10 md:py-12 relative">
        <div className="md:max-w-[1200px] mx-auto">
          <h2 className="text-[28px] px-4 font-bold md:text-[40px]">
            <span className="text-[38px] md:text-[52px]">{t("featuredFirst")}</span>
            {t("featuredSubTitle")}
          </h2>
          <FeaturedList />
        </div>
        <div className="absolute top-[25px] right-[3vw] md:top-10  md:right-[10vw] flex gap-3">
          <Image
            src={"/feature1.png"}
            alt="featured-illust"
            width={500}
            height={500}
            className="w-20 h-20 object-cover hidden md:w-30 md:h-30 md:flex"
          />
          <Image
            src={"/feature2.png"}
            alt="featured-illust"
            width={500}
            height={500}
            className="w-20 h-20 object-cover md:w-30 md:h-30"
          />
        </div>
      </section>
      {/* Ranking */}
      <section className="py-10 md:pt-30 md:pb-20">
        <div className="md:max-w-[1200px] mx-auto relative">
          <h2 className="text-[52px] px-4 font-bold">
            <span className="text-[72px]">{t("rankingFirst")}</span>
            {t("rankingSubTitle")}
          </h2>
          <div className="absolute top-3 right-13 md:left-[320px] md:top-0 md:right-0 md:w-fit">
            <Image
              src="/home-ranking.png"
              alt="ranking"
              width={500}
              height={500}
              className="w-20 h-20 object-cover md:w-30 md:h-30"
            />
          </div>
          <Ranking />
        </div>
      </section>
      {/** About */}
      <section className="bg-main/60 mr-4 pl-4 rounded-r-[20px] py-30 mt-10 mb-4">
        <div className="md:max-w-[1200px] flex items-center mx-auto">
          <div className="flex-1">
            <p className="text-xl">{t("aboutText")}</p>
          </div>
          <div className="flex-1 hidden md:block">
            <Image src="/about.png" alt="about" width={500} height={500} />
          </div>
        </div>
      </section>
    </>
  );
}
