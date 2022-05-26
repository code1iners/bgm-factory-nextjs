import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import WebLayout from "@/components/layouts/web-layout";
import { GetCategoriesResponse } from "@/api/v1/categories";
import { useRecoilState } from "recoil";
import { categoriesAtom } from "@/libs/clients/atoms/categories";
import useStorage from "@/libs/clients/useStorage";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data } = useSWR<GetCategoriesResponse>("/api/v1/categories");

  const [categories, setCategories] = useRecoilState(categoriesAtom);
  const {
    getCategories: getCategoriesStorage,
    setCategories: setCategoriesStorage,
  } = useStorage();

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 200, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // bg-gradient-to-r from-[#4e54c8] to-[#8f94fb]
  const hovering = {
    scale: 1.1,
    background:
      "linear-gradient(90deg, rgba(78,84,200,1) 0%, rgba(143,148,251,1) 100%)",
    color: "rgba(255, 255, 255)",
  };

  return (
    <WebLayout>
      <div className="h-full">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="h-full p-10 grid gap-5 justify-self-center overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {categories?.map((category, index) => (
            <Link
              key={index}
              href={{
                pathname: "bgm",
                query: {
                  category: category.name,
                },
              }}
            >
              <a>
                <motion.li
                  variants={item}
                  whileHover={hovering}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="bgm-category-box"
                >
                  {category.name}
                </motion.li>
              </a>
            </Link>
          ))}
        </motion.ul>
      </div>
    </WebLayout>
  );
};

export default Home;
