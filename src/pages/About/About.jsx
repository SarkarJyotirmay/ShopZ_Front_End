import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">About ShopZ</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10">
          Welcome to <span className="font-semibold">ShopZ</span>, your go-to destination for trendy, reliable, and affordable products. 
          We're committed to bringing you the best shopping experience possible — from high-quality products to seamless checkout and fast delivery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-2">💎 Quality Products</h3>
            <p className="text-base">
              Handpicked items that guarantee quality and customer satisfaction.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-2">🚚 Fast Delivery</h3>
            <p className="text-base">
              Reliable shipping and delivery, so your products arrive on time, every time.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-2">💬 24/7 Support</h3>
            <p className="text-base">
              Got questions? Our support team is always ready to help you out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
