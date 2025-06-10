import React, { useMemo, useState } from "react"
import type { TransformerTableProps } from "../types"
import "./TransformerTable.css"

export const TransformerTable: React.FC<TransformerTableProps> = ({
  transformers,
}) => {
  const [search, setSearch] = useState<string>("")

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return !s
      ? transformers
      : transformers.filter(
          ({ name, region, health }) =>
            name.toLowerCase().includes(s) ||
            region.toLowerCase().includes(s) ||
            health.toLowerCase().includes(s),
        )
  }, [transformers, search])

  return (
    <div className="transformer-table">
      <input
        type="text"
        placeholder="Search by name / region / health"
        value={search}
        onChange={e => setSearch(e.target.value)}
        name={"search"}
        className="search-input"
      />

      <div className="table-container">
        <table className="transformer-table-content">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Region</th>
              <th className="table-header-cell">Health</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ assetId, color, name, region, health }) => (
              <tr key={assetId} className="table-row">
                <td className="table-row-cell" style={{ color }}>
                  {name}
                </td>
                <td className="table-row-cell">{region}</td>
                <td className="table-row-cell">{health}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="table-empty-message">
                  No transformers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
