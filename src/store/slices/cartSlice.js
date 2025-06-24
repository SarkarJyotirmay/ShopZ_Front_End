import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

// fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const response = await axiosInstance.get("/cart");
    return response.data.products.products;
  } catch (error) {
    return error.message;
  }
});

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, qty, product }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/cart/add", {
        productId,
        qty,
      });
      return {
        data: response.data,
        passedArgs : {productId, qty}
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// remove from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async({productId, qty}, thunkAPI)=>{
  console.log("Inside thunk: Calling /cart/remove");
  try {
  const response = await axiosInstance.post("/cart/remove", {productId, qty})
  return {
    data: response.data,
    passedArgs: {productId, qty}
  }
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      // add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      
        // Extract the full returned product object from API
        const {data, passedArgs} = action.payload; 
        // action.payload = {data: api response, passedArgs: {qty, productId}}
        const addedProduct = data.product // has { productId: { ... }, qty, _id }
      
        // Check if product already exists in cart
        const productIndex = state.cart.findIndex(
          (item) => item.productId._id === addedProduct.productId._id
        );
      
        if (productIndex !== -1) {
          // If already in cart, increase quantity
          
          state.cart[productIndex].qty = Number(state.cart[productIndex].qty) + Number(passedArgs.qty);
        } else {
          // If new, push to cart
          state.cart.push(addedProduct);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // remove from cart
      .addCase(removeFromCart.pending, (state)=>{
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action)=>{
        state.loading = false
        state.error = null
        // state management is done on cart component/page with chained api call in handleRemove
      })
      .addCase(removeFromCart.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
  },
});

export default cartSlice.reducer;
