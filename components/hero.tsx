import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="mb-20 flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Welcome</p>
        <h1 className="max-w-lg text-4xl font-bold !leading-tight lg:text-6xl">Start your typing journey</h1>
        <p className="mx-auto max-w-sm text-lg text-muted-foreground">
          Test your speed, track your progress, and improve every day.
        </p>
      </div>

      <Link href="/menu">
        <Button size="lg" className="gap-2 rounded-full px-8">
          Play now <ArrowRight size={16} />
        </Button>
      </Link>
    </div>
  );
}
