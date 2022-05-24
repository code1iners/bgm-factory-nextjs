import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { currentInputModeAtom, isMenuOpenedAtom } from "@/libs/clients/atoms";
import { clazz } from "@/libs/clients/clazz";

interface WebHeaderProps {
  className?: string;
}

const WebHeader = ({ className }: WebHeaderProps) => {
  const [isMenuOpened, setIsMenuOpened] = useRecoilState(isMenuOpenedAtom);
  const setCurrentInputMode = useSetRecoilState(currentInputModeAtom);

  const onMenuClick = () => {
    setIsMenuOpened((prev) => !prev);
    // Clear current input mode when menu close.
    if (isMenuOpened) setCurrentInputMode("");
  };

  return (
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
              "tracking-widest text-xl col-start-1 col-end-3 whitespace-nowrap justify-self-center cursor-pointer transition hover:text-red-500 hover:scale-110",
              isMenuOpened ? "text-white" : "text-black"
            )}
          >
            BGM Factory
          </span>
        </a>
      </Link>

      {/* Menu icon */}
      <div className="col-start-12 col-end-13 justify-self-center transition-colors relative flex justify-center items-center">
        <button
          className={clazz(
            "cursor-pointer",
            isMenuOpened ? "text-white" : "text-black"
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
    </header>
  );
};

export default WebHeader;
