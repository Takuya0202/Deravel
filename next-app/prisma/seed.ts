import prisma from "../lib/db";
import { randomUUID } from "crypto";

async function main() {
  // 言語の作成
  const languages = ["en-US", "ko-KR", "zh-CN", "zh-TW", "ja-JP"];

  const languageMap: Record<string, number> = {};
  for (const lang of languages) {
    const language = await prisma.language.upsert({
      where: { id: 0 }, // ダミー（実際にはnameで検索できないため）
      update: {},
      create: {
        name: lang,
      },
    });
    languageMap[lang] = language.id;
  }

  // カテゴリの作成
  const categories = ["food", "cafe", "culture", "guide", "shopping", "stories"];

  const categoryMap: Record<string, number> = {};
  for (const categoryName of categories) {
    const category = await prisma.category.upsert({
      where: { id: 0 }, // ダミー
      update: {},
      create: {
        name: categoryName,
      },
    });
    categoryMap[categoryName] = category.id;
  }

  // // プロフィール（ユーザー）の作成
  // const profiles = [
  //   {
  //     name: "名古屋グルメライター",
  //     message: "名古屋の美味しいお店を紹介しています",
  //     userId: randomUUID(),
  //   },
  //   {
  //     name: "Nagoya Explorer",
  //     message: "Exploring Nagoya's hidden gems",
  //     userId: randomUUID(),
  //   },
  //   {
  //     name: "名古屋カフェ巡り",
  //     message: "名古屋のカフェを巡るのが趣味です",
  //     userId: randomUUID(),
  //   },
  // ];

  // const createdProfiles = [];
  // for (const profileData of profiles) {
  //   const profile = await prisma.profile.upsert({
  //     where: { userId: profileData.userId },
  //     update: {},
  //     create: profileData,
  //   });
  //   createdProfiles.push(profile);
  // }

  // // 投稿データの作成
  // const posts = [
  //   // 日本語の投稿
  //   {
  //     title: "がっつり・こってり・名古屋めし！",
  //     thumbnail: "/dummy.png",
  //     content:
  //       "名古屋の名物グルメを紹介します。味噌カツ、ひつまぶし、きしめんなど、名古屋ならではの料理を楽しめます。",
  //     categoryId: categoryMap["food"],
  //     languageId: languageMap["ja-JP"],
  //     profileId: createdProfiles[0].id,
  //   },
  //   {
  //     title: "名古屋の隠れたカフェ巡り",
  //     thumbnail: "/dummy.png",
  //     content: "名古屋には素敵なカフェがたくさんあります。今回は隠れた名店を紹介します。",
  //     categoryId: categoryMap["cafe"],
  //     languageId: languageMap["ja-JP"],
  //     profileId: createdProfiles[2].id,
  //   },
  //   {
  //     title: "名古屋の歴史と文化を巡る",
  //     thumbnail: "/dummy.png",
  //     content: "名古屋城や熱田神宮など、名古屋の歴史的な場所を巡る旅の記録です。",
  //     categoryId: categoryMap["culture"],
  //     languageId: languageMap["ja-JP"],
  //     profileId: createdProfiles[0].id,
  //   },
  //   {
  //     title: "名古屋観光完全ガイド",
  //     thumbnail: "/dummy.png",
  //     content: "名古屋を訪れる際に知っておきたい観光スポットやアクセス方法をまとめました。",
  //     categoryId: categoryMap["guide"],
  //     languageId: languageMap["ja-JP"],
  //     profileId: createdProfiles[0].id,
  //   },
  //   {
  //     title: "名古屋のショッピングスポット",
  //     thumbnail: "/dummy.png",
  //     content: "名古屋でおすすめのショッピングモールや商店街を紹介します。",
  //     categoryId: categoryMap["shopping"],
  //     languageId: languageMap["ja-JP"],
  //     profileId: createdProfiles[0].id,
  //   },
  //   {
  //     title: "名古屋での日常を切り取る",
  //     thumbnail: "/dummy.png",
  //     content: "名古屋での生活の様子や、地元の人々との交流の記録です。",
  //     categoryId: categoryMap["stories"],
  //     languageId: languageMap["ja-JP"],
  //     profileId: createdProfiles[0].id,
  //   },
  //   // 英語の投稿
  //   {
  //     title: "Nagoya's Famous Food Scene",
  //     thumbnail: "/dummy.png",
  //     content:
  //       "Discover Nagoya's unique food culture including miso katsu, hitsumabushi, and kishimen noodles.",
  //     categoryId: categoryMap["food"],
  //     languageId: languageMap["en-US"],
  //     profileId: createdProfiles[1].id,
  //   },
  //   {
  //     title: "Hidden Cafes in Nagoya",
  //     thumbnail: "/dummy.png",
  //     content: "Explore the charming cafes scattered throughout Nagoya city.",
  //     categoryId: categoryMap["cafe"],
  //     languageId: languageMap["en-US"],
  //     profileId: createdProfiles[1].id,
  //   },
  //   {
  //     title: "Exploring Nagoya's History and Culture",
  //     thumbnail: "/dummy.png",
  //     content: "A journey through Nagoya Castle, Atsuta Shrine, and other historical sites.",
  //     categoryId: categoryMap["culture"],
  //     languageId: languageMap["en-US"],
  //     profileId: createdProfiles[1].id,
  //   },
  //   {
  //     title: "Complete Nagoya Travel Guide",
  //     thumbnail: "/dummy.png",
  //     content:
  //       "Everything you need to know about visiting Nagoya's top attractions and how to get there.",
  //     categoryId: categoryMap["guide"],
  //     languageId: languageMap["en-US"],
  //     profileId: createdProfiles[1].id,
  //   },
  //   {
  //     title: "Best Shopping Spots in Nagoya",
  //     thumbnail: "/dummy.png",
  //     content: "Recommended shopping malls and shopping streets in Nagoya.",
  //     categoryId: categoryMap["shopping"],
  //     languageId: languageMap["en-US"],
  //     profileId: createdProfiles[1].id,
  //   },
  //   {
  //     title: "A Day in the Life of Nagoya",
  //     thumbnail: "/dummy.png",
  //     content: "Capturing the daily life and local interactions in Nagoya.",
  //     categoryId: categoryMap["stories"],
  //     languageId: languageMap["en-US"],
  //     profileId: createdProfiles[1].id,
  //   },
  // ];

  // // 投稿を作成
  // const createdPosts = [];
  // for (const postData of posts) {
  //   const post = await prisma.post.create({
  //     data: postData,
  //   });
  //   createdPosts.push(post);
  // }

  // // Viewデータの作成（ランキング用）
  // // 各投稿に対して、複数のプロフィールが閲覧した記録を作成
  // const views = [];
  // const now = new Date();

  // for (let i = 0; i < createdPosts.length; i++) {
  //   const post = createdPosts[i];

  //   // 人気度に応じて閲覧数を変える（最初の投稿ほど多くの閲覧数）
  //   const viewCount = Math.floor(Math.random() * 50) + (createdPosts.length - i) * 10;

  //   // 閲覧したプロフィールをランダムに選択（重複なし）
  //   const viewerProfiles = [...createdProfiles];
  //   const shuffled = viewerProfiles.sort(() => Math.random() - 0.5);
  //   const selectedViewers = shuffled.slice(0, Math.min(viewCount, viewerProfiles.length));

  //   // 同じプロフィールが同じ投稿を複数回閲覧する場合
  //   for (let j = 0; j < viewCount; j++) {
  //     const viewer = selectedViewers[j % selectedViewers.length];

  //     // 過去7日以内のランダムな日時に設定
  //     const daysAgo = Math.floor(Math.random() * 7);
  //     const hoursAgo = Math.floor(Math.random() * 24);
  //     const minutesAgo = Math.floor(Math.random() * 60);
  //     const createdAt = new Date(now);
  //     createdAt.setDate(createdAt.getDate() - daysAgo);
  //     createdAt.setHours(createdAt.getHours() - hoursAgo);
  //     createdAt.setMinutes(createdAt.getMinutes() - minutesAgo);

  //     views.push({
  //       profileId: viewer.id,
  //       postId: post.id,
  //       createdAt: createdAt,
  //     });
  //   }
  // }

  // // Viewを作成（重複チェック付き）
  // let createdViews = 0;
  // for (const viewData of views) {
  //   try {
  //     await prisma.view.create({
  //       data: viewData,
  //     });
  //     createdViews++;
  //   } catch (error) {
  //     // 既に存在するViewはスキップ（unique制約違反）
  //     // console.log(`View already exists: ${viewData.profileId} - ${viewData.postId}`);
  //   }
  // }

  // console.log("Seed data created successfully!");
  // console.log(`Created ${createdProfiles.length} profiles`);
  // console.log(`Created ${createdPosts.length} posts`);
  // console.log(`Created ${createdViews} views`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
