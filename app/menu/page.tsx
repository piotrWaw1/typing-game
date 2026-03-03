import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import EasyModeRounds from '@/components/realtime-tables/easy-mode-rounds';

const MODES = [
  {
    title: 'Easy',
    description: 'Easy mode',
    link: '/menu/mode/easy',
  },
  {
    title: 'Medium',
    description: 'Medium mode',
    link: '/menu/mode/medium',
  },
  {
    title: 'Hard',
    description: 'Hard mode',
    link: '/menu/mode/hard',
  },
];

export default function ProtectedPage() {
  return (
    <div className="container flex flex-1 flex-col gap-12 px-3">
      <div>
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-2xl font-bold">Modes</h2>
          <div className="h-1 w-full rounded-xl border bg-gray-800 dark:bg-gray-400/30" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MODES.map((mode, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{mode.title}</CardTitle>
                <CardDescription>{mode.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={mode.link}>
                  <Button className="w-full">Play</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Suspense fallback="Loading...">
              <EasyModeRounds />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
