import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releasedDate: "",
    available: false,
    quantity: "",
  });

  const [imageFile, setImageFile] = useState(null);

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

    if (!imageFile) {
      toast.error("Please select an image!");
      return;
    }

    if (imageFile.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB!");
      return;
    }

    const formattedDate = new Date(product.releasedDate)
      .toISOString()
      .split("T")[0];

    const processedProduct = {
      ...product,
      releasedDate: formattedDate,
    };

    const formData = new FormData();
    formData.append(
      "p",
      new Blob([JSON.stringify(processedProduct)], {
        type: "application/json",
      })
    );
    formData.append("imageFile", imageFile);

    try {
      await axios.post("http://localhost:8080/api/product", formData);
      toast.success("Product added successfully!");

      setProduct({
        name: "",
        description: "",
        brand: "",
        price: "",
        category: "",
        releasedDate: "",
        available: false,
        quantity: "",
      });
      setImageFile(null);
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#1e1e2f] p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          ➕ Add New Product
        </h2>

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

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-[#2a2a3c] p-2 rounded-xl text-white w-full"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full py-3 rounded-xl font-semibold transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
