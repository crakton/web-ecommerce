import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

// User Login
export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", userData);

    // Save token and user data in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("userId", response.data.user.id); // Store userId separately

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

// User Registration
export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/register", userData);

    console.log("Registration Response:", response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("userId", response.data.user.id);

    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// Fetch User By ID (After Login)
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) throw new Error("No token found");
    if (!userId) throw new Error("No user ID found");

    const response = await api.get(`/auth/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Update localStorage with fresh user data
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
  }
});

// Logout
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");

      localStorage.removeItem("userId"); // Clear userId
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
