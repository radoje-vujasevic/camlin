import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../hooks"
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

export const useSelectedSplice = () => {
  const dispatch = useAppDispatch()
  const selectedValues = useAppSelector(selectSelectedValues)

  return {
    selected: selectedValues,
    setSelected: (selected: string[]) => {
      dispatch(setSelected(selected))
    },
  }
}
