import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

import img1 from "../../assets/pexels-arif-13595689.jpg";
import img2 from "../../assets/pexels-photographer-7258926.jpg";
import img3 from "../../assets/pexels-kunal-lakhotia-781256899-32989029.jpg";
import img4 from "../../assets/pexels-ishhaara-jewellery-2151367824-33154633.jpg";
import img5 from "../../assets/pexels-creative-wedding-films-188401661-11365012.jpg";
import img6 from "../../assets/pexels-mlkbnl-12194304.jpg";

function Footer() {
  const instaImages = [img1, img2, img3, img4, img5, img6];

  return (
    <footer className="mt-16 w-full bg-[#e7e4e0]">
      {/* Subscribe Section */}
      <div className="bg-[#d4a373] py-10 sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between px-4 sm:px-6 text-white gap-6">

          {/* Left Text */}
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
              Subscribe for Updates
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Get the latest offers, product releases, and style inspiration.
            </p>
          </div>

          {/* Subscribe Input */}
          <div className="flex w-full max-w-md mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-3 w-full rounded-l-lg outline-none border border-gray-200 text-gray-700 text-sm sm:text-base"
            />
            <button className="bg-gray-900 px-4 sm:px-6 py-3 text-sm sm:text-base rounded-r-lg hover:bg-gray-800 transition font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="py-10 sm:py-12 text-center px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Shop Our Instagram
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 max-w-6xl mx-auto">
          {instaImages.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`insta-${i}`}
                className="w-full h-28 sm:h-40 md:h-44 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-[#fff8f2] text-gray-900 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-3">Shop</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Necklaces</li>
              <li>Bracelets</li>
              <li>Earrings</li>
              <li>Rings</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-3">About</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-3">Support</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping & Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-3">Follow Us</h4>
            <div className="flex gap-4 text-lg sm:text-xl">
              <FaInstagram className="hover:text-[#d4a373] cursor-pointer" />
              <FaFacebookF className="hover:text-[#d4a373] cursor-pointer" />
              <FaTwitter className="hover:text-[#d4a373] cursor-pointer" />
              <FaPinterestP className="hover:text-[#d4a373] cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-xs sm:text-sm text-gray-500 mt-8 border-t border-gray-300 pt-4">
          © {new Date().getFullYear()} Jewelora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
