import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  products: [],
  singleProduct: null,
  loading: false,
  error: null,
  totalProductCount: 0,
  currentPage: 1,
};

// 🟡 MODIFY fetchProducts thunk
export const fetchProducts = createAsyncThunk(
  "fetch/products",
  async ({ pageNo = 1, pageSize = 10 } = {}, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/products/list?pageNo=${pageNo}&pageSize=${pageSize}`
      );
      return {
        products: response.data.products,
        totalProductCount: response.data.totalProductCount,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "fetch/singleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProductCount = action.payload.totalProductCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.product;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
