import React, { useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { Transformer } from "../../types"
import "./styles.css"

interface TransformerChartProps {
  transformers: Transformer[]
  selected: string[]
  setSelected: (selected: string[]) => void
}

interface ChartPoint {
  timestamp: string
  [transformerName: string]: number | string | null
}

export const TransformerChart: React.FC<TransformerChartProps> = ({
  transformers,
  selected,
  setSelected,
}) => {
  const chartData = useMemo(() => {
    // 1) Collect all timestamps
    const timestampsSet = new Set<string>()
    transformers.forEach(({ lastTenVoltageReadings }) =>
      lastTenVoltageReadings.forEach(({ timestamp }) =>
        timestampsSet.add(timestamp),
      ),
    )

    const allTimestamps = Array.from(timestampsSet).sort()

    // 2) For each timestamp, build an object: ChartPoint
    return allTimestamps.map(timestamp => {
      const point: ChartPoint = { timestamp }
      transformers.forEach(({ name, lastTenVoltageReadings }) => {
        const match = lastTenVoltageReadings.find(
          r => r.timestamp === timestamp,
        )
        point[name] = match ? match.voltage : null
      })
      return point
    })
  }, [transformers])

  return (
    <div>
      <div className="transformer-chart-container">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp: string) =>
                new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(new Date(timestamp))
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label: string) => new Date(label).toUTCString()}
            />
            <Legend
              onClick={({ value }: { value: string }) =>
                setSelected(
                  selected.includes(value)
                    ? selected.filter(n => n !== value)
                    : [...selected, value],
                )
              }
              verticalAlign="top"
              iconType="circle"
            />
            {transformers.map(({ name, assetId, color }) => (
              <Line
                key={assetId}
                type="monotone"
                dataKey={name}
                dot={false}
                strokeWidth={2}
                hide={!selected.includes(name)}
                stroke={color}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
