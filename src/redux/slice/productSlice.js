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
// Assuming you have an `api` instance setup for backend requests

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      if (!productData.img || productData.img.length === 0) {
        return rejectWithValue("No images selected.");
      }

      // Upload images to backend (which handles Cloudinary)
      const formData = new FormData();
      productData.img.forEach((file) => formData.append("img", file)); // Match backend field name

      const uploadResponse = await api.post("/platforms/image-upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!uploadResponse.data.success) {
        return rejectWithValue(uploadResponse.data.message || "Image upload failed");
      }

      // Cloudinary URLs received from backend
      const uploadedImages = uploadResponse.data.imageUrls; 

      // Add uploaded image URLs to productData
      const updatedProductData = { ...productData, img: uploadedImages };

      // Send product data with Cloudinary image URLs to backend
      const response = await api.post("/products/new", updatedProductData);

      // Fetch latest products (assuming getProducts is defined elsewhere)
      getProducts();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk("product/updateProduct", async ({ productId, productData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/products/${productId}, productData`);
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
  name: "products",
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
        console.log("New Product:", action.payload); // Debugging
        state.loading = false;
        state.products = Array.isArray(state.products) ? [...state.products, action.payload] : [action.payload];
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
        state.products = Array.isArray(state.products) ? state.products.filter((product) => product.id !== action.payload) : console.log("product Not an Array");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;