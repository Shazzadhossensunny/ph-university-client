import { TAdmin, TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/students`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Students"],
    }),
    getStudentById: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TStudent>) => response.data,
    }),
    updateStudentById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TResponseRedux<TStudent>) => response.data,
      invalidatesTags: ["Students"],
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: `/users/create-student`,
        method: "POST",
        body: data,
      }),
    }),
    changeUserStatus: builder.mutation({
      query: ({ id, ...status }) => ({
        url: `/users/change-status/${id}`,
        method: "POST",
        body: status,
      }),
    }),
    getAllAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/admins`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Admins"],
    }),
    getAdminById: builder.query({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAdmin>) => response.data,
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: `/users/create-admin`,
        method: "POST",
        body: data,
      }),
    }),
    updateAdminById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admins/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TResponseRedux<TStudent>) => response.data,
      invalidatesTags: ["Admins"],
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: `/users/create-faculty`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentQuery,
  useGetStudentByIdQuery,
  useUpdateStudentByIdMutation,
  useChangeUserStatusMutation,
  useAddAdminMutation,
  useGetAllAdminQuery,
  useGetAdminByIdQuery,
  useUpdateAdminByIdMutation,
  useAddFacultyMutation,
} = userManagementApi;
