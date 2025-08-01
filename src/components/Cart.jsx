import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-white p-10 text-2xl font-semibold">
        🛒 Your cart is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold mb-6 text-center">🛍️ Your Cart</h2>
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-[#1e1e2f] p-5 rounded-xl border border-gray-700 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://ecom-pqom.onrender.com/api/product/${item.id}/image`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl border border-gray-600"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-400 text-sm">₹{item.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(idx)}
              className="text-red-400 hover:text-red-600 font-bold text-xl"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
