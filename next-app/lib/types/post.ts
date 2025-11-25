/**
 * APIから取得するPost型（生データ）
 */
export interface PostFromAPI {
  id: string;
  thumbnail: string;
  title: string;
  createdAt: Date;
  profile: {
    name: string;
  };
}

/**
 * ランキングAPIから取得するPost型
 */
export interface RankingPostResponse {
  id: string;
  title: string;
  thumbnail: string;
  profile: {
    name: string;
  };
  createdAt: string | Date;
}

/**
 * 投稿一覧APIのレスポンス型
 */
export interface PostsResponse {
  success: boolean;
  posts: Post[];
  totalCount: number | null;
}

/**
 * 投稿取得APIのパラメータ型
 */
export interface FetchPostsParams {
  category: string;
  offset?: number;
  pageType?: boolean;
}

export interface FetchUserPostsParams {
  profileId: string;
  offset?: number;
}

/**
 * UIで使用するPost型（フォーマット済み）
 */
export interface Post {
  id: string;
  thumbnail: string;
  title: string;
  date: string; // フォーマット済みの日付 (yyyy.mm.dd)
  author: string;
}

/**
 * PostCardコンポーネントのProps型
 */
export type PostCardProps = Post & {
  layout: "row" | "column";
};

/**
 * FeaturedPost型（Postのエイリアス）
 */
export type FeaturedPost = Post;

/**
 * Post取得APIのレスポンス型
 */
export interface PostResponse {
  id: string;
  thumbnail: string;
  title: string;
  content: string;
  createdAt: string | Date;
  category: string;
  author: string;
}
