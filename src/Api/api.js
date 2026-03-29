import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.8:8000/",
  prepareHeaders: (headers, { getState, endpoint }) => {
    // Skip auth token for public endpoints
    const publicEndpoints = [
      "signup",
      "universitySignup",
      "login",
      "forgetPass",
      "verifyOtp",
      "resetPassword",
    ];
    if (publicEndpoints.includes(endpoint)) {
      return headers;
    }

    // Try to get token from Redux state
    const token = getState().auth?.accessToken || null;
    // If token not in state, retrieve from local storage
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        try {
          const authData = JSON.parse(storedAuth);
          if (authData?.access) {
            headers.set("authorization", `Bearer ${authData.access}`);
          }
        } catch (error) {
          console.warn("Failed to parse auth token from local storage:", error);
          localStorage.removeItem("auth"); // Clean up invalid data
        }
      }
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["uni_users", "user_profile"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/jwt/create/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
