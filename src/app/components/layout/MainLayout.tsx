import { ReactNode } from "react";
import NavBar from "../common/NavBar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
