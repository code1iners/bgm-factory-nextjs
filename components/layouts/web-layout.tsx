import React from "react";
import WebHeader from "@/components/web-header";

interface WebLayoutProps {
  children: React.ReactNode;
}

const WebLayout = ({ children }: WebLayoutProps) => {
  return (
    <div className="h-screen relative">
      <WebHeader />
      <main className="relative top-[70px] h-[calc(100%-70px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default WebLayout;
