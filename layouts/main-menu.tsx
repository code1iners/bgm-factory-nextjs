import { motion, AnimatePresence } from "framer-motion";

// Variants
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const MainMenu = () => {
  const onGithubClick = () => window.open("https://github.com/code1iners");

  return (
    <>
      <div className="relative z-10 border-t border-t-white"></div>
      <article className="relative z-10 text-white h-full">
        <AnimatePresence>
          <ul className="grid grid-cols-1 gap-7 p-10">
            <motion.li
              variants={item}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.9,
                color: "#f43f5e",
              }}
              className="main-menu-item"
              onClick={onGithubClick}
            >
              <span>GITHUB</span>
            </motion.li>
          </ul>
        </AnimatePresence>
      </article>
    </>
  );
};

export default MainMenu;
