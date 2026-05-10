import React from 'react'
import './WaterfallCard.css'
import type { GalleryItem } from '../../utils/dataGenerator'

interface WaterfallCardProps {
  item: GalleryItem
  ratio: number
  onMeasure?: () => void
}

const WaterfallCard = React.memo(({ item, ratio, onMeasure }: WaterfallCardProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [currentRatio, setCurrentRatio] = React.useState(ratio)

  React.useEffect(() => {
    if (wrapperRef.current && ratio !== currentRatio) {
      setCurrentRatio(ratio)
      onMeasure?.()
    }
  }, [ratio, onMeasure])

  const wrapperStyle = {
    aspectRatio: `${1 / (currentRatio || 0.75)}`,
    transition: 'aspect-ratio 0.2s ease-out' as const
  }

  return (
    <div className="waterfall-card">
      <div ref={wrapperRef} className="waterfall-image-wrapper" style={wrapperStyle}>
        <img
          src={item.image}
          alt={item.title}
          className="waterfall-card-img"
          loading="lazy"
        />
      </div>
      <div className="waterfall-card-content">
        <div className="waterfall-card-title">{item.title}</div>
        <div className="waterfall-card-desc">{item.description}</div>
      </div>
    </div>
  )
})

export default WaterfallCard