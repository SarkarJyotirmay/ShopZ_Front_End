import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import HomeLayout from "./components/HomeLayout/HomeLayout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Products from "./pages/products/Products";
import Notfound from "./pages/Notfound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import AddProduct from "./pages/AddProduct/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./utils/axiosInstance";
import { setUser } from "./store/slices/userSlice";
import Cart from "./pages/Cart/Cart";

const App = () => {
  // for state less login
  const dispatch = useDispatch()
  const fetchUser = async()=>{
   const response = await axiosInstance.get("/auth/bypass/login")
   dispatch(setUser(response.data.user))
  } 
  useEffect(()=>{
    console.log("Token: ", JSON.parse(localStorage.getItem("token")));
    
    fetchUser()
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <RestrictedRoute>
              <Signup />
            </RestrictedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          ),
        },
        {
          path: "/addproduct",
          element: <AddProduct />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
