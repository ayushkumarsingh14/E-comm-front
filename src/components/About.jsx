import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-20 flex items-center justify-center">
      <div className="max-w-5xl mx-auto space-y-12 text-center">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          ℹ️ About AyushMart
        </h2>

        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          AyushMart is not just another project. It's a fully functional, full-stack e-commerce platform crafted with ❤️ by developers — for developers. Powered by
          <span className="text-blue-400 font-semibold"> Spring Boot</span> + <span className="text-blue-400 font-semibold">React.js</span>, it blends clean code, powerful features, and killer UI.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="bg-[#1e1e2f] bg-opacity-70 p-6 rounded-2xl border border-gray-700 shadow hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-4">🚀 Built For:</h3>
            <ul className="text-gray-300 text-left list-disc list-inside space-y-2">
              <li>⚙️ Developers building their portfolio</li>
              <li>🏢 Startups launching MVPs</li>
              <li>🧪 Students learning full-stack flow</li>
              <li>💼 Freelancers demoing real-world apps</li>
            </ul>
          </div>

          <div className="bg-[#1e1e2f] bg-opacity-70 p-6 rounded-2xl border border-gray-700 shadow hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-4">🔥 Tech Stack:</h3>
            <ul className="text-gray-300 text-left list-disc list-inside space-y-2">
              <li>🌐 React + Tailwind CSS + Framer Motion</li>
              <li>🧠 Spring Boot + JPA + JWT</li>
              <li>🗃️ MySQL for persistence</li>
              <li>📦 REST APIs with file upload support</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">🎯 Core Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "✅ Secure JWT Auth",
              "📸 Image Upload",
              "🛒 Cart System",
              "🧾 Product CRUD",
              "🧑‍💼 Admin/User Roles",
              "🎨 Sleek Dark UI"
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a2d] p-4 rounded-xl border border-gray-700 hover:scale-[1.03] transition"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-10">
          Made with 🖤 by <span className="text-blue-500 font-semibold">Ayush Kumar Singh</span><br />
          Coming Soon: 💳 Payment Integration, 📦 Orders, and 💖 Wishlist!
        </p>
      </div>
    </div>
  );
};

export default About;
