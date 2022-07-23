import React from "react";
import { useRecoilValue } from "recoil";
import WebHeader from "@/components/web-header";
import MainMenu from "@/components/main-menu";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import WebFooter from "./web-footer";

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
            <WebFooter />
          </div>
        )}
      </main>
    </div>
  );
};

export default WebLayout;
