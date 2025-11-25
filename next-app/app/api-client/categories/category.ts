// カテゴリー一覧を取得するapi
export interface Category {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  success: boolean;
  categories: Category[];
}

export const getCategories = async (url: string): Promise<CategoriesResponse> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        success: false,
        categories: [],
      };
    }
    const data: CategoriesResponse = await res.json();
    return data;
  } catch {
    return {
      success: false,
      categories: [],
    };
  }
};
