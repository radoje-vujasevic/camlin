import { useAppDispatch, useAppSelector } from "../hooks"
import { setSelected, selectSelectedValues } from "../slices/selectedSlice"

interface UseSelectedSpliceReturn {
  selected: string[]
  set: (selected: string[]) => void
}

export const useSelectedSplice = (): UseSelectedSpliceReturn => {
  const dispatch = useAppDispatch()
  const selectedValues = useAppSelector(selectSelectedValues)

  return {
    selected: selectedValues,
    set: (selected: string[]) => {
      dispatch(setSelected(selected))
    },
  }
}
