"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  title: string;
  searchPlaceholder?: string;
  children: React.ReactNode;
}

export default function Layout({ title, searchPlaceholder, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      <main className="main-content">
        <Header
          title={title}
          searchPlaceholder={searchPlaceholder}
          onMenuClick={toggleMobileMenu}
        />
        <div className="content">
          {children}
        </div>
      </main>
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
      )}
    </div>
  );
}

