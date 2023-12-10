import React from "react";
import { Button } from "@/components/ui/button";
import createSupabaseClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function SignOut() {
  const logout = async (): Promise<void> => {
    "use server";
    const supabase = await createSupabaseClient();

    await supabase.auth.signOut();

    redirect("/auth-server-action");
  };

  const logoutFunc: string = logout as unknown as string;

  return (
    <form action={logoutFunc}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
