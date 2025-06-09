import React, { useMemo, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { ChartPoint, TransformerChartProps } from "../types"
import "./TransformerChart.css"

export const TransformerChart: React.FC<TransformerChartProps> = ({
  transformers,
}) => {
  const allNames = transformers.map(({ name }) => name)
  const [selected, setSelected] = useState<string[]>(allNames)

  // Build chartData once
  const chartData = useMemo(() => {
    // 1) Collect all timestamps
    const timestampsSet = new Set<string>()
    transformers.forEach(({ lastTenVoltgageReadings }) =>
      lastTenVoltgageReadings.forEach(({ timestamp }) =>
        timestampsSet.add(timestamp),
      ),
    )

    const allTimestamps = Array.from(timestampsSet).sort() // sorted chronologically

    // 2) For each timestamp, build an object: ChartPoint
    return allTimestamps.map(timestamp => {
      const point: ChartPoint = { timestamp }
      transformers.forEach(({ name, lastTenVoltgageReadings }) => {
        const match = lastTenVoltgageReadings.find(
          r => r.timestamp === timestamp,
        )
        point[name] = match ? match.voltage : null
      })
      return point
    })
  }, [transformers])

  return (
    <div>
      <div className="transformer-chart-controls">
        {transformers.map(({ assetId, name }) => (
          <label key={assetId} className="transformer-chart-control">
            <input
              type="checkbox"
              name={name}
              checked={selected.includes(name)}
              onChange={() =>
                setSelected(prev =>
                  prev.includes(name)
                    ? prev.filter(n => n !== name)
                    : [...prev, name],
                )
              }
            />
            <span className="transformer-chart-control-name">{name}</span>
          </label>
        ))}
      </div>

      <div className="transformer-chart-container">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={timestamp =>
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
            <Legend />
            {transformers.map(({ name, assetId, color }) =>
              selected.includes(name) ? (
                <Line
                  key={assetId}
                  type="monotone"
                  dataKey={name}
                  dot={false}
                  strokeWidth={2}
                  colorRendering={color}
                  stroke={color}
                />
              ) : null,
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
