import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${id}`)
      .then((res) => {
        const data = res.data;
        // Ensure date is in YYYY-MM-DD for input
        if (data.releasedDate) {
          data.releasedDate = new Date(data.releasedDate).toISOString().split("T")[0];
        }
        setProduct(data);
      })
      .catch((err) => {
        toast.error("Error fetching product");
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("p", new Blob([JSON.stringify(product)], { type: "application/json" }));
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    await axios.put(`http://localhost:8080/api/product/${id}`, formData);
    toast.success("Product updated successfully!");
    navigate(`/product/${id}`);
  } catch (error) {
    console.error("Update error:", error);
    toast.error("Update failed. Check all fields.");
  }
};


  if (!product) return <div className="text-white text-center p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#1e1e2f] p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-4">✏️ Update Product</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            className="bg-[#2a2a3c] text-white p-3 rounded-xl"
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <input
            className="bg-[#2a2a3c] text-white p-3 rounded-xl"
            name="brand"
            placeholder="Brand"
            value={product.brand}
            onChange={handleChange}
          />
          <input
            className="bg-[#2a2a3c] text-white p-3 rounded-xl"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />
          <input
            className="bg-[#2a2a3c] text-white p-3 rounded-xl"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />
          <input
            className="bg-[#2a2a3c] text-white p-3 rounded-xl"
            name="releasedDate"
            type="date"
            value={product.releasedDate}
            onChange={handleChange}
          />
          <input
            className="bg-[#2a2a3c] text-white p-3 rounded-xl"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </div>

        <textarea
          className="bg-[#2a2a3c] text-white p-3 rounded-xl w-full"
          name="description"
          rows="3"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        ></textarea>

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="available"
            checked={product.available}
            onChange={handleChange}
          />
          <label className="text-gray-300">Available</label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Change Image (optional):</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="bg-[#2a2a3c] p-2 rounded-xl text-white w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 w-full py-3 rounded-xl font-semibold transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
