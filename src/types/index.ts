interface TransformerBase {
  assetId: number
  name: string
  region: string
  health: string
}

interface VoltageReadingRaw {
  timestamp: string // ISO string
  voltage: string // voltage as string (e.g. "35234")
}

interface VoltageReading {
  timestamp: string // ISO string
  voltage: number // voltage as number
}

export interface TransformerRaw extends TransformerBase {
  lastTenVoltgageReadings: VoltageReadingRaw[]
}

export interface Transformer extends TransformerBase {
  lastTenVoltgageReadings: VoltageReading[]
  color: string
}

export interface TransformerTableProps {
  transformers: Transformer[]
  selected: string[]
}

export interface TransformerChartProps {
  transformers: Transformer[]
  selected: string[]
  setSelected: (selected: string[]) => void
}

export interface ChartPoint {
  timestamp: string
  [transformerName: string]: number | string | null
}

export interface HomePageProps {
  transformers: Transformer[]
}
