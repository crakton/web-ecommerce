import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";
import { toast } from "react-toastify";

// Load cart from localStorage
const loadCart = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

// Fetch Cart from API
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/carts/${userId}`);
    localStorage.setItem("cart", JSON.stringify(response.data)); // Sync with storage
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Add to Cart
export const addToCart = createAsyncThunk("carts/addToCart", async ({ productId, productQty = 1, userId }, { rejectWithValue }) => {
  try {
    const response = await api.post("/carts/add", { productId, productQty, userId });
    toast.success(`added to cart!`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


// Update Cart Quantity
export const updateCartQuantity = createAsyncThunk(
  "carts/updateQuantity",
  async ({ productId, productQty, userId }, { rejectWithValue }) => {
    try {
      const response = await api.put("/carts/update-qty", {
        productId,
        productQty,
        userId,
      });
      return { productId, productQty };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Remove from Cart
export const removeFromCart = createAsyncThunk("carts/removeFromCart", async ({ userId, productId }, { rejectWithValue }) => {
  try {
    await api.delete(`/carts/remove/${userId}/${productId}`);
    const cart = localStorage.getItem("cart")
    console.log(cart, "From Local Storage")
    
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
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { productId, productQty } = action.payload;
        const item = state.items?.cart?.productsInCart?.find((item) => item.productId === productId);
        if (item) {
          item.productQty = productQty;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
        state.loading = false;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
      
  },
});

export default cartSlice.reducer;
