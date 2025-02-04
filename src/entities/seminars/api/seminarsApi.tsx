import { baseApi } from "@/shared/api/baseApi";
import { SeminarDto } from "../model/types/seminar";

const seminarsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeminars: build.query<Array<SeminarDto>, void>({
      query: () => ({
        url: `/seminars`,
      }),
    }),
  }),
});

export const { useGetSeminarsQuery } = seminarsApi;
