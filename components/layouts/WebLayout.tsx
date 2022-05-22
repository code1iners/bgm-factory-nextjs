import React from "react";

interface WebLayoutProps {
  children: React.ReactNode;
}

const WebLayout = ({ children }: WebLayoutProps) => {
  return <main>{children}</main>;
};

export default WebLayout;
