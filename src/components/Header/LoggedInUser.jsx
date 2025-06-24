import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { clearUser } from "../../store/slices/userSlice";

const LoggedInUser = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    dispatch(clearUser());
    // Optional: localStorage.removeItem("token");
    localStorage.removeItem("token")
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="user flex items-center gap-2 cursor-pointer text-indigo-700 hover:text-indigo-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRegUserCircle className="text-xl" />
        <span className="capitalize font-medium">
          {userDetails?.firstName || "User"}
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
          <ul className="flex flex-col py-2 px-4 gap-2 text-sm text-gray-700">
            <li>
              <Link
                to="/profile"
                className="block hover:text-indigo-600 transition"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="w-full text-left hover:text-red-600 transition"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoggedInUser;
