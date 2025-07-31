import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { toast } from "react-toastify";

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  const navItemClass = (path) =>
    location.pathname === path
      ? "text-white bg-blue-600 px-4 py-2 rounded-xl shadow"
      : "text-gray-300 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-xl transition";

  const handleLiveSearch = (e) => {
    const value = e.target.value;
    if (onSearch) onSearch(value);
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    logoutUser();
    toast.info("👋 Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-[#111827] p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white">🖤 AyushMart</h1>

        <div className="flex flex-wrap gap-4 items-center">
          {/* 👀 Public-only links */}
          {!isLoggedIn && (
            <>
              <Link to="/" className={navItemClass("/")}>Home</Link>
              <Link to="/about" className={navItemClass("/about")}>About</Link>
              <Link to="/contact" className={navItemClass("/contact")}>Contact</Link>
              <Link to="/login" className={navItemClass("/login")}>Login</Link>
              <Link to="/register" className={navItemClass("/register")}>Register</Link>
            </>
          )}

          {/* 🔒 Logged-in only links */}
          {isLoggedIn && (
            <>
              <Link to="/products" className={navItemClass("/products")}>Products</Link>
              <Link to="/add-product" className={navItemClass("/add-product")}>Add Product</Link>
              <Link to="/cart" className={navItemClass("/cart")}>Cart 🛒</Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* 🔍 Search input only for logged-in users */}
        {isLoggedIn && (
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleLiveSearch}
            className="w-full md:w-64 px-4 py-2 rounded-xl bg-[#1f2937] text-white border border-gray-500 placeholder-gray-400 outline-none"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
