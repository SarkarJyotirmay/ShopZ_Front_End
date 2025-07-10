// components/CheckoutButton.jsx
import React from "react";
import { createOrder } from "../utils/orderService";

const CheckoutButton = ({ address, cupon }) => {
  const handlePayment = async () => {
    try {
      const res = await createOrder({ address, cupon });

      if (res.success && res.orderDetails) {
        const { razorpayOrderId, amount, key, currency } = res.orderDetails;

        const options = {
          key,
          amount,
          currency,
          name: "Your Store Name",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: function (response) {
            // This is where you’d normally call backend to verify payment
            alert("Payment successful!");
            console.log("Payment response:", response);
            // Optionally redirect to success page
            window.location.href = "/order-success";
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

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert(res.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay with Razorpay
    </button>
  );
};

export default CheckoutButton;
