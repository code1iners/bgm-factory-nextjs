import { useRecoilState, useRecoilValue } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { clazz } from "@ce1pers/use-class";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import { isDarkAtom } from "@/stores/configs/darkMode";

export default function HeaderMenuButton() {
  const [isMenuOpened, setIsMenuOpened] = useRecoilState(isMenuOpenedAtom);
  const isDark = useRecoilValue(isDarkAtom);

  const onMenuClick = () => {
    setIsMenuOpened((prev) => !prev);
  };

  return (
    <div className="col-start-12 col-end-13 justify-self-center transition-colors relative flex justify-center items-center">
      <button
        className={clazz(
          "cursor-pointer",
          isMenuOpened || isDark ? "text-white" : "text-black"
        )}
        onClick={onMenuClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isMenuOpened ? (
          <motion.div
            initial={{ width: 0, height: 0 }}
            animate={{ width: "1000vh", height: "1000vh" }}
            exit={{ width: 0, height: 0 }}
            transition={{
              duration: 0.6,
            }}
            className="absolute rounded-full -z-10 bg-sexy-black color-white"
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
