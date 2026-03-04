import { useEffect, useState } from 'react'
import { getStudents, getPredictions } from '../services/api.js'
import StudentRadarChart from './StudentRadarChart.jsx'
import './Dashboard.css'

export default function Dashboard() {
  const [students, setStudents] = useState([])
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getStudents(), getPredictions()])
      .then(([s, p]) => {
        setStudents(s)
        setPredictions(p.predictions)
      })
      .catch(() => setError('Failed to load data. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="loading-box">
      <div className="spinner" />
      <p>Loading dashboard…</p>
    </div>
  )

  if (error) return <div className="error-box">{error}</div>

  const atRisk = predictions.filter(p => p.status === 'at_risk').length
  const avgScore = students.length
    ? (students.reduce((s, x) => s + x.avg_score, 0) / students.length).toFixed(1)
    : 0
  const avgAttendance = students.length
    ? (students.reduce((s, x) => s + x.attendance_rate, 0) / students.length).toFixed(1)
    : 0

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Overview of student academic performance metrics</p>

      <div className="metrics-grid">
        <MetricCard label="Total Students" value={students.length} icon="👥" color="blue" />
        <MetricCard label="Average Score" value={`${avgScore}%`} icon="📈" color="green" />
        <MetricCard label="At-Risk Students" value={atRisk} icon="⚠️" color="red" />
        <MetricCard label="Avg. Attendance" value={`${avgAttendance}%`} icon="📅" color="purple" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2 className="card-title">Competency Radar – Class Average</h2>
          <StudentRadarChart students={students} />
        </div>

        <div className="card">
          <h2 className="card-title">Top 5 Students</h2>
          <table className="mini-table">
            <thead>
              <tr><th>Name</th><th>Avg Score</th><th>Attendance</th></tr>
            </thead>
            <tbody>
              {[...students]
                .sort((a, b) => b.avg_score - a.avg_score)
                .slice(0, 5)
                .map(s => (
                  <tr key={s.student_id}>
                    <td>{s.name}</td>
                    <td><span className="score-badge high">{s.avg_score.toFixed(1)}</span></td>
                    <td>{s.attendance_rate}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, icon, color }) {
  return (
    <div className={`metric-card metric-card--${color}`}>
      <span className="metric-icon">{icon}</span>
      <div>
        <div className="metric-value">{value}</div>
        <div className="metric-label">{label}</div>
      </div>
    </div>
  )
}
