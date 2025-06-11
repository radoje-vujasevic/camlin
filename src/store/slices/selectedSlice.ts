import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { transformersApiSlice } from "./api/useTransformers"

interface SelectedState {
  selected: string[]
}

const initialState: SelectedState = {
  selected: [],
}

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      transformersApiSlice.endpoints.getTransformers.matchFulfilled,
      (state, action) => {
        if (state.selected.length === 0) {
          const allTransformersNames = action.payload.map(({ name }) => name)
          state.selected = allTransformersNames
        }
      },
    )
  },
})

export const { setSelected } = selectedSlice.actions
export const selectedReducer = selectedSlice.reducer

export const selectSelectedValues = (state: { selected: SelectedState }) =>
  state.selected.selected
