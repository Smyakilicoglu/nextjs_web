"use client";
import React from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const router = useTransitionRouter();

  function triggerPageTransition(): void {
    document.documentElement.animate(
      [
        { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleNavigation =
    (path: string) =>
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
      if (pathname === path) {
        e.preventDefault();
        return;
      }
      router.push(path, { onTransitionReady: triggerPageTransition });
    };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" onClick={handleNavigation("/")}>
          <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
        </Link>
        <div className="flex gap-6">
          <Link href="/" onClick={handleNavigation("/")} className="hover:text-brand">Ana Sayfa</Link>
          <Link href="/projeler" onClick={handleNavigation("/projeler")} className="hover:text-brand">Projeler</Link>
          <Link href="/hizmetler" onClick={handleNavigation("/hizmetler")} className="hover:text-brand">Hizmetler</Link>
          <Link href="/iletisim" onClick={handleNavigation("/iletisim")} className="hover:text-brand">İletişim</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
