import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface PricingPlansProps {
  plans: PricingPlan[];
}

export function PricingPlans({ plans }: PricingPlansProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`flex flex-col ${plan.popular ? "border-primary" : ""}`}
        >
          <CardHeader>
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-4xl font-bold mt-2">{plan.price}</p>
            {plan.popular && (
              <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full mt-2">
                Most Popular
              </span>
            )}
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="text-green-500 mr-2" size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
