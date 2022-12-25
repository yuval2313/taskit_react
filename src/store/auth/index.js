import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as auth from "store/services/authService";
import * as users from "store/services/usersService";
import * as gcal from "store/services/gcalService";

import withRejectWrapper from "store/helpers/withRejectWrapper";

const user = auth.getCurrentUser();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  withRejectWrapper(async (credential) => {
    const { data: jwt } = await auth.loginUser(credential);
    const user = auth.loginUserWithJwt(jwt);
    return user;
  })
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  withRejectWrapper(async () => {
    const { data: user } = await users.getUser();
    return user;
  })
);

export const authorizeUser = createAsyncThunk(
  "auth/authorizeUser",
  withRejectWrapper(async (code) => {
    await gcal.authorize(code);
  })
);

export const unauthorizeUser = createAsyncThunk(
  "auth/unauthorizeUser",
  withRejectWrapper(async () => {
    await gcal.unauthorize();
  })
);

const slice = createSlice({
  name: "auth",
  initialState: { user, loggedIn: !!user, authorized: false },
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
        state.authorized = !!user.refreshToken;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })

      .addCase(authorizeUser.fulfilled, (state) => {
        state.authorized = true;
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        const { status, data } = action.payload;
        if (status === 400)
          alert(`${data}: Please choose your own account for authorization`);
        state.authorized = false;
      })

      .addCase(unauthorizeUser.fulfilled, (state) => {
        state.authorized = false;
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

export const isAuthorized = createSelector(
  (state) => state.auth,
  (auth) => auth.authorized
);
