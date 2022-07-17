import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import useStorage from "@/libs/clients/useStorage";
import { categoriesAtom } from "@/libs/clients/atoms/categories";
import { Category } from "@/api/v1/categories";
import {
  C_BGM_REMOVE_CONFIRM_QUESTION,
  C_BGM_REMOVE_FAILURE,
  C_BGM_REMOVE_SUCCESS,
} from "@/features/bgm/constants";

export default function BgmVideoList() {
  // Getting category from query.
  const {
    query: { category },
  } = useRouter();
  const [foundCategory, setFoundCategory] = useState<Category>();
  const { getCategories, deleteVideoById } = useStorage();
  const categories = useRecoilValue(categoriesAtom);

  useEffect(() => {
    let __categories__ = categories.length ? categories : getCategories();
    setFoundCategory(
      __categories__.find(
        (c) => c.name.toLowerCase() === String(category).toLowerCase()
      )
    );
  }, [categories, category]);

  /**
   * Open new youtube window.
   */
  const onNewVideoClick = () => {
    window.open("https://www.youtube.com", "_blank")?.focus();
  };

  /**
   * Remove video by id.
   */
  const onRemoveClick = (videoId: string) => {
    if (confirm(C_BGM_REMOVE_CONFIRM_QUESTION)) {
      const ok = deleteVideoById(category + "", videoId);
      if (ok) {
        alert(C_BGM_REMOVE_SUCCESS);
        setFoundCategory((prev) => ({
          name: prev?.name + "",
          videos:
            foundCategory?.videos.filter((video) => video !== videoId) || [],
        }));
      } else {
        alert(C_BGM_REMOVE_FAILURE);
      }
    }
  };

  return foundCategory?.videos.length ? (
    <ul className="basic-grid responsive-grid">
      {foundCategory?.videos?.map((videoId, index) => (
        <li
          key={videoId}
          className="border border-gray-300 rounded-md shadow-md "
        >
          <div>
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${
                index === 0 ? "0" : "0"
              }&controls=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Delete */}
          <div className="flex justify-center items-center">
            <button
              className="w-full py-3 flex justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition"
              onClick={() => onRemoveClick(videoId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="p-10">
      {/* m-10 h-40 flex justify-center items-center rounded-md border-4 border-dashed hover:border-dashed hover:border-purple-400 transition */}
      <h1
        className="rounded-md border-4 border-dashed hover:border-purple-400 p-10 text-2xl tracking-wider text-gray-400 hover:text-purple-500 cursor-pointer transition-colors text-center"
        onClick={onNewVideoClick}
      >
        Go add new a video.
      </h1>
    </div>
  );
}
