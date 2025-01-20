import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
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
          providesTags: ["Students"],
        };
      },

      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getStudentById: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TStudent>) => response.data,
    }),
    updateStudentById: builder.mutation({
      query: ({ id, ...data }) => {
        if (!id) {
          throw new Error("Student ID is required to update a student.");
        }
        return { url: `/students/${id}`, method: "PATCH", body: data };
        providesTags: ["Students"];
      },
      transformResponse: (response: TResponseRedux<TStudent>) => response.data,
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: `/users/create-student`,
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
} = userManagementApi;
