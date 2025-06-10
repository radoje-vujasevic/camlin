import React, { useEffect } from "react"
import { useGetTransformersQuery } from "./store/slices/api/useTransformers"
import "./App.css"
import HomePage from "./pages/HomePage"
import { PERSISTED_KEYS, type RootState } from "./store/store"
import { useSelectedSplice } from "./store/hooks/useSelectedSplice"

export const App: React.FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetTransformersQuery()
  const { set } = useSelectedSplice()

  useEffect(() => {
    const selectedSync = (event: StorageEvent) => {
      if (
        event.key &&
        event.newValue &&
        PERSISTED_KEYS.includes(event.key as keyof RootState)
      ) {
        set(JSON.parse(event.newValue).selected.sort())
      }
    }

    window.addEventListener("storage", selectedSync)
    return () => window.removeEventListener("storage", selectedSync)
  }, [set])

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
