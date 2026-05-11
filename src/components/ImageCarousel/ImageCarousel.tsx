import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './ImageCarousel.css'

interface CarouselItem {
  id: number
  imageUrl: string
  title: string
  description: string
}

const originalItems: CarouselItem[] = [
  {
    id: 1,
    imageUrl: 'https://artic-web.imgix.net/7bce0d51-ec86-4e45-8c3b-84bb6f23ac6a/Goff_Harderhouse.jpg?rect=572%2C0%2C2341%2C2341&auto=format%2Ccompress&q=80&fit=crop&crop=faces%2Ccenter&w=300',
    title: '探索自然之美',
    description: '发现世界上最壮观的风景'
  },
  {
    id: 2,
    imageUrl: 'https://artic-web.imgix.net/47a00ca8-2b60-46e0-b3d7-da6a65c1497b/IM022371-int-Web72ppi%2C2000px%2CsRGB%2CJPEG-Crop1.jpg?rect=0%2C0%2C1441%2C1120&auto=format%2Ccompress&q=80&fit=crop&crop=faces%2Ccenter&w=300',
    title: '都市繁华',
    description: '感受城市的脉搏与活力'
  },
  {
    id: 3,
    imageUrl: 'https://artic-web.imgix.net/6eb2d1dd-fc91-4a69-93af-102a2d806f9a/J29232-int-Press300ppi%2C3000px%2CsRGB%2CJPEG.jpg?rect=0%2C0%2C3000%2C2177&auto=format%2Ccompress&q=80&fit=crop&crop=faces%2Ccenter&w=300',
    title: '春日繁花',
    description: '沉浸在花海的浪漫之中'
  }
]

const carouselItems: CarouselItem[] = [
  { ...originalItems[originalItems.length - 1], id: -1 },
  ...originalItems,
  { ...originalItems[0], id: -2 }
]

function ImageCarousel(): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef<number | null>(null)

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false)
      setCurrentIndex(originalItems.length)
    } else if (currentIndex === carouselItems.length - 1) {
      setIsTransitioning(false)
      setCurrentIndex(1)
    }
    setTimeout(() => setIsTransitioning(true), 50)
  }

  const handleNext = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const handleDotClick = (index: number) => {
    setIsTransitioning(true)
    setCurrentIndex(index + 1)
  }

  useEffect(() => {
    if (!isHovering) {
      timerRef.current = window.setInterval(() => {
        handleNext()
      }, 3000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isHovering])

  const getRealIndex = () => {
    if (currentIndex === 0) return originalItems.length - 1
    if (currentIndex === carouselItems.length - 1) return 0
    return currentIndex - 1
  }

  const realIndex = getRealIndex()

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="carousel-wrapper">
        <div
          className={`carousel-track ${!isTransitioning ? 'no-transition' : ''}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {carouselItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="carousel-item">
              <img src={item.imageUrl} alt={item.title} className="carousel-image" />
              <div className="carousel-overlay">
                <h3 className="carousel-title">{item.title}</h3>
                <p className="carousel-description">{item.description}</p>
                <NavLink to="/home/categories" className="carousel-button">
                  探索更多
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {originalItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === realIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`切换到第 ${index + 1} 张图片`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
