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
