import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, MessageSquare, Plus, ChevronDown, Users, UserCheck, CalendarDays, FileText, X, Clock, Check, AlertTriangle, Send } from 'lucide-react'
import './Header.css'

const pageTitles = {
  '/': 'Tableau de bord',
  '/prospects': 'Prospects',
  '/clients': 'Clients',
  '/pipeline': 'Pipeline Commercial',
  '/reservations': 'Réservations',
  '/contracts': 'Contrats',
  '/activities': 'Journal d\'activité',
  '/settings': 'Paramètres',
}

const breadcrumbs = {
  '/': ['Accueil', 'Tableau de bord'],
  '/prospects': ['Accueil', 'Contacts', 'Prospects'],
  '/clients': ['Accueil', 'Contacts', 'Clients'],
  '/pipeline': ['Accueil', 'Commercial', 'Pipeline'],
  '/reservations': ['Accueil', 'Opérations', 'Réservations'],
  '/contracts': ['Accueil', 'Opérations', 'Contrats'],
  '/activities': ['Accueil', 'Suivi', 'Activités'],
  '/settings': ['Accueil', 'Paramètres'],
}

const notifications = [
  { id: 1, type: 'alert', title: 'Paiement en retard', desc: 'Groupe Safran — Facture #2024-087 échue depuis 5 jours', time: 'Il y a 2h', unread: true },
  { id: 2, type: 'success', title: 'Contrat signé', desc: 'Airbus Group SE — Contrat #CT-2024-156 validé', time: 'Il y a 4h', unread: true },
  { id: 3, type: 'info', title: 'Nouvelle réservation', desc: 'Académie de Toulouse — Visite CNES le 28 Mar', time: 'Hier', unread: false },
  { id: 4, type: 'alert', title: 'Visite complète', desc: 'Visite Airbus A380 du 25 Mar — capacité maximale atteinte', time: 'Hier', unread: false },
  { id: 5, type: 'info', title: 'Prospect qualifié', desc: 'Sophie Laurent passée en phase Qualification', time: 'Il y a 2j', unread: false },
]

const messages = [
  { id: 1, sender: 'Marie D.', avatar: 'MD', content: 'Le devis pour Safran est prêt, tu peux vérifier ?', time: 'Il y a 30min', unread: true },
  { id: 2, sender: 'Thomas R.', avatar: 'TR', content: 'RDV confirmé avec CNES pour jeudi 14h', time: 'Il y a 1h', unread: true },
  { id: 3, sender: 'Julie M.', avatar: 'JM', content: 'Relance envoyée à Famille Dupont', time: 'Il y a 3h', unread: false },
  { id: 4, sender: 'Marc L.', avatar: 'ML', content: 'Peux-tu valider le contrat Club Med ?', time: 'Hier', unread: false },
]

