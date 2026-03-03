import Link from 'next/link';
import { hasEnvVars } from '@/lib/utils';
import { EnvVarWarning } from '@/components/env-var-warning';
import { Suspense } from 'react';
import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <h1 className="text-xl font-semibold">
          <Link href={'/'}>Typing</Link>
        </h1>
        <div className="flex flex-row gap-2">
          {!hasEnvVars ? (
            <EnvVarWarning />
          ) : (
            <Suspense>
              <AuthButton />
            </Suspense>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
