import { baseApi } from "@/shared/api/baseApi";
import { SeminarDto } from "../model/types/seminarDto";
import { Seminar } from "../model/types/seminar";

const seminarsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeminars: build.query<SeminarDto[], void>({
      query: () => ({
        url: `/seminars`,
      }),
      providesTags: ["Seminars"],
    }),
    updateSeminar: build.mutation<void, Seminar>({
      query: (seminar: Seminar) => ({
        url: `/seminars/${seminar.id}`,
        method: "PATCH",
        body: seminar,
      }),
      invalidatesTags: ["Seminars"],
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

export const {
  useGetSeminarsQuery,
  useDeleteSeminarsMutation,
  useUpdateSeminarMutation,
} = seminarsApi;
