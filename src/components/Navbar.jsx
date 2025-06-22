import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItemClass = (path) =>
    location.pathname === path
      ? "text-white bg-blue-600 px-4 py-2 rounded-xl shadow"
      : "text-gray-300 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-xl transition";

  const handleLiveSearch = (e) => {
    const value = e.target.value;
    onSearch(value); // instantly update search
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <nav className="bg-[#111827] p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white">🖤 AyushMart</h1>

        <div className="flex gap-4 items-center">
          <Link to="/" className={navItemClass("/")}>Home</Link>
          <Link to="/add-product" className={navItemClass("/add-product")}>Add Product</Link>
          <Link to="/cart" className={navItemClass("/cart")}>Cart 🛒</Link>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          onChange={handleLiveSearch}
          className="w-full md:w-64 px-4 py-2 rounded-xl bg-[#1f2937] text-white border border-gray-500 placeholder-gray-400 outline-none"
        />
      </div>
    </nav>
  );
};

export default Navbar;
