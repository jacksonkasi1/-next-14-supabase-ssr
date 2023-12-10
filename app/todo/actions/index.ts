"use server";

import createSupabaseClient from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function createTodo(title: string) {
  const supabase = await createSupabaseClient();

  const result = await supabase
    .from("todo-demo")
    .insert({
      title,
    })
    .single();

  revalidatePath("/todo");

  return JSON.stringify(result);
}

export async function readTodo() {
  noStore();
  const supabase = await createSupabaseClient();

  const result = await supabase.from("todo-demo").select("*");

  return result;
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseClient();

  const result = await supabase.from("todo-demo").delete().match({ id });

  revalidatePath("/todo");

  return JSON.stringify(result);
}

export async function updateTodoById(id: string, completed: boolean) {
  const supabase = await createSupabaseClient();

  const result = await supabase
    .from("todo-demo")
    .update({ completed })
    .match({ id });

  revalidatePath("/todo");

  return JSON.stringify(result);
}
