// Mock data for Manatour CRM

export const stats = {
  totalProspects: 248,
  totalClients: 156,
  activeContracts: 43,
  monthlyRevenue: 87500,
  conversionRate: 62.9,
  upcomingVisits: 18,
  pendingPayments: 12,
  emailsSent: 342,
};

export const revenueData = [
  { month: 'Sep', revenue: 62000, target: 70000 },
  { month: 'Oct', revenue: 71000, target: 72000 },
  { month: 'Nov', revenue: 68000, target: 74000 },
  { month: 'Dec', revenue: 82000, target: 76000 },
  { month: 'Jan', revenue: 75000, target: 78000 },
  { month: 'Fév', revenue: 87500, target: 80000 },
];

export const visitTypeData = [
  { name: 'Airbus', value: 32, color: '#d4a853' },
  { name: 'CNES', value: 20, color: '#5b9cf5' },
  { name: 'Cité de l\'Espace', value: 16, color: '#4ecb8d' },
  { name: 'Aéroscopia', value: 14, color: '#a78bfa' },
  { name: 'Visite du Printemps', value: 12, color: '#f5a623' },
  { name: 'Autres', value: 6, color: '#f07088' },
];

export const prospects = [
  { id: 1, name: 'Groupe Safran', contact: 'Marie Dubois', email: 'mdubois@safran.fr', phone: '+33 6 12 34 56 78', type: 'B2B', source: 'Site web', status: 'Nouveau', score: 85, date: '2026-03-20', visits: 'Airbus A380' },
  { id: 2, name: 'Lycée Pierre de Fermat', contact: 'Jean Moreau', email: 'jmoreau@fermat.edu', phone: '+33 5 61 23 45 67', type: 'B2B', source: 'Salon', status: 'Contacté', score: 72, date: '2026-03-18', visits: 'CNES' },
  { id: 3, name: 'Sophie Laurent', contact: 'Sophie Laurent', email: 'sophie.l@gmail.com', phone: '+33 6 98 76 54 32', type: 'B2C', source: 'Google', status: 'Qualifié', score: 60, date: '2026-03-15', visits: 'Cité de l\'Espace' },
  { id: 4, name: 'Dassault Aviation', contact: 'Pierre Martin', email: 'pmartin@dassault.fr', phone: '+33 1 45 67 89 01', type: 'B2B', source: 'Recommandation', status: 'Proposition', score: 92, date: '2026-03-12', visits: 'Aéroscopia' },
  { id: 5, name: 'CE Airbus Defence', contact: 'Claire Petit', email: 'cpetit@airbus.com', phone: '+33 5 34 56 78 90', type: 'B2B', source: 'Partenaire', status: 'Négociation', score: 88, date: '2026-03-10', visits: 'Airbus A350' },
  { id: 6, name: 'Thomas Bernard', contact: 'Thomas Bernard', email: 'thomas.b@outlook.fr', phone: '+33 7 12 34 56 78', type: 'B2C', source: 'Instagram', status: 'Nouveau', score: 45, date: '2026-03-22', visits: 'Airbus A380' },
  { id: 7, name: 'Thales Alenia Space', contact: 'Isabelle Roux', email: 'iroux@thalesgroup.com', phone: '+33 5 62 34 56 78', type: 'B2B', source: 'LinkedIn', status: 'Contacté', score: 78, date: '2026-03-08', visits: 'CNES' },
  { id: 8, name: 'Famille Dupont', contact: 'Marc Dupont', email: 'mdupont@free.fr', phone: '+33 6 23 45 67 89', type: 'B2C', source: 'TripAdvisor', status: 'Qualifié', score: 55, date: '2026-03-05', visits: 'Cité de l\'Espace' },
];

