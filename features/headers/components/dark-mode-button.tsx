import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { isDarkAtom } from "@/stores/configs/darkMode";
import { clazz } from "@ce1pers/use-class";
import { useEffect } from "react";

const IS_DARK = "IS_DARK";

export default function DarkModeButton() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  /**
   * Init is dark or light.
   */
  useEffect(() => {
    const isStoredDark = localStorage.getItem(IS_DARK);
    if (isStoredDark !== null) setIsDark(isStoredDark === "true");
  }, [setIsDark]);

  const toggleDark = () =>
    setIsDark((prev) => {
      localStorage.setItem(IS_DARK, !prev + "");
      return !prev;
    });

  return (
    <div
      className={clazz(
        "flex items-center rounded-full border-2 border-gray-300 w-11 cursor-pointer",
        isDark ? "justify-start" : "justify-end"
      )}
      onClick={toggleDark}
    >
      {/* Light */}
      {isDark ? (
        <motion.svg
          layoutId="icon"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 border dark:bg-white text-orange-300 rounded-full p-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      ) : (
        <motion.svg
          layoutId="icon"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 bg-slate-700 text-orange-300 rounded-full p-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>
      )}
    </div>
  );
}
