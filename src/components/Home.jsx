import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products"); // 🔥 Redirect if logged in
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1e1e2f] to-[#111827] text-white px-4 py-20 flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center space-y-16">

        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Welcome to AyushMart 🛍️
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Experience lightning-fast shopping with <span className="text-blue-400 font-semibold">React + Spring Boot</span>. 
            Secure. Sleek. Supercharged.
          </p>

          <div className="flex justify-center gap-6 pt-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-md transition duration-300"
            >
              🔐 Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold shadow-md transition duration-300"
            >
              📝 Register
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left mt-10 px-4">
          {[
            {
              icon: "🛡️",
              title: "Secure Auth",
              desc: "JWT-based authentication ensures tight protection.",
            },
            {
              icon: "📸",
              title: "Image Uploads",
              desc: "Upload product images easily with REST APIs.",
            },
            {
              icon: "🚀",
              title: "Fast UI",
              desc: "Blazing speed with React + Tailwind magic.",
            },
            {
              icon: "🧠",
              title: "Smart Search",
              desc: "Live filtering powered by smart logic.",
            },
            {
              icon: "🛒",
              title: "Cart System",
              desc: "Instant add-to-cart with localStorage support.",
            },
            {
              icon: "🎯",
              title: "Admin Panel",
              desc: "Manage everything from one powerful dashboard.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1f2937] bg-opacity-70 p-6 rounded-2xl backdrop-blur-md border border-gray-600 hover:scale-[1.02] transition duration-300"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
