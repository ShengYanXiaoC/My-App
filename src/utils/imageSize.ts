export async function getImageSizeFast(url: string): Promise<{ width: number; height: number }> {
  let res
  try {
    res = await fetch(url, { headers: { Range: 'bytes=0-512' } })
  } catch (e) {
    return fallbackGetImageSize(url)
  }
  if (!res.ok && res.status !== 206) {
    return fallbackGetImageSize(url)
  }
  const buf = await res.arrayBuffer()
  const view = new DataView(buf)
  const magic = new Uint8Array(buf.slice(0, 12))

  if (isJpeg(magic)) {
    return parseJpegSize(view, buf.byteLength)
  }
  if (isPng(magic)) {
    return parsePngSize(view)
  }
  if (isGif(magic)) {
    return parseGifSize(view)
  }
  if (isWebp(magic)) {
    return parseWebpSize(view)
  }
  return fallbackGetImageSize(url)
}

function isJpeg(magic: Uint8Array): boolean {
  return magic[0] === 0xFF && magic[1] === 0xD8 && magic[2] === 0xFF
}

function parseJpegSize(view: DataView, length: number): { width: number; height: number } {
  let offset = 2
  while (offset < length) {
    if (view.getUint8(offset) !== 0xFF) break
    const marker = view.getUint8(offset + 1)
    if (marker === 0xC0 || marker === 0xC2) {
      const height = view.getUint16(offset + 5)
      const width = view.getUint16(offset + 7)
      return { width, height }
    }
    offset += 2 + view.getUint16(offset + 2)
  }
  return { width: 400, height: 300 }
}

function isPng(magic: Uint8Array): boolean {
  return magic[0] === 0x89 && magic[1] === 0x50 && magic[2] === 0x4E && magic[3] === 0x47
}

function parsePngSize(view: DataView): { width: number; height: number } {
  const width = view.getUint32(16)
  const height = view.getUint32(20)
  return { width, height }
}

function isGif(magic: Uint8Array): boolean {
  return magic[0] === 0x47 && magic[1] === 0x49 && magic[2] === 0x46 && magic[3] === 0x38
}

function parseGifSize(view: DataView): { width: number; height: number } {
  const width = view.getUint16(6, true)
  const height = view.getUint16(8, true)
  return { width, height }
}

function isWebp(magic: Uint8Array): boolean {
  return (
    magic[0] === 0x52 && magic[1] === 0x49 && magic[2] === 0x46 && magic[3] === 0x46 &&
    magic[8] === 0x57 && magic[9] === 0x45 && magic[10] === 0x42 && magic[11] === 0x50
  )
}

function parseWebpSize(view: DataView): { width: number; height: number } {
  const format = view.getUint32(12)
  if (format === 0x56503820) {
    const width = view.getUint16(26) & 0x3FFF
    const height = view.getUint16(28) & 0x3FFF
    return { width, height }
  } else if (format === 0x5650384C) {
    const bits = view.getUint32(21)
    const width = (bits & 0x3FFF) + 1
    const height = ((bits >> 14) & 0x3FFF) + 1
    return { width, height }
  }
  return { width: 400, height: 300 }
}

async function fallbackGetImageSize(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => resolve({ width: 400, height: 300 })
    img.src = url
  })
}