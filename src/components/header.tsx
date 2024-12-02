"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image, Zap, Menu } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
];

export function Header() {
  const pathname = usePathname();
  // eslint-disable-next-line
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItems = ({ mobile = false, onClick = () => {} }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={onClick}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.path ? "text-foreground" : "text-foreground/60",
            mobile ? "text-lg py-2" : "text-sm"
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                SnapForge
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <NavItems />
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              asChild
            >
              <Link href="/tools">
                <Zap className="h-5 w-5" />
                <span className="sr-only">Tools</span>
              </Link>
            </Button>
            <ModeToggle />
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <NavItems mobile onClick={() => setIsMobileMenuOpen(false)} />
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
