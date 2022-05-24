import { Category } from "@/api/v1/categories";

export const CATEGORIES_KEY = "CATEGORIES";

const useStorage = () => {
  /**
   * Getting only category names.
   */
  const getCategoryNames = () =>
    getCategories().map((category) => category.name);

  /**
   * Getting categories as string.
   */
  const getCategoriesAsString = () => localStorage.getItem(CATEGORIES_KEY);

  /**
   * Getting parsed categories.
   */
  const getCategories = (): Category[] => {
    const categories = getCategoriesAsString();
    return categories ? JSON.parse(categories) : [];
  };

  /**
   * Delete specific category.
   */
  const deleteCategory = (category: string): boolean => {
    try {
      const categories = getCategories();
      const filteredCategories = categories.filter((c) => c.name !== category);
      setCategories(filteredCategories);
      return true;
    } catch (e) {
      console.error("[deleteCategory]", e);
      return false;
    }
  };

  /**
   * Setting categories (override).
   */
  const setCategories = (categories: Category[]) =>
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));

  const addCategory = (name: string) => {
    const categories = getCategories();
    const isExist = categories.some((c) => c.name === name);
    if (isExist) return false;
    categories.push({ name: name.toLowerCase(), videos: [] });
    setCategories(categories);
    return true;
  };

  const extractVideoId = (videoUrl: string) => {
    const key = "watch?v=";
    const startIndex = videoUrl.indexOf(key);
    const endIndex = videoUrl.indexOf("&ab_channel");
    const isValid = startIndex !== -1 || endIndex !== -1;

    return isValid ? videoUrl.slice(startIndex + key.length, endIndex) : null;
  };

  const addVideo = (categoryName: string, videoUrl: string): boolean => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return false;

    const categories = getCategories();
    const modifiedCategories = categories.map((c) => {
      if (c.name === categoryName) {
        // Remove duplicates.
        c.videos.push(videoId);
        const duplicatesRemovedCategories = Array.from(new Set(c.videos));
        c.videos = [...duplicatesRemovedCategories];
      }
      return c;
    });

    setCategories(modifiedCategories);
    return true;
  };

  return {
    getCategoriesAsString,
    getCategories,
    getCategoryNames,
    deleteCategory,
    setCategories,
    addCategory,
    addVideo,
  };
};

export default useStorage;
