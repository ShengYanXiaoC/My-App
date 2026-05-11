import './Home.css'
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'
import WaterfallGallery from '../components/WaterfallGallery/WaterfallGallery'

function Home(): React.ReactElement {
  return (
    <div className="home">
      <ImageCarousel />
      <h3>Gallery</h3>
      <WaterfallGallery />
    </div>
  )
}

export default Home