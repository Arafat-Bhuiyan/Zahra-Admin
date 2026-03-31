import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get Doors Data
    getDoorsData: builder.query({
      query: () => "/doors/",
      providesTags: ["doors"],
    }),

    // Add Door
    addDoor: builder.mutation({
      query: (data) => ({
        url: "/doors/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["doors"],
    }),

    // Update Door
    updateDoor: builder.mutation({
      query: ({ id, body }) => ({
        url: `/doors/${id}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["doors"],
    }),

    // Delete Door
    deleteDoor: builder.mutation({
      query: (id) => ({
        url: `/doors/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["doors"],
    }),

    // Get Books Data
    getBooksData: builder.query({
      query: () => "/books/",
      providesTags: ["books"],
    }),
    // Add more admin-specific endpoints here as needed...
  }),
  overrideExisting: false,
});

export const {
  useGetDoorsDataQuery,
  useAddDoorMutation,
  useUpdateDoorMutation,
  useDeleteDoorMutation,
  useGetBooksDataQuery,
} = adminApi;
