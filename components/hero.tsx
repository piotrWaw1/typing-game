import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex flex-col gap-8 items-center text-center mb-20">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
          Welcome
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold !leading-tight max-w-lg">
          Start your typing journey
        </h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          Test your speed, track your progress, and improve every day.
        </p>
      </div>

      <Link href="/menu">
        <Button size="lg" className="gap-2 px-8 rounded-full">
          Play now <ArrowRight size={16} />
        </Button>
      </Link>
    </div>
  );
}