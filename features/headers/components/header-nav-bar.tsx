import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { openYoutube } from "@/utils/route-utils";
import DarkModeButton from "./dark-mode-button";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import { useRecoilValue } from "recoil";
import { clazz } from "@ce1pers/use-class";

export default function HeaderNavBar() {
  const { query } = useRouter();
  const isMenuOpened = useRecoilValue(isMenuOpenedAtom);

  return (
    <nav className="tracking-wider text-sm flex items-center gap-3">
      {/* Dark mode button */}
      <DarkModeButton />

      {/* Youtube link */}
      <motion.a
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{ scale: 0.9 }}
        className={clazz(
          "cursor-pointer inline-block select-none transition-colors hover:text-indigo-300",
          isMenuOpened ? "text-white" : ""
        )}
        onClick={() => openYoutube(query.category)}
      >
        Youtube
      </motion.a>
    </nav>
  );
}
