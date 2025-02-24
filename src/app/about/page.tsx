import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  ImageIcon,
  Sparkles,
  Users,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Globe,
} from "lucide-react";
import Script from "next/script";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  avatarSrc?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export const metadata: Metadata = {
  title: "About PhotoFix - AI-Powered Image Editing Platform",
  description:
    "Learn about PhotoFix, the revolutionary AI-powered image editing platform. Discover our mission, features, and the team behind our innovative technology.",
  keywords: [
    "AI image editing",
    "photo enhancement",
    "PhotoFix",
    "image processing AI",
  ],
  openGraph: {
    title: "About PhotoFix - AI-Powered Image Editing",
    description:
      "Discover the story and team behind PhotoFix, your go-to AI image editing platform.",
    url: "https://www.photofix.in.net/about",
    siteName: "PhotoFix",
    images: [
      {
        url: "https://www.photofix.in.net/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About PhotoFix",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About PhotoFix - AI-Powered Image Editing",
    description:
      "Discover the story and team behind PhotoFix, your go-to AI image editing platform.",
    images: ["https://www.photofix.in.net/twitter-about.jpg"],
    creator: "@photofix",
  },
  alternates: {
    canonical: "https://www.photofix.in.net/about",
  },
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                About PhotoFix
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl md:text-2xl mt-4">
                Empowering creativity through AI-powered image editing
              </p>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          aria-labelledby="mission"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2
                  id="mission"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
                >
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg">
                  At PhotoFix, we&apos;re on a mission to democratize advanced
                  image editing capabilities. We believe that everyone should
                  have access to powerful, AI-driven tools that can transform
                  their visual content without requiring years of expertise.
                </p>
                <p className="text-muted-foreground text-lg">
                  Our platform combines cutting-edge artificial intelligence
                  with an intuitive user interface, making professional-grade
                  image manipulation accessible to creators, businesses, and
                  individuals worldwide.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="PhotoFix AI-powered image editing platform showcasing our mission"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
          aria-labelledby="features"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2
              id="features"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              What Sets Us Apart
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Zap className="h-10 w-10" />}
                title="AI-Powered"
                description="Cutting-edge AI algorithms for unparalleled image processing"
              />
              <FeatureCard
                icon={<ImageIcon className="h-10 w-10" />}
                title="Versatile Tools"
                description="A comprehensive suite of tools for all your image editing needs"
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10" />}
                title="User-Friendly"
                description="Intuitive interface designed for both novices and professionals"
              />
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Community-Driven"
                description="Constantly evolving based on user feedback and needs"
              />
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          aria-labelledby="team"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2
              id="team"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              Meet Our Team
            </h2>
            <div className="flex justify-center items-center">
              <TeamMemberCard
                name="Ramkumar kushwah"
                role="Founder & CEO"
                bio="Visionary leader with a passion for Full Stack Development and Web3."
                socialLinks={{
                  github: "https://github.com/kushwahramkumar2003",
                  linkedin: "https://linkedin.com/in/ramkumar9301",
                  twitter: "https://x.com/ramkumar_9301",
                  instagram: "https://instagram.com/ram_kumar9301",
                  website: "https://ramkumar-dev.me",
                }}
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Join the PhotoFix Revolution
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-lg sm:text-xl">
                Experience the future of image editing. Start transforming your
                visuals today with our AI-powered platform.
              </p>
              <Button asChild size="lg" className="mt-8">
                <a href="/signup">Get Started for Free</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.photofix.in.net/about",
            },
            name: "About PhotoFix",
            description:
              "Learn about PhotoFix, the revolutionary AI-powered image editing platform. Discover our mission, features, and the team behind our innovative technology.",
            url: "https://www.photofix.in.net/about",
            image: {
              "@type": "ImageObject",
              url: "https://www.photofix.in.net/og-about.jpg",
              width: 1200,
              height: 630,
            },
            publisher: {
              "@type": "Organization",
              name: "PhotoFix",
              logo: {
                "@type": "ImageObject",
                url: "https://www.photofix.in.net/logo.png",
                width: 600,
                height: 60,
              },
            },
          }),
        }}
      />
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden border-primary/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <div className="mb-2 rounded-full bg-primary/10 p-2 w-12 h-12 flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function TeamMemberCard({
  name,
  role,
  bio,
  avatarSrc = "https://avatars.githubusercontent.com/u/68776478?v=4",
  socialLinks = {},
}: TeamMemberCardProps) {
  const { twitter, linkedin, github, instagram, facebook, website } =
    socialLinks;

  return (
    <Card className="relative overflow-hidden border-primary/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 w-80 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex justify-center items-center">
          <Avatar className="w-full h-full border-2 border-primary/20">
            <AvatarImage src={avatarSrc} alt={`${name}'s avatar`} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl text-center">{name}</CardTitle>
        <CardDescription className="text-center font-medium">
          {role}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-center mb-4">{bio}</p>

        <div className="flex justify-center space-x-4 pt-2 border-t border-primary/10">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
