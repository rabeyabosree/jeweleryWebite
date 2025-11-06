import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import img1 from '../../assets/craftjewery.jpg'
import img2 from '../../assets/jewelery.jpg'

function About() {
  return (
    <div className="min-h-screen bg-[#fff8f0]">
      {/* Hero Section */}
      <div className="py-16 bg-[#d4a373] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">About Us</h1>
        <p className="mt-2 text-sm opacity-90">
          Discover the story, passion, and craftsmanship behind our timeless jewelry
        </p>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center text-sm mt-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/about" className="hover:underline">
            About
          </a>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto py-16 px-6 space-y-16">
        {/* Story Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-[#b58457] mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Founded in 2020, <span className="font-semibold">Elegance Jewelers</span> 
            began as a small family passion for handcrafted ornaments. Over the years, 
            we’ve grown into a trusted destination for timeless jewelry that blends 
            tradition, modernity, and emotion. Each creation tells a story of love, 
            confidence, and personal style — made to be treasured for a lifetime.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={img1}
            alt="Crafting jewelry"
            className="w-full rounded-lg shadow-lg object-cover h-[300px]"
          />
          <div>
            <h2 className="text-3xl font-semibold text-[#b58457] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to create jewelry that celebrates life’s most 
              precious moments. From ethically sourced gemstones to finely 
              crafted metals, we are dedicated to offering pieces that radiate 
              beauty, meaning, and craftsmanship. We believe true elegance 
              comes from authenticity and care in every detail.
            </p>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[#b58457] mb-4">
              Handcrafted Perfection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Every jewelry piece we design is a work of art, handcrafted by 
              skilled artisans who pour their passion into every curve, cut, 
              and polish. Combining age-old techniques with modern design, we 
              ensure each creation stands out for its quality and uniqueness.
            </p>
          </div>
          <img
            src={img2}
            alt="Jewelry artisan"
            className="w-full rounded-lg shadow-lg object-cover h-[300px]"
          />
        </section>

        {/* Values Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-[#b58457] mb-6">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Authenticity", desc: "Each piece is made with genuine craftsmanship and passion." },
              { title: "Sustainability", desc: "We use ethically sourced materials and eco-friendly processes." },
              { title: "Trust", desc: "Your satisfaction and confidence in our brand matter most." },
              { title: "Elegance", desc: "Timeless designs that express beauty, confidence, and grace." },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-[#d4a373] mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-[#b58457] mb-3">
            Discover Your Perfect Piece
          </h2>
          <p className="text-gray-700 mb-6">
            Explore our latest jewelry collection and find the one that speaks to your heart.
          </p>
          <a
            href="/shop"
            className="bg-[#d4a373] text-white px-6 py-2 rounded-md hover:bg-[#b58457] transition"
          >
            Shop Now
          </a>
        </section>
      </div>
    </div>
  );
}

export default About;
