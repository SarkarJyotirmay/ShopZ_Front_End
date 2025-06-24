import React, { useState } from "react";
import {
  FaTag,
  FaAlignLeft,
  FaDollarSign,
  FaPercent,
  FaStar,
  FaBoxes,
  FaTrademark,
  FaListAlt,
  FaImage,
  FaImages,
} from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const AddProduct = () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    discountPercentage: 0,
    rating: -1,
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: [""],
  }
  const [formData, setFormData] = useState({...initialState});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // api call
    // show toast
    // clear from
   await axiosInstance.post("/products/create", formData)
  };

  // Input field reusable
  const renderInput = (
    name,
    type,
    placeholder,
    Icon,
    value,
    required,
    min,
    max
  ) => (
    <div className="relative">
      <Icon className="absolute top-3.5 left-3 text-gray-400" />
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        min={min}
        max={max}
        className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800 shadow-sm transition-all placeholder:text-gray-400"
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-3xl shadow-2xl mt-12">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {renderInput(
            "title",
            "text",
            "Product Title",
            FaTag,
            formData.title,
            true
          )}
          <div className="relative">
            <FaAlignLeft className="absolute top-3.5 left-3 text-gray-400" />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800 shadow-sm transition-all placeholder:text-gray-400 resize-none h-28"
            />
          </div>
          {renderInput(
            "price",
            "number",
            "Price",
            FaDollarSign,
            formData.price,
            true,
            0,
            99999999
          )}
          {renderInput(
            "discountPercentage",
            "number",
            "Discount %",
            FaPercent,
            formData.discountPercentage,
            false,
            0,
            100
          )}
          {renderInput(
            "rating",
            "number",
            "Rating (1-5)",
            FaStar,
            formData.rating,
            false,
            1,
            5
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {renderInput(
            "stock",
            "number",
            "Stock",
            FaBoxes,
            formData.stock,
            true,
            1,
            99999999
          )}
          {renderInput(
            "brand",
            "text",
            "Brand",
            FaTrademark,
            formData.brand,
            true
          )}
          {renderInput(
            "category",
            "text",
            "Category",
            FaListAlt,
            formData.category,
            true
          )}
          {renderInput(
            "thumbnail",
            "text",
            "Thumbnail URL",
            FaImage,
            formData.thumbnail,
            true
          )}
          {renderInput(
            "images",
            "text",
            "Image URLs (comma separated)",
            FaImages,
            formData.images.join(","),
            true
          )}
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
          >
            🚀 Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
