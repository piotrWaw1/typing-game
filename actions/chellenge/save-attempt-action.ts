"use server";

import { createClient } from "@/lib/supabase/server";
import { accuracy } from '@/lib/utils';

export default async function saveAttemptEasy(
  correct: number,
  incorrect: number,
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
    .from("easy_attempt")
    .insert({ accuracy: value, user_name: user.email });

  if (error) {
    return { message: "Attempt save failed.", success: false };
  }

  return { message: "Attempt save successfully", success: true };
}
