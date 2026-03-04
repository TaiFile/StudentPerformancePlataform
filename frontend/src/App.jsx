import { useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import ClusteringChart from './components/ClusteringChart.jsx'
import RiskPrediction from './components/RiskPrediction.jsx'
import PerformanceHeatmap from './components/PerformanceHeatmap.jsx'
import './App.css'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'clustering', label: 'Clustering' },
  { id: 'risk', label: 'Risk Prediction' },
  { id: 'correlations', label: 'Correlations' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Edumetrics <span className="logo-ai">AI</span></span>
          </div>
          <nav className="nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'clustering' && <ClusteringChart />}
        {activeTab === 'risk' && <RiskPrediction />}
        {activeTab === 'correlations' && <PerformanceHeatmap />}
      </main>
    </div>
  )
}
