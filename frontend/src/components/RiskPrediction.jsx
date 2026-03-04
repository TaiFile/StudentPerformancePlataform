import { useEffect, useState } from 'react'
import { getPredictions, predictStudent } from '../services/api.js'
import './RiskPrediction.css'

export default function RiskPrediction() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // New student form state
  const [form, setForm] = useState({
    study_hours_per_week: 10,
    attendance_rate: 80,
    sleep_hours: 7,
    internet_num: 1,
    extracurricular_num: 0,
    parental_edu_num: 1,
  })
  const [predResult, setPredResult] = useState(null)
  const [predLoading, setPredLoading] = useState(false)

  useEffect(() => {
    getPredictions()
      .then(data => setPredictions(data.predictions))
      .catch(() => setError('Failed to load predictions.'))
      .finally(() => setLoading(false))
  }, [])

  const handlePredict = async (e) => {
    e.preventDefault()
    setPredLoading(true)
    setPredResult(null)
    try {
      const result = await predictStudent(form)
      setPredResult(result)
    } catch {
      setPredResult({ error: 'Prediction failed.' })
    } finally {
      setPredLoading(false)
    }
  }

  if (loading) return (
    <div className="loading-box">
      <div className="spinner" />
      <p>Loading predictions…</p>
    </div>
  )
  if (error) return <div className="error-box">{error}</div>

  const atRisk = predictions.filter(p => p.status === 'at_risk')
  const safe = predictions.filter(p => p.status === 'no_risk')

  return (
    <div>
      <h1 className="page-title">Risk Prediction</h1>
      <p className="page-subtitle">Random Forest model predicting academic failure risk</p>

      <div className="risk-summary">
        <div className="risk-badge risk-badge--danger">
          <span>⚠️</span>
          <div>
            <div className="risk-badge-count">{atRisk.length}</div>
            <div className="risk-badge-label">At Risk</div>
          </div>
        </div>
        <div className="risk-badge risk-badge--success">
          <span>✅</span>
          <div>
            <div className="risk-badge-count">{safe.length}</div>
            <div className="risk-badge-label">No Risk</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title">All Students – Risk Assessment</h2>
        <div className="table-scroll">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Avg Score</th>
                <th>Risk Probability</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...predictions]
                .sort((a, b) => b.risk_probability - a.risk_probability)
                .map(p => (
                  <tr key={p.student_id}>
                    <td>{p.name}</td>
                    <td>{p.avg_score}</td>
                    <td>
                      <div className="prob-bar-wrap">
                        <div
                          className={`prob-bar ${p.status === 'at_risk' ? 'prob-bar--danger' : 'prob-bar--safe'}`}
                          style={{ width: `${(p.risk_probability * 100).toFixed(0)}%` }}
                        />
                        <span className="prob-label">{(p.risk_probability * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-chip ${p.status === 'at_risk' ? 'status-danger' : 'status-safe'}`}>
                        {p.status === 'at_risk' ? 'At Risk' : 'No Risk'}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Predict for new student ── */}
      <div className="card">
        <h2 className="card-title">Predict for New Student</h2>
        <form className="pred-form" onSubmit={handlePredict}>
          <div className="form-grid">
            <label className="form-field">
              <span>Study Hours/Week</span>
              <input type="number" min="0" max="40" value={form.study_hours_per_week}
                onChange={e => setForm(f => ({ ...f, study_hours_per_week: +e.target.value }))} />
            </label>
            <label className="form-field">
              <span>Attendance Rate (%)</span>
              <input type="number" min="0" max="100" value={form.attendance_rate}
                onChange={e => setForm(f => ({ ...f, attendance_rate: +e.target.value }))} />
            </label>
            <label className="form-field">
              <span>Sleep Hours</span>
              <input type="number" min="0" max="12" value={form.sleep_hours}
                onChange={e => setForm(f => ({ ...f, sleep_hours: +e.target.value }))} />
            </label>
            <label className="form-field">
              <span>Internet Access</span>
              <select value={form.internet_num}
                onChange={e => setForm(f => ({ ...f, internet_num: +e.target.value }))}>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label className="form-field">
              <span>Extracurricular</span>
              <select value={form.extracurricular_num}
                onChange={e => setForm(f => ({ ...f, extracurricular_num: +e.target.value }))}>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label className="form-field">
              <span>Parental Education</span>
              <select value={form.parental_edu_num}
                onChange={e => setForm(f => ({ ...f, parental_edu_num: +e.target.value }))}>
                <option value={0}>Elementary</option>
                <option value={1}>High School</option>
                <option value={2}>Bachelor</option>
                <option value={3}>Master</option>
              </select>
            </label>
          </div>
          <button type="submit" className="predict-btn" disabled={predLoading}>
            {predLoading ? 'Predicting…' : 'Predict Risk'}
          </button>
        </form>

        {predResult && (
          <div className={`pred-result ${predResult.status === 'at_risk' ? 'pred-danger' : predResult.error ? 'pred-error' : 'pred-safe'}`}>
            {predResult.error
              ? predResult.error
              : (
                <>
                  <strong>{predResult.status === 'at_risk' ? '⚠️ At Risk' : '✅ No Risk'}</strong>
                  <span> — Risk probability: {(predResult.risk_probability * 100).toFixed(1)}%</span>
                </>
              )}
          </div>
        )}
      </div>
    </div>
  )
}
