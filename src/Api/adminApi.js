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

    // Add Blog
    addBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),

    // Delete Blog
    deleteBlog: builder.mutation({
      query: (slug) => ({
        url: `/blogs/${slug}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),

    // single blog get
    getBlogDetails: builder.query({
      query: (slug) => `/blogs/${slug}/`,
      providesTags: ["blogs"],
    }),

    // approve blog
    approveBlog: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/blogs/${slug}/approve/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["blogs"],
    }),

    // reject blog
    rejectBlog: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/blogs/${slug}/reject/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["blogs"],
    }),
    // Blog Categories
    getBlogCategories: builder.query({
      query: () => "/blogs/categories/",
      providesTags: ["blogs"],
    }),
    addBlogCategory: builder.mutation({
      query: (name) => ({
        url: "/blogs/categories/",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteBlogCategory: builder.mutation({
      query: (slug) => ({
        url: `/blogs/categories/${slug}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),

    // Get Videos
    getVideosData: builder.query({
      query: () => "/videos/",
      providesTags: ["videos"],
    }),

    // Add Video
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),

    // Delete Video
    deleteVideo: builder.mutation({
      query: (slug) => ({
        url: `/videos/${slug}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),

    // single video get
    getVideoDetails: builder.query({
      query: (slug) => `/videos/${slug}/`,
      providesTags: ["videos"],
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
  useAddBlogMutation,
  useDeleteBlogMutation,
  useGetBlogDetailsQuery,
  useApproveBlogMutation,
  useRejectBlogMutation,
  useGetBlogCategoriesQuery,
  useAddBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useGetVideosDataQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetVideoDetailsQuery,
  useGetCoursesDataQuery,
  useGetCourseCategoriesQuery,
  useAddCourseCategoryMutation,
  useDeleteCourseCategoryMutation,
} = adminApi;
