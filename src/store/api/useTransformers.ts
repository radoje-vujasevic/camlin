import type { TransformerRaw, Transformer } from "../../types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const transformersApiSlice = createApi({
  reducerPath: "transformersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Transformers"],
  endpoints: build => ({
    getTransformers: build.query<Transformer[], void>({
      query: () => "sampledata.json",
      providesTags: () => [{ type: "Transformers" }],
      transformResponse: (tr: TransformerRaw[]) =>
        tr.map(({ lastTenVoltgageReadings, ...rest }) => ({
          ...rest,
          lastTenVoltgageReadings: lastTenVoltgageReadings.map(
            ({ timestamp, voltage }) => ({
              timestamp,
              voltage: Number(voltage),
            }),
          ),
        })),
    }),
  }),
})

export const { useGetTransformersQuery } = transformersApiSlice
