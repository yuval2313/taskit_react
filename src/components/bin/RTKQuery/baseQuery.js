import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { getJwt } from "../../../services/authService";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = getJwt();

    if (token) headers.set("x-auth-token", token);

    return headers;
  },
});
