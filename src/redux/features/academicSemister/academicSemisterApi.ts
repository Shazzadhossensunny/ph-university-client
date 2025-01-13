import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => `/academic-semesters`,
    }),
  }),
});

export const { useGetAllSemesterQuery } = academicSemesterApi;