export const clients = [
  { id: 1, name: 'Airbus Group SE', contact: 'François Leclerc', email: 'fleclerc@airbus.com', phone: '+33 5 61 93 33 33', type: 'Entreprise', since: '2024-01-15', totalSpent: 45000, contracts: 3, lastVisit: '2026-02-28', status: 'Actif' },
  { id: 2, name: 'Académie de Toulouse', contact: 'Anne Garnier', email: 'agarnier@ac-toulouse.fr', phone: '+33 5 36 25 70 00', type: 'Institution', since: '2024-03-22', totalSpent: 28000, contracts: 5, lastVisit: '2026-03-15', status: 'Actif' },
  { id: 3, name: 'Club Med Corporate', contact: 'David Fournier', email: 'dfournier@clubmed.com', phone: '+33 1 53 35 35 53', type: 'Entreprise', since: '2024-06-10', totalSpent: 62000, contracts: 4, lastVisit: '2026-03-01', status: 'Actif' },
  { id: 4, name: 'Robert et Marie Blanc', contact: 'Robert Blanc', email: 'rblanc@orange.fr', phone: '+33 6 45 67 89 01', type: 'Particulier', since: '2025-01-20', totalSpent: 890, contracts: 1, lastVisit: '2025-11-15', status: 'Inactif' },
  { id: 5, name: 'Mairie de Blagnac', contact: 'Philippe André', email: 'pandre@blagnac.fr', phone: '+33 5 61 71 72 00', type: 'Institution', since: '2024-09-05', totalSpent: 15600, contracts: 2, lastVisit: '2026-02-10', status: 'Actif' },
  { id: 6, name: 'Capgemini Toulouse', contact: 'Nathalie Simon', email: 'nsimon@capgemini.com', phone: '+33 5 31 08 00 00', type: 'Entreprise', since: '2025-02-14', totalSpent: 33200, contracts: 2, lastVisit: '2026-03-20', status: 'Actif' },
];

export const reservations = [
  { id: 'RES-2026-001', client: 'Airbus Group SE', visit: 'Visite Airbus A380 - Chaîne assemblage', date: '2026-04-15', participants: 45, status: 'Confirmée', amount: 6750, contact: 'François Leclerc' },
  { id: 'RES-2026-002', client: 'Académie de Toulouse', visit: 'CNES - Centre Spatial', date: '2026-04-18', participants: 32, status: 'En attente', amount: 3200, contact: 'Anne Garnier' },
  { id: 'RES-2026-003', client: 'Club Med Corporate', visit: 'Airbus A350 + Aéroscopia', date: '2026-04-22', participants: 60, status: 'Confirmée', amount: 12000, contact: 'David Fournier' },
  { id: 'RES-2026-004', client: 'Capgemini Toulouse', visit: 'Cité de l\'Espace - Visite VIP', date: '2026-05-03', participants: 25, status: 'Devis envoyé', amount: 5000, contact: 'Nathalie Simon' },
  { id: 'RES-2026-005', client: 'Mairie de Blagnac', visit: 'La Visite du Printemps', date: '2026-04-20', participants: 50, status: 'Confirmée', amount: 5200, contact: 'Philippe André' },
  { id: 'RES-2026-006', client: 'Famille Dupont', visit: 'Airbus A380 - Découverte', date: '2026-05-15', participants: 4, status: 'En attente', amount: 360, contact: 'Marc Dupont' },
];

export const contracts = [
  { id: 'CTR-2026-001', client: 'Airbus Group SE', visit: 'Pack Annuel Visites Premium', startDate: '2026-01-01', endDate: '2026-12-31', amount: 45000, status: 'Actif', paid: 22500, remaining: 22500 },
  { id: 'CTR-2026-002', client: 'Académie de Toulouse', visit: 'Convention Scolaire 2026', startDate: '2026-02-01', endDate: '2026-06-30', amount: 12000, status: 'Actif', paid: 12000, remaining: 0 },
  { id: 'CTR-2026-003', client: 'Club Med Corporate', visit: 'Team Building Aéronautique', startDate: '2026-03-01', endDate: '2026-03-31', amount: 18500, status: 'En signature', paid: 0, remaining: 18500 },
  { id: 'CTR-2026-004', client: 'Capgemini Toulouse', visit: 'Séminaire Découverte Spatiale', startDate: '2026-04-15', endDate: '2026-04-16', amount: 8200, status: 'Brouillon', paid: 0, remaining: 8200 },
  { id: 'CTR-2026-005', client: 'Mairie de Blagnac', visit: 'Journées du Patrimoine Industriel', startDate: '2026-09-15', endDate: '2026-09-16', amount: 5600, status: 'Actif', paid: 2800, remaining: 2800 },
];

