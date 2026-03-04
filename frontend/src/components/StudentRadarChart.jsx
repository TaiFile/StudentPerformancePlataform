import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

const SUBJECTS = [
  { key: 'math_score', label: 'Math' },
  { key: 'reading_score', label: 'Reading' },
  { key: 'writing_score', label: 'Writing' },
  { key: 'science_score', label: 'Science' },
]

export default function StudentRadarChart({ students }) {
  if (!students || students.length === 0) return <p>No data</p>

  const avg = (key) =>
    parseFloat(
      (students.reduce((s, x) => s + (x[key] || 0), 0) / students.length).toFixed(1)
    )

  const data = SUBJECTS.map(({ key, label }) => ({
    subject: label,
    Average: avg(key),
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: '#475569' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar
          name="Class Average"
          dataKey="Average"
          stroke="#4f46e5"
          fill="#4f46e5"
          fillOpacity={0.25}
        />
        <Tooltip formatter={(v) => [`${v}`, 'Avg Score']} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
