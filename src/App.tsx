import React, { useEffect } from "react"
import { useGetTransformersQuery } from "./store/slices/api/useTransformers"
import "./App.css"
import HomePage from "./pages/HomePage"
import { PERSISTED_KEYS, type RootState } from "./store/store"
import { useSelectedSplice } from "./store/hooks/useSelectedSplice"
import type { SelectedState } from "./store/slices/selectedSlice"

export const App: React.FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetTransformersQuery()
  const { setSelected } = useSelectedSplice()

  useEffect(() => {
    const selectedSync = (event: StorageEvent) => {
      if (
        event.key === "selected" &&
        event.newValue &&
        PERSISTED_KEYS.includes(event.key as keyof RootState)
      ) {
        try {
          const { selected } = JSON.parse(event.newValue) as SelectedState
          setSelected([...selected].sort())
        } catch (error) {
          console.error("Error parsing selected from localStorage:", error)
        }
      }
    }

    window.addEventListener("storage", selectedSync)
    return () => window.removeEventListener("storage", selectedSync)
  }, [setSelected])

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading transformers…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="error">
        <p>Error fetching data</p>
      </div>
    )
  }

  return isSuccess ? <HomePage transformers={data} /> : null
}

export default App
