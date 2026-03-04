import { useEffect, useState } from 'react'
import { getStudents } from '../services/api.js'
import './PerformanceHeatmap.css'

const SUBJECTS = [
  { key: 'math_score', label: 'Math' },
  { key: 'reading_score', label: 'Reading' },
  { key: 'writing_score', label: 'Writing' },
  { key: 'science_score', label: 'Science' },
]

function scoreColor(score) {
  if (score >= 80) return '#10b981'
  if (score >= 65) return '#84cc16'
  if (score >= 50) return '#f59e0b'
  if (score >= 35) return '#f97316'
  return '#ef4444'
}

export default function PerformanceHeatmap() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(() => setError('Failed to load performance data.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="loading-box">
      <div className="spinner" />
      <p>Loading…</p>
    </div>
  )
  if (error) return <div className="error-box">{error}</div>

  const sorted = [...students].sort((a, b) => b.avg_score - a.avg_score)

  return (
    <div>
      <h1 className="page-title">Performance Heatmap</h1>
      <p className="page-subtitle">Color-coded score grid per student and subject</p>

      <div className="card heatmap-wrapper">
        <div className="legend">
          {[
            { label: '≥ 80', color: '#10b981' },
            { label: '65–79', color: '#84cc16' },
            { label: '50–64', color: '#f59e0b' },
            { label: '35–49', color: '#f97316' },
            { label: '< 35', color: '#ef4444' },
          ].map(({ label, color }) => (
            <span key={label} className="legend-item">
              <span className="legend-dot" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>

        <div className="heatmap-scroll">
          <table className="heatmap-table">
            <thead>
              <tr>
                <th className="name-col">Student</th>
                {SUBJECTS.map(s => <th key={s.key}>{s.label}</th>)}
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(student => (
                <tr key={student.student_id}>
                  <td className="name-col">{student.name}</td>
                  {SUBJECTS.map(s => (
                    <td
                      key={s.key}
                      className="score-cell"
                      style={{ background: scoreColor(student[s.key]) }}
                    >
                      {student[s.key]}
                    </td>
                  ))}
                  <td
                    className="score-cell avg-cell"
                    style={{ background: scoreColor(student.avg_score) }}
                  >
                    {student.avg_score.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
