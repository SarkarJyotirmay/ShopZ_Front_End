import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">ShopSmart</h2>
          <p className="text-sm text-gray-300">
            Your one-stop solution for smart shopping. Trendy products. Seamless experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-blue-500">FAQ</Link></li>
            <li><Link to="/policy" className="hover:text-blue-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/electronics" className="hover:text-blue-500">Electronics</Link></li>
            <li><Link to="/fashion" className="hover:text-blue-500">Fashion</Link></li>
            <li><Link to="/home" className="hover:text-blue-500">Home & Kitchen</Link></li>
            <li><Link to="/beauty" className="hover:text-blue-500">Beauty</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-gray-300">
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-700"><FaTwitter /></a>
            <a href="#" className="hover:text-[#c91cc6]"><FaInstagram /></a>
            <a href="#" className="hover:text-green-500"><FaGithub /></a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShopSmart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
