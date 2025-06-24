import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCart,
  removeFromCart,
} from "../../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  // console.log(cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // remove handler
  const handleRemove = async (productId, qty) => {
    try {
      await dispatch(removeFromCart({ productId, qty })).unwrap();
      dispatch(fetchCart());
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading your cart...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">Your cart is empty.</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">🛒 Your Cart</h2>
      <div className="space-y-6">
        {cart?.length > 0 &&
          cart.map((item) => {
            // !
            console.log({ productId: item.productId._id, qty: item.qty });

            return (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-2xl shadow-md"
              >
                <img
                  src={item.productId.thumbnail}
                  alt={item.productId.title}
                  className="w-32 h-32 object-cover rounded-xl"
                />
                <div className="flex-1 w-full">
                  <h3 className="text-xl font-medium">
                    {item.productId.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.productId.description.slice(0, 100)}...
                  </p>
                  <div className="mt-2 flex gap-4 text-sm text-gray-700">
                    <span>Brand: {item.productId.brand}</span>
                    <span>Category: {item.productId.category}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => handleRemove(item.productId._id, 1)}
                      className="px-3 py-1 bg-gray-200 text-xl rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium">{item.qty}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({ productId: item.productId._id, qty: 1 })
                        )
                      }
                      className="px-3 py-1 bg-gray-200 text-xl rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-2 text-lg font-semibold text-green-600">
                    ₹{item.productId.price} x {item.qty} = ₹
                    {item.productId.price * item.qty}
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId._id, item.qty)}
                    className="mt-3 text-sm text-red-600 hover:underline"
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cart;
