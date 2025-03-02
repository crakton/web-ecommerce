import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

// Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/carts/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add to Cart
export const addToCart = createAsyncThunk("cart/addToCart", async (item, { rejectWithValue }) => {
  try {
    const response = await api.post("/carts", item);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Remove from Cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ userId, productId }, { rejectWithValue }) => {
  try {
    await api.delete(`/carts/${userId}/${productId}`);
    return productId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addToCart.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      });
  },
});

export default cartSlice.reducer;
