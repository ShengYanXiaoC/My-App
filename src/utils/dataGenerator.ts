export interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
}

const titles = [
  "山间薄雾", "城市光影", "静谧森林", "汪洋海风", "落日余晖",
  "晨曦微露", "极光之舞", "沙漠星空", "樱花雨", "雪中木屋"
]

const descs = [
  "大自然最温柔的笔触，让人心旷神怡。",
  "现代与传统的交织，每一帧都是故事。",
  "呼吸清新的空气，治愈一整天的疲惫。",
  "听海浪拍岸，感受自由的风。",
  "天空被染成橘子汽水的颜色。",
  "新的一天，从第一缕光开始。",
  "神秘缥缈，像是另一个世界的入口。",
  "亿万星辰为你闪烁，浩瀚而寂静。",
  "短暂而绚烂，落英缤纷。",
  "雪覆盖了喧嚣，只剩下纯粹。"
]

export function generateGalleryItems(startId: number, count: number): GalleryItem[] {
  const items: GalleryItem[] = []
  for (let i = 0; i < count; i++) {
    const id = startId + i
    const height = 200 + Math.floor(Math.random() * 380)
    const imgUrl = `https://picsum.photos/id/${(id % 100) + 1}/400/${height}`
    const title = titles[id % titles.length] + (Math.random() > 0.7 ? " · 特别版" : "")
    const desc = descs[id % descs.length] + (Math.random() > 0.8 ? " 更多内容……" : "")
    items.push({ id, title, description: desc, image: imgUrl })
  }
  return items
}

export const MAX_ITEMS = 300