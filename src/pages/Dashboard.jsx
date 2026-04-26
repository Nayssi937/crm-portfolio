import { useState } from 'react'
import {
  Users, UserCheck, FileText, TrendingUp, CalendarDays, CreditCard,
  Mail, ArrowUpRight, ArrowDownRight, Eye, Plane, MapPin, Clock,
  AlertTriangle, CheckCircle, XCircle, BarChart3, PieChart as PieIcon
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'
import { stats, revenueData, visitTypeData, upcomingVisits, activities } from '../data/mockData'
import './Dashboard.css'

const fillRateData = [
  { site: 'Airbus A380', capacity: 60, booked: 52, rate: 87 },
  { site: 'CNES', capacity: 40, booked: 32, rate: 80 },
  { site: 'Aéroscopia', capacity: 50, booked: 40, rate: 80 },
  { site: 'Cité Espace', capacity: 45, booked: 25, rate: 56 },
  { site: 'Airbus A350', capacity: 55, booked: 48, rate: 87 },
  { site: 'Printemps', capacity: 80, booked: 50, rate: 63 },
]

const caBySite = [
  { site: 'Airbus A380', ca: 32500 },
  { site: 'CNES', ca: 18200 },
  { site: 'Aéroscopia', ca: 14800 },
  { site: 'Cité Espace', ca: 12000 },
  { site: 'Airbus A350', ca: 10000 },
  { site: 'Printemps', ca: 5200 },
]

const conversionBySource = [
  { source: 'Site web', prospects: 45, converted: 28, rate: 62 },
  { source: 'LinkedIn', prospects: 22, converted: 12, rate: 55 },
  { source: 'Salons', prospects: 18, converted: 14, rate: 78 },
  { source: 'Recommandation', prospects: 15, converted: 12, rate: 80 },
  { source: 'Google', prospects: 30, converted: 15, rate: 50 },
]

const segmentData = [
  { name: 'Entreprises', value: 42, color: '#d4a853' },
  { name: 'Scolaires', value: 28, color: '#5b9cf5' },
  { name: 'Groupes', value: 18, color: '#4ecb8d' },
  { name: 'Particuliers', value: 12, color: '#a78bfa' },
]

const alerts = [
  { id: 1, type: 'warning', message: 'Visite Airbus A380 du 15 Avr complète (52/60)', time: 'Il y a 2h' },
  { id: 2, type: 'danger', message: 'Paiement en retard - Club Med Corporate (18 500€)', time: 'Il y a 5h' },
  { id: 3, type: 'info', message: 'Annulation - Famille Martin (RES-2026-007)', time: 'Il y a 1j' },
  { id: 4, type: 'success', message: 'No-show résolu - Groupe Safran contacté', time: 'Il y a 2j' },
]

const kpiCards = [
  { label: 'Prospects', value: stats.totalProspects, change: '+12%', up: true, icon: Users, color: 'blue' },
  { label: 'Clients actifs', value: stats.totalClients, change: '+8%', up: true, icon: UserCheck, color: 'emerald' },
  { label: 'Contrats actifs', value: stats.activeContracts, change: '+15%', up: true, icon: FileText, color: 'violet' },
  { label: 'CA mensuel', value: `${(stats.monthlyRevenue / 1000).toFixed(1)}k€`, change: '+22%', up: true, icon: TrendingUp, color: 'gold' },
  { label: 'Taux conversion', value: `${stats.conversionRate}%`, change: '+3.2%', up: true, icon: ArrowUpRight, color: 'emerald' },
  { label: 'Visites à venir', value: stats.upcomingVisits, change: '-2', up: false, icon: CalendarDays, color: 'orange' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip glass">
      <p className="tooltip-label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="tooltip-value">
          {p.name}: {typeof p.value === 'number' && p.value > 1000
            ? `${(p.value / 1000).toFixed(1)}k€`
            : p.value}
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="dashboard">
      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiCards.map((kpi, index) => (
          <div key={kpi.label} className="kpi-card glass" style={{ animationDelay: `${index * 0.06}s` }}>
            <div className="kpi-header">
              <div className={`kpi-icon ${kpi.color}`}>
                <kpi.icon size={20} strokeWidth={1.6} />
              </div>
              <div className={`kpi-change ${kpi.up ? 'up' : 'down'}`}>
                {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.change}
              </div>
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Main charts row */}
      <div className="dashboard-row">
        <div className="chart-card glass animate-in" style={{ flex: 2, animationDelay: '0.3s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Chiffre d'affaires</h3>
              <p className="chart-subtitle">Réalisé vs Objectif — 6 derniers mois</p>
            </div>
            <div className="chart-legend">
              <span className="legend-dot gold" /> Réalisé
              <span className="legend-dot blue" style={{ marginLeft: 12 }} /> Objectif
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4a853" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#d4a853" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b9cf5" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#5b9cf5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="target" name="Objectif" stroke="#5b9cf5" fill="url(#blueGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="revenue" name="Réalisé" stroke="#d4a853" fill="url(#goldGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#d4a853', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass animate-in" style={{ flex: 1, animationDelay: '0.4s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Répartition visites</h3>
              <p className="chart-subtitle">Par site — ce mois</p>
            </div>
          </div>
          <div className="chart-body pie-chart-body">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={visitTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {visitTypeData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {visitTypeData.map(v => (
                <div key={v.name} className="pie-legend-item">
                  <span className="pie-dot" style={{ background: v.color }} />
                  <span className="pie-name">{v.name}</span>
                  <span className="pie-val">{v.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second row: fill rate + CA by site + conversion */}
      <div className="dashboard-row">
        <div className="chart-card glass animate-in" style={{ flex: 1, animationDelay: '0.5s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Taux de remplissage</h3>
              <p className="chart-subtitle">Créneaux en temps réel</p>
            </div>
            <Plane size={18} className="chart-header-icon" />
          </div>
          <div className="chart-body">
            <div className="fill-rate-list">
              {fillRateData.map(site => (
                <div key={site.site} className="fill-rate-item">
                  <div className="fill-rate-header">
                    <span className="fill-rate-name">{site.site}</span>
                    <span className="fill-rate-numbers">{site.booked}/{site.capacity}</span>
                  </div>
                  <div className="fill-rate-bar">
                    <div
                      className={`fill-rate-progress ${site.rate >= 85 ? 'high' : site.rate >= 60 ? 'medium' : 'low'}`}
                      style={{ width: `${site.rate}%` }}
                    />
                  </div>
                  <span className={`fill-rate-pct ${site.rate >= 85 ? 'high' : ''}`}>{site.rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card glass animate-in" style={{ flex: 1, animationDelay: '0.55s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">CA par site</h3>
              <p className="chart-subtitle">Ce mois</p>
            </div>
            <BarChart3 size={18} className="chart-header-icon" />
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={caBySite} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={11} tickFormatter={v => `${v/1000}k€`} />
                <YAxis dataKey="site" type="category" stroke="rgba(255,255,255,0.3)" fontSize={11} width={85} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="ca" name="CA" fill="#d4a853" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass animate-in" style={{ flex: 1, animationDelay: '0.6s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Conversion par source</h3>
              <p className="chart-subtitle">Taux de conversion</p>
            </div>
          </div>
          <div className="chart-body">
            <div className="conversion-list">
              {conversionBySource.map(s => (
                <div key={s.source} className="conversion-item">
                  <div className="conversion-header">
                    <span className="conversion-source">{s.source}</span>
                    <span className="conversion-rate">{s.rate}%</span>
                  </div>
                  <div className="conversion-bar">
                    <div className="conversion-progress" style={{ width: `${s.rate}%` }} />
                  </div>
                  <span className="conversion-detail">{s.converted}/{s.prospects} convertis</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Third row: segmentation + alerts + upcoming visits */}
      <div className="dashboard-row">
        <div className="chart-card glass animate-in" style={{ flex: 1, animationDelay: '0.65s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Segmentation clients</h3>
              <p className="chart-subtitle">Répartition par type</p>
            </div>
            <PieIcon size={18} className="chart-header-icon" />
          </div>
          <div className="chart-body pie-chart-body">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {segmentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {segmentData.map(v => (
                <div key={v.name} className="pie-legend-item">
                  <span className="pie-dot" style={{ background: v.color }} />
                  <span className="pie-name">{v.name}</span>
                  <span className="pie-val">{v.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card glass animate-in" style={{ flex: 1, animationDelay: '0.7s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Alertes</h3>
              <p className="chart-subtitle">Notifications automatiques</p>
            </div>
            <AlertTriangle size={18} className="chart-header-icon warning" />
          </div>
          <div className="chart-body">
            <div className="alerts-list">
              {alerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.type}`}>
                  <div className={`alert-item-icon ${alert.type}`}>
                    {alert.type === 'warning' && <AlertTriangle size={14} />}
                    {alert.type === 'danger' && <XCircle size={14} />}
                    {alert.type === 'info' && <Eye size={14} />}
                    {alert.type === 'success' && <CheckCircle size={14} />}
                  </div>
                  <div className="alert-item-content">
                    <span className="alert-item-msg">{alert.message}</span>
                    <span className="alert-item-time">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card glass animate-in" style={{ flex: 1, animationDelay: '0.75s' }}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Prochaines visites</h3>
              <p className="chart-subtitle">{upcomingVisits.length} visites planifiées</p>
            </div>
            <CalendarDays size={18} className="chart-header-icon" />
          </div>
          <div className="chart-body">
            <div className="upcoming-list">
              {upcomingVisits.map(visit => (
                <div key={visit.id} className="upcoming-item">
                  <div className="upcoming-date-badge">
                    <span className="upcoming-day">{visit.date.split(' ')[0]}</span>
                    <span className="upcoming-month">{visit.date.split(' ')[1]}</span>
                  </div>
                  <div className="upcoming-info">
                    <span className="upcoming-name">{visit.name}</span>
                    <div className="upcoming-meta">
                      <span><MapPin size={11} /> {visit.client}</span>
                      <span><Clock size={11} /> {visit.time}</span>
                      <span><Users size={11} /> {visit.participants}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="chart-card glass animate-in" style={{ animationDelay: '0.8s' }}>
        <div className="chart-header">
          <div>
            <h3 className="chart-title">Activité récente</h3>
            <p className="chart-subtitle">Dernières actions du CRM</p>
          </div>
        </div>
        <div className="chart-body">
          <div className="activity-timeline">
            {activities.slice(0, 6).map((act, i) => (
              <div key={act.id} className="timeline-item">
                <div className={`timeline-dot ${act.type}`} />
                <div className="timeline-content">
                  <span className="timeline-action">{act.action}</span>
                  <span className="timeline-entity">{act.entity} — {act.client}</span>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-user">{act.user}</span>
                  <span className="timeline-date">{act.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
