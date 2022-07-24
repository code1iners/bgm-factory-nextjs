import Link from "next/link";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { clazz } from "@ce1pers/use-class";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import HeaderMenu from "./header-menu";
import { useRouter } from "next/router";
import { openYoutube } from "@/utils/route-utils";

interface WebHeaderProps {
  className?: string;
}

const WebHeader = ({ className }: WebHeaderProps) => {
  const { query } = useRouter();
  const isMenuOpened = useRecoilValue(isMenuOpenedAtom);

  return (
    <>
      <header
        className={clazz(
          "fixed top-0 left-0 w-full h-[70px] flex justify-between px-5 items-center border-b border-gray-300 bg-white z-10",
          className ? className : ""
        )}
      >
        {/* Logo */}
        <Link href="/">
          <a>
            <span
              className={clazz(
                "tracking-widest text-xl col-start-1 col-end-3 whitespace-nowrap justify-self-center cursor-pointer transition hover:text-indigo-500 hover:scale-110",
                isMenuOpened ? "text-white" : "text-black"
              )}
            >
              BGM Factory
            </span>
          </a>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="tracking-wider text-sm">
            <motion.a
              whileHover={{
                scale: 1.1,
                color: "rgb(129 140 248)",
              }}
              whileTap={{ scale: 0.9, color: "rgb(79 70 229)" }}
              className="cursor-pointer inline-block text-gray-500"
              onClick={() => openYoutube(query.category)}
            >
              Youtube
            </motion.a>
          </nav>

          {/* Menu icon */}
          <HeaderMenu />
        </div>
      </header>
      <div className="relative top-0 h-[70px]"></div>
    </>
  );
};

export default WebHeader;
