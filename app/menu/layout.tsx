import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

export default function ProtectedLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20">
        <Navbar />
        <div className="flex-1 flex flex-col gap-20 w-full p-5 justify-center items-center">
          {children}
        </div>
        <Toaster />
        <Footer />
      </div>
    </main>
  );
}
