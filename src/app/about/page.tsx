import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Image as ImageIcon, Sparkles, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              About SnapForge
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl md:text-2xl mt-4">
              Empowering creativity through AI-powered image editing
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg">
                At SnapForge, we're on a mission to democratize advanced image
                editing capabilities. We believe that everyone should have
                access to powerful, AI-driven tools that can transform their
                visual content without requiring years of expertise.
              </p>
              <p className="text-muted-foreground text-lg">
                Our platform combines cutting-edge artificial intelligence with
                an intuitive user interface, making professional-grade image
                manipulation accessible to creators, businesses, and individuals
                worldwide.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="SnapForge Mission"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
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

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TeamMemberCard
              name="Alex Johnson"
              role="Founder & CEO"
              bio="Visionary leader with a passion for AI and image processing"
            />
            <TeamMemberCard
              name="Samantha Lee"
              role="Chief Technology Officer"
              bio="AI expert driving our technological innovations"
            />
            <TeamMemberCard
              name="Michael Chen"
              role="Head of Product"
              bio="User experience enthusiast ensuring our tools are intuitive and powerful"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Join the SnapForge Revolution
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg sm:text-xl">
              Experience the future of image editing. Start transforming your
              visuals today.
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href="/signup">Get Started for Free</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
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
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <Card className="relative overflow-hidden border-primary/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4"></div>
        <CardTitle className="text-xl text-center">{name}</CardTitle>
        <CardDescription className="text-center">{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center">{bio}</p>
      </CardContent>
    </Card>
  );
}
