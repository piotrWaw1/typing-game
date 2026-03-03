import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import ChallengeError from '@/components/chellenge/errors/chellenge-error';
import BackToMenuButton from '@/components/chellenge/back-to-menu-button';

async function EasyModeContent() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const easy_attempt = supabase
    .from("easy_attempt")
    .select("*")
    .eq("created_at", today);
  const easy_set = supabase.from("easy_set").select("*");

  const [
    { data: attempt, error: attemptError },
    { data: set, error: setError },
  ] = await Promise.all([easy_attempt, easy_set]);

  if (attemptError || setError || !attempt || !set) {
    return <ChallengeError />;
  }

  if (attempt.length > 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <p>You already take part in this challenge!</p>
          <p>Comeback tomorrow.</p>
        </div>
        <BackToMenuButton />
      </div>
    );
  }

  return (
    <div>
      {}
    </div>
  );
}

export default async function EasyMode() {
  return (
    <Suspense fallback="Loading ...">
      <EasyModeContent />
    </Suspense>
  );
}