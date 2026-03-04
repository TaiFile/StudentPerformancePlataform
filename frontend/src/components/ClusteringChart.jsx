import { useEffect, useState } from 'react'
import { getClustering } from '../services/api.js'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './ClusteringChart.css'

const CLUSTER_COLORS = {
  'Dificuldade Conceitual': '#f59e0b',
  'Falta de Engajamento': '#ef4444',
  'Defasagem de Base': '#8b5cf6',
}

const CLUSTER_DESCRIPTIONS = {
  'Dificuldade Conceitual': 'Students who struggle with specific concepts despite regular attendance.',
  'Falta de Engajamento': 'Students with low engagement, few study hours and poor attendance.',
  'Defasagem de Base': 'Students with foundational knowledge gaps across all subjects.',
}

export default function ClusteringChart() {
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getClustering()
      .then(data => setClusters(data.clusters))
      .catch(() => setError('Failed to load clustering data.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="loading-box">
      <div className="spinner" />
      <p>Running clustering algorithm…</p>
    </div>
  )
  if (error) return <div className="error-box">{error}</div>

  // Flatten students for the scatter plot (avg_score vs study_hours)
  const scatterData = clusters.map(cluster => ({
    label: cluster.cluster_label,
    color: CLUSTER_COLORS[cluster.cluster_label] || '#6366f1',
    points: cluster.students.map(s => ({
      x: s.math_score,
      y: s.avg_score,
      name: s.name,
    })),
  }))

  return (
    <div>
      <h1 className="page-title">Student Clustering</h1>
      <p className="page-subtitle">K-Means segmentation into 3 learning profiles</p>

      <div className="cluster-grid">
        {clusters.map(cluster => (
          <div
            key={cluster.cluster_label}
            className="cluster-card card"
            style={{ borderLeftColor: CLUSTER_COLORS[cluster.cluster_label] || '#6366f1' }}
          >
            <div className="cluster-label" style={{ color: CLUSTER_COLORS[cluster.cluster_label] }}>
              {cluster.cluster_label}
            </div>
            <div className="cluster-stats">
              <span>{cluster.count} students</span>
              <span>Avg: {cluster.avg_score.toFixed(1)}</span>
            </div>
            <p className="cluster-desc">{CLUSTER_DESCRIPTIONS[cluster.cluster_label]}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="card-title">Cluster Distribution – Math Score vs Average Score</h2>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="x"
              name="Math Score"
              label={{ value: 'Math Score', position: 'insideBottom', offset: -10 }}
              domain={[20, 100]}
            />
            <YAxis
              dataKey="y"
              name="Avg Score"
              label={{ value: 'Avg Score', angle: -90, position: 'insideLeft' }}
              domain={[20, 100]}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => {
                if (!payload?.length) return null
                const { x, y, name } = payload[0].payload
                return (
                  <div className="custom-tooltip">
                    <strong>{name}</strong>
                    <div>Math: {x}</div>
                    <div>Avg: {y?.toFixed ? y.toFixed(1) : y}</div>
                  </div>
                )
              }}
            />
            <Legend verticalAlign="top" />
            {scatterData.map(({ label, color, points }) => (
              <Scatter key={label} name={label} data={points} fill={color} opacity={0.8} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="card-title">Student List by Cluster</h2>
        {clusters.map(cluster => (
          <div key={cluster.cluster_label} className="cluster-table-section">
            <h3
              className="cluster-table-header"
              style={{ color: CLUSTER_COLORS[cluster.cluster_label] }}
            >
              {cluster.cluster_label} ({cluster.count})
            </h3>
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Name</th><th>Math</th><th>Reading</th><th>Writing</th><th>Science</th><th>Avg</th>
                </tr>
              </thead>
              <tbody>
                {cluster.students.map(s => (
                  <tr key={s.student_id}>
                    <td>{s.name}</td>
                    <td>{s.math_score}</td>
                    <td>{s.reading_score}</td>
                    <td>{s.writing_score}</td>
                    <td>{s.science_score}</td>
                    <td><strong>{s.avg_score.toFixed(1)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
