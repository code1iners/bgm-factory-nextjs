import type { NextPage } from "next";
import { createElement, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import WebLayout from "@/components/layouts/web-layout";
import { useForm } from "react-hook-form";
import { GetCategoriesResponse } from "@/api/v1/categories";
import { categoriesAtom } from "@/libs/clients/atoms/categories";
import useStorage from "@/libs/clients/useStorage";
import BgmCategoryList from "@/features/bgm/components/bgm-category-list";
import HorizontalItemAddForm from "@/features/bgm/components/horizontal-item-add-form";
import { CategoryAddForm } from "@/features/bgm/types";
import {
  C_BGM_REGISTER_SUCCESS,
  C_BGM_CATEGORY_FORM_INVALID_DUPLICATE,
  C_BGM_CATEGORY_FORM_INVALID_REQUIRED,
  C_BGM_CATEGORY_FORM_INVALID_MAX_LENGTH,
} from "@/features/bgm/constants";

interface CreateDivProps {
  x: any;
  y: any;
  d: number;
}

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

  const createDiv = ({ x, y, d }: CreateDivProps) => {
    const div = document.createElement("div");
    div.classList.add("bomb");
    div.classList.add(`animate-wiggle-${d + ""}`);
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.zIndex = "10";
    document.body.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 500);
  };

  const onTouch = (e: MouseEvent) => {
    console.log(e.clientX, e.clientY);

    createDiv({
      x: e.clientX,
      y: e.clientY,
      d: 45,
    });
    createDiv({
      x: e.clientX,
      y: e.clientY,
      d: 90,
    });
  };

  useEffect(() => {
    window.addEventListener("click", onTouch);
    return () => {
      window.removeEventListener("click", onTouch);
    };
  }, []);

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
