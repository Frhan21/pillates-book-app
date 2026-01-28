"use client";

import { CheckCheck, Stars } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { packages } from "~/constant/package";
import { toRupiah } from "~/lib/toRupiah";

const Pricing = () => {
  return (
    <section className="from-secondary/5 to-background min-w-screen bg-gradient-to-br px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Title Section */}
        <h3 className="text-foreground mb-4 text-center text-4xl font-bold">
          {" "}
          Simple, Transparent Pricing !!
        </h3>
        <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center text-lg">
          Choose your perfect one for your reservation!
        </p>

        {/* Card Pricing */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((plan, idx) => (
            <Card
              className={`relative h-full overflow-hidden rounded-2xl transition-all ${plan.popular ? "border-primary border-2 md:scale-105" : "border-border border"} `}
              key={idx}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-6 py-2 text-sm font-semibold">
                  <span className="flex items-center justify-center gap-2">
                    <Stars fill="#ffffff" className="h-6 w-6" /> Recommended
                  </span>
                </div>
              )}
              <div className="flex h-full flex-col p-8">
                <h3 className="text-foreground mb-8 text-2xl font-bold">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-primary text-4xl font-bold">
                    {toRupiah(plan.fixedPrice)}
                  </span>
                  <span className="text-muted-foreground">
                    /{plan.duration}
                  </span>
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feat, idx) => (
                    <li className="flex items-center gap-3" key={idx}>
                      <span className="text-primary mt-0.5 text-lg font-bold">
                        <CheckCheck />
                      </span>
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`mt-auto w-full rounded-lg py-6 text-base font-semibold transition-all ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
