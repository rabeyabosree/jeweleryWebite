import React from "react";

function FestivalsOffers() {
  return (
    <div className="relative my-18 w-full bg-linear-to-r from-[#d4a373] to-[#b5835a] sm:py-20 overflow-hidden">

      {/* Floating Decorations (modern minimal shapes) */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-10 right-0 w-24 h-24 bg-white/20 rounded-full blur-lg"></div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 text-center space-y-4 relative z-10">

        <h4 className="text-white/90 text-sm sm:text-base tracking-[4px] uppercase font-semibold">
          10% OFF
        </h4>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-snug">
          New Year Sale
        </h1>

        <p className="text-white/90 max-w-xl mx-auto text-sm sm:text-base">
          Celebrate the new year with our exclusive jewelry collection.  
          Grab your favourites — offer for limited time only!
        </p>

        <button className="mt-4 px-7 py-3 bg-white text-[#d4a373] font-semibold rounded-xl shadow-md hover:bg-gray-50 transition-all duration-300 hover:scale-105">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default FestivalsOffers;

