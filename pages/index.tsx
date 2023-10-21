import type { NextPage } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import { useForm } from "react-hook-form";

import { GetCategoriesResponse } from "@/api/v1/categories";
import BgmCategoryList from "@/features/bgm/components/bgm-category-list";
import HorizontalItemAddForm from "@/features/bgm/components/horizontal-item-add-form";
import { CategoryAddForm } from "@/features/bgm/types";
import {
  C_BGM_REGISTER_SUCCESS,
  C_BGM_CATEGORY_FORM_INVALID_DUPLICATE,
  C_BGM_CATEGORY_FORM_INVALID_REQUIRED,
  C_BGM_CATEGORY_FORM_INVALID_MAX_LENGTH,
} from "@/features/bgm/constants";
import WebLayout from "@/layouts/web-layout";
import { categoriesAtom } from "@/libs/clients/atoms/categories";
import useStorage from "@/libs/clients/useStorage";

const Home: NextPage = () => {
  const { data } = useSWR<GetCategoriesResponse>("/api/v1/categories");
  const setCategories = useSetRecoilState(categoriesAtom);
  const {
    getCategories: getCategoriesStorage,
    setCategories: setCategoriesStorage,
    addCategory,
  } = useStorage();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryAddForm>();

  useEffect(() => {
    const stored = getCategoriesStorage();
    if (stored.length) {
      setCategories(stored);
    } else {
      setCategoriesIntoStore();
    }
  }, [data]);

  /**
   * Setting categories into local
   */
  const setCategoriesIntoStore = async () => {
    if (data?.categories) {
      setCategories(data?.categories);
      setCategoriesStorage(data?.categories);
    }
  };

  const onSubmit = ({ categoryName }: CategoryAddForm) => {
    const ok = addCategory(categoryName);
    if (ok) {
      setCategories((prev) => [...prev, { name: categoryName, videos: [] }]);
      setValue("categoryName", "");
      alert(C_BGM_REGISTER_SUCCESS);
    } else {
      alert(C_BGM_CATEGORY_FORM_INVALID_DUPLICATE);
    }
  };

  return (
    <WebLayout>
      <article className="h-full flex flex-col divide-y">
        {/* Item add form */}
        <HorizontalItemAddForm
          onSubmit={handleSubmit(onSubmit)}
          register={register("categoryName", {
            required: C_BGM_CATEGORY_FORM_INVALID_REQUIRED,
            maxLength: {
              message: C_BGM_CATEGORY_FORM_INVALID_MAX_LENGTH,
              value: 20,
            },
          })}
          placeholder="Enter category name"
          error={errors.categoryName?.message}
        />

        {/* Category list */}
        <BgmCategoryList />
      </article>
    </WebLayout>
  );
};

export default Home;
