import { currentInputModeAtom } from "@/libs/clients/atoms";
import { clazz } from "@/libs/clients/clazz";
import useStorage from "@/libs/clients/useStorage";
import useString from "@/libs/clients/useString";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "pages/api/v1/categories";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";

interface MenuAddForm {
  input: string;
}

const MainMenu = () => {
  const [currentInputMode, setCurrentInputMode] =
    useRecoilState(currentInputModeAtom);
  const { getCategoryNames, addCategory, deleteCategory, addVideo } =
    useStorage();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenuAddForm>();
  const { capitalizer } = useString();

  const onAddCategoryClick = () => setCurrentInputMode("CATEGORY");
  const onAddVideoClick = () => setCurrentInputMode("VIDEO");
  const onInputModalCloseClick = () => setCurrentInputMode("");
  const onCategoryDelete = (category: string) => {
    if (
      confirm(`정말로 '${capitalizer(category)}' 카테고리를 삭제하시겠습니까?`)
    ) {
      // delete category.
      const ok = deleteCategory(category);
      if (ok) alert("정상적으로 삭제했습니다.");
      else alert("해당 카테고리를 삭제하지 못했습니다.");
    }
  };
  const onFormValid = ({ input }: MenuAddForm) => {
    switch (currentInputMode) {
      case "CATEGORY":
        addCategory(input);
        setValue("input", "");
        break;

      case "VIDEO":
        if (!selectedCategoryName) break;
        const ok = addVideo(selectedCategoryName, input);
        if (ok) {
          alert("정상적으로 추가되었습니다.");
          setValue("input", "");
        } else {
          alert("해당 유튜브 영상 주소는 유효하지 않습니다.");
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
  return (
    <>
      <div className="relative z-10 border-t border-t-white"></div>
      <article className="relative z-10 text-white h-full">
        <ul className="grid grid-cols-1 gap-7 p-10">
          <motion.li
            onClick={onAddCategoryClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.9,
              color: "#f43f5e",
            }}
            className="main-menu-item"
          >
            Add Category
          </motion.li>
          <motion.li
            onClick={onAddVideoClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.9,
              color: "#f43f5e",
            }}
            className="main-menu-item"
          >
            Add Video
          </motion.li>
        </ul>

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
                    <ul className="flex items-center gap-3">
                      {getCategoryNames().map((categoryName) => (
                        <li
                          key={categoryName}
                          className={clazz(
                            "cursor-pointer hover:scale-110 transition-transform flex items-center",
                            selectedCategoryName === categoryName.toLowerCase()
                              ? "scale-110 font-semibold underline underline-offset-1"
                              : ""
                          )}
                          onClick={() => setSelectedCategoryName(categoryName)}
                        >
                          <span>{capitalizer(categoryName)}</span>
                          <button
                            className="cursor-pointer"
                            onClick={() => onCategoryDelete(categoryName)}
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
                        </li>
                      ))}
                    </ul>
                  </section>
                  {/* Categories end */}

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
                            ? "추가하고싶은 '카테고리'를 입력해주세요."
                            : "추가하고 싶은 '유튜브 영상 주소'를 넣어주세요."
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
