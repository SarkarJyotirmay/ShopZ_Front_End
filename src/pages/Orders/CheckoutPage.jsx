import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    cupon: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      pincode,
      cupon,
      paymentMethod,
    } = formData;

    try {
      const res = await axiosInstance.post("/order/create", {
        address: {
          addressLine1,
          addressLine2,
          landmark,
          city,
          state,
          pincode,
        },
        cupon,
        mode: paymentMethod,
      });

      const data = res.data;

      if (!data.success) {
        toast.error(data.message || "Order failed");
        return;
      }

      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else if (paymentMethod === "ONLINE") {
        const { orderDetails } = data;

        const options = {
          key: orderDetails.key, // ✅ Use key from backend
          amount: orderDetails.amount,
          currency: orderDetails.currency,
          name: "Your Store",
          description: "Order Payment",
          order_id: orderDetails.razorpayOrderId,
          handler: async function (response) {
            try {
              const verifyRes = await axiosInstance.post("/order/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                address: {
                  addressLine1,
                  addressLine2,
                  landmark,
                  city,
                  state,
                  pincode,
                }, // ✅ Pass address so backend can create order
              });

              if (verifyRes.data.success) {
                toast.success("Payment verified & order placed!");
                navigate("/orders");
              } else {
                toast.error("Payment verification failed!");
              }
            } catch (err) {
              toast.error("Payment verification error!");
              console.error(err);
            }
          },
          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#1A73E8",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong during checkout."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Address Section */}
        <div>
          <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
          <div className="space-y-3">
            {[
              "addressLine1",
              "addressLine2",
              "landmark",
              "city",
              "state",
              "pincode",
            ].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  className="w-full border px-3 py-2 rounded-md"
                  value={formData[field]}
                  onChange={handleChange}
                  required={[
                    "addressLine1",
                    "city",
                    "state",
                    "pincode",
                  ].includes(field)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Coupon Code */}
        <div>
          <label className="block mb-1 font-medium">Coupon Code</label>
          <input
            type="text"
            name="cupon"
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter coupon code (optional)"
            value={formData.cupon}
            onChange={handleChange}
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <div className="flex space-x-4">
            {["COD", "ONLINE"].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                />
                <span>
                  {method === "COD" ? "Cash on Delivery" : "Online Payment"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
