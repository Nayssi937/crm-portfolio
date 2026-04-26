import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Prospects from './pages/Prospects'
import Clients from './pages/Clients'
import Pipeline from './pages/Pipeline'
import Reservations from './pages/Reservations'
import Contracts from './pages/Contracts'
import Activities from './pages/Activities'
import Settings from './pages/Settings'
import './App.css'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <>
      <div className="app-background" />
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prospects" element={<Prospects />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
