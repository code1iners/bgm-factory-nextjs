import WebLayout from "@/components/layouts/web-layout";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const Home: NextPage = () => {
  const [categories, setCategories] = useState(["work", "sleep"]);

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
          {categories.map((category, index) => (
            <Link
              key={index}
              href={{
                pathname: "bgm",
                query: {
                  category,
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
                  {category}
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
