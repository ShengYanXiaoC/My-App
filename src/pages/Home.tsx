import './Home.css'
import WaterfallGallery from '../components/WaterfallGallery/WaterfallGallery'

function Home(): React.ReactElement {
  return (
    <div className="home">
      <h3>Gallery</h3>
      <WaterfallGallery />
    </div>
  )
}

export default Home