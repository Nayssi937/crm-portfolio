import { useState } from 'react'
import {
  Search, Plus, Download, Eye, MoreHorizontal, Calendar, Users,
  MapPin, Check, Clock, Send, FileText
} from 'lucide-react'
import { reservations } from '../data/mockData'
import './TablePage.css'

const statusConfig = {
  'Confirmée': { color: 'emerald', icon: Check },
  'En attente': { color: 'orange', icon: Clock },
  'Devis envoyé': { color: 'blue', icon: Send },
}

export default function Reservations() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tous')
  const [showModal, setShowModal] = useState(false)

  const filtered = reservations.filter(r => {
    const matchSearch = r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'Tous' || r.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="table-page">
      <div className="page-toolbar glass">
        <div className="toolbar-left">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Rechercher une réservation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar-filters">
            {['Tous', 'Confirmée', 'En attente', 'Devis envoyé'].map(t => (
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
          <button className="toolbar-btn primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Nouvelle réservation
          </button>
        </div>
      </div>

      <div className="table-container glass">
        <table className="data-table">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Client</th>
              <th>Visite</th>
              <th>Date</th>
              <th>Participants</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const config = statusConfig[r.status] || { color: 'blue', icon: Clock }
              return (
                <tr key={r.id} className="animate-in" style={{ animationDelay: `${i * 0.04}s` }}>
                  <td>
                    <span className="cell-name" style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>{r.id}</span>
                  </td>
                  <td>
                    <div className="cell-main">
                      <div className="cell-avatar">
                        {r.client.charAt(0)}
                      </div>
                      <div className="cell-info">
                        <span className="cell-name">{r.client}</span>
                        <span className="cell-sub">{r.contact}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="text-secondary">{r.visit}</span></td>
                  <td>
                    <span className="text-secondary">
                      {new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Users size={13} style={{ color: 'var(--text-muted)' }} />
                      <span className="text-secondary">{r.participants}</span>
                    </div>
                  </td>
                  <td><span className="amount">{r.amount.toLocaleString('fr-FR')}€</span></td>
                  <td>
                    <span className={`status-badge ${config.color}`}>
                      <config.icon size={12} style={{ marginRight: 4 }} />
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-icon-btn" title="Voir"><Eye size={14} /></button>
                      <button className="action-icon-btn" title="Contrat"><FileText size={14} /></button>
                      <button className="action-icon-btn" title="Plus"><MoreHorizontal size={14} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal glass-strong" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nouvelle réservation</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Client</label>
                <select>
                  <option>Rechercher ou créer un client...</option>
                  <option>Airbus Group SE</option>
                  <option>Académie de Toulouse</option>
                  <option>Club Med Corporate</option>
                  <option>Capgemini Toulouse</option>
                  <option>+ Nouveau client</option>
                </select>
              </div>
              <div className="form-group">
                <label>Type de visite</label>
                <select>
                  <option>Sélectionner une visite...</option>
                  <option>La Visite du Printemps</option>
                  <option>Airbus A380 - Chaîne assemblage</option>
                  <option>Airbus A350 - Visite guidée</option>
                  <option>CNES - Centre Spatial</option>
                  <option>Aéroscopia - Visite guidée</option>
                  <option>Cité de l'Espace - Visite VIP</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date de visite</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Nombre de participants</label>
                  <input type="number" placeholder="0" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Heure de début</label>
                  <input type="time" />
                </div>
                <div className="form-group">
                  <label>Montant (€)</label>
                  <input type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea rows={3} placeholder="Notes complémentaires..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="toolbar-btn secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="toolbar-btn primary" onClick={() => setShowModal(false)}>
                <Calendar size={15} />
                Créer la réservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
