import { useState } from 'react'
import {
  Search, Filter, FileText, Mail, CreditCard, Calendar,
  UserPlus, Edit3, Send, PlusCircle, ArrowRight, File
} from 'lucide-react'
import { activities } from '../data/mockData'
import './TablePage.css'
import './Activities.css'

const iconMap = {
  'file-text': FileText,
  'mail': Mail,
  'credit-card': CreditCard,
  'calendar': Calendar,
  'user-plus': UserPlus,
  'edit': Edit3,
  'send': Send,
  'plus-circle': PlusCircle,
  'arrow-right': ArrowRight,
  'file': File,
}

const typeColors = {
  'contract': 'violet',
  'email': 'blue',
  'payment': 'emerald',
  'reservation': 'gold',
  'prospect': 'orange',
  'conversion': 'emerald',
  'document': 'blue',
}

const typeLabels = {
  'contract': 'Contrat',
  'email': 'Email',
  'payment': 'Paiement',
  'reservation': 'Réservation',
  'prospect': 'Prospect',
  'conversion': 'Conversion',
  'document': 'Document',
}

export default function Activities() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('Tous')

  const filtered = activities.filter(a => {
    const matchSearch = a.action.toLowerCase().includes(search.toLowerCase()) ||
      a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.entity.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'Tous' || typeLabels[a.type] === filterType
    return matchSearch && matchType
  })

  return (
    <div className="table-page">
      <div className="page-toolbar glass">
        <div className="toolbar-left">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Rechercher une activité..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar-filters">
            {['Tous', 'Contrat', 'Email', 'Paiement', 'Réservation', 'Conversion'].map(t => (
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
      </div>

      <div className="activities-timeline glass">
        {filtered.map((activity, i) => {
          const Icon = iconMap[activity.icon] || File
          const color = typeColors[activity.type] || 'blue'

          return (
            <div key={activity.id} className="activity-row animate-in" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="activity-time-col">
                <span className="activity-date-text">
                  {activity.date.split(' ')[0]}
                </span>
                <span className="activity-time-text">
                  {activity.date.split(' ')[1]}
                </span>
              </div>

              <div className="activity-line-col">
                <div className={`activity-dot-lg ${color}`}>
                  <Icon size={14} />
                </div>
                {i < filtered.length - 1 && <div className="activity-connector" />}
              </div>

              <div className="activity-content-col">
                <div className="activity-card">
                  <div className="activity-card-header">
                    <span className={`activity-type-badge ${color}`}>
                      {typeLabels[activity.type]}
                    </span>
                    <span className="activity-card-user">{activity.user}</span>
                  </div>
                  <p className="activity-card-action">{activity.action}</p>
                  <div className="activity-card-footer">
                    <span className="activity-card-entity">{activity.entity}</span>
                    <span className="activity-card-client">{activity.client}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
