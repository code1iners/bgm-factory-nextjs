import WebLayout from "@/components/layouts/web-layout";
import { categoriesAtom } from "@/libs/clients/atoms/categories";
import useStorage from "@/libs/clients/useStorage";
import { useRouter } from "next/router";
import { Category } from "pages/api/v1/categories";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const BgmIndex = () => {
  // Getting category from query.
  const {
    query: { category },
  } = useRouter();
  const [foundCategory, setFoundCategory] = useState<Category>();
  const { getCategories } = useStorage();
  const categories = useRecoilValue(categoriesAtom);

  useEffect(() => {
    let __categories__ = categories.length ? categories : getCategories();
    setFoundCategory(
      __categories__.find(
        (c) => c.name.toLowerCase() === String(category).toLowerCase()
      )
    );
  }, [categories, category, getCategories]);

  /**
   * Open new youtube window.
   */
  const onNewVideoClick = () => {
    window.open("https://www.youtube.com", "_blank")?.focus();
  };

  return (
    <WebLayout>
      {foundCategory?.videos.length ? (
        <ul className="basic-grid responsive-grid">
          {foundCategory?.videos?.map((videoId, index) => (
            <li key={videoId}>
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
            </li>
          ))}
        </ul>
      ) : (
        <div className="m-10 h-40 flex justify-center items-center rounded-md border-4 border-dashed hover:border-dashed hover:border-purple-400 transition">
          <h1
            className="text-2xl tracking-wider text-gray-400 hover:text-purple-500 cursor-pointer transition-colors"
            onClick={onNewVideoClick}
          >
            Go add new a video.
          </h1>
        </div>
      )}
    </WebLayout>
  );
};

export default BgmIndex;
