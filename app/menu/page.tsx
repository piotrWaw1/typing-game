import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MODES = [
  {
    title: "Easy",
    description: "Easy mode",
    link: "/menu/mode/easy",
  },
  {
    title: "Medium",
    description: "Medium mode",
    link: "/menu/mode/medium",
  },
  {
    title: "Hard",
    description: "Hard mode",
    link: "/menu/mode/hard",
  },
];

export default function ProtectedPage() {
  return (
    <div className="container flex-1 flex flex-col gap-12 px-3">
      <div>
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-2xl font-bold">Modes</h2>
          <div className="w-full h-1 border rounded-xl dark:bg-gray-400/30 bg-gray-800" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
      </div>
    </div>
  );
}
