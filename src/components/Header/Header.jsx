import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LoggedInUser from "./LoggedInUser";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { userDetails } = useSelector((state) => state.user);
  // useEffect(() => {
  //   console.log(userDetails);
  // }, [userDetails]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      {/* Navbar */}
      <header className="min-h-18 flex items-center justify-between px-6 py-4 bg-[#229BD3] shadow-md relative">
        <h1 className="text-2xl font-bold text-white">ShopEase</h1>

        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-white hover:underline transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white hover:underline transition-all duration-300"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-white hover:underline transition-all duration-300"
          >
            Cart
          </Link>
          <Link
            to="/about"
            className="text-white hover:underline transition-all duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:underline transition-all duration-300"
          >
            Contact
          </Link>
          {userDetails ? (
            <LoggedInUser />
          ) : (
            <Link
              to="/signup"
              className="text-white hover:underline transition-all duration-300"
            >
              Signup
            </Link>
          )}
        </nav>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none z-20"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`min-h-screen absolute top-0 left-0 w-full h-full bg-[#4e46e5e0] backdrop-blur-sm text-white flex flex-col items-center justify-center gap-8 transform transition-transform duration-500 ease-in-out z-10 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Link to="/" onClick={toggleMenu} className="text-2xl font-medium">
            Home
          </Link>
          <Link
            to="/products"
            onClick={toggleMenu}
            className="text-2xl font-medium"
          >
            Products
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="text-2xl font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="text-2xl font-medium"
          >
            Contact
          </Link>
          {userDetails ? (
            <LoggedInUser />
          ) : (
            <Link
              to="/signup"
              onClick={toggleMenu}
              className="text-2xl font-medium"
            >
              Signup
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
