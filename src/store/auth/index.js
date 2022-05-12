import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import users from "../../services/userService";
import auth from "../../services/authService";

const user = auth.getCurrentUser();

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const { headers, data } = await users.registerUser(user);
      auth.loginUserWithJwt(headers["x-auth-token"]);
      return { user: data };
    } catch (ex) {
      const { status, data } = ex.response;
      return rejectWithValue({ status, data });
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      await auth.loginUser(user);
      return { user: auth.getCurrentUser() };
    } catch (ex) {
      const { status, data } = ex.response;
      return rejectWithValue({ status, data });
    }
  }
);
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  auth.logoutUser();
});

const slice = createSlice({
  name: "auth",
  initialState: { user },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default slice.reducer;

// Selectors

export const getUser = createSelector(
  (state) => state.auth,
  (auth) => auth.user
);
