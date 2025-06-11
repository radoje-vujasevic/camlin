import { useAppDispatch, useAppSelector } from "../hooks"
import { selectSelectedValues, setSelected } from "../slices/selectedSlice"

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
