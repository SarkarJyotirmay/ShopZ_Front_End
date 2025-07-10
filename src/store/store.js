import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js"
import productsReducer from "./slices/productSlice.js"
import cartReducer from "./slices/cartSlice.js"
import orderReducer from "./slices/orderSlice.js"

const store = configureStore(
    {
        reducer: {
            user: userReducer,
            products: productsReducer,
            cart: cartReducer,
            orders: orderReducer,
        }
    }
)

export default store