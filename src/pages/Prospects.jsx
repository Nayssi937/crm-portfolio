import { useState } from 'react'
import {
  Search, Filter, Plus, ArrowUpRight, MoreHorizontal, Mail, Phone,
  UserPlus, Star, ChevronDown, Download, Eye
} from 'lucide-react'
import { prospects } from '../data/mockData'
import './TablePage.css'

const statusColors = {
  'Nouveau': 'blue',
  'Contacté': 'violet',
  'Qualifié': 'orange',
  'Proposition': 'gold',
  'Négociation': 'emerald',
}

export default function Prospects() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('Tous')
  const [convertModal, setConvertModal] = useState(null)

  const filtered = prospects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.contact.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'Tous' || p.type === filterType
    return matchSearch && matchType
  })

  const handleConvert = (prospect) => {
    setConvertModal(prospect)
  }

  return (
    <div className="table-page">
      <div className="page-toolbar glass">
        <div className="toolbar-left">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Rechercher un prospect..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar-filters">
            {['Tous', 'B2B', 'B2C'].map(t => (
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
          <button className="toolbar-btn secondary">
            <Download size={15} />
            Exporter
          </button>
          <button className="toolbar-btn primary">
            <Plus size={15} />
            Nouveau prospect
          </button>
        </div>
      </div>

      <div className="table-container glass">
        <table className="data-table">
          <thead>
            <tr>
              <th>Prospect</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Source</th>
              <th>Visite souhaitée</th>
              <th>Score</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className="animate-in" style={{ animationDelay: `${i * 0.04}s` }}>
                <td>
                  <div className="cell-main">
                    <div className="cell-avatar">
                      {p.name.charAt(0)}
                    </div>
                    <div className="cell-info">
                      <span className="cell-name">{p.name}</span>
                      <span className="cell-sub">{p.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cell-contact">
                    <span>{p.contact}</span>
                    <span className="cell-sub">{p.phone}</span>
                  </div>
                </td>
                <td>
                  <span className={`type-badge ${p.type.toLowerCase()}`}>{p.type}</span>
                </td>
                <td><span className="text-secondary">{p.source}</span></td>
                <td><span className="text-secondary">{p.visits}</span></td>
                <td>
                  <div className="score-bar-container">
                    <div className="score-bar">
                      <div
                        className={`score-fill ${p.score >= 80 ? 'high' : p.score >= 60 ? 'mid' : 'low'}`}
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                    <span className="score-value">{p.score}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-icon-btn" title="Email">
                      <Mail size={14} />
                    </button>
                    <button className="action-icon-btn" title="Appeler">
                      <Phone size={14} />
                    </button>
                    <button
                      className="action-icon-btn convert"
                      title="Convertir en client"
                      onClick={() => handleConvert(p)}
                    >
                      <ArrowUpRight size={14} />
                    </button>
                    <button className="action-icon-btn" title="Plus">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Convert modal */}
      {convertModal && (
        <div className="modal-overlay" onClick={() => setConvertModal(null)}>
          <div className="modal glass-strong" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Convertir en client</h2>
              <button className="modal-close" onClick={() => setConvertModal(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="convert-preview">
                <div className="convert-from">
                  <span className="convert-label">Prospect</span>
                  <span className="convert-name">{convertModal.name}</span>
                  <span className="convert-detail">{convertModal.email}</span>
                </div>
                <div className="convert-arrow">
                  <ArrowUpRight size={24} />
                </div>
                <div className="convert-to">
                  <span className="convert-label">Client</span>
                  <span className="convert-name">{convertModal.name}</span>
                  <span className="convert-detail">Nouveau client</span>
                </div>
              </div>
              <div className="form-group">
                <label>Type de client</label>
                <select defaultValue={convertModal.type === 'B2B' ? 'Entreprise' : 'Particulier'}>
                  <option>Entreprise</option>
                  <option>Institution</option>
                  <option>Particulier</option>
                  <option>Groupe</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea rows={3} placeholder="Notes sur la conversion..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="toolbar-btn secondary" onClick={() => setConvertModal(null)}>Annuler</button>
              <button className="toolbar-btn primary" onClick={() => setConvertModal(null)}>
                <UserPlus size={15} />
                Convertir en client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
