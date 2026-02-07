"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SplashScreen } from "./splash-screen";

type AppWrapperProps = {
  children: React.ReactNode;
};

export function AppWrapper({ children }: AppWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <div className="min-h-screen">
        {children}
      </div>

      {showSplash && isHomePage && <SplashScreen onComplete={handleSplashComplete} />}
    </>
  );
}
