"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Luggage } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-bold text-accent">TripCraft AI</h1>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/plans"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Luggage className="w-4 h-4" />
                My Plans
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/plan">
              <Button className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
