import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col gap-20">
        <Navbar />
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-20 p-5">{children}</div>
        <Toaster />
        <Footer />
      </div>
    </main>
  );
}
