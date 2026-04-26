import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, UserCheck, GitBranch, CalendarDays,
  FileText, Activity, ChevronLeft, ChevronRight,
  Settings, HelpCircle, LogOut, Bell, BookOpen, MessageCircle,
  Shield, Zap, ExternalLink
} from 'lucide-react'

import './Sidebar.css'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
  { path: '/prospects', icon: Users, label: 'Prospects' },
  { path: '/clients', icon: UserCheck, label: 'Clients' },
  { path: '/pipeline', icon: GitBranch, label: 'Pipeline' },
  { path: '/reservations', icon: CalendarDays, label: 'Réservations' },
  { path: '/contracts', icon: FileText, label: 'Contrats' },
  { path: '/activities', icon: Activity, label: 'Activités' },
]

const helpSections = [
  { icon: BookOpen, title: 'Guide de démarrage', desc: 'Apprenez les bases de ce CRM' },
  { icon: Zap, title: 'Raccourcis clavier', desc: '⌘K Recherche · ⌘N Nouveau · ⌘S Sauvegarder' },
  { icon: MessageCircle, title: 'Support technique', desc: 'contact@portfolio.fr · +33 0 00 00 00 00' },
  { icon: Shield, title: 'Sécurité & données', desc: 'RGPD, export de données, politique de confidentialité' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [showHelp, setShowHelp] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const handleLogout = () => {
    setShowLogout(false)
    // In a real app this would clear auth tokens and redirect
    navigate('/')
  }

  return (
    <>
      <aside className={`sidebar glass-strong ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {!collapsed && (
              <div className="logo-text">
                <span className="logo-name">Visuel de CRM</span>
                <span className="logo-sub">Portfolio</span>
              </div>
            )}
          </div>
          <button className="sidebar-toggle" onClick={onToggle}>
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {!collapsed && <div className="sidebar-section-label">Navigation</div>}

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              end={item.path === '/'}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} strokeWidth={1.6} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.path === '/activities' && (
                <span className="sidebar-badge">3</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        {!collapsed && (
          <div className="sidebar-alerts glass">
            <div className="alert-icon">
              <Bell size={18} />
            </div>
            <div className="alert-content">
              <span className="alert-title">3 alertes</span>
              <span className="alert-desc">Visite complète, paiement en retard</span>
            </div>
          </div>
        )}

        <div className="sidebar-footer">
          <button
            className={`sidebar-footer-btn ${location.pathname === '/settings' ? 'active' : ''}`}
            title="Paramètres"
            onClick={() => navigate('/settings')}
          >
            <Settings size={18} strokeWidth={1.6} />
            {!collapsed && <span>Paramètres</span>}
          </button>
          <button className="sidebar-footer-btn" title="Aide" onClick={() => setShowHelp(true)}>
            <HelpCircle size={18} strokeWidth={1.6} />
            {!collapsed && <span>Aide</span>}
          </button>
          <button className="sidebar-footer-btn logout" title="Déconnexion" onClick={() => setShowLogout(true)}>
            <LogOut size={18} strokeWidth={1.6} />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Help modal */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal glass-strong help-modal animate-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Centre d'aide</h2>
              <button className="modal-close" onClick={() => setShowHelp(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="help-grid">
                {helpSections.map((section, i) => (
                  <div key={i} className="help-card" style={{ animationDelay: `${i * 0.06}s` }}>
                    <div className="help-card-icon">
                      <section.icon size={20} strokeWidth={1.6} />
                    </div>
                    <div className="help-card-content">
                      <span className="help-card-title">{section.title}</span>
                      <span className="help-card-desc">{section.desc}</span>
                    </div>
                    <ExternalLink size={14} className="help-card-arrow" />
                  </div>
                ))}
              </div>

              <div className="help-version">
                <span>Manatour CRM v2.4.1</span>
                <span>Dernière mise à jour : 25 mars 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout confirmation */}
      {showLogout && (
        <div className="modal-overlay" onClick={() => setShowLogout(false)}>
          <div className="modal glass-strong logout-modal animate-in" onClick={e => e.stopPropagation()}>
            <div className="logout-modal-content">
              <div className="logout-icon-wrapper">
                <LogOut size={28} strokeWidth={1.6} />
              </div>
              <h2>Se déconnecter ?</h2>
              <p>Vous serez redirigé vers la page de connexion. Vos données sont sauvegardées automatiquement.</p>
              <div className="logout-actions">
                <button className="logout-btn cancel" onClick={() => setShowLogout(false)}>
                  Annuler
                </button>
                <button className="logout-btn confirm" onClick={handleLogout}>
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
