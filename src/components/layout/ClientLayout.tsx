"use client";

import { ReactNode } from "react";

import HeaderNavigation from "../common/HeaderNavigation";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-[72px] min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <HeaderNavigation />
      <main>{children}</main>
    </div>
  );
};

export default ClientLayout;
