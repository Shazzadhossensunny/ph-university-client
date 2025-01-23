import { TQueryParam, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/offeredCourse.type";
import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/offered-courses/my-offered-courses`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    // addAcademicSemester: builder.mutation({
    //   query: (data) => ({
    //     url: `/academic-semesters/create-academic-semester`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetMyOfferedCourseQuery } = courseApi;
