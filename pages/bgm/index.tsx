import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import WebLayout from "@/components/layouts/web-layout";
import BgmVideoList from "@/features/bgm/components/bgm-video-list";
import HorizontalItemAddForm from "@/features/bgm/components/horizontal-item-add-form";
import { VideoAddForm } from "@/features/bgm/types";
import {
  C_BGM_REGISTER_SUCCESS,
  C_BGM_REMOVE_FAILURE,
  C_BGM_REMOVE_SUCCESS,
  C_BGM_REMOVE_CONFIRM_QUESTION,
} from "@/features/bgm/constants";
import {
  categoriesAtom,
  selectedCategoryAtom,
} from "@/libs/clients/atoms/categories";
import useStorage from "@/libs/clients/useStorage";

export default function BgmIndex() {
  const { register, handleSubmit, formState, setValue } =
    useForm<VideoAddForm>();
  const { addVideo, deleteCategory } = useStorage();
  const { query, back } = useRouter();

  const setCategories = useSetRecoilState(categoriesAtom);
  const selectedCategory = useRecoilValue(selectedCategoryAtom);

  /**
   * Append video with category.
   */
  const onSubmit = ({ videoUrl }: VideoAddForm) => {
    const { ok, data, error } = addVideo(query.category + "", videoUrl);
    if (ok && data) {
      alert(C_BGM_REGISTER_SUCCESS);
      setValue("videoUrl", "");

      // Update state.
      setCategories((prev) =>
        prev.map((c) => {
          const copied = { ...c };
          if (copied.name === query.category) {
            copied.videos = [...copied.videos, data];
          }
          return copied;
        })
      );
    } else {
      alert(error);
    }
  };

  /**
   * Delete current category.
   */
  const onDeleteClick = () => {
    if (confirm(C_BGM_REMOVE_CONFIRM_QUESTION)) {
      const ok = deleteCategory(query.category + "");
      if (ok) {
        alert(C_BGM_REMOVE_SUCCESS);
        back();
      } else {
        alert(C_BGM_REMOVE_FAILURE);
      }
    }
  };

  return (
    <WebLayout>
      <article className="h-full flex flex-col divide-y">
        <section className="w-full">
          {/* Form */}
          <HorizontalItemAddForm
            register={register("videoUrl", {
              required: "Video url is required.",
            })}
            onSubmit={handleSubmit(onSubmit)}
            error={formState.errors.videoUrl?.message}
            placeholder="Enter youtube video shared URL"
          />

          <div className="px-10 pb-5 flex justify-center">
            <button
              className="text-xs tracking-wider text-gray-400 transition hover:scale-110 hover:text-red-500"
              onClick={onDeleteClick}
            >
              Delete this category
            </button>
          </div>
        </section>

        {/* Video list */}
        <BgmVideoList />
      </article>
    </WebLayout>
  );
}
