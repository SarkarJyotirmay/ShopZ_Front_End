import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const Signup = () => {
  const userDetails = {
    firstName: "",
    lastName: "",
    email: "",
    mobNo: "",
    password: "",
    role: "CUSTOMER",
    address: {
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  };
  const [formData, setFormData] = useState({ ...userDetails });
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit Handler

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // send to backend here register api call
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/register`,
        formData
      ); // as instance not working //ToDo: Use redux store to handle async task
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failuire");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#4F46E5] mb-6">
          Create Your Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Personal Info */}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="mobNo"
            value={formData.mobNo}
            placeholder="Mobile Number"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            required
            onChange={handleChange}
            className="input"
          />

          {/* Address Info */}
          <input
            type="text"
            name="addressLine1"
            value={formData.address.addressLine1}
            placeholder="Address Line 1"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="addressLine2"
            value={formData.address.addressLine2}
            placeholder="Address Line 2 (Optional)"
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="city"
            value={formData.address.city}
            placeholder="City"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="landmark"
            value={formData.address.landmark}
            placeholder="Landmark (Optional)"
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="state"
            value={formData.address.state}
            placeholder="State"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="pincode"
            value={formData.address.pincode}
            placeholder="Pincode"
            required
            onChange={handleChange}
            className="input"
          />

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-[#E11D48] text-white font-semibold text-lg hover:bg-[#be123c] transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center">
          Already have an account ? go to{" "}
          <Link to={"/login"} className="underline text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

// Tailwind class shortcut for inputs (can be added globally or locally):
// .input {
//   @apply px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#229BD3] transition;
// }
