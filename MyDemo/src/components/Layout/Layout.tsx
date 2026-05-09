import { Outlet, NavLink } from 'react-router-dom'
import './Layout.css'

function Layout(): React.ReactElement {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>My App</h1>
      </header>

      <main className="layout-content">
        <Outlet />
      </main>

      <nav className="layout-bottom-tabs">
        <NavLink to="/home" end className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="tab-label">Home</span>
        </NavLink>

        <NavLink to="/home/categories" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <span className="tab-label">Categories</span>
        </NavLink>

        <NavLink to="/home/cart" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="tab-label">Cart</span>
        </NavLink>

        <NavLink to="/home/account" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="tab-label">Account</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Layout
