import React from "react";
import { FaShippingFast, FaShieldAlt, FaLock } from "react-icons/fa";

function FeaturesSection() {
  const features = [
    {
      icon: <FaShippingFast className="text-4xl text-[#d4a373]" />,
      title: "Free Delivery",
      desc: "Enjoy fast and free delivery on all your orders, straight to your doorstep.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-[#d4a373]" />,
      title: "Quality Guarantee",
      desc: "Every product is crafted with care and guaranteed to meet the highest standards.",
    },
    {
      icon: <FaLock className="text-4xl text-[#d4a373]" />,
      title: "Secure Payment",
      desc: "Shop with confidence—your payment details are always safe and encrypted.",
    },
  ];

  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 text-center">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#f3f3f3] py-10 px-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;

