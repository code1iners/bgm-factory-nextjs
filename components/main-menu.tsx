import { currentInputModeAtom } from "@/libs/clients/atoms";
import {
  categoriesAtom,
  selectedCategoryAtom,
  selectedCategoryVideosSelector,
} from "@/libs/clients/atoms/categories";
import { clazz } from "@ce1pers/use-class";
import useStorage from "@/libs/clients/useStorage";
import useString from "@/libs/clients/useString";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";

// Variants
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
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};
interface MenuAddForm {
  input: string;
}

const MainMenu = () => {
  const [categories, setCategories] = useRecoilState(categoriesAtom);

  useEffect(() => {
    if (!categories.length) {
      setCategories(getStorageCategories());
    }
  }, [categories]);
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(selectedCategoryAtom);
  const selectedCategoryVideos = useRecoilValue(selectedCategoryVideosSelector);

  const [currentInputMode, setCurrentInputMode] =
    useRecoilState(currentInputModeAtom);
  const {
    addCategory,
    deleteCategory,
    addVideo,
    setCategories: setStorageCategories,
    getCategories: getStorageCategories,
  } = useStorage();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenuAddForm>();
  const { capitalizer } = useString();

  const onAddCategoryClick = () => {
    setCurrentInputMode("CATEGORY");
    setValue("input", "");
  };
  const onAddVideoClick = () => {
    setCurrentInputMode("VIDEO");
    setValue("input", "");
  };
  const onInputModalCloseClick = () => setCurrentInputMode("");
  const onVideoDeleteClick = (videoId: string) => {
    if (currentInputMode === "VIDEO") {
      // Delete selected video id.
      if (confirm(`정말로 '${videoId}' 영상을 삭제하시겠습니까?`)) {
        setCategories((prev) => {
          const newCategories = prev.map((c) => {
            const copied = { ...c };
            if (copied.name === selectedCategory.name) {
              copied.videos = [...copied.videos.filter((id) => id !== videoId)];
            }
            return copied;
          });

          // Update database.
          setStorageCategories(newCategories);

          return newCategories;
        });
      }
    }
  };
  const onCategoryDeleteClick = (category: string) => {
    if (
      confirm(`정말로 '${capitalizer(category)}' 카테고리를 삭제하시겠습니까?`)
    ) {
      // delete category.
      const ok = deleteCategory(category);
      if (ok) {
        setCategories((prev) => prev.filter((c) => c.name !== category));
        alert("정상적으로 삭제했습니다.");
      } else alert("해당 카테고리를 삭제하지 못했습니다.");
    }
  };
  const onFormValid = ({ input }: MenuAddForm) => {
    switch (currentInputMode) {
      case "CATEGORY":
        const addCategoryOk = addCategory(input);
        if (addCategoryOk) {
          setCategories((prev) => {
            const isExist = prev.some((c) => c.name === input);
            if (isExist) return prev;
            return [...prev, { name: input, videos: [] }];
          });
          alert("정상적으로 추가했습니다.");
          setValue("input", "");
        } else {
          alert(
            "카테고리를 추가하는데 실패했습니다.\n이미 존재하는 카테고리가 아닌지 확인해주세요."
          );
        }

        break;

      case "VIDEO":
        if (!selectedCategory) break;
        const { ok, data, error } = addVideo(selectedCategory.name, input);

        if (ok && data) {
          alert("정상적으로 추가되었습니다.");
          setValue("input", "");

          // Update state.
          setCategories((prev) =>
            prev.map((c) => {
              const copied = { ...c };
              if (copied.name === selectedCategory.name) {
                copied.videos = [...copied.videos, data];
              }
              return copied;
            })
          );
        } else {
          alert(error);
        }
        break;

      default:
        console.error(
          "[onFormValid]",
          `${currentInputMode}(currentInputMode) 값이 이상합니다.`
        );
        break;
    }
  };

  const onGithubClick = () => {
    window.open("https://github.com/code1iners");
  };

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

        <motion.section className="absolute bottom-0 w-full">
          <AnimatePresence>
            {currentInputMode ? (
              <motion.div
                initial={{
                  y: 200,
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: 200,
                }}
                className="w-full bg-indigo-600"
              >
                {/* Header start */}
                <div className="flex items-center justify-between p-2 border-b border-b-gray-100">
                  <h1>
                    Add
                    <strong className="ml-1 tracking-wider underline underline-offset-2">
                      {capitalizer(currentInputMode)}
                    </strong>
                  </h1>
                  <button
                    className="cursor-pointer"
                    onClick={onInputModalCloseClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Header end */}

                <div className="flex flex-col gap-5 px-5 pt-5 pb-10">
                  {/* Categories start */}
                  <section>
                    {/* Categories */}
                    <ul className="flex items-center gap-3">
                      {categories?.map(({ name, videos }) => (
                        <li
                          key={name}
                          className={clazz(
                            "cursor-pointer hover:scale-110 transition-transform flex items-center",
                            selectedCategory?.name === name.toLowerCase()
                              ? "scale-110 font-semibold underline underline-offset-1"
                              : ""
                          )}
                          onClick={() =>
                            setSelectedCategory({
                              name,
                              videos,
                            })
                          }
                        >
                          <span>{capitalizer(name)}</span>
                          {currentInputMode === "CATEGORY" ? (
                            <button
                              className="cursor-pointer"
                              onClick={() => onCategoryDeleteClick(name)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </section>
                  {/* Categories end */}

                  {/* Videos start */}
                  {selectedCategory && selectedCategoryVideos.length ? (
                    <section>
                      <motion.ul
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex items-center gap-2 "
                      >
                        {selectedCategoryVideos.map((videoId) => (
                          <motion.li
                            key={videoId}
                            variants={item}
                            whileHover={{
                              scale: currentInputMode === "VIDEO" ? 1.1 : 1,
                            }}
                            whileTap={{
                              scale: currentInputMode === "VIDEO" ? 0.9 : 1,
                            }}
                            className="flex items-center"
                          >
                            <span
                              className={clazz(
                                currentInputMode === "VIDEO"
                                  ? "cursor-pointer hover:text-red-500 hover:line-through"
                                  : "cursor-default"
                              )}
                              onClick={() => onVideoDeleteClick(videoId)}
                            >
                              {videoId}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </section>
                  ) : null}
                  {/* Videos end */}

                  {/* Form */}
                  <form onSubmit={handleSubmit(onFormValid)} className="">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        {...register("input", {
                          required: "제발 뭐라도 넣어주세요..",
                        })}
                        className="grow px-2 py-1 rounded-md outline-none text-indigo-500 tracking-wider"
                        type="text"
                        placeholder={
                          currentInputMode === "CATEGORY"
                            ? "sleep or work"
                            : "https://youtu.be/something"
                        }
                        autoCapitalize="off"
                        autoComplete="off"
                        required
                      />
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        className="bg-white text-indigo-500 px-2 py-1 rounded-md"
                        type="submit"
                      >
                        ADD
                      </motion.button>
                    </div>
                    {errors?.input ? (
                      <p className="animate-pulse text-white text-sm ml-1 mt-2 font-semibold tracking-wider">
                        {errors.input.message}
                      </p>
                    ) : null}
                  </form>
                  {/* Form end */}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.section>
      </article>
    </>
  );
};

export default MainMenu;
