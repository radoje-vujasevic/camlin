import React from "react"
import { useGetTransformersQuery } from "./store/api/useTransformers"
import "./App.css"
import HomePage from "./pages/HomePage"

export const App: React.FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetTransformersQuery()

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
