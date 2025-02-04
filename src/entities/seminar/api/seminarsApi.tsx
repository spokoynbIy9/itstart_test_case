import { baseApi } from "@/shared/api/baseApi";
import { SeminarDto } from "../model/types/seminar";

const seminarsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeminars: build.query<Array<SeminarDto>, void>({
      query: () => ({
        url: `/seminars`,
      }),
      providesTags: ["Seminars"],
    }),
    deleteSeminars: build.mutation<void, string>({
      query: (id: string) => ({
        url: `/seminars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seminars"],
    }),
  }),
});

export const { useGetSeminarsQuery, useDeleteSeminarsMutation } = seminarsApi;
