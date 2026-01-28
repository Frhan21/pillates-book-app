"use client"

import { Button } from "~/components/ui/button";

const Hero = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <div className="bg-secondary/20 border-secondary/30 rounded-full border px-4 py-2">
            <p className="text-primary text-sm font-medium">
              Welcome to Zen Pilates Studio
            </p>
          </div>
        </div>

        <h1 className="text-foreground mb-6 text-5xl font-bold text-balance md:text-6xl">
          Transform Your Body with Mindful Movement
        </h1>

        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-balance">
          Experience the perfect blend of strength, flexibility, and inner
          peace. Book your pilates session effortlessly and join thousands of
          satisfied clients.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-6 text-lg font-semibold transition-all hover:shadow-lg"
          >
            Book a Session
          </Button>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 rounded-lg border-2 bg-transparent px-8 py-6 text-lg font-semibold"
          >
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
