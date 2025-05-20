"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import HeaderNavigation from "../common/HeaderNavigation";
import ComingSoonPage from "../common/ComingSoonPage";
import { Toaster } from "react-hot-toast";

const pendingRoutes = ["/books", "/bookmark"];

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isPendingRoute = pendingRoutes.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  return (
    <div className="pt-[72px] min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <Toaster />
      <HeaderNavigation />
      <main>{isPendingRoute ? <ComingSoonPage /> : children}</main>
    </div>
  );
};

export default ClientLayout;
