"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setIsSubmitting(false);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
