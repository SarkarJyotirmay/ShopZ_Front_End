import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../store/slices/productSlice"; // adjust path if needed
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    singleProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userDetails) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId: product._id, qty: 1 }));
    console.log("Added to cart:", product.title);
    toast.success("Item added to cart.")
  };

  const handleAddToWishlist = (product) => {
    // dispatch(addToWishlist(product));
    console.log("Added to wishlist:", product.title);
    toast.success("Item added to wishlist.")
  };

  if (loading)
    return (
      <p className="text-center text-lg mt-10 text-blue-500">Loading...</p>
    );
  if (error)
    return <p className="text-center text-lg mt-10 text-red-500">{error}</p>;
  if (!product)
    return (
      <p className="text-center text-lg mt-10 text-gray-500">
        Product not found.
      </p>
    );

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = product;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Product Top Section */}
      <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-tr from-blue-100 via-pink-100 to-purple-100 rounded-2xl shadow-lg p-6">
        {/* Thumbnail */}
        <div className="flex justify-center items-center">
          <img
            src={thumbnail}
            alt={title}
            className="rounded-xl w-full max-w-md object-cover shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-purple-700">{title}</h1>
          <p className="text-gray-700">{description}</p>

          <div className="text-lg">
            <p className="text-blue-600 font-semibold">Brand: {brand}</p>
            <p className="text-pink-600">Category: {category}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-purple-800">₹{price}</span>
            <span className="text-green-600 font-semibold">
              {discountPercentage}% off
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-yellow-500 font-semibold">★ {rating}</span>
            <span className="text-sm text-gray-600">| Stock: {stock}</span>
          </div>

          <button
            className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
            onClick={(e) => handleAddToCart(e, product)}
            disabled={userDetails ? false : true}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          More Images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title}-${idx}`}
              className="rounded-lg object-cover h-40 w-full hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
