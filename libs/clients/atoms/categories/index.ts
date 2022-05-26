import { atom, selector } from "recoil";
import { Category } from "@/api/v1/categories";

export const categoriesAtom = atom<Category[]>({
  key: "categoriesAtom",
  default: [],
});

export const selectedCategoryAtom = atom<Category>({
  key: "selectedCategoryAtom",
  default: undefined,
});

export const selectedCategoryVideosSelector = selector<string[]>({
  key: "selectedCategoryVideosSelector",
  get: ({ get }) => {
    const selectedCategory = get(selectedCategoryAtom);
    const categories = get(categoriesAtom);
    return (
      categories.find((c) => c.name === selectedCategory?.name)?.videos || []
    );
  },
});
