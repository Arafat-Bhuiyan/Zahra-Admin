import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard and data summary
    // getAdminDashboardData: builder.query({
    //   query: () => "admin/dashboard/",
    //   providesTags: ["admin_dashboard"],
    // }),

    // General Settings
    // getGeneralSettings: builder.query({
    //   query: () => "super-admin/settings/general/",
    //   providesTags: ["admin_settings"],
    // }),

    // updateGeneralSettings: builder.mutation({
    //   query: (data) => ({
    //     url: "super-admin/settings/general/",
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["admin_settings"],
    // }),

    // Add more admin-specific endpoints here as needed...
  }),
  overrideExisting: false,
});

export const {
  // useGetAdminDashboardDataQuery,
  // useGetGeneralSettingsQuery,
  // useUpdateGeneralSettingsMutation,
} = adminApi;
