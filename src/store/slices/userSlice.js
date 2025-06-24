import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userDetails: null,
  loading: false
}

const userSlice = createSlice(
  {
    name: "userSlice",
    initialState,
    reducers: {
      setUser: (state, action)=>{
        state.userDetails = action.payload
      },
      clearUser: (state, action)=>{
        state.userDetails = null
      }
    }

  }
)

export const {setUser, clearUser} = userSlice.actions
export default userSlice.reducer