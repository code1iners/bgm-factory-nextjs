import React from "react";
import WebHeader from "@/components/web-header";
import { useRecoilValue } from "recoil";
import { isMenuOpenedAtom } from "@/libs/clients/atoms";
import MainMenu from "../main-menu";

interface WebLayoutProps {
  children: React.ReactNode;
}

const WebLayout = ({ children }: WebLayoutProps) => {
  const isMenuOpened = useRecoilValue(isMenuOpenedAtom);
  return (
    <div className="h-screen relative">
      <WebHeader />
      <main className="relative top-[70px] h-[calc(100%-70px)] overflow-hidden">
        {isMenuOpened ? <MainMenu /> : children}
      </main>
    </div>
  );
};

export default WebLayout;
