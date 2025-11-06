import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Sophia Williams",
    comment:
      "I absolutely love my new necklace! The craftsmanship is stunning, and it arrived beautifully packaged. The attention to detail truly exceeded my expectations. I’ll definitely be ordering again!",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Johnson",
    comment:
      "Their jewelry is elegant yet affordable. I wore the bracelet at my sister’s wedding and got so many compliments! Also, the customer service was super helpful throughout my purchase.",
    rating: 4,
  },
  {
    id: 3,
    name: "Olivia Martinez",
    comment:
      "I’m in love with the earrings I bought! The shine and finish are just perfect. Delivery was quick, and the quality feels premium. Highly recommended for anyone who loves timeless pieces.",
    rating: 5,
  },
];

function Testimonials() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="w-full bg-[#fff8f2] py-16 mt-16">
      <div className="max-w-3xl mx-auto text-center px-6 relative">
        <Slider {...settings}>
          {testimonials.map((item) => (
            <div key={item.id} className="px-4">
              <div className="flex flex-col items-center">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-4xl text-[#d4a373] mb-6" />

                {/* Comment */}
                <p className="text-gray-700 text-base md:text-lg italic leading-relaxed mb-6">
                  “{item.comment}”
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-lg" />
                  ))}
                </div>

                {/* Name */}
                <h4 className="text-gray-800 font-semibold text-lg">
                  — {item.name}
                </h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Testimonials;
