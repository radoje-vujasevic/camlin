import type { TransformerRaw, Transformer } from "../../../types"
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
        tr.map(({ lastTenVoltageReadings, ...rest }, i) => ({
          ...rest,
          lastTenVoltageReadings: lastTenVoltageReadings.map(
            ({ timestamp, voltage }) => ({
              timestamp,
              voltage: Number(voltage),
            }),
          ),
          color: `hsl(${((i + 1) % tr.length) * (360 / tr.length)}, 70%, 50%)`,
        })),
    }),
  }),
})

export const { useGetTransformersQuery } = transformersApiSlice
