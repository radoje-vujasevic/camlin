import React, { useState } from "react"
import { TransformerChart } from "../components/TransformerChart"
import { TransformerTable } from "../components/TransformerTable"
import type { HomePageProps } from "../types"

const HomePage: React.FC<HomePageProps> = ({ transformers }) => {
  const allNames = transformers.map(({ name }) => name)
  const [selected, setSelected] = useState<string[]>(allNames)

  return (
    <div className="body">
      <h1 className="title">Transformer Dashboard</h1>

      <section>
        <h2 className="h2">Voltage Readings Over Time</h2>
        <TransformerChart
          transformers={transformers}
          selected={selected}
          setSelected={setSelected}
        />
      </section>

      <section>
        <TransformerTable transformers={transformers} selected={selected} />
      </section>
    </div>
  )
}
export default HomePage
