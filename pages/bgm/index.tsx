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
  }, [categories, category]);

  return (
    <WebLayout>
      {foundCategory?.videos ? (
        <ul className="p-10 grid gap-10 responsive-grid overflow-y-scroll h-full">
          {foundCategory?.videos?.map((videoId, index) => (
            <li className="" key={videoId}>
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
        <div className="p-10 flex justify-center">
          <h1 className="text-2xl tracking-wider">No data</h1>
        </div>
      )}
    </WebLayout>
  );
};

export default BgmIndex;
