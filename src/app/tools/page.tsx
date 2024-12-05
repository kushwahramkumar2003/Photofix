import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Image,
  Crop,
  FileImage,
  Scissors,
  ArrowUpCircle,
  Eraser,
  Stamp,
  Smile,
  RotateCcw,
  Code,
  EyeOff,
  UserPlus,
  FileArchiveIcon as Compress,
  Maximize,
  Palette,
  ChevronRight,
  Wand2,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI-Powered Image Processing Tools | PhotoFix",
  description:
    "Discover our comprehensive suite of AI-powered image processing tools. Compress, resize, crop, convert, edit, and enhance your images with ease using PhotoFix's advanced algorithms.",
  keywords: [
    "image processing",
    "AI tools",
    "PhotoFix",
    "compress image",
    "resize image",
    "crop image",
    "convert image",
    "edit image",
    "enhance image",
    "remove background",
    "upscale image",
    "face swap",
    "object removal",
    "watermark",
    "meme generator",
    "HEIC conversion",
  ],
  openGraph: {
    title: "AI-Powered Image Processing Tools | PhotoFix",
    description:
      "Transform your images with PhotoFix's suite of AI-powered tools. From basic edits to advanced AI transformations, enhance your visuals with just a few clicks.",
    images: [
      {
        url: "/og-image-tools.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoFix AI-Powered Image Processing Tools",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "PhotoFix",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Image Processing Tools | PhotoFix",
    description:
      "Transform your images with PhotoFix's suite of AI-powered tools. From basic edits to advanced AI transformations, enhance your visuals with just a few clicks.",
    images: ["/og-image-tools.jpg"],
    creator: "@photofix",
  },
};

const toolCategories = [
  {
    name: "Basic Editing",
    description: "Essential tools for quick and easy image adjustments",
    color: "from-blue-100 to-blue-200",
    tools: [
      {
        name: "Compress Image",
        description: "Reduce file size without compromising quality",
        icon: <Compress className="h-8 w-8 text-blue-600" />,
        href: "/tools/compress",
        difficulty: "Easy",
        eta: "< 1 minute",
      },
      {
        name: "Resize Image",
        description: "Adjust image dimensions while maintaining aspect ratio",
        icon: <Maximize className="h-8 w-8 text-green-600" />,
        href: "/tools/resize",
        difficulty: "Easy",
        eta: "< 1 minute",
      },
      {
        name: "Crop Image",
        description: "Trim and refine image composition with precision",
        icon: <Crop className="h-8 w-8 text-purple-600" />,
        href: "/tools/crop-image",
        difficulty: "Easy",
        eta: "1-2 minutes",
      },
      {
        name: "Rotate Image",
        description: "Correct image orientation or create artistic angles",
        icon: <RotateCcw className="h-8 w-8 text-orange-600" />,
        href: "/tools/rotate-image",
        difficulty: "Easy",
        eta: "< 1 minute",
      },
    ],
  },
  {
    name: "Conversion",
    description: "Transform your images between various file formats",
    color: "from-green-100 to-green-200",
    tools: [
      {
        name: "Convert to JPG",
        description:
          "Transform images to JPG format for universal compatibility",
        icon: <FileImage className="h-8 w-8 text-indigo-600" />,
        href: "/tools/convert-to-jpg",
        difficulty: "Easy",
        eta: "1-2 minutes",
      },
      {
        name: "Convert from JPG",
        description: "Convert JPG to other formats for specific use cases",
        icon: <Image className="h-8 w-8 text-pink-600" />,
        href: "/tools/convert-from-jpg",
        difficulty: "Easy",
        eta: "1-2 minutes",
      },
      {
        name: "HEIC to JPG",
        description: "Convert Apple's HEIC format to widely-supported JPG",
        icon: <Layers className="h-8 w-8 text-teal-600" />,
        href: "/tools/heic-to-jpg",
        difficulty: "Easy",
        eta: "1-2 minutes",
      },
    ],
  },
  {
    name: "Advanced Editing",
    description: "Powerful tools for comprehensive image manipulation",
    color: "from-purple-100 to-purple-200",
    tools: [
      {
        name: "Photo Editor",
        description: "All-in-one suite for professional-grade image editing",
        icon: <Palette className="h-8 w-8 text-red-600" />,
        href: "/tools/photo-editor",
        difficulty: "Intermediate",
        eta: "5-10 minutes",
      },
      {
        name: "Upscale Image",
        description: "Enhance image resolution using AI algorithms",
        icon: <ArrowUpCircle className="h-8 w-8 text-yellow-600" />,
        href: "/tools/upscale-image",
        difficulty: "Easy",
        eta: "2-3 minutes",
      },
      {
        name: "Remove Background",
        description: "Automatically isolate subjects from any background",
        icon: <Eraser className="h-8 w-8 text-cyan-600" />,
        href: "/tools/remove-background",
        difficulty: "Easy",
        eta: "1-2 minutes",
      },
      {
        name: "Add Watermark",
        description: "Protect your images with customizable watermarks",
        icon: <Stamp className="h-8 w-8 text-gray-600" />,
        href: "/tools/watermark-image",
        difficulty: "Easy",
        eta: "2-3 minutes",
      },
    ],
  },
  {
    name: "AI-Powered Tools",
    description: "Cutting-edge AI technology for advanced image manipulation",
    color: "from-yellow-100 to-yellow-200",
    tools: [
      {
        name: "AI Object Removal",
        description: "Seamlessly remove unwanted objects from your images",
        icon: <Scissors className="h-8 w-8 text-blue-600" />,
        href: "/tools/ai-object-remove",
        difficulty: "Intermediate",
        eta: "2-5 minutes",
      },
      {
        name: "AI Face Swap",
        description: "Intelligently swap faces in images with AI precision",
        icon: <UserPlus className="h-8 w-8 text-green-600" />,
        href: "/tools/ai-face-change",
        difficulty: "Intermediate",
        eta: "2-4 minutes",
      },
      {
        name: "AI Face Anonymizer",
        description: "Automatically blur or remove faces for privacy",
        icon: <EyeOff className="h-8 w-8 text-purple-600" />,
        href: "/tools/ai-face-anonymize",
        difficulty: "Easy",
        eta: "1-2 minutes",
      },
      {
        name: "AI Image Colorization",
        description:
          "Bring black and white images to life with AI colorization",
        icon: <Wand2 className="h-8 w-8 text-orange-600" />,
        href: "/tools/ai-colorize",
        difficulty: "Easy",
        eta: "2-4 minutes",
      },
    ],
  },
  {
    name: "Fun & Creative",
    description: "Unleash your creativity with these entertaining tools",
    color: "from-pink-100 to-pink-200",
    tools: [
      {
        name: "Meme Generator",
        description: "Create viral-worthy memes with ease and flair",
        icon: <Smile className="h-8 w-8 text-indigo-600" />,
        href: "/tools/meme-generator",
        difficulty: "Easy",
        eta: "2-5 minutes",
      },
      {
        name: "HTML to Image",
        description: "Convert HTML code snippets into shareable images",
        icon: <Code className="h-8 w-8 text-pink-600" />,
        href: "/tools/html-to-image",
        difficulty: "Intermediate",
        eta: "2-3 minutes",
      },
      {
        name: "Image to Sketch",
        description: "Transform photos into artistic sketch-style images",
        icon: <Sparkles className="h-8 w-8 text-teal-600" />,
        href: "/tools/image-to-sketch",
        difficulty: "Easy",
        eta: "1-2 minutes",
      },
    ],
  },
];

function ToolCard({
  title,
  description,
  icon,
  href,
  difficulty,
  eta,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  difficulty: string;
  eta: string;
}) {
  return (
    <Card className="group overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <Link href={href} className="block h-full">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full mr-4">
              {icon}
            </div>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {title}
            </CardTitle>
          </div>
          <CardContent className="p-0 flex-grow">
            <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
              {description}
            </CardDescription>
          </CardContent>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  "px-2 py-1 text-xs rounded-full",
                  difficulty === "Easy" &&
                    "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
                  difficulty === "Intermediate" &&
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
                  difficulty === "Advanced" &&
                    "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                )}
              >
                {difficulty}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ETA: {eta}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors"
            >
              Try Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default function ToolsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <header className="text-center mb-12 lg:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-300 dark:to-purple-300">
          AI-Powered Image Processing Tools
        </h1>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Explore our comprehensive suite of AI-powered image processing tools.
          Transform your images with just a few clicks, from basic edits to
          advanced AI-powered transformations. Elevate your visual content
          effortlessly.
        </p>
      </header>

      {toolCategories.map((category, index) => (
        <section key={index} className="mb-12 lg:mb-16">
          <div
            className={cn(
              " p-6 rounded-xl mb-6 sm:mb-8 shadow-md ",
              category.color,
              "dark:bg-opacity-10 dark:backdrop-blur-sm"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
              {category.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {category.description}
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {category.tools.map((tool, toolIndex) => (
              <ToolCard
                key={toolIndex}
                title={tool.name}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
                difficulty={tool.difficulty}
                eta={tool.eta}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
