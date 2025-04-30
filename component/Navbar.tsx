import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 lg:p-8 flex items-center justify-between">
      <Link href={"/"} className="tracking-tighter text-lg">
        Art__Pill__Recreation
      </Link>

      <Link href={"/"} className="text-[10px] uppercase">
        By Wahala Dev
      </Link>
    </nav>
  );
}
