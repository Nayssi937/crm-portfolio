import { useState } from 'react'
import { User, Bell, Shield, Mail, Globe, Palette, Save, Check, ChevronRight } from 'lucide-react'
import './Settings.css'

const tabs = [
  { id: 'profile', icon: User, label: 'Profil' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Sécurité' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'display', icon: Palette, label: 'Affichage' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="settings-page">
      <div className="settings-sidebar glass animate-in">
        <div className="settings-sidebar-title">Paramètres</div>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} strokeWidth={1.6} />
            <span>{tab.label}</span>
            <ChevronRight size={14} className="tab-arrow" />
          </button>
        ))}
      </div>

      <div className="settings-content glass animate-in" style={{ animationDelay: '0.1s' }}>
        {activeTab === 'profile' && (
          <div className="settings-section">
            <h2 className="settings-section-title">Informations du profil</h2>
            <p className="settings-section-desc">Gérez vos informations personnelles et votre rôle</p>

            <div className="settings-avatar-row">
              <div className="settings-avatar-large">
                <span>LF</span>
              </div>
              <div>
                <button className="settings-btn secondary">Changer la photo</button>
                <p className="settings-hint">JPG, PNG. Max 2 Mo</p>
              </div>
            </div>

            <div className="settings-form">
              <div className="settings-row">
                <div className="settings-field">
                  <label>Prénom</label>
                  <input type="text" defaultValue="Lucien" />
                </div>
                <div className="settings-field">
                  <label>Nom</label>
                  <input type="text" defaultValue="F." />
                </div>
              </div>
              <div className="settings-row">
                <div className="settings-field">
                  <label>Email</label>
                  <input type="email" defaultValue="lucien.f@portfolio.fr" />
                </div>
                <div className="settings-field">
                  <label>Téléphone</label>
                  <input type="tel" defaultValue="+33 6 12 34 56 78" />
                </div>
              </div>
              <div className="settings-field">
                <label>Rôle</label>
                <select defaultValue="admin">
                  <option value="admin">Administrateur</option>
                  <option value="manager">Manager commercial</option>
                  <option value="agent">Agent commercial</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h2 className="settings-section-title">Préférences de notification</h2>
            <p className="settings-section-desc">Choisissez quand et comment recevoir vos alertes</p>

            <div className="settings-toggle-list">
              {[
                { label: 'Nouvelles réservations', desc: 'Notification à chaque nouvelle réservation', default: true },
                { label: 'Contrats signés', desc: 'Alerte quand un contrat est validé', default: true },
                { label: 'Paiements en retard', desc: 'Rappel pour les paiements non reçus', default: true },
                { label: 'Nouveaux prospects', desc: 'Notification à chaque nouveau prospect', default: false },
                { label: 'Emails de relance', desc: 'Résumé quotidien des relances envoyées', default: false },
              ].map((item, i) => (
                <div key={i} className="settings-toggle-row">
                  <div>
                    <span className="toggle-label">{item.label}</span>
                    <span className="toggle-desc">{item.desc}</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked={item.default} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="settings-section">
            <h2 className="settings-section-title">Sécurité du compte</h2>
            <p className="settings-section-desc">Protégez votre compte et vos données</p>

            <div className="settings-form">
              <div className="settings-field">
                <label>Mot de passe actuel</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="settings-row">
                <div className="settings-field">
                  <label>Nouveau mot de passe</label>
                  <input type="password" placeholder="Min. 8 caractères" />
                </div>
                <div className="settings-field">
                  <label>Confirmer</label>
                  <input type="password" placeholder="Confirmer le mot de passe" />
                </div>
              </div>
            </div>

            <div className="settings-toggle-list" style={{ marginTop: 24 }}>
              <div className="settings-toggle-row">
                <div>
                  <span className="toggle-label">Authentification à deux facteurs</span>
                  <span className="toggle-desc">Ajouter une couche de sécurité supplémentaire</span>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider" />
                </label>
              </div>
              <div className="settings-toggle-row">
                <div>
                  <span className="toggle-label">Sessions actives</span>
                  <span className="toggle-desc">1 session active — MacBook Pro, Paris</span>
                </div>
                <button className="settings-btn secondary small">Voir</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="settings-section">
            <h2 className="settings-section-title">Configuration email</h2>
            <p className="settings-section-desc">Paramétrez votre intégration email IONOS</p>

            <div className="settings-form">
              <div className="settings-field">
                <label>Serveur SMTP</label>
                <input type="text" defaultValue="smtp.ionos.fr" />
              </div>
              <div className="settings-row">
                <div className="settings-field">
                  <label>Port</label>
                  <input type="text" defaultValue="587" />
                </div>
                <div className="settings-field">
                  <label>Sécurité</label>
                  <select defaultValue="tls">
                    <option value="tls">STARTTLS</option>
                    <option value="ssl">SSL/TLS</option>
                  </select>
                </div>
              </div>
              <div className="settings-field">
                <label>Adresse email</label>
                <input type="email" defaultValue="contact@manatour.fr" />
              </div>
              <div className="settings-field">
                <label>Mot de passe email</label>
                <input type="password" defaultValue="••••••••" />
              </div>
            </div>

            <div className="settings-status-card">
              <div className="status-indicator connected" />
              <span>Connexion IONOS active</span>
            </div>
          </div>
        )}

        {activeTab === 'display' && (
          <div className="settings-section">
            <h2 className="settings-section-title">Préférences d'affichage</h2>
            <p className="settings-section-desc">Personnalisez l'apparence de votre CRM</p>

            <div className="settings-form">
              <div className="settings-field">
                <label>Langue</label>
                <select defaultValue="fr">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              <div className="settings-field">
                <label>Fuseau horaire</label>
                <select defaultValue="paris">
                  <option value="paris">Europe/Paris (UTC+1)</option>
                  <option value="london">Europe/London (UTC+0)</option>
                </select>
              </div>
              <div className="settings-field">
                <label>Éléments par page</label>
                <select defaultValue="20">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="settings-actions">
          <button className="settings-btn secondary">Annuler</button>
          <button className="settings-btn primary" onClick={handleSave}>
            {saved ? <><Check size={16} /> Enregistré</> : <><Save size={16} /> Enregistrer</>}
          </button>
        </div>
      </div>
    </div>
  )
}
