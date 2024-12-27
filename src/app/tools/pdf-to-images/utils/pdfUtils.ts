import * as pdfjs from 'pdfjs-dist'
import { ConversionOptions } from '../types'

// Ensure PDF.js worker is available
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export async function convertPdfToImages(file: File, options: ConversionOptions): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
  const pageCount = pdf.numPages

  const pageRange = getPageRange(options.pageRange, pageCount)
  const convertedImages: string[] = []

  for (const pageNum of pageRange) {
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: options.dpi / 72 })

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width

    await page.render({ canvasContext: context!, viewport }).promise

    const imageDataUrl = canvas.toDataURL(`image/${options.format}`, options.quality / 100)
    convertedImages.push(imageDataUrl)
  }

  return convertedImages
}

function getPageRange(pageRange: string, pageCount: number): number[] {
  if (pageRange === 'all') {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const ranges = pageRange.split(',').map(r => r.trim())
  const pages: number[] = []

  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number)
    if (isNaN(end)) {
      pages.push(start)
    } else {
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
  }

  return pages.filter(p => p > 0 && p <= pageCount)
}

