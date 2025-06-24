import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { addToCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    if(!userDetails){
      navigate("/login")
      return
    }
    // dispatch(addToCart(product));
    dispatch(addToCart({ productId: product._id, qty: 1 }));
    console.log("Added to cart:", product.title);
  };

  const handleAddToWishlist = (product) => {
    // dispatch(addToWishlist(product));
    console.log("Added to wishlist:", product.title);
  };

  return (
    <div
      key={product._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col justify-between"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-medium text-gray-800">{product.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>

      <div className="mt-2">
        <p className="text-lg font-semibold text-indigo-600">
          ₹{product.price}
        </p>
        <p className="text-sm text-green-600">
          Discount: {product.discountPercentage}%
        </p>
        <p className="text-sm text-yellow-500">Rating: ⭐ {product.rating}</p>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        <button
          onClick={() => handleAddToWishlist(product)}
          className={`text-xl text-red-500 ${
            userDetails ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={userDetails ? false : true}
        >
          <FaRegHeart />
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleAddToCart(product)}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl w-full text-sm ${
            userDetails ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={userDetails ? false : true}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
