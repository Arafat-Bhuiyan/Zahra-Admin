import { api } from "./api";
import { setCredentials } from "../features/authSlice";

export const authapi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/accounts/signup/student/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { refresh_token, access_token, data: userData } = data; // destructure data.data as userData

          // Dispatch setCredentials to update Redux state
          dispatch(
            setCredentials({
              refresh: refresh_token,
              access: access_token,
              user: userData,
            })
          );

          // Persist user data to localStorage (legacy support)
          localStorage.setItem("auth", JSON.stringify({ refresh: refresh_token, access: access_token }));
        } catch (error) {
          // console.error("Signup error:", error);
        }
      },
    }),
    universitySignup: builder.mutation({
      query: (data) => ({
        url: "/university/signup/university/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { refresh_token, access_token, user } = data;

          // Dispatch setCredentials to update Redux state
          dispatch(
            setCredentials({
              refresh: refresh_token,
              access: access_token,
              user: user,
            })
          );

          // Persist user data to localStorage (legacy support)
          localStorage.setItem("auth", JSON.stringify({ refresh: refresh_token, access: access_token }));
        } catch (error) {
          // console.error("Signup error:", error);
        }
      },
    }),
    forgetPass: builder.mutation({
      query: ({ email }) => ({
        url: "/accounts/send-otp/",
        method: "POST",
        body: { email },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/accounts/signin/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { refresh_token, access_token, data: userData } = data;

          // Dispatch setCredentials to update Redux state
          dispatch(
            setCredentials({
              refresh: refresh_token,
              access: access_token,
              user: userData,
            })
          );

          // Persist user data to localStorage
          localStorage.setItem(
            "auth",
            JSON.stringify({ refresh: refresh_token, access: access_token })
          );
        } catch (error) {
          // console.error("Login error:", error);
        }
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/accounts/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/reset-password/",
        method: "POST",
        body: data,
      }),
    }),

    profileUpdate: builder.mutation({
      query: (data) => ({
        url: "/accounts/profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user_profile"],
    }),

    setupStudentProfile: builder.mutation({
      query: (data) => ({
        url: "/student/profile/setup/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user_profile"],
    }),

    getUserProfile: builder.query({
      query: () => "/student/profile/setup/",
      providesTags: ["user_profile"],
    }),
  }),
});

export const {
  useSignupMutation,
  useForgetPassMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileUpdateMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useGetUserProfileQuery,
  useUniversitySignupMutation,
  useSetupStudentProfileMutation
} = authapi;
