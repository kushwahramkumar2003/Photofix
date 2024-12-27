import { Card, CardContent } from "@/components/ui/card";

export function AnimatedLoader() {
  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardContent className="flex items-center justify-center h-[600px]">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full animate-spin" />
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin-reverse" />
        </div>
      </CardContent>
    </Card>
  );
}
