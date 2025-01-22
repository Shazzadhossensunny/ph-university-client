import {
  TCourse,
  TQueryParam,
  TRegisteredSemester,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/semester-registrations`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["SemesterRegistration"],
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: `/semester-registrations/create-semester-registration`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
    academicSemesterRegisteredStatusUpdate: builder.mutation({
      query: ({ id, ...status }) => ({
        url: `/semester-registrations/${id}`,
        method: "PATCH",
        body: status,
      }),
      transformResponse: (response: TResponseRedux<TRegisteredSemester>) =>
        response.data,
      invalidatesTags: ["SemesterRegistration"],
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/courses`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Course"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: `/courses/create-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    assignFaculties: builder.mutation({
      query: ({ courseId, ...data }) => ({
        url: `/courses/${courseId}/assign-faculties`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllCourseFaculties: builder.query({
      query: (courseId) => ({
        url: `courses/${courseId}/get-faculties`,
        method: "GET",
      }),

      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addOfferedCourse: builder.mutation({
      query: (data) => ({
        url: `/offered-courses/create-offered-course`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisteredSemesterQuery,
  useAcademicSemesterRegisteredStatusUpdateMutation,
  useAddCourseMutation,
  useGetAllCoursesQuery,
  useAssignFacultiesMutation,
  useGetAllCourseFacultiesQuery,
  useAddOfferedCourseMutation,
} = courseManagementApi;
