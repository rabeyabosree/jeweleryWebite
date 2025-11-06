import React from "react";
import img from "../../../assets/pexels-manishjangid-30249381-removebg-preview.png";

function FestivalsOffers() {
  return (
    <div className="relative w-full bg-[#d4a373] overflow-hidden mt-14">
      {/* Content Container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-0 py-16 relative z-10">
        {/* Left Content */}
        <div className="text-center md:text-left md:max-w-lg space-y-4 pl-12">
          <h4 className="text-lg md:text-xl font-semibold text-white uppercase tracking-widest">
            10% OFF
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            New Year Sale
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Celebrate the new year with our exclusive jewelry collection. Limited time offer!
          </p>
          <button className="mt-4 px-6 py-3 bg-white text-[#d4a373] font-semibold rounded-lg shadow hover:bg-gray-100 transition-transform hover:scale-105 duration-300">
            Order Now
          </button>
        </div>
      </div>

      {/* Bottom Image */}
      <img
        src={img}
        alt="Festival Offer"
        className="absolute bottom-0 right-48 h-[380px] md:h-[400px] w-auto md:w-[400px] object-cover select-none pointer-events-none"
      />
    </div>
  );
}

export default FestivalsOffers;
