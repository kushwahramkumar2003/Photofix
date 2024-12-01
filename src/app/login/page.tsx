"use client";

import { signIn } from "next-auth/react";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-950 shadow-xl rounded-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <Github className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Mail className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
