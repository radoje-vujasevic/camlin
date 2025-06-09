import React from "react"
import { useGetTransformersQuery } from "./store/api/useTransformers"
import { TransformerTable } from "./components/TransformerTable"
import { TransformerChart } from "./components/TransformerChart"
import "./App.css"

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

  return isSuccess ? (
    <div className="body">
      <h1 className="title">Transformer Dashboard</h1>

      <section>
        <h2 className="h2">Voltage Readings Over Time</h2>
        <TransformerChart transformers={data} />
      </section>

      <section>
        <TransformerTable transformers={data} />
      </section>
    </div>
  ) : null
}

export default App
