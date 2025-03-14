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

// Create Product
export const createProduct = createAsyncThunk("product/createProduct", async (productData, { rejectWithValue }) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update Product
export const updateProduct = createAsyncThunk("product/updateProduct", async ({ productId, productData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Delete Product
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (productId, { rejectWithValue }) => {
  try {
    await api.delete(`/products/${productId}`);
    return productId;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});



const productSlice = createSlice({
  name: "product",
  initialState: { products: [], product: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get a single product
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
