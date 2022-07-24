import Link from "next/link";
import { useRecoilValue } from "recoil";
import { clazz } from "@ce1pers/use-class";
import HeaderMenuButton from "@/features/headers/components/header-menu-button";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import HeaderNavBar from "@/features/headers/components/header-nav-bar";

interface WebHeaderProps {
  className?: string;
}

const WebHeader = ({ className }: WebHeaderProps) => {
  const isMenuOpened = useRecoilValue(isMenuOpenedAtom);

  return (
    <>
      <header
        className={clazz(
          "fixed top-0 left-0 w-full h-[70px] flex justify-between px-5 items-center border-b border-gray-300 z-10",
          className ? className : ""
        )}
      >
        {/* Logo */}
        <Link href="/">
          <a>
            <span
              className={clazz(
                "tracking-widest text-xl col-start-1 col-end-3 whitespace-nowrap justify-self-center cursor-pointer transition hover:text-indigo-500 hover:scale-110 dark:text-white",
                isMenuOpened ? "text-white" : "text-black"
              )}
            >
              BGM Factory
            </span>
          </a>
        </Link>

        <div className="flex items-center gap-4">
          {/* Nav bar */}
          <HeaderNavBar />

          {/* Menu icon */}
          <HeaderMenuButton />
        </div>
      </header>
      <div className="relative top-0 h-[70px]"></div>
    </>
  );
};

export default WebHeader;
