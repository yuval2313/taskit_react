import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as auth from "../services/authService";
import * as users from "../services/usersService";

const user = auth.getCurrentUser();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credential, { rejectWithValue }) => {
    try {
      const { data: jwt } = await auth.loginUser(credential);
      const user = auth.loginUserWithJwt(jwt);
      return user;
    } catch (ex) {
      const { status, data } = ex.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data: user } = await users.getUser();
      return user;
    } catch (ex) {
      const { status, data } = ex.response;
      return rejectWithValue({ status, data });
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: { user, loggedIn: !!user },
  reducers: {
    loggedOutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.loggedIn = false;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      });
  },
});

const { loggedOutUser } = slice.actions;
export default slice.reducer;

export const logoutUser = () => (dispatch) => {
  auth.logoutUser();
  dispatch(loggedOutUser());
};

// Selectors

export const getUser = createSelector(
  (state) => state.auth,
  (auth) => auth.user
);

export const isLoggedIn = createSelector(
  (state) => state.auth,
  (auth) => auth.loggedIn
);
