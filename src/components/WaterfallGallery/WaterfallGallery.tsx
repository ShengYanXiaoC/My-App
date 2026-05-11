import React from 'react'
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import WaterfallCard from '../WaterfallCard/WaterfallCard'
import { generateGalleryItems, MAX_ITEMS } from '../../utils/dataGenerator'
import { getImageSizeFast } from '../../utils/imageSize'
import type { GalleryItem } from '../../utils/dataGenerator'
import './WaterfallGallery.css'

interface SkeletonCardProps {
  height: number
}

const SkeletonCard = ({ height }: SkeletonCardProps) => {
  const imageHeight = height * 0.7
  const contentHeight = height * 0.3

  return (
    <div className="waterfall-card waterfall-skeleton-card">
      <div className="skeleton-image" style={{ height: `${imageHeight}px` }} />
      <div className="skeleton-content" style={{ height: `${contentHeight}px` }}>
        <div className="skeleton-title" />
        <div className="skeleton-desc" />
      </div>
    </div>
  )
}

const PADDING = 20

function WaterfallGallery(): React.ReactElement {
  const [status, setStatus] = React.useState<'loading' | 'ready'>('loading')
  const [items, setItems] = React.useState<GalleryItem[]>([])
  const [sizeMap, setSizeMap] = React.useState<Map<string, number>>(new Map())
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [lanesCount, setLanesCount] = React.useState(3)
  const [availableWidth, setAvailableWidth] = React.useState(0)
  const gap = 20

  React.useEffect(() => {
    const raw = generateGalleryItems(0, 10)
    setItems(raw)
    loadImageSizes(raw).then(map => {
      setSizeMap(map)
      setStatus('ready')
    })
  }, [])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateDimensions = () => {
      const width = container.clientWidth
      const contentWidth = width - PADDING * 2
      setAvailableWidth(contentWidth)
      if (width >= 1100) setLanesCount(4)
      else if (width >= 640) setLanesCount(3)
      else if (width >= 320) setLanesCount(2)
      else setLanesCount(1)
    }

    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  const getScrollParent = (): Element | null => {
    const layoutContent = document.querySelector('.layout-content')
    return layoutContent
  }

  const estimatedCardHeight = availableWidth ? (availableWidth / lanesCount) * 0.75 + 100 : 300
  const estimatedHeightWithGap = estimatedCardHeight + gap

  const virtualizer = useVirtualizer({
    count: status === 'ready' ? (items.length + 1) : 40, //列表总长度
    lanes: lanesCount, //列数
    estimateSize: React.useCallback(() => estimatedHeightWithGap, [estimatedHeightWithGap]), //每项的预估高度
    getScrollElement: getScrollParent, //获取滚动父元素
    overscan: 4, //设置缓冲区 - 在可视区上下额外多渲染几项作为缓冲区，防止快速滚动时出现白屏
    measureElement: (element) => element?.getBoundingClientRect().height, //测量项的高度
  })

  const virtualItems = virtualizer.getVirtualItems()
  const itemWidth = availableWidth ? (availableWidth - (lanesCount - 1) * gap) / lanesCount : 0

  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const hasMore = items.length < MAX_ITEMS

  React.useEffect(() => {
    if (status !== 'ready') return
    const lastItem = virtualItems[virtualItems.length - 1]
    if (!lastItem || !hasMore || isLoadingMore || lastItem.index < items.length - 1) return

    setIsLoadingMore(true)
    const newItems = generateGalleryItems(items.length, 20)
    loadImageSizes(newItems).then(newMap => {
      setSizeMap(prev => new Map([...prev, ...newMap]))
      setItems(prev => [...prev, ...newItems])
      setIsLoadingMore(false)
    })
  }, [virtualItems, status, hasMore, isLoadingMore, items.length])

  const notifyMeasure = React.useCallback(() => {
    virtualizer.measure()
  }, [virtualizer])

  const renderItem = (virtualItem: VirtualItem) => {
    const left = virtualItem.lane * (itemWidth + gap)

    if (status === 'loading') {
      return (
        <div
          key={virtualItem.key}
          style={{
            position: 'absolute',
            top: 0,
            left: `${left}px`,
            width: `${itemWidth}px`,
            transform: `translateY(${virtualItem.start}px)`,
          }}
        >
          <SkeletonCard height={estimatedCardHeight} />
        </div>
      )
    }

    if (virtualItem.index >= items.length) {
      return (
        <div
          key={virtualItem.key}
          style={{
            position: 'absolute',
            top: 0,
            left: `${left}px`,
            width: `${itemWidth}px`,
            transform: `translateY(${virtualItem.start}px)`,
            paddingBottom: `${gap}px`,
          }}
        >
          <div className="waterfall-loader-more">
            {isLoadingMore ? '⏳ 加载更多...' : '✨ 已经到底了 ✨'}
          </div>
        </div>
      )
    }

    const item = items[virtualItem.index]
    const ratio = sizeMap.get(item.image) || 0.75

    return (
      <div
        key={virtualItem.key}
        data-index={virtualItem.index}
        ref={virtualizer.measureElement}
        style={{
          position: 'absolute',
          top: 0,
          left: `${left}px`,
          width: `${itemWidth}px`,
          transform: `translateY(${virtualItem.start}px)`,
          paddingBottom: `${gap}px`,
        }}
      >
        <WaterfallCard item={item} ratio={ratio} onMeasure={notifyMeasure} />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="waterfall-container">
      <div
        style={{
          position: 'relative' as const,
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%'
        }}
      >
        {virtualItems.map(renderItem)}
      </div>
    </div>
  )
}

async function loadImageSizes(items: GalleryItem[]): Promise<Map<string, number>> {
  const sizes = await Promise.all(
    items.map(item => getImageSizeFast(item.image).catch(() => ({ width: 400, height: 300 })))
  )
  const map = new Map<string, number>()
  items.forEach((item, idx) => {
    const { width, height } = sizes[idx]
    map.set(item.image, height / width)
  })
  return map
}

export default WaterfallGallery