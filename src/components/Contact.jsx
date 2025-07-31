import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-20 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#1e1e2f] p-10 rounded-3xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
          📞 Contact Us
        </h2>
        <p className="text-gray-400 text-center mb-10">
          Got feedback, ideas, or just wanna roast us? Drop a message below 💬 (it’s a demo form, but we’ll pretend to read it 🤷‍♂️)
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="👤 Full Name"
            className="bg-[#2a2a3c] p-4 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="📧 Email Address"
            className="bg-[#2a2a3c] p-4 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="📍 Subject"
            className="bg-[#2a2a3c] p-4 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <textarea
            rows="5"
            placeholder="📝 Your Message..."
            className="bg-[#2a2a3c] p-4 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition duration-200"
          >
            🚀 Send Message
          </button>
        </form>

        <div className="mt-10 text-center text-gray-500 text-sm">
          This project is part of Ayush’s portfolio. Feel free to fork it, star it, or just admire it silently 🤫
        </div>
      </div>
    </div>
  );
};

export default Contact;
