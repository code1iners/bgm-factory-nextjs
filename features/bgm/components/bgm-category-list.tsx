import Link from "next/link";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { categoriesAtom } from "@/libs/clients/atoms/categories";

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
  hidden: { y: -100, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

// bg-gradient-to-r from-[#4e54c8] to-[#8f94fb]
const hovering = {
  scale: 1.1,
  background:
    "linear-gradient(90deg, rgba(78,84,200,1) 0%, rgba(143,148,251,1) 100%)",
  color: "rgba(255, 255, 255)",
};

export default function BgmCategoryList() {
  const categories = useRecoilValue(categoriesAtom);
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="basic-grid responsive-grid auto-rows-min"
    >
      {categories?.map((category) => (
        <li className="min-h-[200px]" key={category.name}>
          <Link
            href={{
              pathname: "bgm",
              query: {
                category: category.name,
              },
            }}
          >
            <motion.a
              variants={item}
              whileHover={hovering}
              whileTap={{
                scale: 0.9,
              }}
              className="rounded-md h-full w-full flex justify-center items-center cursor-pointer shadow-md"
            >
              <span className="select-none text-2xl tracking-wider uppercase">
                {category.name}
              </span>
            </motion.a>
          </Link>
        </li>
      ))}
    </motion.ul>
  );
}
