import { useState } from 'react'
import {
  Search, Plus, Download, Eye, MoreHorizontal, FileText, CreditCard,
  Check, Clock, Edit3, ArrowLeft, Calendar, User, Printer
} from 'lucide-react'
import { contracts } from '../data/mockData'
import './TablePage.css'
import './Contracts.css'

const statusConfig = {
  'Actif': { color: 'emerald' },
  'En signature': { color: 'orange' },
  'Brouillon': { color: 'blue' },
  'Terminé': { color: 'violet' },
}

const contractActivities = [
  { action: 'Contrat créé', user: 'Lucien F.', date: '24 Mar 2026 à 14:30' },
  { action: 'Montant modifié (15 000€ → 18 500€)', user: 'Lucien F.', date: '24 Mar 2026 à 14:45' },
  { action: 'Document envoyé au client', user: 'Système', date: '24 Mar 2026 à 15:00' },
  { action: 'Contrat signé par le client', user: 'David Fournier', date: '25 Mar 2026 à 09:15' },
]

export default function Contracts() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tous')
  const [selectedContract, setSelectedContract] = useState(null)
  const [showNewContract, setShowNewContract] = useState(false)

  const filtered = contracts.filter(c => {
    const matchSearch = c.client.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'Tous' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  if (selectedContract) {
    const c = selectedContract
    const config = statusConfig[c.status] || { color: 'blue' }
    const paidPercent = Math.round((c.paid / c.amount) * 100)

    return (
      <div className="table-page">
        <button className="toolbar-btn secondary" onClick={() => setSelectedContract(null)} style={{ width: 'fit-content' }}>
          <ArrowLeft size={15} /> Retour aux contrats
        </button>

        <div className="contract-detail-layout">
          <div className="contract-detail-main glass">
            <div className="contract-detail-header">
              <div>
                <h2 className="contract-id">{c.id}</h2>
                <p className="contract-visit">{c.visit}</p>
              </div>
              <span className={`status-badge ${config.color}`}>{c.status}</span>
            </div>

            <div className="detail-grid" style={{ marginTop: 24 }}>
              <div className="detail-item">
                <span className="detail-label">Client</span>
                <span className="detail-value" style={{ color: 'var(--accent-gold)', cursor: 'pointer' }}>{c.client}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Montant total</span>
                <span className="detail-value">{c.amount.toLocaleString('fr-FR')}€</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date début</span>
                <span className="detail-value">{new Date(c.startDate).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date fin</span>
                <span className="detail-value">{new Date(c.endDate).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            <div className="payment-section" style={{ marginTop: 28 }}>
              <h3 className="section-title">Paiements</h3>
              <div className="payment-bar-container">
                <div className="payment-bar">
                  <div className="payment-progress" style={{ width: `${paidPercent}%` }} />
                </div>
                <div className="payment-info">
                  <span>Payé: <strong>{c.paid.toLocaleString('fr-FR')}€</strong></span>
                  <span>Restant: <strong>{c.remaining.toLocaleString('fr-FR')}€</strong></span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="toolbar-btn primary"><Printer size={14} /> Quittance de paiement</button>
              <button className="toolbar-btn secondary"><Download size={14} /> Télécharger contrat</button>
              <button className="toolbar-btn secondary"><Edit3 size={14} /> Modifier</button>
            </div>
          </div>

          <div className="contract-detail-side">
            <div className="glass" style={{ padding: 20 }}>
              <h3 className="side-card-title">Journal d'activité</h3>
              <div className="contract-activity-log">
                {contractActivities.map((a, i) => (
                  <div key={i} className="activity-log-item">
                    <div className="activity-log-dot" />
                    <div className="activity-log-content">
                      <span className="activity-log-action">{a.action}</span>
                      <span className="activity-log-meta">{a.user} — {a.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass" style={{ padding: 20 }}>
              <h3 className="side-card-title">Documents</h3>
              <div className="linked-items">
                <div className="linked-item">
                  <FileText size={14} />
                  <span>Contrat signé.pdf</span>
                  <button className="action-icon-btn" style={{ width: 24, height: 24, marginLeft: 'auto' }}>
                    <Download size={12} />
                  </button>
                </div>
                <div className="linked-item">
                  <CreditCard size={14} />
                  <span>Quittance-001.pdf</span>
                  <button className="action-icon-btn" style={{ width: 24, height: 24, marginLeft: 'auto' }}>
                    <Download size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="table-page">
      <div className="page-toolbar glass">
        <div className="toolbar-left">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Rechercher un contrat..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar-filters">
            {['Tous', 'Actif', 'En signature', 'Brouillon'].map(t => (
              <button
                key={t}
                className={`filter-chip ${filterStatus === t ? 'active' : ''}`}
                onClick={() => setFilterStatus(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn secondary"><Download size={15} /> Exporter</button>
          <button className="toolbar-btn primary" onClick={() => setShowNewContract(true)}>
            <Plus size={15} /> Nouveau contrat
          </button>
        </div>
      </div>

      <div className="table-container glass">
        <table className="data-table">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Client</th>
              <th>Prestation</th>
              <th>Période</th>
              <th>Montant</th>
              <th>Payé</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const config = statusConfig[c.status] || { color: 'blue' }
              const paidPercent = Math.round((c.paid / c.amount) * 100)
              return (
                <tr key={c.id} className="animate-in" style={{ animationDelay: `${i * 0.04}s`, cursor: 'pointer' }}
                    onClick={() => setSelectedContract(c)}>
                  <td><span className="cell-name" style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>{c.id}</span></td>
                  <td>
                    <div className="cell-main">
                      <div className="cell-avatar">{c.client.charAt(0)}</div>
                      <span className="cell-name">{c.client}</span>
                    </div>
                  </td>
                  <td><span className="text-secondary">{c.visit}</span></td>
                  <td>
                    <span className="text-secondary" style={{ fontSize: 12 }}>
                      {new Date(c.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} → {new Date(c.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td><span className="amount">{c.amount.toLocaleString('fr-FR')}€</span></td>
                  <td>
                    <div className="payment-mini">
                      <div className="payment-mini-bar">
                        <div className="payment-mini-fill" style={{ width: `${paidPercent}%` }} />
                      </div>
                      <span className="payment-mini-pct">{paidPercent}%</span>
                    </div>
                  </td>
                  <td><span className={`status-badge ${config.color}`}>{c.status}</span></td>
                  <td>
                    <div className="action-buttons" onClick={e => e.stopPropagation()}>
                      <button className="action-icon-btn" title="Voir"><Eye size={14} /></button>
                      <button className="action-icon-btn" title="Télécharger"><Download size={14} /></button>
                      <button className="action-icon-btn" title="Plus"><MoreHorizontal size={14} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showNewContract && (
        <div className="modal-overlay" onClick={() => setShowNewContract(false)}>
          <div className="modal glass-strong" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nouveau contrat</h2>
              <button className="modal-close" onClick={() => setShowNewContract(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Client</label>
                <select>
                  <option>Rechercher ou créer un client...</option>
                  <option>Airbus Group SE</option>
                  <option>Académie de Toulouse</option>
                  <option>Club Med Corporate</option>
                  <option>+ Nouveau client</option>
                </select>
              </div>
              <div className="form-group">
                <label>Prestation / Visite</label>
                <input type="text" placeholder="Description de la prestation..." />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date début</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Date fin</label>
                  <input type="date" />
                </div>
              </div>
              <div className="form-group">
                <label>Montant total (€)</label>
                <input type="number" placeholder="0.00" />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea rows={3} placeholder="Conditions particulières..." />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Un numéro de contrat sera généré automatiquement à la validation.
              </p>
            </div>
            <div className="modal-footer">
              <button className="toolbar-btn secondary" onClick={() => setShowNewContract(false)}>Annuler</button>
              <button className="toolbar-btn primary" onClick={() => setShowNewContract(false)}>
                <FileText size={15} />
                Créer le contrat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
