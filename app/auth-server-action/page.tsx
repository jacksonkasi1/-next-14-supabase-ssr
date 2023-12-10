import React from "react";
import { AuthForm } from "./components/AuthForm";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function page() {
  const { data, error } = await readUserSession();

  console.log(data);

  if (data?.session) {
    return redirect("/todo");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <AuthForm />
      </div>
    </div>
  );
}
