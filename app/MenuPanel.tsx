"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames"; //this is a function that we call and give it an obj

const MenuPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const currentPath = usePathname(); //we can only use browser APIs in client components
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={closeMenu} // Added overlay div with onClick to close the menu
        />
      )}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        // transition={{ type: "spring", stiffness: 300, damping: 30 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg z-40"
      >
        <div className="p-4 pt-16">
          <h2 className="text-2xl font-bold">Menu</h2>
          <ul className="mt-4">
            {links.map((link) => (
              <li key={link.href} className="py-1">
                <Link
                  onClick={closeMenu}
                  className={classNames({
                    // "nav-link": true,
                    "text-white": link.href === currentPath,
                    "text-gray-400": link.href !== currentPath,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default MenuPanel;
