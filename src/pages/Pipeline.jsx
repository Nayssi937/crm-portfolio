import { useState } from 'react'
import { pipelineStages } from '../data/mockData'
import { GripVertical, MoreHorizontal, TrendingUp, DollarSign, Users } from 'lucide-react'
import './Pipeline.css'

export default function Pipeline() {
  const [stages] = useState(pipelineStages)

  const totalValue = stages.reduce((sum, s) => sum + s.value, 0)
  const totalDeals = stages.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="pipeline-page">
      <div className="pipeline-summary glass">
        <div className="pipeline-summary-item">
          <DollarSign size={18} className="summary-icon gold" />
          <div>
            <span className="summary-value">{(totalValue / 1000).toFixed(0)}k€</span>
            <span className="summary-label">Valeur pipeline</span>
          </div>
        </div>
        <div className="pipeline-summary-item">
          <Users size={18} className="summary-icon blue" />
          <div>
            <span className="summary-value">{totalDeals}</span>
            <span className="summary-label">Affaires en cours</span>
          </div>
        </div>
        <div className="pipeline-summary-item">
          <TrendingUp size={18} className="summary-icon emerald" />
          <div>
            <span className="summary-value">62.9%</span>
            <span className="summary-label">Taux conversion</span>
          </div>
        </div>
      </div>

      <div className="pipeline-stages-bar glass">
        {stages.map(stage => (
          <div key={stage.id} className="stage-bar-segment" style={{ flex: Math.max(stage.count, 1) }}>
            <div className="stage-bar-fill" style={{ background: stage.color }} />
            <span className="stage-bar-label">{stage.label}</span>
            <span className="stage-bar-count">{stage.count}</span>
          </div>
        ))}
      </div>

      <div className="pipeline-columns">
        {stages.map((stage, si) => (
          <div key={stage.id} className="pipeline-column animate-in" style={{ animationDelay: `${si * 0.08}s` }}>
            <div className="column-header">
              <div className="column-header-left">
                <div className="column-dot" style={{ background: stage.color }} />
                <span className="column-title">{stage.label}</span>
                <span className="column-count">{stage.count}</span>
              </div>
              <span className="column-value">
                {stage.value > 0 ? `${(stage.value / 1000).toFixed(1)}k€` : '—'}
              </span>
            </div>

            <div className="column-cards">
              {stage.items.map(item => (
                <div key={item.id} className="pipeline-card glass">
                  <div className="pipeline-card-header">
                    <span className="pipeline-card-name">{item.name}</span>
                    <button className="action-icon-btn" style={{ width: 24, height: 24 }}>
                      <MoreHorizontal size={12} />
                    </button>
                  </div>
                  <div className="pipeline-card-amount">
                    {item.amount.toLocaleString('fr-FR')}€
                  </div>
                  <div className="pipeline-card-footer">
                    <span className="pipeline-card-date">{item.date}</span>
                    <div className="probability-badge" style={{
                      background: `rgba(${item.probability >= 80 ? '78,203,141' : item.probability >= 50 ? '212,168,83' : '91,156,245'}, 0.15)`,
                      color: item.probability >= 80 ? 'var(--accent-emerald)' : item.probability >= 50 ? 'var(--accent-gold)' : 'var(--accent-blue)'
                    }}>
                      {item.probability}%
                    </div>
                  </div>
                </div>
              ))}

              {stage.id === 'realise' && (
                <div className="pipeline-card glass" style={{ opacity: 0.6, textAlign: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>12 affaires réalisées</span>
                  <span className="pipeline-card-amount" style={{ marginTop: 4 }}>152 000€</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
