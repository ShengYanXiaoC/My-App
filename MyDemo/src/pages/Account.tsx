import './Account.css'

function Account(): React.ReactElement {
  const menuItems = [
    { id: 1, label: 'My Orders', icon: '📦' },
    { id: 2, label: 'Wishlist', icon: '❤️' },
    { id: 3, label: 'Addresses', icon: '📍' },
    { id: 4, label: 'Payment Methods', icon: '💳' },
    { id: 5, label: 'Settings', icon: '⚙️' },
    { id: 6, label: 'Help & Support', icon: '❓' },
  ]

  return (
    <div className="account">
      <h2>My Account</h2>

      <div className="profile-card">
        <div className="avatar">
          <span>👤</span>
        </div>
        <div className="profile-info">
          <h3>Cathy</h3>
          <p>cathy.sheng@example.com</p>
        </div>
      </div>

      <div className="menu-list">
        {menuItems.map(item => (
          <button key={item.id} className="menu-item">
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
            <svg className="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>

      <button className="logout-btn">Log Out</button>
    </div>
  )
}

export default Account
