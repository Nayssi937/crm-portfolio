import { useState } from 'react'
import {
  Search, Plus, Download, Eye, FileText, CreditCard, MoreHorizontal,
  Building2, User, Landmark, Users as UsersIcon, ArrowLeft, Mail, Phone,
  MapPin, Calendar, ExternalLink
} from 'lucide-react'
import { clients } from '../data/mockData'
import './TablePage.css'

const typeIcons = {
  'Entreprise': Building2,
  'Institution': Landmark,
  'Particulier': User,
  'Groupe': UsersIcon,
}

export default function Clients() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('Tous')
  const [selectedClient, setSelectedClient] = useState(null)

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'Tous' || c.type === filterType
    return matchSearch && matchType
  })

  if (selectedClient) {
    const c = selectedClient
    return (
      <div className="table-page">
        <button className="toolbar-btn secondary" onClick={() => setSelectedClient(null)} style={{ width: 'fit-content' }}>
          <ArrowLeft size={15} /> Retour aux clients
        </button>

        <div className="client-detail-layout">
          <div className="client-detail-main glass">
            <div className="client-detail-header">
              <div className="client-detail-avatar">
                {c.name.charAt(0)}
              </div>
              <div className="client-detail-info">
                <h2 className="client-detail-name">{c.name}</h2>
                <span className={`status-badge ${c.status === 'Actif' ? 'emerald' : 'rose'}`}>{c.status}</span>
              </div>
            </div>

            <div className="detail-grid" style={{ marginTop: 24 }}>
              <div className="detail-item">
                <span className="detail-label">Contact principal</span>
                <span className="detail-value">{c.contact}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{c.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Téléphone</span>
                <span className="detail-value">{c.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type</span>
                <span className="detail-value">{c.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Client depuis</span>
                <span className="detail-value">{new Date(c.since).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Dernière visite</span>
                <span className="detail-value">{new Date(c.lastVisit).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <button className="toolbar-btn primary"><Mail size={14} /> Envoyer un email</button>
              <button className="toolbar-btn secondary"><Phone size={14} /> Appeler</button>
              <button className="toolbar-btn secondary"><FileText size={14} /> Nouveau contrat</button>
            </div>
          </div>

          <div className="client-detail-side">
            <div className="glass" style={{ padding: 20 }}>
              <h3 className="side-card-title">Résumé financier</h3>
              <div className="finance-summary">
                <div className="finance-item">
                  <span className="finance-label">Total dépensé</span>
                  <span className="finance-value gold">{c.totalSpent.toLocaleString('fr-FR')}€</span>
                </div>
                <div className="finance-item">
                  <span className="finance-label">Contrats</span>
                  <span className="finance-value">{c.contracts}</span>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: 20 }}>
              <h3 className="side-card-title">Contrats associés</h3>
              <div className="linked-items">
                <div className="linked-item">
                  <FileText size={14} />
                  <span>CTR-2026-001</span>
                  <span className="status-badge emerald" style={{ fontSize: 10, padding: '2px 8px' }}>Actif</span>
                </div>
                <div className="linked-item">
                  <FileText size={14} />
                  <span>CTR-2026-003</span>
                  <span className="status-badge orange" style={{ fontSize: 10, padding: '2px 8px' }}>En signature</span>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: 20 }}>
              <h3 className="side-card-title">Réservations</h3>
              <div className="linked-items">
                <div className="linked-item">
                  <Calendar size={14} />
                  <span>RES-2026-001 — 15 Avr</span>
                  <span className="status-badge emerald" style={{ fontSize: 10, padding: '2px 8px' }}>Confirmée</span>
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
              placeholder="Rechercher un client..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar-filters">
            {['Tous', 'Entreprise', 'Institution', 'Particulier'].map(t => (
              <button
                key={t}
                className={`filter-chip ${filterType === t ? 'active' : ''}`}
                onClick={() => setFilterType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn secondary"><Download size={15} /> Exporter</button>
          <button className="toolbar-btn primary"><Plus size={15} /> Nouveau client</button>
        </div>
      </div>

      <div className="table-container glass">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Client depuis</th>
              <th>CA Total</th>
              <th>Contrats</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const TypeIcon = typeIcons[c.type] || User
              return (
                <tr key={c.id} className="animate-in" style={{ animationDelay: `${i * 0.04}s`, cursor: 'pointer' }}
                    onClick={() => setSelectedClient(c)}>
                  <td>
                    <div className="cell-main">
                      <div className="cell-avatar">
                        <TypeIcon size={16} />
                      </div>
                      <div className="cell-info">
                        <span className="cell-name">{c.name}</span>
                        <span className="cell-sub">{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cell-contact">
                      <span>{c.contact}</span>
                      <span className="cell-sub">{c.phone}</span>
                    </div>
                  </td>
                  <td><span className="text-secondary">{c.type}</span></td>
                  <td><span className="text-secondary">{new Date(c.since).toLocaleDateString('fr-FR')}</span></td>
                  <td><span className="amount">{c.totalSpent.toLocaleString('fr-FR')}€</span></td>
                  <td><span className="text-secondary">{c.contracts}</span></td>
                  <td>
                    <span className={`status-badge ${c.status === 'Actif' ? 'emerald' : 'rose'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons" onClick={e => e.stopPropagation()}>
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
    </div>
  )
}
