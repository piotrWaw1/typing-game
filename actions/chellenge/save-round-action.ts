"use server";

import { createClient } from "@/lib/supabase/server";
import { accuracy } from '@/lib/utils';

export default async function saveRoundEasy(
  correct: number,
  incorrect: number,
  sentence: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (!user || authError) {
    return { message: "Unauthorized", success: false };
  }

  const value = Number(accuracy(correct, incorrect));

  const { error } = await supabase
    .from("easy_round")
    .insert({ accuracy: value, user_name: user.email ?? "", sentence });

  if (error) {
    return { message: "Round save failed.", success: false };
  }

  return { message: "Round save successfully", success: true };
}
