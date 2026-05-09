import './Home.css'

function Home(): React.ReactElement {

  console.log('Home mounted')

  const items = [
    { id: 1, title: 'Item 1', desc: 'Description of item 1' },
    { id: 2, title: 'Item 2', desc: 'Description of item 2' },
    { id: 3, title: 'Item 3', desc: 'Description of item 3' },
    { id: 4, title: 'Item 4', desc: 'Description of item 4' },
    { id: 5, title: 'Item 5', desc: 'Description of item 5' },
    { id: 6, title: 'Item 6', desc: 'Description of item 6' },
    { id: 7, title: 'Item 7', desc: 'Description of item 7' },
    { id: 8, title: 'Item 8', desc: 'Description of item 8' },
    { id: 9, title: 'Item 9', desc: 'Description of item 9' },
    { id: 10, title: 'Item 10', desc: 'Description of item 10' },
    { id: 11, title: 'Item 11', desc: 'Description of item 11' },
    { id: 12, title: 'Item 12', desc: 'Description of item 12' },
  ]

  return (
    <div className="home">
      <h2>Welcome Home</h2>
      <p>This is the home page content.</p>

      <div className="home-content">
        <section className="home-section">
          <h3>Featured Items</h3>
          <div className="card-grid">
            {items.map(item => (
              <div key={item.id} className="card">
                <div className="card-placeholder" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h3>Popular Products</h3>
          <div className="card-grid">
            {items.slice(0, 6).map(item => (
              <div key={`popular-${item.id}`} className="card">
                <div className="card-placeholder" />
                <h4>Popular {item.title}</h4>
                <p>Popular {item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h3>New Arrivals</h3>
          <div className="card-grid">
            {items.slice(0, 4).map(item => (
              <div key={`new-${item.id}`} className="card">
                <div className="card-placeholder" />
                <h4>New {item.title}</h4>
                <p>New {item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
