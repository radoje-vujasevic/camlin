import React from "react"
import type { Transformer } from "../types"
import { useSelectedSplice } from "../store/hooks/useSelectedSplice"
import { TransformerChart } from "../components/TransformerChart"
import { TransformerTable } from "../components/TransformerTable"

interface HomePageProps {
  transformers: Transformer[]
}

const HomePage: React.FC<HomePageProps> = ({ transformers }) => {
  const { selected, setSelected } = useSelectedSplice()

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
