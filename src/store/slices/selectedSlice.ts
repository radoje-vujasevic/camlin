import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

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
})

export const { setSelected } = selectedSlice.actions
export const selectedReducer = selectedSlice.reducer

export const selectSelectedValues = (state: { selected: SelectedState }) =>
  state.selected.selected
