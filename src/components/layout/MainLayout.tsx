
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/next";

interface MainLayoutProps {
  children: React.ReactNode;
  withGradient?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, withGradient = true }) => {
  return (
    <div className={`min-h-screen flex flex-col ${withGradient ? 'plateau-gradient' : 'bg-background'}`}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
