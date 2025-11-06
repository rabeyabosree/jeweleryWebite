import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

function Contact() {
  return (
    <div className='min-h-screen'>
      {/* 🌟 Hero Section */}
      <div className="py-16 bg-[#d4a373] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">Contact Us</h1>
        <p className="mt-2 text-sm opacity-90">
          We’d love to hear from you! Reach out for any inquiries or assistance.
        </p>

        {/* ✅ Breadcrumb */}
        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>

      {/* 🌸 Contact Info Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12 px-6 md:px-20 bg-white text-center">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#d4a373]">📍 Our Address</h2>
          <p className="text-gray-600">123 Gold Street, Dhanmondi, Dhaka, Bangladesh</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#d4a373]">📞 Call Us</h2>
          <p className="text-gray-600">+880 1234-567890</p>
          <p className="text-gray-600">Mon - Sat (10am - 8pm)</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#d4a373]">📧 Email Us</h2>
          <p className="text-gray-600">support@jeweluxe.com</p>
        </div>
      </div>

      {/* 💌 Contact Form Section */}
      <div className="py-12 bg-[#f9f5f0] px-6 md:px-20">
        <h2 className="text-2xl font-semibold text-center text-[#d4a373] mb-8">Send Us a Message</h2>

        <form className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#d4a373]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#d4a373]"
          />
          <input
            type="text"
            placeholder="Subject"
            className="md:col-span-2 border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#d4a373]"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="md:col-span-2 border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#d4a373]"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-[#d4a373] text-white py-3 rounded-md hover:bg-[#b67e4a] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* 🗺️ Google Map Section */}
      <div className="mt-12">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902277194076!2d90.39245487495717!3d23.75086657869909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b4d799ef53%3A0x4bcb71c4a2a6f2c5!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1693326012345"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="border-none"
        ></iframe>
      </div>
    </div>
  )
}

export default Contact;
