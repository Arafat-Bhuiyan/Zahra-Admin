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

    // Add Book
    addBook: builder.mutation({
      query: (data) => ({
        url: "/books/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),

    // Other image upload endpoints
    addBookGalleryImage: builder.mutation({
      query: ({ slug, image, order }) => {
        const formData = new FormData();
        formData.append("images", image);
        formData.append("order", order);
        return {
          url: `/books/${slug}/gallery/`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["books"],
    }),

    // Book Details
    getBookDetails: builder.query({
      query: (slug) => `/books/${slug}/`,
      providesTags: ["books"],
    }),

    // Update Book
    updateBook: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/books/${slug}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["books"],
    }),

    // Delete Book
    deleteBook: builder.mutation({
      query: (slug) => ({
        url: `/books/${slug}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    // Book Categories
    getBookCategories: builder.query({
      query: () => "/book-categories/",
      providesTags: ["books"],
    }),
    addBookCategory: builder.mutation({
      query: (name) => ({
        url: "/book-categories/",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["books"],
    }),
    deleteBookCategory: builder.mutation({
      query: (slug) => ({
        url: `/book-categories/${slug}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    // Get Blogs
    getBlogsData: builder.query({
      query: () => "/blogs/",
      providesTags: ["blogs"],
    }),

    // Get Courses
    getCoursesData: builder.query({
      query: () => "/courses/",
      providesTags: ["courses"],
    }),
    // Course Categories
    getCourseCategories: builder.query({
      query: () => "/course-categories/",
      providesTags: ["courses"],
    }),
    addCourseCategory: builder.mutation({
      query: (name) => ({
        url: "/course-categories/",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["courses"],
    }),
    deleteCourseCategory: builder.mutation({
      query: (id) => ({
        url: `/course-categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
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
  useAddBookMutation,
  useAddBookGalleryImageMutation,
  useGetBookDetailsQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookCategoriesQuery,
  useAddBookCategoryMutation,
  useDeleteBookCategoryMutation,
  useGetBlogsDataQuery,
  useGetCoursesDataQuery,
  useGetCourseCategoriesQuery,
  useAddCourseCategoryMutation,
  useDeleteCourseCategoryMutation,
} = adminApi;
