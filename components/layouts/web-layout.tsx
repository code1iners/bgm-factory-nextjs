import React from "react";
import WebHeader from "@/components/web-header";
import { useRecoilValue } from "recoil";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import MainMenu from "../main-menu";
import { version } from "@/root/package.json";

interface WebLayoutProps {
  children: React.ReactNode;
}

const WebLayout = ({ children }: WebLayoutProps) => {
  const isMenuOpened = useRecoilValue(isMenuOpenedAtom);

  return (
    <div className="h-screen relative">
      <WebHeader />
      <main className="relative h-[calc(100%-70px)] overflow-hidden">
        {isMenuOpened ? (
          <MainMenu />
        ) : (
          <div className="flex flex-col h-full overflow-y-auto divide-y">
            <div className="grow">{children}</div>
            <footer className="px-10 py-5 flex flex-col justify-center items-center gap-2">
              <span className="footer-text">Codeliners</span>
              <span className="footer-text">v{version}</span>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default WebLayout;