const nouveauOptions = [
  { icon: Users, label: 'Nouveau prospect', path: '/prospects', color: 'var(--accent-blue)' },
  { icon: UserCheck, label: 'Nouveau client', path: '/clients', color: 'var(--accent-emerald)' },
  { icon: CalendarDays, label: 'Nouvelle réservation', path: '/reservations', color: 'var(--accent-violet)' },
  { icon: FileText, label: 'Nouveau contrat', path: '/contracts', color: 'var(--accent-gold)' },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [showNouveau, setShowNouveau] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const title = pageTitles[location.pathname] || 'Manatour CRM'
  const crumbs = breadcrumbs[location.pathname] || ['Accueil']

  const nouveauRef = useRef(null)
  const notifsRef = useRef(null)
  const messagesRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (nouveauRef.current && !nouveauRef.current.contains(e.target)) setShowNouveau(false)
      if (notifsRef.current && !notifsRef.current.contains(e.target)) setShowNotifs(false)
      if (messagesRef.current && !messagesRef.current.contains(e.target)) setShowMessages(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleNouveau = (opt) => {
    setShowNouveau(false)
    navigate(opt.path, { state: { openModal: true } })
  }

  const getNotifIcon = (type) => {
    if (type === 'alert') return <AlertTriangle size={16} />
    if (type === 'success') return <Check size={16} />
    return <Bell size={16} />
  }

  const getNotifColor = (type) => {
    if (type === 'alert') return 'var(--accent-rose)'
    if (type === 'success') return 'var(--accent-emerald)'
    return 'var(--accent-blue)'
  }

  return (
    <header className="header glass">
      <div className="header-left">
        <div className="header-title-group">
          <h1 className="header-title">{title}</h1>
          <div className="header-breadcrumbs">
            {crumbs.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span className="breadcrumb-sep">/</span>}
                <span className={i === crumbs.length - 1 ? 'breadcrumb-active' : 'breadcrumb-item'}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className={`header-search ${searchOpen ? 'open' : ''}`}>
          <Search size={16} strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Rechercher un client, contrat, visite..."
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
          <kbd>⌘K</kbd>
        </div>
      </div>

      <div className="header-right">
        {/* Nouveau dropdown */}
        <div className="header-dropdown-wrapper" ref={nouveauRef}>
          <button
            className={`header-action-btn primary ${showNouveau ? 'active' : ''}`}
            onClick={() => { setShowNouveau(!showNouveau); setShowNotifs(false); setShowMessages(false) }}
          >
            <Plus size={16} strokeWidth={2} />
            <span>Nouveau</span>
            <ChevronDown size={14} className={`chevron-icon ${showNouveau ? 'rotated' : ''}`} />
          </button>
          {showNouveau && (
            <div className="header-dropdown nouveau-dropdown glass-strong animate-dropdown">
              <div className="dropdown-header">
                <span>Créer un élément</span>
              </div>
              {nouveauOptions.map((opt, i) => (
                <button
                  key={i}
                  className="dropdown-item"
                  onClick={() => handleNouveau(opt)}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="dropdown-item-icon" style={{ background: `${opt.color}20`, color: opt.color }}>
                    <opt.icon size={16} strokeWidth={1.8} />
                  </div>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="header-icons">
          {/* Notifications */}
          <div className="header-dropdown-wrapper" ref={notifsRef}>
            <button
              className={`header-icon-btn ${showNotifs ? 'active' : ''}`}
              title="Notifications"
              onClick={() => { setShowNotifs(!showNotifs); setShowNouveau(false); setShowMessages(false) }}
            >
              <Bell size={18} strokeWidth={1.6} />
              <span className="notification-dot" />
            </button>
            {showNotifs && (
              <div className="header-dropdown notif-dropdown glass-strong animate-dropdown">
                <div className="dropdown-header">
                  <span>Notifications</span>
                  <button className="dropdown-header-action" onClick={() => setShowNotifs(false)}>
                    Tout marquer lu
                  </button>
                </div>
                <div className="dropdown-scroll">
                  {notifications.map((n) => (
                    <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                      <div className="notif-icon" style={{ background: `${getNotifColor(n.type)}18`, color: getNotifColor(n.type) }}>
                        {getNotifIcon(n.type)}
                      </div>
                      <div className="notif-content">
                        <span className="notif-title">{n.title}</span>
                        <span className="notif-desc">{n.desc}</span>
                        <span className="notif-time"><Clock size={11} /> {n.time}</span>
                      </div>
                      {n.unread && <div className="notif-unread-dot" />}
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button onClick={() => { setShowNotifs(false); navigate('/activities') }}>
                    Voir toutes les activités
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="header-dropdown-wrapper" ref={messagesRef}>
            <button
              className={`header-icon-btn ${showMessages ? 'active' : ''}`}
              title="Messages"
              onClick={() => { setShowMessages(!showMessages); setShowNouveau(false); setShowNotifs(false) }}
            >
              <MessageSquare size={18} strokeWidth={1.6} />
              <span className="notification-dot blue" />
            </button>
            {showMessages && (
              <div className="header-dropdown messages-dropdown glass-strong animate-dropdown">
                <div className="dropdown-header">
                  <span>Messages</span>
                  <span className="dropdown-badge">{messages.filter(m => m.unread).length} nouveaux</span>
                </div>
                <div className="dropdown-scroll">
                  {messages.map((m) => (
                    <div key={m.id} className={`message-item ${m.unread ? 'unread' : ''}`}>
                      <div className="message-avatar">
                        <span>{m.avatar}</span>
                      </div>
                      <div className="message-content">
                        <div className="message-top">
                          <span className="message-sender">{m.sender}</span>
                          <span className="message-time">{m.time}</span>
                        </div>
                        <span className="message-text">{m.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <div className="message-reply-bar">
                    <input type="text" placeholder="Répondre..." />
                    <button className="message-send-btn"><Send size={14} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="header-divider" />

        <div className="header-user">
          <div className="header-avatar">
            <span>LF</span>
          </div>
          <div className="header-user-info">
            <span className="user-name">Lucien F.</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}
