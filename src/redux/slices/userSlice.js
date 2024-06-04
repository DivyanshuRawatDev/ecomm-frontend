import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";

export const fetchLogin = createAsyncThunk("login", async (credentials) => {
  try {
    console.log(credentials);
    const response = await fetch(BASE_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
      return;
    }

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", JSON.stringify(data?.token));
    }

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default userSlice.reducer;
