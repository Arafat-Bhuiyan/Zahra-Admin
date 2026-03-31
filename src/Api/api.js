import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.19:8000/",
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
  tagTypes: ["uni_users", "user_profile", "categories", "courses"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/jwt/create/",
        method: "POST",
        body: credentials,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "course-categories/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "categories", id })),
              { type: "categories", id: "LIST" },
            ]
          : [{ type: "categories", id: "LIST" }],
    }),
    getCourses: builder.query({
      query: ({ category, status, search } = {}) => {
        const params = new URLSearchParams();
        if (category && category !== "All") params.append("category", category);
        if (status && status !== "All") params.append("status", status);
        if (search) params.append("search", search);

        return {
          url: `courses/${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "courses", id })),
              { type: "courses", id: "LIST" },
            ]
          : [{ type: "courses", id: "LIST" }],
    }),
  }),
});

export const { useLoginMutation, useGetCategoriesQuery, useGetCoursesQuery } =
  api;
