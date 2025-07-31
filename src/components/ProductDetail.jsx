import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // 👈 JWT token

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 🛡️ Secure API Call
        },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Error fetching product:", err);
        toast.error("❌ Failed to load product");
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("🗑️ Product deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error("❌ Failed to delete product");
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-product/${id}`);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    toast.success("🛒 Product added to cart!");
  };

  if (!product) return <div className="text-center text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto bg-[#1e1e2f] p-10 rounded-3xl shadow-2xl">
        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={`http://localhost:8080/api/product/${product.id}/image`}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl border border-gray-700 shadow-md"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-white">{product.name}</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{product.description}</p>

            <div className="mt-6 space-y-2 text-md font-medium text-gray-400">
              <p>📦 <span className="text-white">Brand:</span> {product.brand}</p>
              <p>🏷️ <span className="text-white">Category:</span> {product.category}</p>
              <p>💰 <span className="text-white">Price:</span> ₹{product.price}</p>
              <p>📅 <span className="text-white">Released:</span> {product.releasedDate}</p>
              <p>📦 <span className="text-white">Quantity:</span> {product.quantity}</p>
              <p>
                ✅ <span className="text-white">Available:</span>{" "}
                {product.available ? (
                  <span className="text-green-400">Yes</span>
                ) : (
                  <span className="text-red-400">No</span>
                )}
              </p>
            </div>

            <div className="flex gap-4 mt-10 flex-wrap">
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-xl transition"
              >
                ✏️ Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl transition"
              >
                🗑️ Delete
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-xl transition"
              >
                🛒 Add to Cart
              </button>
              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition ml-auto"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
