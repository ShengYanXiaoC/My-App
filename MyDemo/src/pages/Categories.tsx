import './Categories.css'

function Categories(): React.ReactElement {
  const categories = [
    { id: 1, name: 'Electronics', icon: '📱' },
    { id: 2, name: 'Fashion', icon: '👕' },
    { id: 3, name: 'Home & Garden', icon: '🏠' },
    { id: 4, name: 'Sports', icon: '⚽' },
    { id: 5, name: 'Books', icon: '📚' },
    { id: 6, name: 'Toys', icon: '🧸' },
    { id: 7, name: 'Beauty', icon: '💄' },
    { id: 8, name: 'Food', icon: '🍔' },
  ]

  return (
    <div className="categories">
      <h2>Categories</h2>
      <p>Browse by category</p>
      
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
