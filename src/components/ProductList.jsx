import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/product/search?keyword=${searchTerm}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <motion.div
      className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-10 text-white drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          🛍️ Explore Our Products
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative group bg-[#1e1e2f] border border-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-300 p-5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={`http://localhost:8080/api/product/${product.id}/image`}
                  alt={product.name}
                  className="rounded-xl h-48 w-full object-cover mb-4 border border-gray-700"
                />
              </Link>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
              <p className="text-sm text-gray-300 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-400">₹{product.price}</span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    product.available
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {product.available ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* 🛒 Animated Cart Button */}
              <motion.button
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-blue-700 hover:bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                🛒 Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductList;
