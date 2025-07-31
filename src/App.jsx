import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

const AnimatedRoutes = ({ searchTerm }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/products" /> : <Home />}
        />

        {/* Protected Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList searchTerm={searchTerm} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-product/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="bg-[#0f0f0f] min-h-screen text-white">
        <Navbar onSearch={setSearchTerm} />
        <AnimatedRoutes searchTerm={searchTerm} />
        <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
