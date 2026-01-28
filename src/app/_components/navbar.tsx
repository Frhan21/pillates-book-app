"use client";

import { Button } from "~/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-background/80 border-border/50 fixed top-0 right-0 left-0 z-50 border-b px-10 py-2 backdrop-blur-md drop-shadow-md">
      <div className="container-narrow mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <span className="text-primary-foreground text-lg font-bold">
                P
              </span>
            </div>
            <span className="text-foreground text-xl font-semibold">
              PilatesFlow
            </span>
          </div>

          {/* Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => 0}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => 0}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => 0}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Booking
            </button>
            <Button variant={"default"} size={"lg"}>
              Ready to Book ?
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
