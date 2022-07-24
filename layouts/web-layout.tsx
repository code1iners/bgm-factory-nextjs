import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import WebHeader from "@/layouts/web-header";
import MainMenu from "@/layouts/main-menu";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import WebFooter from "@/layouts/web-footer";
import { isDarkAtom } from "@/stores/configs/darkMode";
import makeRotateEffect from "@/libs/clients/useAnimation/helpers/clickEffect/rotate-effect";

interface WebLayoutProps {
  children: React.ReactNode;
}

const WebLayout = ({ children }: WebLayoutProps) => {
  const onMouseClick = ({ clientX, clientY }: MouseEvent) => {
    makeRotateEffect({
      x: clientX,
      y: clientY,
      dotColor: isDark ? "rgb(239 68 68)" : "rgb(99 102 241)",
    });
  };
  /**
   * Added Mouse click effect.
   */
  useEffect(() => {
    window.addEventListener("click", onMouseClick);
    return () => {
      window.removeEventListener("click", onMouseClick);
    };
  });

  const isMenuOpened = useRecoilValue(isMenuOpenedAtom);

  const isDark = useRecoilValue(isDarkAtom);
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="h-screen relative darker">
      <WebHeader />
      <main className="relative h-[calc(100%-70px)] overflow-hidden">
        {isMenuOpened ? (
          <MainMenu />
        ) : (
          <div className="flex flex-col h-full overflow-y-auto divide-y">
            <div className="grow">{children}</div>
            <WebFooter />
          </div>
        )}
      </main>
    </div>
  );
};

export default WebLayout;
