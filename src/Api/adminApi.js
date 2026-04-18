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

    // Get Book Sales
    getBookSalesData: builder.query({
      query: (page = 1) => `/orders/book-sales/?page=${page}`,
      providesTags: ["book-sales"],
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

    // GET EMAIL TEMPLATES
    getEmailTemplates: builder.query({
      query: () => "/email-templates/",
      providesTags: ["email-templates"],
    }),

    // get Sendgrid API
    getSendgridApi: builder.query({
      query: () => "/email-templates/sendgrid-templates/",
      providesTags: ["sendgrid-api"],
    }),

    // get Purposes
    getPurposes: builder.query({
      query: () => "/email-templates/purposes/",
      providesTags: ["purposes"],
    }),

    // Add Email Template
    addEmailTemplate: builder.mutation({
      query: (data) => ({
        url: "/email-templates/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["email-templates"],
    }),

    // Update Email Template
    updateEmailTemplate: builder.mutation({
      query: ({ id, body }) => ({
        url: `/email-templates/${id}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["email-templates"],
    }),

    // Delete Email Template
    deleteEmailTemplate: builder.mutation({
      query: (id) => ({
        url: `/email-templates/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["email-templates"],
    }),

    // Add more admin-specific endpoints here as needed...
    getTeacherProfiles: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        const page = typeof params === "number" ? params : params.page;
        if (page) queryParams.append("page", page);
        if (params && typeof params !== "number") {
          if (params.offers_consultations !== undefined) {
            queryParams.append(
              "offers_consultations",
              String(params.offers_consultations),
            );
          }
        }
        const queryString = queryParams.toString();
        return `/teacher-profiles/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["teachers"],
    }),
    getStudentProfiles: builder.query({
      query: (page = 1) => `/student-profiles/?page=${page}`,
      providesTags: ["students"],
    }),

    getStudentProfile: builder.query({
      query: (id) => `/student-profiles/${id}/`,
      providesTags: ["student"],
    }),

    getTeacherProfile: builder.query({
      query: (id) => `/teacher-profiles/${id}/`,
      providesTags: ["teachers"],
    }),

    getConsultations: builder.query({
      query: () => "/consultations/",
      providesTags: ["consultations"],
    }),

    getConsultation: builder.query({
      query: (id) => `/consultations/${id}/`,
      providesTags: ["consultations"],
    }),

    createConsultation: builder.mutation({
      query: (body) => ({
        url: "/consultations/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["consultations"],
    }),

    createConsultationRecurring: builder.mutation({
      query: ({ consultationId, body }) => ({
        url: `/consultations/${consultationId}/recurring/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["consultations"],
    }),

    createConsultationBundle: builder.mutation({
      query: ({ consultationId, body }) => ({
        url: `/consultations/${consultationId}/bundles/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["consultations"],
    }),

    getEnrollments: builder.query({
      query: (userId) => `/enrollments/?user=${userId}`,
      providesTags: ["enrollments"],
    }),

    // Scholarships
    getScholarships: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page);
        if (params?.status) queryParams.append("status", params.status);
        if (params?.course) queryParams.append("course", params.course);
        const q = queryParams.toString();
        return `/scholarships/${q ? `?${q}` : ""}`;
      },
      providesTags: ["scholarships"],
    }),
    approveScholarship: builder.mutation({
      query: ({ id, body }) => ({
        url: `/scholarships/${id}/approve/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["scholarships"],
    }),
    rejectScholarship: builder.mutation({
      query: ({ id, body }) => ({
        url: `/scholarships/${id}/reject/`,
        method: "POST",
        body: body, // e.g. optional rejection note
      }),
      invalidatesTags: ["scholarships"],
    }),

    // Add Student Profile
    addStudentProfile: builder.mutation({
      query: (data) => ({
        url: "/student-profiles/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["students"],
    }),

    // Add Teacher Profile
    addTeacherProfile: builder.mutation({
      query: (data) => ({
        url: "/teacher-profiles/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teachers"],
    }),

    // Update Teacher Profile
    updateTeacherProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/teacher-profiles/${id}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["teachers"],
    }),

    // Delete Student Profile
    deleteStudentProfile: builder.mutation({
      query: (id) => ({
        url: `/student-profiles/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["students"],
    }),

    // Delete Teacher Profile
    deleteTeacherProfile: builder.mutation({
      query: (id) => ({
        url: `/teacher-profiles/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["teachers"],
    }),
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
  useGetBookSalesDataQuery,
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
  useGetEmailTemplatesQuery,
  useGetSendgridApiQuery,
  useGetPurposesQuery,
  useAddEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useGetTeacherProfilesQuery,
  useGetStudentProfilesQuery,
  useGetTeacherProfileQuery,
  useGetStudentProfileQuery,
  useGetConsultationsQuery,
  useGetConsultationQuery,
  useCreateConsultationMutation,
  useCreateConsultationRecurringMutation,
  useCreateConsultationBundleMutation,
  useGetEnrollmentsQuery,
  useGetScholarshipsQuery,
  useApproveScholarshipMutation,
  useRejectScholarshipMutation,
  useAddStudentProfileMutation,
  useAddTeacherProfileMutation,
  useUpdateTeacherProfileMutation,
  useDeleteStudentProfileMutation,
  useDeleteTeacherProfileMutation,
} = adminApi;
