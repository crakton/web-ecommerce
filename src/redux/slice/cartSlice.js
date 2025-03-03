import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

// Load cart from localStorage
const loadCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Fetch Cart from API
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/cart/${userId}`);
    localStorage.setItem("cart", JSON.stringify(response.data)); // Save cart
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Add to Cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, productQty = 1, userId }, { rejectWithValue }) => {
  try {
    const response = await api.post("/cart/add", { productId, productQty, userId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Remove from Cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ userId, productId }, { rejectWithValue }) => {
  try {
    await api.delete(`/cart/${userId}/${productId}`);
    return productId; // Return productId to remove it from state
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart(), loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items)); // Persist cart
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items)); // Persist cart
      });
  },
});

export default cartSlice.reducer;
