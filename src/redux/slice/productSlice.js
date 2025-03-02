import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

// Fetch All Products
export const getProducts = createAsyncThunk("product/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Fetch Single Product
export const getProductById = createAsyncThunk("product/getById", async (productId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: { products: [], product: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default productSlice.reducer;
