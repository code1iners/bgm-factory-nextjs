import WebLayout from "@/components/layouts/web-layout";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Category, GetCategoriesResponse } from "./api/v1/categories";

const Home: NextPage = () => {
  useEffect(() => {
    const categories = localStorage.getItem("CATEGORIES");
    if (categories?.length) {
      setCategories(JSON.parse(categories));
    } else {
      setCategoriesIntoStorage();
    }
  }, []);

  /**
   * Setting categories into local
   */
  const setCategoriesIntoStorage = async () => {
    const categories = await fetchCategories();
    localStorage.setItem("CATEGORIES", JSON.stringify(categories));
    setCategories(categories);
  };

  /**
   * Fetching categories.
   */
  const fetchCategories = async (): Promise<Category[]> => {
    const { ok, categories, error }: GetCategoriesResponse = await fetch(
      "api/v1/categories"
    ).then((res) => res.json());
    if (ok && categories) {
      console.log(categories);

      return categories;
    }
    if (error) {
      console.error("[fetchCategories]", error);
    }
    return [];
  };

  const [categories, setCategories] = useState<Category[]>();

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
      <div>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="p-10 grid gap-5 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
