import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HtmlInputProps {
  html: string;
  setHtml: (html: string) => void;
}

export function HtmlInput({ html, setHtml }: HtmlInputProps) {
  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>HTML Input</CardTitle>
        <CardDescription>Enter your HTML code here</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<div>Your HTML here</div>"
          className="min-h-[200px] max-h-[400px] font-mono resize-y overflow-auto"
        />
      </CardContent>
    </Card>
  );
}