export const pipelineStages = [
  {
    id: 'prospect',
    label: 'Prospect',
    color: '#5b9cf5',
    count: 8,
    value: 0,
    items: [
      { id: 1, name: 'Groupe Safran', amount: 15000, date: '20 Mar', probability: 20 },
      { id: 2, name: 'Thomas Bernard', amount: 180, date: '22 Mar', probability: 10 },
    ]
  },
  {
    id: 'qualification',
    label: 'Qualification',
    color: '#a78bfa',
    count: 5,
    value: 24500,
    items: [
      { id: 3, name: 'Sophie Laurent', amount: 450, date: '15 Mar', probability: 40 },
      { id: 4, name: 'Famille Dupont', amount: 360, date: '5 Mar', probability: 35 },
    ]
  },
  {
    id: 'devis',
    label: 'Devis',
    color: '#f5a623',
    count: 4,
    value: 38200,
    items: [
      { id: 5, name: 'Capgemini Toulouse', amount: 8200, date: '24 Mar', probability: 60 },
      { id: 6, name: 'Thales Alenia Space', amount: 12000, date: '8 Mar', probability: 55 },
    ]
  },
  {
    id: 'reservation',
    label: 'Réservation',
    color: '#d4a853',
    count: 3,
    value: 21800,
    items: [
      { id: 7, name: 'Académie de Toulouse', amount: 3200, date: '18 Mar', probability: 80 },
    ]
  },
  {
    id: 'confirme',
    label: 'Confirmé',
    color: '#4ecb8d',
    count: 6,
    value: 67550,
    items: [
      { id: 8, name: 'Airbus Group SE', amount: 6750, date: '15 Avr', probability: 95 },
      { id: 9, name: 'Club Med Corporate', amount: 12000, date: '22 Avr', probability: 95 },
      { id: 10, name: 'Mairie de Blagnac', amount: 4800, date: '10 Mai', probability: 90 },
    ]
  },
  {
    id: 'realise',
    label: 'Réalisé',
    color: '#4ecb8d',
    count: 12,
    value: 152000,
    items: []
  },
];

export const activities = [
  { id: 1, type: 'contract', action: 'Contrat créé', entity: 'CTR-2026-003', client: 'Club Med Corporate', user: 'Lucien F.', date: '2026-03-24 14:30', icon: 'file-text' },
  { id: 2, type: 'email', action: 'Email de confirmation envoyé', entity: 'RES-2026-001', client: 'Airbus Group SE', user: 'Système', date: '2026-03-24 11:15', icon: 'mail' },
  { id: 3, type: 'payment', action: 'Paiement reçu - 12 000€', entity: 'CTR-2026-002', client: 'Académie de Toulouse', user: 'Lucien F.', date: '2026-03-23 16:45', icon: 'credit-card' },
  { id: 4, type: 'reservation', action: 'Réservation confirmée', entity: 'RES-2026-005', client: 'Mairie de Blagnac', user: 'Lucas D.', date: '2026-03-23 10:20', icon: 'calendar' },
  { id: 5, type: 'prospect', action: 'Nouveau prospect ajouté', entity: 'Groupe Safran', client: 'Groupe Safran', user: 'Lucien F.', date: '2026-03-22 09:00', icon: 'user-plus' },
  { id: 6, type: 'contract', action: 'Contrat modifié', entity: 'CTR-2026-001', client: 'Airbus Group SE', user: 'Lucas D.', date: '2026-03-21 15:30', icon: 'edit' },
  { id: 7, type: 'email', action: 'Relance commerciale envoyée', entity: 'Thales Alenia Space', client: 'Thales Alenia Space', user: 'Système', date: '2026-03-21 08:00', icon: 'send' },
  { id: 8, type: 'conversion', action: 'Prospect converti en client', entity: 'Capgemini Toulouse', client: 'Capgemini Toulouse', user: 'Lucien F.', date: '2026-03-20 14:00', icon: 'arrow-right' },
  { id: 9, type: 'document', action: 'Quittance générée', entity: 'CTR-2026-002', client: 'Académie de Toulouse', user: 'Système', date: '2026-03-20 10:30', icon: 'file' },
  { id: 10, type: 'reservation', action: 'Nouvelle réservation', entity: 'RES-2026-006', client: 'Famille Dupont', user: 'Lucas D.', date: '2026-03-19 11:45', icon: 'plus-circle' },
];

export const upcomingVisits = [
  { id: 1, name: 'Airbus A380 - Chaîne assemblage', client: 'Airbus Group SE', date: '15 Avr 2026', time: '09:30', participants: 45, guide: 'Pierre V.' },
  { id: 2, name: 'CNES - Centre Spatial', client: 'Académie de Toulouse', date: '18 Avr 2026', time: '10:00', participants: 32, guide: 'Marie L.' },
  { id: 3, name: 'La Visite du Printemps', client: 'Mairie de Blagnac', date: '20 Avr 2026', time: '10:00', participants: 50, guide: 'Sophie R.' },
  { id: 4, name: 'Airbus A350 + Aéroscopia', client: 'Club Med Corporate', date: '22 Avr 2026', time: '08:30', participants: 60, guide: 'Pierre V.' },
  { id: 5, name: 'Cité de l\'Espace - VIP', client: 'Capgemini Toulouse', date: '03 Mai 2026', time: '14:00', participants: 25, guide: 'Sophie R.' },
];
