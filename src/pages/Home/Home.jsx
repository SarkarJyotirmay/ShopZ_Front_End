import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-white px-6 py-20 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#4F46E5] mb-6">
            Discover the Latest Trends
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Your one-stop shop for all the freshest fashion, gadgets, and
            accessories.
          </p>
          <Link
            to="/products"
            className="inline-flex justify-center items-center px-8 py-3 rounded-full text-white font-semibold bg-[#E11D48] hover:bg-[#be123c] transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Shop Now
          </Link>
        </div>

        {/* Overlay effect */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#229BD3]/30 via-white/5
         to-[#E11D48]/30 pointer-events-none"
        ></div>
      </section>
    </div>
  );
};

export default Home;
