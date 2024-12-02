import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Image Processing Tools | SnapForge",
  description:
    "Discover our wide range of AI-powered image processing tools. Compress, resize, crop, convert, edit, and enhance your images with ease.",
  keywords: [
    "image processing",
    "AI tools",
    "SnapForge",
    "compress image",
    "resize image",
    "crop image",
    "convert image",
    "edit image",
    "enhance image",
  ],
  openGraph: {
    title: "Image Processing Tools | SnapForge",
    description:
      "Explore our comprehensive suite of AI-powered image processing tools. Transform your images with just a few clicks.",
    images: [
      {
        url: "/og-image-tools.jpg",
        width: 1200,
        height: 630,
        alt: "SnapForge Image Processing Tools",
      },
    ],
  },
};

const toolCategories = [
  {
    name: "Basic Editing",
    tools: [
      {
        name: "Compress Image",
        description: "Reduce file size without losing quality",
        icon: <Compress className="h-6 w-6" aria-label="Compress Image Icon" />,
        href: "/tools/compress",
      },
      {
        name: "Resize Image",
        description: "Change image dimensions easily",
        icon: <Maximize className="h-6 w-6" aria-label="Resize Image Icon" />,
        href: "/tools/resize",
      },
      {
        name: "Crop Image",
        description: "Trim and adjust image composition",
        icon: <Crop className="h-6 w-6" aria-label="Crop Image Icon" />,
        href: "/tools/crop-image",
      },
      {
        name: "Rotate Image",
        description: "Adjust image orientation",
        icon: <RotateCcw className="h-6 w-6" aria-label="Rotate Image Icon" />,
        href: "/tools/rotate-image",
      },
    ],
  },
  {
    name: "Conversion",
    tools: [
      {
        name: "Convert to JPG",
        description: "Transform images to JPG format",
        icon: (
          <FileImage className="h-6 w-6" aria-label="Convert to JPG Icon" />
        ),
        href: "/tools/convert-to-jpg",
      },
      {
        name: "Convert from JPG",
        description: "Convert JPG to other formats",
        icon: <Image className="h-6 w-6" aria-label="Convert from JPG Icon" />,
        href: "/tools/convert-from-jpg",
      },
    ],
  },
  {
    name: "Advanced Editing",
    tools: [
      {
        name: "Photo Editor",
        description: "Comprehensive image editing suite",
        icon: <Palette className="h-6 w-6" aria-label="Photo Editor Icon" />,
        href: "/tools/photo-editor",
      },
      {
        name: "Upscale Image",
        description: "Enhance image resolution",
        icon: (
          <ArrowUpCircle className="h-6 w-6" aria-label="Upscale Image Icon" />
        ),
        href: "/tools/upscale-image",
      },
      {
        name: "Remove Background",
        description: "Isolate subjects from backgrounds",
        icon: (
          <Eraser className="h-6 w-6" aria-label="Remove Background Icon" />
        ),
        href: "/tools/remove-background",
      },
      {
        name: "Add Watermark",
        description: "Protect images with custom watermarks",
        icon: <Stamp className="h-6 w-6" aria-label="Add Watermark Icon" />,
        href: "/tools/watermark-image",
      },
    ],
  },
  {
    name: "AI-Powered Tools",
    tools: [
      {
        name: "AI Object Removal",
        description: "Remove unwanted objects from images",
        icon: (
          <Scissors className="h-6 w-6" aria-label="AI Object Removal Icon" />
        ),
        href: "/tools/ai-object-remove",
      },
      {
        name: "AI Face Swap",
        description: "Change faces in images intelligently",
        icon: <UserPlus className="h-6 w-6" aria-label="AI Face Swap Icon" />,
        href: "/tools/ai-face-change",
      },
      {
        name: "AI Face Anonymizer",
        description: "Automatically blur or remove faces",
        icon: (
          <EyeOff className="h-6 w-6" aria-label="AI Face Anonymizer Icon" />
        ),
        href: "/tools/ai-face-anonymize",
      },
    ],
  },
  {
    name: "Fun & Creative",
    tools: [
      {
        name: "Meme Generator",
        description: "Create custom memes easily",
        icon: <Smile className="h-6 w-6" aria-label="Meme Generator Icon" />,
        href: "/tools/meme-generator",
      },
      {
        name: "HTML to Image",
        description: "Convert HTML code to image",
        icon: <Code className="h-6 w-6" aria-label="HTML to Image Icon" />,
        href: "/tools/html-to-image",
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <main className="p-12 flex flex-col justify-center bg-white dark:bg-gray-900">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-300 dark:to-purple-300">
          Image Processing Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Explore our comprehensive suite of AI-powered image processing tools.
          Transform your images with just a few clicks.
        </p>
      </header>

      {toolCategories.map((category, index) => (
        <section key={index} className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 border-b pb-4 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700">
            {category.name}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {category.tools.map((tool, toolIndex) => (
              <ToolCard
                key={toolIndex}
                title={tool.name}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function ToolCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all">
      <Link href={href}>
        <CardHeader>
          <div className="flex items-center space-x-4 text-gray-800 dark:text-gray-200">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {description}
          </CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
