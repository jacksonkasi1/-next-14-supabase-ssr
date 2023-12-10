"use server";

import createSupabaseClient from "../supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function readUserSession() {
  noStore();

  const supabase = await createSupabaseClient();

  const user = await supabase.auth.getUser();

  console.log(user);

  return supabase.auth.getSession();
}
