"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: {
  [key: string]: {
    name: string;
  };
} = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/guestbook": {
    name: "guestbook",
  },
};

export default function Navbar() {
  let pathname = usePathname();
  if (pathname.includes("/blog")) {
    pathname = "/blog";
  }
  console.log(pathname);

  return (
    <aside className="-ml-[8px]  lg:top-20 mb-16 tracking-tight">
      <div className="">
        <LayoutGroup>
          <nav className="flex flex-row items-start scroll-pr-6" id="nav">
            <div className="flex flex-row">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle",
                      { "text-neutral-500": !isActive }
                    )}
                  >
                    <span className="relative px-2 py-1">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 z-[-1] dark:bg-neutral-700 dark:bg-gradient-to-r from-transparent to-neutral-900"
                          layoutId="sidebar"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}
