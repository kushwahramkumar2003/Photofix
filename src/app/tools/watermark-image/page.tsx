import { Metadata } from 'next'
import { WatermarkImageForm } from './components/WatermarkImageForm'


export const metadata: Metadata = {
  title: 'Add Watermark to Images | SnapForge',
  description: 'Easily add custom watermarks to your images. Protect your visual content with text or image watermarks using our advanced AI-powered tool.',
  keywords: ['watermark', 'image protection', 'copyright', 'branding', 'photo watermark', 'AI image tool', 'SnapForge'],
  openGraph: {
    title: 'Add Watermark to Images | SnapForge',
    description: 'Protect your images with custom watermarks. Add text or image watermarks easily with our AI-powered tool.',
    images: [
      {
        url: '/og-image-watermark.jpg',
        width: 1200,
        height: 630,
        alt: 'SnapForge Watermark Image Tool',
      },
    ],
    type: 'website',
  },
}

export default function WatermarkImagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Add Watermark to Images
      </h1>
      <p className="text-muted-foreground mb-8">
        Protect your visual content by adding custom watermarks to your images. Choose between text and image watermarks, adjust opacity, position, and more.
      </p>
      <WatermarkImageForm />
    </div>
  )
}

